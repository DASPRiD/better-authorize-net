import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import {
    ArraySchema,
    BooleanSchema, ChoiceSchema, CustomSchema,
    DateSchema, DateTimeSchema,
    DecimalSchema, EnumSchema,
    IntegerSchema, IntersectionSchema, OptionalSchema,
    RefSchema, RootSchema,
    Schema, SequenceSchema, StringRefSchema,
    StringSchema, UnknownSchema
} from "./intermediate.js";
import { SchemaName } from "./schema-name.js";
import { requiredOnSuccessConfig } from "./required-on-success-config.js";

type RawXsdNode = { [key: string]: RawXsdNode[] } & {
    "#text"?: string;
    ":@"?: Record<string, string>;
};
type XsdNode = {
    name: string;
    attributes: Record<string, string>;
    children: XsdNode[];
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is still fine
const transformNodes = (rawNodes: RawXsdNode[], depth = 1): XsdNode[] => {
    const nodes: XsdNode[] = [];

    for (const rawNode of rawNodes) {
        let nodeName: string | undefined;
        let attributes: Record<string, string> = {};
        let children: RawXsdNode[] = [];
        let skipNode = false;

        for (const [key, value] of Object.entries(rawNode)) {
            if (key === ":@") {
                attributes = value as Record<string, string>;
                continue;
            }

            if (nodeName !== undefined) {
                throw new Error("Encountered multiple node names");
            }

            if (key === "xs:annotation" || key === "#text") {
                skipNode = true;
                break;
            }

            nodeName = key;
            children = value as RawXsdNode[];
        }

        if (skipNode) {
            continue;
        }

        if (nodeName === undefined) {
            throw new Error("Failed to determine node name");
        }

        nodes.push({
            name: nodeName,
            attributes,
            children: transformNodes(children, depth + 1),
        });
    }

    return nodes;
};

const findNode = (nodes: XsdNode[], name: string): XsdNode => {
    for (const node of nodes) {
        if (node.name === name) {
            return node;
        }
    }

    throw new Error(`Failed to find node ${name}`);
};

const createBaseSchema = (base: string): Schema => {
    if (base.startsWith("anet:")) {
        return new RefSchema(SchemaName.fromAnet(base));
    }

    switch (base) {
        case "xs:string":
            return new StringSchema();

        case "xs:short":
        case "xs:int":
        case "xs:integer":
        case "xs:long":
            return new IntegerSchema();

        case "xs:decimal":
            return new DecimalSchema();

        case "xs:boolean":
            return new BooleanSchema();

        case "xs:date":
            return new DateSchema();

        case "xs:dateTime":
            return new DateTimeSchema();
    }

    throw new Error(`Unhandled restriction base: ${base}`);
};

const createEnumSchema = (base: string, node: XsdNode): EnumSchema => {
    if (base !== "xs:string") {
        throw new Error("Enumerations must have xs:string as base");
    }

    const values: string[] = [];

    for (const child of node.children) {
        if (child.name !== "xs:enumeration") {
            throw new Error("Expected only xs:enumeration children");
        }

        if (!("value" in child.attributes)) {
            throw new Error("Missing value attribute in xs:enumeration");
        }

        values.push(child.attributes.value);
    }

    if (values.length === 0) {
        throw new Error("Enumeration is missing values");
    }

    return new EnumSchema(values);
};

const applyRestriction = (schema: Schema, node: XsdNode): Schema => {
    const { value } = node.attributes;

    if (schema instanceof StringSchema || schema instanceof RefSchema) {
        const stringSchema = schema instanceof StringSchema ? schema : new StringRefSchema(schema);

        switch (node.name) {
            case "xs:pattern":
                stringSchema.pattern = value;
                return schema;

            case "xs:minLength":
                stringSchema.minLength = Number.parseInt(value, 10);
                return schema;

            case "xs:maxLength":
                stringSchema.maxLength = Number.parseInt(value, 10);
                return schema;

            case "xs:length":
                stringSchema.length = Number.parseInt(value, 10);
                return schema;
        }
    }

    if (schema instanceof IntegerSchema) {
        switch (node.name) {
            case "xs:minInclusive":
                schema.min = Number.parseInt(value, 10);
                return schema;

            case "xs:maxInclusive":
                schema.max = Number.parseInt(value, 10);
                return schema;
        }
    }

    if (schema instanceof DecimalSchema) {
        switch (node.name) {
            case "xs:minInclusive":
                schema.min = Number.parseInt(value, 10);
                return schema;

            case "xs:maxInclusive":
                schema.max = Number.parseInt(value, 10);
                return schema;

            case "xs:totalDigits":
                schema.totalDigits = Number.parseInt(value, 10);
                return schema;

            case "xs:fractionDigits":
                schema.fractionDigits = Number.parseInt(value, 10);
                return schema;
        }
    }

    throw new Error(`Unknown restriction node: ${node.name}`);
};

const createTypeSchema = (type: string): Schema => {
    if (type.startsWith("anet:")) {
        return new RefSchema(SchemaName.fromAnet(type));
    }

    return createBaseSchema(type);
};

const createSimpleTypeSchema = (node: XsdNode): Schema => {
    if (node.children.length !== 1) {
        throw new Error("Expected simple type to have exactly one child");
    }

    if (node.children[0].name !== "xs:restriction") {
        throw new Error("Expected simple to to have a restriction child");
    }

    const restrictionsNode = node.children[0];

    if (!("base" in restrictionsNode.attributes)) {
        throw new Error("Restriction is missing base");
    }

    const base = restrictionsNode.attributes.base;
    const isEnum = restrictionsNode.children.some((node) => node.name === "xs:enumeration");

    if (isEnum) {
        return createEnumSchema(base, restrictionsNode);
    }

    let baseSchema = createTypeSchema(base);

    for (const restrictionNode of restrictionsNode.children) {
        baseSchema = applyRestriction(baseSchema, restrictionNode);
    }

    return baseSchema;
};

const applyOccurrence = (node: XsdNode, schema: Schema): Schema => {
    const minOccurs = node.attributes.minOccurs ?? "1";
    const maxOccurs = node.attributes.maxOccurs ?? "1";

    if (minOccurs === "0" && maxOccurs === "1") {
        return new OptionalSchema(schema);
    }

    if (minOccurs === "1" && maxOccurs === "1") {
        return schema;
    }

    const arraySchema = new ArraySchema(schema);
    const min = Number.parseInt(minOccurs, 10);

    if (min > 0) {
        arraySchema.min = min;
    }

    if (maxOccurs !== "unbounded") {
        arraySchema.max = Number.parseInt(maxOccurs, 10);
    }

    return arraySchema;
};

const createChoiceSchema = (node: XsdNode): ChoiceSchema => {
    if (node.children.length === 0) {
        throw new Error("Expected choice to have at least one child");
    }

    const choiceSchema = new ChoiceSchema();

    for (const child of node.children) {
        if (child.name !== "xs:element") {
            throw new Error("Expected choice to only contain xs:element children");
        }

        const sequence = new SequenceSchema();
        sequence.props[child.attributes.name] = applyOccurrence(child, createElementSchema(child));
        choiceSchema.schemas.push(sequence);
    }

    return choiceSchema;
};

const createElementSchema = (node: XsdNode): Schema => {
    if ("type" in node.attributes) {
        if (node.children.length !== 0) {
            throw new Error("Element with type attribute must not have children");
        }

        return createTypeSchema(node.attributes.type);
    }

    if (node.children.length === 0) {
        // Without a type or children, elements default to `xs:anyType`.
        return new UnknownSchema();
    }

    if (node.children.length !== 1) {
        throw new Error("Element with children must have exactly one child");
    }

    const child = node.children[0];

    if (child.name === "xs:simpleType") {
        return createSimpleTypeSchema(child);
    }

    if (child.name === "xs:complexType") {
        return createComplexTypeSchema(child);
    }

    throw new Error(`Unhandled child node: ${child.name}`);
};

const createSequenceSchema = (node: XsdNode): Schema => {
    if (node.children.length === 0) {
        return new SequenceSchema();
    }

    const groups: Schema[] = [];
    let currentSequence = new SequenceSchema();
    groups.push(currentSequence);

    for (const child of node.children) {
        if (child.name === "xs:element") {
            if (!("name" in child.attributes)) {
                throw new Error("Element is missing name attribute");
            }

            currentSequence.props[child.attributes.name] = applyOccurrence(child, createElementSchema(child));
            continue;
        }

        if (child.name === "xs:sequence") {
            groups.push(createSequenceSchema(child));
            currentSequence = new SequenceSchema();
            groups.push(currentSequence);
            continue;
        }

        if (child.name === "xs:choice") {
            groups.push(createChoiceSchema(child));
            currentSequence = new SequenceSchema();
            groups.push(currentSequence);
            continue;
        }

        throw new Error(`Unhandled child node: ${child.name}`);
    }

    const filteredGroups = groups.filter(
        (group) => (group instanceof ChoiceSchema || (group instanceof SequenceSchema && Object.keys(group.props).length > 0)),
    );

    if (filteredGroups.length === 0) {
        return new SequenceSchema();
    }

    if (filteredGroups.length > 1) {
        return new IntersectionSchema(filteredGroups);
    }

    return filteredGroups[0];
};

const createComplexInnerSchema = (node: XsdNode): Schema => {
    if (node.name === "xs:sequence") {
        return createSequenceSchema(node);
    }

    if (node.name === "xs:choice") {
        return createChoiceSchema(node);
    }

    throw new Error(`Unhandled child node: ${node.name}`);
};

const createComplexContentSchema = (node: XsdNode): Schema => {
    if (node.children.length !== 1) {
        throw new Error("Expected complex content to have exactly one child");
    }

    const childNode = node.children[0];

    if (childNode.name !== "xs:extension") {
        throw new Error("Expected complex content to only contain xs:extension children");
    }

    if (!("base" in childNode.attributes)) {
        throw new Error("Extension is missing base attribute");
    }

    const { base } = childNode.attributes;

    // The client handles base request and response schemas separately.
    if (base === "anet:ANetApiRequest" || base === "anet:ANetApiResponse") {
        if (childNode.children.length === 0) {
            return new SequenceSchema();
        }

        if (childNode.children.length !== 1) {
            throw new Error("Expected extension to have exactly one child");
        }

        return createComplexInnerSchema(childNode.children[0]);
    }

    const baseSchema = createTypeSchema(base);

    if (childNode.children.length === 0) {
        return baseSchema;
    }

    if (childNode.children[0].name === "xs:attribute") {
        const attributeNode = childNode.children[0];

        if (baseSchema instanceof RefSchema && baseSchema.name.type === "ArrayOfSetting" && attributeNode.attributes.name === "version") {
            // This is the only occurrence where attributes are merged into a
            // base schema. Instead of bloating up the generator, we opt for
            // manually handling it here.
            const inputSchema = `z.object({
                setting: createMaybeArraySchema(settingSchema, outputSettingSchema),
                version: integerSchema.optional(),
            })`;
            const outputSchema = `z.object({
                items: z.array(outputSettingSchema),
                version: z.number().optional(),
            })`;

            return new CustomSchema(
                `z.codec(
                    ${inputSchema},
                    ${outputSchema},
                    {
                        decode: ({setting, version}) => ({items: setting, version}),
                        encode: ({items, version}) => ({setting: items, version}),
                    },
                )`,
                outputSchema,
            );
        }

        throw new Error(`Encountered unsupported xs:attribute extensions on ${baseSchema.constructor.name}`);
    }

    if (childNode.children.length !== 1) {
        throw new Error("Expected extension to have exactly one child");
    }

    return new IntersectionSchema([baseSchema, createComplexInnerSchema(childNode.children[0])]);
};

const createComplexTypeSchema = (node: XsdNode): Schema => {
    if (node.children.length !== 1) {
        throw new Error("Expected complex type to have exactly one child");
    }

    const childNode = node.children[0];

    if (childNode.name === "xs:complexContent") {
        return createComplexContentSchema(childNode);
    }

    return createComplexInnerSchema(childNode);
};

/**
 * Applies the required-on-success configuration to a schema.
 * Unwraps OptionalSchema for fields that are marked as required on successful responses,
 * making them required in both input and output schemas so validation will fail if missing.
 */
const applyRequiredOnSuccessConfig = (schemaName: SchemaName, schema: Schema): Schema => {
    const typeName = schemaName.type;
    const requiredFields = requiredOnSuccessConfig[typeName];
    
    if (!requiredFields || requiredFields.length === 0) {
        return schema;
    }
    
    // Only apply to SequenceSchema
    if (schema instanceof SequenceSchema) {
        for (const fieldName of requiredFields) {
            const fieldSchema = schema.props[fieldName];
            if (fieldSchema instanceof OptionalSchema) {
                // Unwrap OptionalSchema to make field required in both input and output
                schema.props[fieldName] = fieldSchema.schema;
            }
        }
        return schema;
    }
    
    // For IntersectionSchema, apply to each SequenceSchema in the intersection
    if (schema instanceof IntersectionSchema) {
        for (const innerSchema of schema.schemas) {
            if (innerSchema instanceof SequenceSchema) {
                for (const fieldName of requiredFields) {
                    const fieldSchema = innerSchema.props[fieldName];
                    if (fieldSchema instanceof OptionalSchema) {
                        // Unwrap OptionalSchema to make field required in both input and output
                        innerSchema.props[fieldName] = fieldSchema.schema;
                    }
                }
            }
        }
        return schema;
    }
    
    return schema;
};

const createRootSchema = (node: XsdNode): RootSchema => {
    const schemaName = new SchemaName(node.attributes.name);
    let innerSchema: Schema;

    switch (node.name) {
        case "xs:simpleType":
            innerSchema = createSimpleTypeSchema(node);
            break;

        case "xs:complexType":
            innerSchema = createComplexTypeSchema(node);
            break;

        case "xs:element":
            innerSchema = applyOccurrence(node, createElementSchema(node));
            break;

        default:
            throw new Error(`Unhandled root node: ${node.name}`);
    }

    // Apply required-on-success configuration
    innerSchema = applyRequiredOnSuccessConfig(schemaName, innerSchema);

    return new RootSchema(schemaName, innerSchema);
};

const collectDependencies = (schema: Schema, dependencies: Set<string>): void => {
    if (schema instanceof RefSchema) {
        dependencies.add(schema.name.input);
        dependencies.add(schema.name.output);
    } else if (schema instanceof OptionalSchema) {
        collectDependencies(schema.schema, dependencies);
    } else if (schema instanceof ArraySchema) {
        collectDependencies(schema.inner, dependencies);
    } else if (schema instanceof SequenceSchema) {
        for (const prop of Object.values(schema.props)) {
            collectDependencies(prop, dependencies);
        }
    } else if (schema instanceof ChoiceSchema || schema instanceof IntersectionSchema) {
        for (const s of schema.schemas) {
            collectDependencies(s, dependencies);
        }
    }
};

const sortSchemas = (schemas: RootSchema[]): RootSchema[] => {
    const schemaMap = new Map<string, RootSchema>();

    for (const schema of schemas) {
        schemaMap.set(schema.name.input, schema);
        schemaMap.set(schema.name.output, schema);
    }

    const visited = new Set<string>();
    const visiting = new Set<string>();
    const result: RootSchema[] = [];
    const addedSchemas = new Set<RootSchema>();

    const visit = (name: string): void => {
        if (visited.has(name)) {
            return;
        }

        if (visiting.has(name)) {
            throw new Error(`Circular dependency detected involving "${name}"`);
        }

        const schema = schemaMap.get(name);

        if (!schema) {
            throw new Error(`Unknown dependency "${name}"`);
        }

        visiting.add(name);

        const dependencies = new Set<string>();
        collectDependencies(schema.inner, dependencies);

        for (const dependency of dependencies) {
            visit(dependency);
        }

        visiting.delete(name);
        visited.add(name);

        if (!addedSchemas.has(schema)) {
            addedSchemas.add(schema);
            result.push(schema);
        }
    };

    for (const schema of schemas) {
        visit(schema.name.input);
        visit(schema.name.output);
    }

    return result;
};

const generateSchemas = async (outputPath: string): Promise<void> => {
    const xsdSource = readFileSync(fileURLToPath(new URL("./anetapischema.xsd", import.meta.url)));
    const parser = new XMLParser({
        preserveOrder: true,
        ignoreAttributes: false,
        parseTagValue: false,
        processEntities: false,
        attributeNamePrefix: "",
    });

    const rawXsd = parser.parse(xsdSource) as RawXsdNode[];
    const xsd = transformNodes(rawXsd);
    const root = findNode(xsd, "xs:schema");
    const schemas: RootSchema[] = [];

    for (const node of root.children) {
        schemas.push(createRootSchema(node));
    }

    const sortedSchemas = sortSchemas(schemas);

    let contents = [
        "// AUTO-GENERATED FILE - DO NOT EDIT",
        "//",
        "// This file contains Zod schemas for Authorize.NET API types.",
        "// To regenerate, run: pnpm generate-schemas",
        "",
        'import { z } from "zod";',
        'import { Decimal } from "decimal.js";',
        "import {",
        "    createUnwrapSchema,",
        "    createMaybeArraySchema,",
        "    integerSchema,",
        "    decimalSchema,",
        "    createMinInclusiveCheck,",
        "    createMaxInclusiveCheck,",
        "    createTotalDigitsCheck,",
        "    createFractionDigitsCheck,",
        '} from "./schema-helpers.js";',
        "",
        "",
    ].join("\n");

    const lines = sortedSchemas.map((schema) => schema.toSchemas());
    contents += lines.join("\n\n");
    writeFileSync(outputPath, contents);

    spawnSync("pnpm", ["biome", "check", "--write", outputPath], {
        stdio: "inherit",
    });
};

await generateSchemas(fileURLToPath(new URL("../src/schemas.ts", import.meta.url)));
