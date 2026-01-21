import assert from "node:assert";
import { describe, it } from "node:test";
import { OptionalSchema, StringSchema } from "../schema-generator/intermediate.js";

describe("schema-generator", () => {
    describe("OptionalSchema", () => {
        it("should make both input and output optional", () => {
            const schema = new OptionalSchema(new StringSchema());
            assert.strictEqual(schema.toInputSchema(), "z.string().optional()");
            assert.strictEqual(schema.toOutputSchema(), "z.string().optional()");
        });
    });
});
