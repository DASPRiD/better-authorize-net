import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { z } from "zod";
import {
    createArrayWrapSchema,
    createFractionDigitsCheck,
    createMaxInclusiveCheck,
    createMinInclusiveCheck,
    createTotalDigitsCheck,
    decimalSchema,
    integerSchema,
} from "../src/schema-helpers.js";

describe("schema-helpers", () => {
    describe("createArrayWrapSchema", () => {
        it("should decode a bare array", () => {
            const schema = createArrayWrapSchema(z.string(), z.string(), "item");
            const result = schema.parse(["a", "b"]);
            assert.deepEqual(result, ["a", "b"]);
        });

        it("should decode a wrapped object", () => {
            const schema = createArrayWrapSchema(z.string(), z.string(), "item");
            const result = schema.parse({ item: ["a", "b"] });
            assert.deepEqual(result, ["a", "b"]);
        });

        it("should decode an empty bare array", () => {
            const schema = createArrayWrapSchema(z.string(), z.string(), "item");
            const result = schema.parse([]);
            assert.deepEqual(result, []);
        });

        it("should decode an empty wrapped array", () => {
            const schema = createArrayWrapSchema(z.string(), z.string(), "item");
            const result = schema.parse({ item: [] });
            assert.deepEqual(result, []);
        });

        it("should encode array as wrapped object", () => {
            const schema = createArrayWrapSchema(z.string(), z.string(), "item");
            const result = schema.encode(["a", "b"]);
            assert.deepEqual(result, { item: ["a", "b"] });
        });

        it("should work with codec inner schemas", () => {
            const schema = createArrayWrapSchema(integerSchema, z.number(), "value");

            const decoded = schema.parse(["1", "2", "3"]);
            assert.deepEqual(decoded, [1, 2, 3]);

            const encoded = schema.encode([1, 2, 3]);
            assert.deepEqual(encoded, { value: ["1", "2", "3"] });
        });

        it("should work with complex object schemas", () => {
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

            const schema = createArrayWrapSchema(
                statisticSchema,
                outputStatisticSchema,
                "statistic",
            );

            const input = [
                {
                    accountType: "Visa",
                    chargeAmount: new Decimal("1000.00"),
                    chargeCount: 5,
                },
            ];

            const encoded = schema.encode(input);
            assert.deepEqual(encoded, {
                statistic: [
                    {
                        accountType: "Visa",
                        chargeAmount: "1000",
                        chargeCount: "5",
                    },
                ],
            });

            const decoded = schema.parse([
                {
                    accountType: "Visa",
                    chargeAmount: "1000.00",
                    chargeCount: "5",
                },
            ]);
            assert.deepEqual(decoded, input);
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
});
