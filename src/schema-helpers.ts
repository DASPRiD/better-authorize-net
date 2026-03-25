import { Decimal } from "decimal.js";
import { z } from "zod";

export const createArrayWrapSchema = <ItemInput, ItemOutput, Key extends string>(
    itemInputSchema: z.ZodType<ItemInput>,
    itemOutputSchema: z.ZodType<ItemOutput>,
    innerKey: Key,
): z.ZodCodec<
    z.ZodUnion<
        readonly [
            z.ZodObject<Record<Key, z.ZodArray<z.ZodType<ItemInput>>>>,
            z.ZodArray<z.ZodType<ItemInput>>,
        ]
    >,
    z.ZodArray<z.ZodType<ItemOutput>>
> => {
    const arrayInputSchema = z.array(itemInputSchema);
    const wrapperSchema = z.object({
        [innerKey]: arrayInputSchema,
    } as Record<Key, z.ZodArray<z.ZodType<ItemInput>>>);
    const inputSchema = z.union([wrapperSchema, arrayInputSchema]);
    const outputSchema = z.array(itemOutputSchema);

    return z.codec(inputSchema, outputSchema, {
        decode: (value): ItemInput[] => {
            if (Array.isArray(value)) {
                return value;
            }
            return value[innerKey as unknown as keyof typeof value] as ItemInput[];
        },
        encode: (value): z.output<typeof wrapperSchema> =>
            ({
                [innerKey]: value,
            }) as z.output<typeof wrapperSchema>,
    });
};

export const decimalSchema = z.codec(z.string(), z.instanceof(Decimal), {
    decode: (value: string, payload): Decimal => {
        try {
            return new Decimal(value);
        } catch {
            payload.issues.push({
                code: "custom",
                message: "Decimal must be a valid number",
                input: value,
            });
            return z.NEVER;
        }
    },
    encode: (value: Decimal): string => value.toFixed(value.decimalPlaces()),
});

export const integerSchema = z.codec(z.string().regex(/^-?\d+$/), z.int(), {
    decode: (value: string): number => Number.parseInt(value, 10),
    encode: (value: number): string => value.toString(),
});

export const createMinInclusiveCheck =
    (minInclusive: Decimal): z.core.CheckFn<Decimal | number> =>
    (input) => {
        const value = input.value instanceof Decimal ? input.value : new Decimal(input.value);

        if (value.comparedTo(minInclusive) < 0) {
            input.issues.push({
                code: "custom",
                message: `Value must be greater than or equal to ${minInclusive}`,
                input: input.value,
            });
        }
    };

export const createMaxInclusiveCheck =
    (maxInclusive: Decimal): z.core.CheckFn<Decimal | number> =>
    (input) => {
        const value = input.value instanceof Decimal ? input.value : new Decimal(input.value);

        if (value.comparedTo(maxInclusive) > 0) {
            input.issues.push({
                code: "custom",
                message: `Value must be less than or equal to ${maxInclusive}`,
                input: input.value,
            });
        }
    };

export const createTotalDigitsCheck =
    (max: number): z.core.CheckFn<Decimal> =>
    (input) => {
        if (input.value.precision() > max) {
            input.issues.push({
                code: "custom",
                message: `Value must not have more than ${max} total digits`,
                input: input.value,
            });
        }
    };

export const createFractionDigitsCheck =
    (max: number): z.core.CheckFn<Decimal> =>
    (input) => {
        if (input.value.decimalPlaces() > max) {
            input.issues.push({
                code: "custom",
                message: `Value must not have more than ${max} fraction digits`,
                input: input.value,
            });
        }
    };
