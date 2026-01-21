import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { z } from "zod";
import {
    createFractionDigitsCheck,
    createMaxInclusiveCheck,
    createMaybeArraySchema,
    createMinInclusiveCheck,
    createTotalDigitsCheck,
    createUnwrapSchema,
    decimalSchema,
    integerSchema,
} from "../src/schema-helpers.js";

describe("schema-helpers", () => {
    describe("createMaybeArraySchema", () => {
        it("should accept a single item and decode to array", () => {
            const schema = createMaybeArraySchema(z.string(), z.string());
            const result = schema.parse("test");
            assert.deepEqual(result, ["test"]);
        });

        it("should accept an array and decode to array", () => {
            const schema = createMaybeArraySchema(z.string(), z.string());
            const result = schema.parse(["test1", "test2"]);
            assert.deepEqual(result, ["test1", "test2"]);
        });

        it("should encode array as array", () => {
            const schema = createMaybeArraySchema(z.string(), z.string());
            const result = schema.encode(["test1", "test2"]);
            assert.deepEqual(result, ["test1", "test2"]);
        });

        it("should default to empty array when min is 0 or undefined", () => {
            const schema1 = createMaybeArraySchema(z.string(), z.string());
            const result1 = schema1.parse(undefined);
            assert.deepEqual(result1, []);

            const schema2 = createMaybeArraySchema(z.string(), z.string(), { min: 0 });
            const result2 = schema2.parse(undefined);
            assert.deepEqual(result2, []);
        });

        it("should enforce min constraint", () => {
            const schema = createMaybeArraySchema(z.string(), z.string(), { min: 2 });

            assert.throws(() => schema.parse("test"), {
                name: "ZodError",
            });
            assert.throws(() => schema.parse(["test"]), {
                name: "ZodError",
            });

            const result = schema.parse(["test1", "test2"]);
            assert.deepEqual(result, ["test1", "test2"]);
        });

        it("should enforce max constraint", () => {
            const schema = createMaybeArraySchema(z.string(), z.string(), { max: 2 });

            const result1 = schema.parse(["test1", "test2"]);
            assert.deepEqual(result1, ["test1", "test2"]);

            assert.throws(() => schema.parse(["test1", "test2", "test3"]), {
                name: "ZodError",
            });
        });

        it("should work with complex schemas", () => {
            const itemSchema = z.object({
                id: z.number(),
                name: z.string(),
            });
            const outputItemSchema = z.object({
                id: z.number(),
                name: z.string(),
            });
            const schema = createMaybeArraySchema(itemSchema, outputItemSchema);

            const singleResult = schema.parse({ id: 1, name: "test" });
            assert.deepEqual(singleResult, [{ id: 1, name: "test" }]);

            const arrayResult = schema.parse([
                { id: 1, name: "test1" },
                { id: 2, name: "test2" },
            ]);
            assert.deepEqual(arrayResult, [
                { id: 1, name: "test1" },
                { id: 2, name: "test2" },
            ]);
        });
    });

    describe("decimalSchema", () => {
        it("should decode string to Decimal", () => {
            const result = decimalSchema.parse("123.45");
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "123.45");
        });

        it("should decode integer string to Decimal", () => {
            const result = decimalSchema.parse("100");
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "100");
        });

        it("should decode negative number to Decimal", () => {
            const result = decimalSchema.parse("-123.45");
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "-123.45");
        });

        it("should decode zero to Decimal", () => {
            const result = decimalSchema.parse("0");
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "0");
        });

        it("should fail on invalid number string", () => {
            assert.throws(() => decimalSchema.parse("not-a-number"), {
                name: "ZodError",
            });
        });

        it("should encode Decimal to string with correct precision", () => {
            const decimal1 = new Decimal("123.45");
            assert.equal(decimalSchema.encode(decimal1), "123.45");

            const decimal2 = new Decimal("100");
            assert.equal(decimalSchema.encode(decimal2), "100");

            const decimal3 = new Decimal("0.001");
            assert.equal(decimalSchema.encode(decimal3), "0.001");
        });

        it("should handle scientific notation", () => {
            const result = decimalSchema.parse("1.23e5");
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "123000");
        });
    });

    describe("integerSchema", () => {
        it("should decode string to integer", () => {
            const result = integerSchema.parse("123");
            assert.equal(typeof result, "number");
            assert.equal(result, 123);
        });

        it("should decode negative integer string", () => {
            const result = integerSchema.parse("-456");
            assert.equal(result, -456);
        });

        it("should decode zero", () => {
            const result = integerSchema.parse("0");
            assert.equal(result, 0);
        });

        it("should fail on decimal string", () => {
            assert.throws(() => integerSchema.parse("123.45"), {
                name: "ZodError",
            });
        });

        it("should fail on invalid string", () => {
            assert.throws(() => integerSchema.parse("not-a-number"), {
                name: "ZodError",
            });
        });

        it("should encode integer to string", () => {
            assert.equal(integerSchema.encode(123), "123");
            assert.equal(integerSchema.encode(-456), "-456");
            assert.equal(integerSchema.encode(0), "0");
        });
    });

    describe("createMinInclusiveCheck", () => {
        it("should pass for value equal to minimum", () => {
            const schema = z.instanceof(Decimal).check(createMinInclusiveCheck(new Decimal("10")));
            const result = schema.parse(new Decimal("10"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "10");
        });

        it("should pass for value greater than minimum", () => {
            const schema = z.instanceof(Decimal).check(createMinInclusiveCheck(new Decimal("10")));
            const result = schema.parse(new Decimal("20"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "20");
        });

        it("should fail for value less than minimum", () => {
            const schema = z.instanceof(Decimal).check(createMinInclusiveCheck(new Decimal("10")));
            assert.throws(() => schema.parse(new Decimal("5")), {
                name: "ZodError",
            });
        });

        it("should work with number input", () => {
            const schema = z.number().check(createMinInclusiveCheck(new Decimal("10")));
            const result = schema.parse(15);
            assert.equal(result, 15);

            assert.throws(() => schema.parse(5), {
                name: "ZodError",
            });
        });
    });

    describe("createMaxInclusiveCheck", () => {
        it("should pass for value equal to maximum", () => {
            const schema = z.instanceof(Decimal).check(createMaxInclusiveCheck(new Decimal("100")));
            const result = schema.parse(new Decimal("100"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "100");
        });

        it("should pass for value less than maximum", () => {
            const schema = z.instanceof(Decimal).check(createMaxInclusiveCheck(new Decimal("100")));
            const result = schema.parse(new Decimal("50"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "50");
        });

        it("should fail for value greater than maximum", () => {
            const schema = z.instanceof(Decimal).check(createMaxInclusiveCheck(new Decimal("100")));
            assert.throws(() => schema.parse(new Decimal("150")), {
                name: "ZodError",
            });
        });

        it("should work with number input", () => {
            const schema = z.number().check(createMaxInclusiveCheck(new Decimal("100")));
            const result = schema.parse(50);
            assert.equal(result, 50);

            assert.throws(() => schema.parse(150), {
                name: "ZodError",
            });
        });
    });

    describe("createTotalDigitsCheck", () => {
        it("should pass for value with total digits equal to max", () => {
            const schema = z.instanceof(Decimal).check(createTotalDigitsCheck(5));
            const result = schema.parse(new Decimal("123.45"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "123.45");
        });

        it("should pass for value with total digits less than max", () => {
            const schema = z.instanceof(Decimal).check(createTotalDigitsCheck(5));
            const result = schema.parse(new Decimal("12.3"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "12.3");
        });

        it("should fail for value with total digits greater than max", () => {
            const schema = z.instanceof(Decimal).check(createTotalDigitsCheck(5));
            assert.throws(() => schema.parse(new Decimal("123.456")), {
                name: "ZodError",
            });
        });

        it("should count all significant digits", () => {
            const schema = z.instanceof(Decimal).check(createTotalDigitsCheck(3));

            // Should pass: 3 significant digits
            schema.parse(new Decimal("1.23"));

            // Should fail: 4 significant digits
            assert.throws(() => schema.parse(new Decimal("12.34")), {
                name: "ZodError",
            });
        });
    });

    describe("createFractionDigitsCheck", () => {
        it("should pass for value with fraction digits equal to max", () => {
            const schema = z.instanceof(Decimal).check(createFractionDigitsCheck(2));
            const result = schema.parse(new Decimal("123.45"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "123.45");
        });

        it("should pass for value with fraction digits less than max", () => {
            const schema = z.instanceof(Decimal).check(createFractionDigitsCheck(2));
            const result = schema.parse(new Decimal("123.4"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "123.4");
        });

        it("should fail for value with fraction digits greater than max", () => {
            const schema = z.instanceof(Decimal).check(createFractionDigitsCheck(2));
            assert.throws(() => schema.parse(new Decimal("123.456")), {
                name: "ZodError",
            });
        });

        it("should pass for integer (0 fraction digits)", () => {
            const schema = z.instanceof(Decimal).check(createFractionDigitsCheck(2));
            const result = schema.parse(new Decimal("123"));
            assert.ok(result instanceof Decimal);
            assert.equal(result.toString(), "123");
        });
    });

    describe("createUnwrapSchema", () => {
        it("should decode wrapped object to unwrapped value", () => {
            const innerSchema = z.string();
            const outputSchema = z.string();
            const schema = createUnwrapSchema(innerSchema, outputSchema, "data");

            const result = schema.parse({ data: "test-value" });
            assert.equal(result, "test-value");
        });

        it("should encode unwrapped value to wrapped object", () => {
            const innerSchema = z.string();
            const outputSchema = z.string();
            const schema = createUnwrapSchema(innerSchema, outputSchema, "data");

            const result = schema.encode("test-value");
            assert.deepEqual(result, { data: "test-value" });
        });

        it("should work with complex inner schemas", () => {
            const innerSchema = z.object({
                id: z.number(),
                name: z.string(),
            });
            const outputSchema = z.object({
                id: z.number(),
                name: z.string(),
            });
            const schema = createUnwrapSchema(innerSchema, outputSchema, "user");

            const result = schema.parse({
                user: { id: 1, name: "John" },
            });
            assert.deepEqual(result, { id: 1, name: "John" });

            const encoded = schema.encode({ id: 1, name: "John" });
            assert.deepEqual(encoded, {
                user: { id: 1, name: "John" },
            });
        });

        it("should work with array schemas", () => {
            const innerSchema = z.array(z.string());
            const outputSchema = z.array(z.string());
            const schema = createUnwrapSchema(innerSchema, outputSchema, "items");

            const result = schema.parse({
                items: ["a", "b", "c"],
            });
            assert.deepEqual(result, ["a", "b", "c"]);

            const encoded = schema.encode(["a", "b", "c"]);
            assert.deepEqual(encoded, {
                items: ["a", "b", "c"],
            });
        });

        it("should fail on missing wrapper key", () => {
            const innerSchema = z.string();
            const outputSchema = z.string();
            const schema = createUnwrapSchema(innerSchema, outputSchema, "data");

            assert.throws(() => schema.parse({ wrongKey: "test" }), {
                name: "ZodError",
            });
        });
    });

    describe("codec composition in createUnwrapSchema", () => {
        it("should handle codec in object with createUnwrapSchema", () => {
            const statisticSchema = z.object({
                accountType: z.string(),
                chargeAmount: decimalSchema,
                chargeCount: integerSchema,
            });
            const outputStatisticSchema = z.object({
                accountType: z.string(),
                chargeAmount: z.instanceof(Decimal),
                chargeCount: z.number(),
            });

            const wrappedSchema = createUnwrapSchema(
                createMaybeArraySchema(statisticSchema, outputStatisticSchema),
                z.array(outputStatisticSchema),
                "statistic",
            );

            const input = [
                {
                    accountType: "Visa",
                    chargeAmount: new Decimal("1000.00"),
                    chargeCount: 5,
                },
            ];

            const encoded = wrappedSchema.encode(input);
            assert.deepEqual(encoded, {
                statistic: [
                    {
                        accountType: "Visa",
                        chargeAmount: "1000",
                        chargeCount: "5",
                    },
                ],
            });

            const decoded = wrappedSchema.parse({
                statistic: {
                    accountType: "Visa",
                    chargeAmount: "1000.00",
                    chargeCount: "5",
                },
            });

            assert.deepEqual(decoded, input);
        });

        it("should handle codec in nested arrays with createUnwrapSchema", () => {
            const transactionSchema = z.object({
                transId: z.string(),
                submitTimeUTC: z.string(),
                originalAuthAmount: decimalSchema,
            });
            const outputTransactionSchema = z.object({
                transId: z.string(),
                submitTimeUTC: z.string(),
                originalAuthAmount: z.instanceof(Decimal),
            });

            const wrappedSchema = createUnwrapSchema(
                createMaybeArraySchema(transactionSchema, outputTransactionSchema),
                z.array(outputTransactionSchema),
                "transaction",
            );

            const input = [
                {
                    transId: "12345",
                    submitTimeUTC: "2023-01-01T00:00:00Z",
                    originalAuthAmount: new Decimal("50.00"),
                },
                {
                    transId: "67890",
                    submitTimeUTC: "2023-01-02T00:00:00Z",
                    originalAuthAmount: new Decimal("75.00"),
                },
            ];

            const encoded = wrappedSchema.encode(input);
            assert.deepEqual(encoded, {
                transaction: [
                    {
                        transId: "12345",
                        submitTimeUTC: "2023-01-01T00:00:00Z",
                        originalAuthAmount: "50",
                    },
                    {
                        transId: "67890",
                        submitTimeUTC: "2023-01-02T00:00:00Z",
                        originalAuthAmount: "75",
                    },
                ],
            });

            const decoded = wrappedSchema.parse({
                transaction: [
                    {
                        transId: "12345",
                        submitTimeUTC: "2023-01-01T00:00:00Z",
                        originalAuthAmount: "50.00",
                    },
                    {
                        transId: "67890",
                        submitTimeUTC: "2023-01-02T00:00:00Z",
                        originalAuthAmount: "75.00",
                    },
                ],
            });

            assert.deepEqual(decoded, input);
        });
    });
});
