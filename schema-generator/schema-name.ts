import { camelCase, pascalCase } from "change-case";

export class SchemaName {
    private readonly camelCase: string;
    private readonly pascalCase: string;

    public constructor(sourceName: string) {
        let name = sourceName
            .replace(/Type$/, "")
            .replace(/Enum$/, "")
            .replace(/Schema$/, "");

        this.camelCase = camelCase(name);
        this.pascalCase = pascalCase(name);
    }

    public static fromAnet(anetName: string): SchemaName {
        return new SchemaName(anetName.slice(5));
    }

    public get input(): string {
        return `${this.camelCase}Schema`;
    }

    public get output(): string {
        return `output${this.pascalCase}Schema`;
    }

    public get type(): string {
        return this.pascalCase;
    }
}
