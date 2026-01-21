import { SchemaName } from "./schema-name.js";

export type Schema = {
    toInputSchema: () => string;
    toOutputSchema: () => string;
};

export class RootSchema {
    name: SchemaName;
    inner: Schema;

    public constructor(name: SchemaName, inner: Schema) {
        this.name = name;
        this.inner = inner;
    }

    public toSchemas(): string {
        return [
            `export const ${this.name.input} = ${this.inner.toInputSchema()};`,
            `const ${this.name.output} = ${this.inner.toOutputSchema()};`,
            `export type ${this.name.type} = z.output<typeof ${this.name.output}>;`,
        ].join("\n");
    }
}

export class RefSchema implements Schema {
    public name: SchemaName;

    public constructor(name: SchemaName) {
        this.name = name;
    }

    public toInputSchema(): string {
        return this.name.input;
    }

    public toOutputSchema(): string {
        return this.name.output;
    }
}

export class UnknownSchema implements Schema {
    public toInputSchema(): string {
        return "z.unknown()";
    }

    public toOutputSchema(): string {
        return "z.unknown()";
    }
}

export class OptionalSchema implements Schema {
    public schema: Schema;

    public constructor(schema: Schema) {
        this.schema = schema;
    }

    public toInputSchema(): string {
        return `${this.schema.toInputSchema()}.optional()`;
    }

    public toOutputSchema(): string {
        return `${this.schema.toOutputSchema()}.optional()`;
    }
}

export class EnumSchema implements Schema {
    public values: string[] = [];

    public constructor(values: string[]) {
        this.values = values;
    }

    public toInputSchema(): string {
        return `z.enum([${this.values.map(value => `"${value}"`).join(", ")}])`;
    }

    public toOutputSchema(): string {
        return `z.enum([${this.values.map(value => `"${value}"`).join(", ")}])`;
    }
}

type StringOptions = {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    length?: number;
};

const applyStringOptions = (code: string, options: StringOptions): string => {
    if (options.pattern !== undefined) {
        code += `.regex(/^${options.pattern}$/)`;
    }

    if (options.minLength !== undefined) {
        code += `.min(${options.minLength})`;
    }

    if (options.maxLength !== undefined) {
        code += `.max(${options.maxLength})`;
    }

    if (options.length !== undefined) {
        code += `.length(${options.length})`;
    }

    return code;
}

export class StringSchema implements Schema, StringOptions {
    public pattern?: string;
    public minLength?: number;
    public maxLength?: number;
    public length?: number;

    public toInputSchema(): string {
        return applyStringOptions("z.string()", this);
    }

    public toOutputSchema(): string {
        return "z.string()";
    }
}

export class StringRefSchema implements Schema, StringOptions {
    public readonly ref: RefSchema;
    public pattern?: string;
    public minLength?: number;
    public maxLength?: number;
    public length?: number;

    public constructor(ref: RefSchema) {
        this.ref = ref;
    }

    public toInputSchema(): string {
        return applyStringOptions(this.ref.toInputSchema(), this);
    }

    public toOutputSchema(): string {
        return "z.string()";
    }
}

export class IntegerSchema implements Schema {
    public min?: number;
    public max?: number;

    public toInputSchema(): string {
        let schema = "integerSchema";

        if (this.min !== undefined) {
            schema += `.check(createMinInclusiveCheck(new Decimal("${this.min}")))`;
        }

        if (this.max !== undefined) {
            schema += `.check(createMaxInclusiveCheck(new Decimal("${this.max}")))`;
        }

        return schema;
    }

    public toOutputSchema(): string {
        return "z.number()";
    }
}

export class DecimalSchema implements Schema {
    public min?: number;
    public max?: number;
    public totalDigits?: number;
    public fractionDigits?: number;

    public toInputSchema(): string {
        let schema = "decimalSchema";

        if (this.min !== undefined) {
            schema += `.check(createMinInclusiveCheck(new Decimal("${this.min}")))`;
        }

        if (this.max !== undefined) {
            schema += `.check(createMaxInclusiveCheck(new Decimal("${this.max}")))`;
        }

        if (this.totalDigits !== undefined) {
            schema += `.check(createTotalDigitsCheck(${this.totalDigits}))`;
        }

        if (this.fractionDigits !== undefined) {
            schema += `.check(createFractionDigitsCheck(${this.fractionDigits}))`;
        }

        return schema;
    }

