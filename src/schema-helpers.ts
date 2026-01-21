import { Decimal } from "decimal.js";
import { z } from "zod";

export type MaybeArrayOptions = {
    min?: number;
    max?: number;
};

export const createMaybeArraySchema = <TInput, TOutput>(
    inputItemSchema: z.ZodType<TInput>,
    outputItemSchema: z.ZodType<TOutput, TInput>,
    options?: MaybeArrayOptions,
): z.ZodCodec<z.ZodType<TInput | TInput[]>, z.ZodType<TOutput[], TInput[]>> => {
    let inputArraySchema: z.ZodType<TInput[]> = z.array(inputItemSchema);

    if (options?.min !== undefined && options.min > 0) {
        inputArraySchema = (inputArraySchema as unknown as z.ZodArray<z.ZodType<TInput>>).min(
            options.min,
        );
    }

    if (options?.max !== undefined) {
        inputArraySchema = (inputArraySchema as unknown as z.ZodArray<z.ZodType<TInput>>).max(
            options.max,
        );
    }

    if (options?.min === undefined || options.min === 0) {
        inputArraySchema = inputArraySchema.default([]);
    }

    const inputSchema: z.ZodType<TInput | TInput[]> =
        options?.min !== undefined && options.min > 1
            ? inputArraySchema
            : z.union([inputArraySchema, inputItemSchema]);

    return z.codec(inputSchema, z.array(outputItemSchema) as z.ZodType<TOutput[], TInput[]>, {
        decode: (value) => (Array.isArray(value) ? value : [value]),
        encode: (value) => value,
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

export const createUnwrapSchema = <InnerInput, Output, Key extends string>(
    innerInputSchema: z.ZodType<InnerInput>,
    outputSchema: z.ZodType<Output, InnerInput>,
    innerKey: Key,
): z.ZodCodec<z.ZodObject<Record<Key, z.ZodType<InnerInput>>>, z.ZodType<Output, InnerInput>> => {
    const wrapperSchema = z.object({
        [innerKey]: innerInputSchema,
    } as Record<Key, z.ZodType<InnerInput>>);

    return z.codec(wrapperSchema, outputSchema, {
        decode: (value: z.output<typeof wrapperSchema>): z.input<typeof outputSchema> =>
            value[innerKey as unknown as keyof typeof value] as z.input<typeof outputSchema>,
        encode: (value: z.input<typeof outputSchema>): z.output<typeof wrapperSchema> =>
            ({
                [innerKey]: value,
            }) as z.output<typeof wrapperSchema>,
    });
};