    public toOutputSchema(): string {
        return "z.instanceof(Decimal)";
    }
}

export class BooleanSchema implements Schema {
    public toInputSchema(): string {
        return "z.boolean()";
    }

    public toOutputSchema(): string {
        return "z.boolean()";
    }
}

export class DateSchema implements Schema {
    public toInputSchema(): string {
        return "z.iso.date()";
    }

    public toOutputSchema(): string {
        return "z.string()";
    }
}

export class DateTimeSchema implements Schema {
    public toInputSchema(): string {
        return "z.iso.datetime()";
    }

    public toOutputSchema(): string {
        return "z.string()";
    }
}

export class ArraySchema implements Schema {
    public inner: Schema;
    public min?: number;
    public max?: number;

    public constructor(inner: Schema) {
        this.inner = inner;
    }

    public toInputSchema(): string {
        const options: string[] = [];

        if (this.min !== undefined && this.min > 0) {
            options.push(`min: ${this.min}`);
        }

        if (this.max !== undefined) {
            options.push(`max: ${this.max}`);
        }

        if (options.length === 0) {
            return `createMaybeArraySchema(${this.inner.toInputSchema()}, ${this.inner.toOutputSchema()})`;
        }

        return `createMaybeArraySchema(${this.inner.toInputSchema()}, ${this.inner.toOutputSchema()}, {${options.join(", ")}})`;
    }

    public toOutputSchema(): string {
        return `z.array(${this.inner.toOutputSchema()})`;
    }
}

export class SequenceSchema implements Schema {
    public props: Record<string, Schema> = {};

    public toInputSchema(): string {
        return this.toSchema("toInputSchema");
    }

    public toOutputSchema(): string {
        return this.toSchema("toOutputSchema");
    }

    private toSchema(fnName: "toInputSchema" | "toOutputSchema"): string {
        const numProps = Object.keys(this.props).length;

        if (numProps === 0) {
            return `z.object({})`;
        }

        if (numProps === 1) {
            const key = Object.keys(this.props)[0];
            const prop = this.props[key];

            if (prop instanceof ArraySchema) {
                if (fnName === "toOutputSchema") {
                    return `z.array(${prop.inner.toOutputSchema()})`;
                }

                return `
                    createUnwrapSchema(
                        ${prop.toInputSchema()},
                        ${prop.toOutputSchema()},
                        "${key}",
                    )
                `;
            }
        }

        return `z.object({${Object.entries(this.props).map(([key, schema]) => `${key}: ${schema[fnName]()}`).join(", ")}})`;
    }
}

export class ChoiceSchema implements Schema {
    public schemas: Schema[] = [];

    public toInputSchema(): string {
        return `z.union([${this.schemas.map(schema => schema.toInputSchema()).join(", ")}])`;
    }

    public toOutputSchema(): string {
        return `z.union([${this.schemas.map(schema => schema.toOutputSchema()).join(", ")}])`;
    }
}

export class IntersectionSchema implements Schema {
    public schemas: Schema[] = [];

    public constructor(schemas: Schema[]) {
        this.schemas = schemas;
    }

    public toInputSchema(): string {
        let schema = this.schemas[0].toInputSchema();

        for (let i = 1; i < this.schemas.length; ++i) {
            schema += `.and(${this.schemas[i].toInputSchema()})`;
        }

        return schema;
    }

    public toOutputSchema(): string {
        let schema = this.schemas[0].toOutputSchema();

        for (let i = 1; i < this.schemas.length; ++i) {
            schema += `.and(${this.schemas[i].toOutputSchema()})`;
        }

        return schema;
    }
}

export class CustomSchema implements Schema {
    private readonly inputSchema: string;
    private readonly outputSchema: string;

    public constructor(inputSchema: string, outputSchema: string) {
        this.inputSchema = inputSchema;
        this.outputSchema = outputSchema;
    }

    public toInputSchema(): string {
        return this.inputSchema;
    }

    public toOutputSchema(): string {
        return this.outputSchema;
    }
}
