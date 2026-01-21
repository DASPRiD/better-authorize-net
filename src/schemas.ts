// AUTO-GENERATED FILE - DO NOT EDIT
//
// This file contains Zod schemas for Authorize.NET API types.
// To regenerate, run: pnpm generate-schemas

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
} from "./schema-helpers.js";

export const numericStringSchema = z.string().regex(/^[0-9]+$/);
const outputNumericStringSchema = z.string();
export type NumericString = z.output<typeof outputNumericStringSchema>;

export const alphaNumericStringSchema = z.string().regex(/^[0-9a-zA-Z]+$/);
const outputAlphaNumericStringSchema = z.string();
export type AlphaNumericString = z.output<typeof outputAlphaNumericStringSchema>;

export const alphaNumericSpaceStringSchema = z.string().regex(/^[0-9a-zA-Z\s]+$/);
const outputAlphaNumericSpaceStringSchema = z.string();
export type AlphaNumericSpaceString = z.output<typeof outputAlphaNumericSpaceStringSchema>;

export const arrayOfLongSchema = createUnwrapSchema(
    createMaybeArraySchema(integerSchema, z.number()),
    z.array(z.number()),
    "long",
);
const outputArrayOfLongSchema = z.array(z.number());
export type ArrayOfLong = z.output<typeof outputArrayOfLongSchema>;

export const arrayOfNumericStringSchema = createUnwrapSchema(
    createMaybeArraySchema(numericStringSchema, outputNumericStringSchema),
    z.array(outputNumericStringSchema),
    "numericString",
);
const outputArrayOfNumericStringSchema = z.array(outputNumericStringSchema);
export type ArrayOfNumericString = z.output<typeof outputArrayOfNumericStringSchema>;

export const arrayOfStringSchema = createUnwrapSchema(
    createMaybeArraySchema(z.string(), z.string()),
    z.array(z.string()),
    "string",
);
const outputArrayOfStringSchema = z.array(z.string());
export type ArrayOfString = z.output<typeof outputArrayOfStringSchema>;

export const lineItemSchema = z.object({
    itemId: z.string().min(1).max(31),
    name: z.string().min(1).max(31),
    description: z.string().max(255).optional(),
    quantity: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    unitPrice: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    taxable: z.boolean().optional(),
    unitOfMeasure: z.string().max(12).optional(),
    typeOfSupply: z.string().max(2).optional(),
    taxRate: decimalSchema
        .check(createTotalDigitsCheck(5))
        .check(createFractionDigitsCheck(5))
        .optional(),
    taxAmount: decimalSchema.optional(),
    nationalTax: decimalSchema.optional(),
    localTax: decimalSchema.optional(),
    vatRate: decimalSchema
        .check(createTotalDigitsCheck(5))
        .check(createFractionDigitsCheck(5))
        .optional(),
    alternateTaxId: z.string().max(20).optional(),
    alternateTaxType: z.string().max(4).optional(),
    alternateTaxTypeApplied: z.string().max(4).optional(),
    alternateTaxRate: decimalSchema
        .check(createTotalDigitsCheck(5))
        .check(createFractionDigitsCheck(5))
        .optional(),
    alternateTaxAmount: decimalSchema.optional(),
    totalAmount: decimalSchema.optional(),
    commodityCode: z.string().max(15).optional(),
    productCode: z.string().max(30).optional(),
    productSKU: z.string().max(30).optional(),
    discountRate: decimalSchema
        .check(createTotalDigitsCheck(5))
        .check(createFractionDigitsCheck(5))
        .optional(),
    discountAmount: decimalSchema.optional(),
    taxIncludedInTotal: z.boolean().optional(),
    taxIsAfterDiscount: z.boolean().optional(),
});
const outputLineItemSchema = z.object({
    itemId: z.string(),
    name: z.string(),
    description: z.string().optional(),
    quantity: z.instanceof(Decimal),
    unitPrice: z.instanceof(Decimal),
    taxable: z.boolean().optional(),
    unitOfMeasure: z.string().optional(),
    typeOfSupply: z.string().optional(),
    taxRate: z.instanceof(Decimal).optional(),
    taxAmount: z.instanceof(Decimal).optional(),
    nationalTax: z.instanceof(Decimal).optional(),
    localTax: z.instanceof(Decimal).optional(),
    vatRate: z.instanceof(Decimal).optional(),
    alternateTaxId: z.string().optional(),
    alternateTaxType: z.string().optional(),
    alternateTaxTypeApplied: z.string().optional(),
    alternateTaxRate: z.instanceof(Decimal).optional(),
    alternateTaxAmount: z.instanceof(Decimal).optional(),
    totalAmount: z.instanceof(Decimal).optional(),
    commodityCode: z.string().optional(),
    productCode: z.string().optional(),
    productSKU: z.string().optional(),
    discountRate: z.instanceof(Decimal).optional(),
    discountAmount: z.instanceof(Decimal).optional(),
    taxIncludedInTotal: z.boolean().optional(),
    taxIsAfterDiscount: z.boolean().optional(),
});
export type LineItem = z.output<typeof outputLineItemSchema>;

export const arrayOfLineItemSchema = createUnwrapSchema(
    createMaybeArraySchema(lineItemSchema, outputLineItemSchema),
    z.array(outputLineItemSchema),
    "lineItem",
);
const outputArrayOfLineItemSchema = z.array(outputLineItemSchema);
export type ArrayOfLineItem = z.output<typeof outputArrayOfLineItemSchema>;

export const batchStatisticSchema = z.object({
    accountType: z.string(),
    chargeAmount: decimalSchema,
    chargeCount: integerSchema,
    refundAmount: decimalSchema,
    refundCount: integerSchema,
    voidCount: integerSchema,
    declineCount: integerSchema,
    errorCount: integerSchema,
    returnedItemAmount: decimalSchema.optional(),
    returnedItemCount: integerSchema.optional(),
    chargebackAmount: decimalSchema.optional(),
    chargebackCount: integerSchema.optional(),
    correctionNoticeCount: integerSchema.optional(),
    chargeChargeBackAmount: decimalSchema.optional(),
    chargeChargeBackCount: integerSchema.optional(),
    refundChargeBackAmount: decimalSchema.optional(),
    refundChargeBackCount: integerSchema.optional(),
    chargeReturnedItemsAmount: decimalSchema.optional(),
    chargeReturnedItemsCount: integerSchema.optional(),
    refundReturnedItemsAmount: decimalSchema.optional(),
    refundReturnedItemsCount: integerSchema.optional(),
});
const outputBatchStatisticSchema = z.object({
    accountType: z.string(),
    chargeAmount: z.instanceof(Decimal),
    chargeCount: z.number(),
    refundAmount: z.instanceof(Decimal),
    refundCount: z.number(),
    voidCount: z.number(),
    declineCount: z.number(),
    errorCount: z.number(),
    returnedItemAmount: z.instanceof(Decimal).optional(),
    returnedItemCount: z.number().optional(),
    chargebackAmount: z.instanceof(Decimal).optional(),
    chargebackCount: z.number().optional(),
    correctionNoticeCount: z.number().optional(),
    chargeChargeBackAmount: z.instanceof(Decimal).optional(),
    chargeChargeBackCount: z.number().optional(),
    refundChargeBackAmount: z.instanceof(Decimal).optional(),
    refundChargeBackCount: z.number().optional(),
    chargeReturnedItemsAmount: z.instanceof(Decimal).optional(),
    chargeReturnedItemsCount: z.number().optional(),
    refundReturnedItemsAmount: z.instanceof(Decimal).optional(),
    refundReturnedItemsCount: z.number().optional(),
});
export type BatchStatistic = z.output<typeof outputBatchStatisticSchema>;

export const arrayOfBatchStatisticSchema = createUnwrapSchema(
    createMaybeArraySchema(batchStatisticSchema, outputBatchStatisticSchema),
    z.array(outputBatchStatisticSchema),
    "statistic",
);
const outputArrayOfBatchStatisticSchema = z.array(outputBatchStatisticSchema);
export type ArrayOfBatchStatistic = z.output<typeof outputArrayOfBatchStatisticSchema>;

export const batchDetailsSchema = z.object({
    batchId: numericStringSchema,
    settlementTimeUTC: z.iso.datetime().optional(),
    settlementTimeLocal: z.iso.datetime().optional(),
    settlementState: z.string(),
    paymentMethod: z.string().optional(),
    marketType: z.string().optional(),
    product: z.string().optional(),
    statistics: arrayOfBatchStatisticSchema.optional(),
});
const outputBatchDetailsSchema = z.object({
    batchId: outputNumericStringSchema,
    settlementTimeUTC: z.string().optional(),
    settlementTimeLocal: z.string().optional(),
    settlementState: z.string(),
    paymentMethod: z.string().optional(),
    marketType: z.string().optional(),
    product: z.string().optional(),
    statistics: outputArrayOfBatchStatisticSchema.optional(),
});
export type BatchDetails = z.output<typeof outputBatchDetailsSchema>;

export const arrayOfBatchDetailsSchema = createUnwrapSchema(
    createMaybeArraySchema(batchDetailsSchema, outputBatchDetailsSchema),
    z.array(outputBatchDetailsSchema),
    "batch",
);
const outputArrayOfBatchDetailsSchema = z.array(outputBatchDetailsSchema);
export type ArrayOfBatchDetails = z.output<typeof outputArrayOfBatchDetailsSchema>;

export const subscriptionPaymentSchema = z.object({
    id: integerSchema.check(createMinInclusiveCheck(new Decimal("0"))),
    payNum: integerSchema.check(createMinInclusiveCheck(new Decimal("0"))),
});
const outputSubscriptionPaymentSchema = z.object({ id: z.number(), payNum: z.number() });
export type SubscriptionPayment = z.output<typeof outputSubscriptionPaymentSchema>;

export const arrayOfFraudFilterSchema = createUnwrapSchema(
    createMaybeArraySchema(z.string(), z.string(), { min: 1, max: 1000 }),
    z.array(z.string()),
    "fraudFilter",
);
const outputArrayOfFraudFilterSchema = z.array(z.string());
export type ArrayOfFraudFilter = z.output<typeof outputArrayOfFraudFilterSchema>;

export const fraudInformationSchema = z.object({
    fraudFilterList: arrayOfFraudFilterSchema,
    fraudAction: z.string(),
});
const outputFraudInformationSchema = z.object({
    fraudFilterList: outputArrayOfFraudFilterSchema,
    fraudAction: z.string(),
});
export type FraudInformation = z.output<typeof outputFraudInformationSchema>;

export const customerProfileIdSchema = z.object({
    customerProfileId: numericStringSchema,
    customerPaymentProfileId: numericStringSchema.optional(),
    customerAddressId: numericStringSchema.optional(),
});
const outputCustomerProfileIdSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerPaymentProfileId: outputNumericStringSchema.optional(),
    customerAddressId: outputNumericStringSchema.optional(),
});
export type CustomerProfileId = z.output<typeof outputCustomerProfileIdSchema>;

export const transactionSummarySchema = z.object({
    transId: numericStringSchema,
    submitTimeUTC: z.iso.datetime(),
    submitTimeLocal: z.iso.datetime(),
    transactionStatus: z.string(),
    invoiceNumber: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    accountType: z.string(),
    accountNumber: z.string(),
    settleAmount: decimalSchema,
    marketType: z.string().optional(),
    product: z.string().optional(),
    mobileDeviceId: z.string().optional(),
    subscription: subscriptionPaymentSchema.optional(),
    hasReturnedItems: z.boolean().optional(),
    fraudInformation: fraudInformationSchema.optional(),
    profile: customerProfileIdSchema.optional(),
});
const outputTransactionSummarySchema = z.object({
    transId: outputNumericStringSchema,
    submitTimeUTC: z.string(),
    submitTimeLocal: z.string(),
    transactionStatus: z.string(),
    invoiceNumber: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    accountType: z.string(),
    accountNumber: z.string(),
    settleAmount: z.instanceof(Decimal),
    marketType: z.string().optional(),
    product: z.string().optional(),
    mobileDeviceId: z.string().optional(),
    subscription: outputSubscriptionPaymentSchema.optional(),
    hasReturnedItems: z.boolean().optional(),
    fraudInformation: outputFraudInformationSchema.optional(),
    profile: outputCustomerProfileIdSchema.optional(),
});
export type TransactionSummary = z.output<typeof outputTransactionSummarySchema>;

export const arrayOfTransactionSummarySchema = createUnwrapSchema(
    createMaybeArraySchema(transactionSummarySchema, outputTransactionSummarySchema),
    z.array(outputTransactionSummarySchema),
    "transaction",
);
const outputArrayOfTransactionSummarySchema = z.array(outputTransactionSummarySchema);
export type ArrayOfTransactionSummary = z.output<typeof outputArrayOfTransactionSummarySchema>;

export const arbTransactionSchema = z.object({
    transId: numericStringSchema.optional(),
    response: z.string().optional(),
    submitTimeUTC: z.iso.datetime().optional(),
    payNum: integerSchema.optional(),
    attemptNum: integerSchema.optional(),
});
const outputArbTransactionSchema = z.object({
    transId: outputNumericStringSchema.optional(),
    response: z.string().optional(),
    submitTimeUTC: z.string().optional(),
    payNum: z.number().optional(),
    attemptNum: z.number().optional(),
});
export type ArbTransaction = z.output<typeof outputArbTransactionSchema>;

export const arbTransactionListSchema = createUnwrapSchema(
    createMaybeArraySchema(arbTransactionSchema, outputArbTransactionSchema),
    z.array(outputArbTransactionSchema),
    "arbTransaction",
);
const outputArbTransactionListSchema = z.array(outputArbTransactionSchema);
export type ArbTransactionList = z.output<typeof outputArbTransactionListSchema>;

export const settingSchema = z.object({
    settingName: z.string().optional(),
    settingValue: z.string().optional(),
});
const outputSettingSchema = z.object({
    settingName: z.string().optional(),
    settingValue: z.string().optional(),
});
export type Setting = z.output<typeof outputSettingSchema>;

export const arrayOfSettingSchema = createUnwrapSchema(
    createMaybeArraySchema(settingSchema, outputSettingSchema),
    z.array(outputSettingSchema),
    "setting",
);
const outputArrayOfSettingSchema = z.array(outputSettingSchema);
export type ArrayOfSetting = z.output<typeof outputArrayOfSettingSchema>;

export const fdsFilterSchema = z.object({ name: z.string(), action: z.string() });
const outputFdsFilterSchema = z.object({ name: z.string(), action: z.string() });
export type FdsFilter = z.output<typeof outputFdsFilterSchema>;

export const arrayOfFdsFilterSchema = createUnwrapSchema(
    createMaybeArraySchema(fdsFilterSchema, outputFdsFilterSchema),
    z.array(outputFdsFilterSchema),
    "FDSFilter",
);
const outputArrayOfFdsFilterSchema = z.array(outputFdsFilterSchema);
export type ArrayOfFdsFilter = z.output<typeof outputArrayOfFdsFilterSchema>;

export const permissionSchema = z.object({ permissionName: z.string().optional() });
const outputPermissionSchema = z.object({ permissionName: z.string().optional() });
export type Permission = z.output<typeof outputPermissionSchema>;

export const arrayOfPermissionSchema = createUnwrapSchema(
    createMaybeArraySchema(permissionSchema, outputPermissionSchema),
    z.array(outputPermissionSchema),
    "permission",
);
const outputArrayOfPermissionSchema = z.array(outputPermissionSchema);
export type ArrayOfPermission = z.output<typeof outputArrayOfPermissionSchema>;

export const contactDetailSchema = z.object({
    email: z.string().max(255).optional(),
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
});
const outputContactDetailSchema = z.object({
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});
export type ContactDetail = z.output<typeof outputContactDetailSchema>;

export const arrayOfContactDetailSchema = createUnwrapSchema(
    createMaybeArraySchema(contactDetailSchema, outputContactDetailSchema),
    z.array(outputContactDetailSchema),
    "contactDetail",
);
const outputArrayOfContactDetailSchema = z.array(outputContactDetailSchema);
export type ArrayOfContactDetail = z.output<typeof outputArrayOfContactDetailSchema>;

export const authIndicatorSchema = z.enum(["pre", "final"]);
const outputAuthIndicatorSchema = z.enum(["pre", "final"]);
export type AuthIndicator = z.output<typeof outputAuthIndicatorSchema>;

export const bankAccountTypeSchema = z.enum(["checking", "savings", "businessChecking"]);
const outputBankAccountTypeSchema = z.enum(["checking", "savings", "businessChecking"]);
export type BankAccountType = z.output<typeof outputBankAccountTypeSchema>;

export const echeckTypeSchema = z.enum(["PPD", "WEB", "CCD", "TEL", "ARC", "BOC"]);
const outputEcheckTypeSchema = z.enum(["PPD", "WEB", "CCD", "TEL", "ARC", "BOC"]);
export type EcheckType = z.output<typeof outputEcheckTypeSchema>;

export const paymentMethodSchema = z.enum(["creditCard", "eCheck", "payPal"]);
const outputPaymentMethodSchema = z.enum(["creditCard", "eCheck", "payPal"]);
export type PaymentMethod = z.output<typeof outputPaymentMethodSchema>;

export const cardTypeSchema = z.enum([
    "Visa",
    "MasterCard",
    "AmericanExpress",
    "Discover",
    "JCB",
    "DinersClub",
]);
const outputCardTypeSchema = z.enum([
    "Visa",
    "MasterCard",
    "AmericanExpress",
    "Discover",
    "JCB",
    "DinersClub",
]);
export type CardType = z.output<typeof outputCardTypeSchema>;

export const accountTypeSchema = z.enum([
    "Visa",
    "MasterCard",
    "AmericanExpress",
    "Discover",
    "JCB",
    "DinersClub",
    "eCheck",
]);
const outputAccountTypeSchema = z.enum([
    "Visa",
    "MasterCard",
    "AmericanExpress",
    "Discover",
    "JCB",
    "DinersClub",
    "eCheck",
]);
export type AccountType = z.output<typeof outputAccountTypeSchema>;

export const customerTypeSchema = z.enum(["individual", "business"]);
const outputCustomerTypeSchema = z.enum(["individual", "business"]);
export type CustomerType = z.output<typeof outputCustomerTypeSchema>;

export const arbSubscriptionUnitSchema = z.enum(["days", "months"]);
const outputArbSubscriptionUnitSchema = z.enum(["days", "months"]);
export type ArbSubscriptionUnit = z.output<typeof outputArbSubscriptionUnitSchema>;

export const validationModeSchema = z.enum(["none", "testMode", "liveMode", "oldLiveMode"]);
const outputValidationModeSchema = z.enum(["none", "testMode", "liveMode", "oldLiveMode"]);
export type ValidationMode = z.output<typeof outputValidationModeSchema>;

export const splitTenderStatusSchema = z.enum(["completed", "held", "voided"]);
const outputSplitTenderStatusSchema = z.enum(["completed", "held", "voided"]);
export type SplitTenderStatus = z.output<typeof outputSplitTenderStatusSchema>;

export const arbSubscriptionStatusSchema = z.enum([
    "active",
    "expired",
    "suspended",
    "canceled",
    "terminated",
]);
const outputArbSubscriptionStatusSchema = z.enum([
    "active",
    "expired",
    "suspended",
    "canceled",
    "terminated",
]);
export type ArbSubscriptionStatus = z.output<typeof outputArbSubscriptionStatusSchema>;

export const transactionTypeSchema = z.enum([
    "authOnlyTransaction",
    "authCaptureTransaction",
    "captureOnlyTransaction",
    "refundTransaction",
    "priorAuthCaptureTransaction",
    "voidTransaction",
    "getDetailsTransaction",
    "authOnlyContinueTransaction",
    "authCaptureContinueTransaction",
]);
const outputTransactionTypeSchema = z.enum([
    "authOnlyTransaction",
    "authCaptureTransaction",
    "captureOnlyTransaction",
    "refundTransaction",
    "priorAuthCaptureTransaction",
    "voidTransaction",
    "getDetailsTransaction",
    "authOnlyContinueTransaction",
    "authCaptureContinueTransaction",
]);
export type TransactionType = z.output<typeof outputTransactionTypeSchema>;

export const transactionStatusSchema = z.enum([
    "authorizedPendingCapture",
    "capturedPendingSettlement",
    "communicationError",
    "refundSettledSuccessfully",
    "refundPendingSettlement",
    "approvedReview",
    "declined",
    "couldNotVoid",
    "expired",
    "generalError",
    "pendingFinalSettlement",
    "pendingSettlement",
    "failedReview",
    "settledSuccessfully",
    "settlementError",
    "underReview",
    "updatingSettlement",
    "voided",
    "FDSPendingReview",
    "FDSAuthorizedPendingReview",
    "returnedItem",
    "chargeback",
    "chargebackReversal",
    "authorizedPendingRelease",
]);
const outputTransactionStatusSchema = z.enum([
    "authorizedPendingCapture",
    "capturedPendingSettlement",
    "communicationError",
    "refundSettledSuccessfully",
    "refundPendingSettlement",
    "approvedReview",
    "declined",
    "couldNotVoid",
    "expired",
    "generalError",
    "pendingFinalSettlement",
    "pendingSettlement",
    "failedReview",
    "settledSuccessfully",
    "settlementError",
    "underReview",
    "updatingSettlement",
    "voided",
    "FDSPendingReview",
    "FDSAuthorizedPendingReview",
    "returnedItem",
    "chargeback",
    "chargebackReversal",
    "authorizedPendingRelease",
]);
export type TransactionStatus = z.output<typeof outputTransactionStatusSchema>;

export const settlementStateSchema = z.enum([
    "settledSuccessfully",
    "settlementError",
    "pendingSettlement",
]);
const outputSettlementStateSchema = z.enum([
    "settledSuccessfully",
    "settlementError",
    "pendingSettlement",
]);
export type SettlementState = z.output<typeof outputSettlementStateSchema>;

export const fdsFilterActionSchema = z.enum(["reject", "decline", "hold", "authAndHold", "report"]);
const outputFdsFilterActionSchema = z.enum(["reject", "decline", "hold", "authAndHold", "report"]);
export type FdsFilterAction = z.output<typeof outputFdsFilterActionSchema>;

export const permissionsSchema = z.enum([
    "API_Merchant_BasicReporting",
    "Submit_Charge",
    "Submit_Refund",
    "Submit_Update",
    "Mobile_Admin",
]);
const outputPermissionsSchema = z.enum([
    "API_Merchant_BasicReporting",
    "Submit_Charge",
    "Submit_Refund",
    "Submit_Update",
    "Mobile_Admin",
]);
export type Permissions = z.output<typeof outputPermissionsSchema>;

export const deviceActivationSchema = z.enum(["Activate", "Disable"]);
const outputDeviceActivationSchema = z.enum(["Activate", "Disable"]);
export type DeviceActivation = z.output<typeof outputDeviceActivationSchema>;

export const transactionGroupStatusSchema = z.enum(["any", "pendingApproval"]);
const outputTransactionGroupStatusSchema = z.enum(["any", "pendingApproval"]);
export type TransactionGroupStatus = z.output<typeof outputTransactionGroupStatusSchema>;

export const afdsTransactionSchema = z.enum(["approve", "decline"]);
const outputAfdsTransactionSchema = z.enum(["approve", "decline"]);
export type AfdsTransaction = z.output<typeof outputAfdsTransactionSchema>;

export const customerProfileTypeSchema = z.enum(["regular", "guest"]);
const outputCustomerProfileTypeSchema = z.enum(["regular", "guest"]);
export type CustomerProfileType = z.output<typeof outputCustomerProfileTypeSchema>;

export const driversLicenseSchema = z.object({
    number: z.string().min(5).max(20),
    state: z.string().min(2).max(2),
    dateOfBirth: z.string().min(8).max(10),
});
const outputDriversLicenseSchema = z.object({
    number: z.string(),
    state: z.string(),
    dateOfBirth: z.string(),
});
export type DriversLicense = z.output<typeof outputDriversLicenseSchema>;

export const driversLicenseMaskedSchema = z.object({
    number: z.string().length(8),
    state: z.string().min(2).max(2),
    dateOfBirth: z.string().min(8).max(10),
});
const outputDriversLicenseMaskedSchema = z.object({
    number: z.string(),
    state: z.string(),
    dateOfBirth: z.string(),
});
export type DriversLicenseMasked = z.output<typeof outputDriversLicenseMaskedSchema>;

export const nameAndAddressSchema = z.object({
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    company: z.string().max(50).optional(),
    address: z.string().max(60).optional(),
    city: z.string().max(40).optional(),
    state: z.string().max(40).optional(),
    zip: z.string().max(20).optional(),
    country: z.string().max(60).optional(),
});
const outputNameAndAddressSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    company: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
});
export type NameAndAddress = z.output<typeof outputNameAndAddressSchema>;

export const merchantContactSchema = z.object({
    merchantName: z.string().optional(),
    merchantAddress: z.string().optional(),
    merchantCity: z.string().optional(),
    merchantState: z.string().optional(),
    merchantZip: z.string().optional(),
    merchantPhone: z.string().max(20).optional(),
});
const outputMerchantContactSchema = z.object({
    merchantName: z.string().optional(),
    merchantAddress: z.string().optional(),
    merchantCity: z.string().optional(),
    merchantState: z.string().optional(),
    merchantZip: z.string().optional(),
    merchantPhone: z.string().optional(),
});
export type MerchantContact = z.output<typeof outputMerchantContactSchema>;

export const acceptanceDevicesAccountSchema = z.object({
    accountID: z.string().optional(),
    accountKey: z.string().optional(),
});
const outputAcceptanceDevicesAccountSchema = z.object({
    accountID: z.string().optional(),
    accountKey: z.string().optional(),
});
export type AcceptanceDevicesAccount = z.output<typeof outputAcceptanceDevicesAccountSchema>;

export const transRetailInfoSchema = z.object({
    marketType: z.string().optional(),
    deviceType: z.string().optional(),
    customerSignature: z.string().optional(),
    terminalNumber: z.string().optional(),
});
const outputTransRetailInfoSchema = z.object({
    marketType: z.string().optional(),
    deviceType: z.string().optional(),
    customerSignature: z.string().optional(),
    terminalNumber: z.string().optional(),
});
export type TransRetailInfo = z.output<typeof outputTransRetailInfoSchema>;

export const creditCardSimpleSchema = z.object({
    cardNumber: z.string().min(4).max(16),
    expirationDate: z.string().min(4).max(7),
});
const outputCreditCardSimpleSchema = z.object({
    cardNumber: z.string(),
    expirationDate: z.string(),
});
export type CreditCardSimple = z.output<typeof outputCreditCardSimpleSchema>;

export const creditCardTrackSchema = z.union([
    z.object({ track1: z.string() }),
    z.object({ track2: z.string() }),
]);
const outputCreditCardTrackSchema = z.union([
    z.object({ track1: z.string() }),
    z.object({ track2: z.string() }),
]);
export type CreditCardTrack = z.output<typeof outputCreditCardTrackSchema>;

export const cardCodeSchema = numericStringSchema;
const outputCardCodeSchema = outputNumericStringSchema;
export type CardCode = z.output<typeof outputCardCodeSchema>;

export const creditCardSchema = creditCardSimpleSchema.and(
    z.object({
        cardCode: cardCodeSchema.optional(),
        isPaymentToken: z.boolean().optional(),
        cryptogram: z.string().optional(),
        tokenRequestorName: z.string().optional(),
        tokenRequestorId: z.string().optional(),
        tokenRequestorEci: z.string().optional(),
    }),
);
const outputCreditCardSchema = outputCreditCardSimpleSchema.and(
    z.object({
        cardCode: outputCardCodeSchema.optional(),
        isPaymentToken: z.boolean().optional(),
        cryptogram: z.string().optional(),
        tokenRequestorName: z.string().optional(),
        tokenRequestorId: z.string().optional(),
        tokenRequestorEci: z.string().optional(),
    }),
);
export type CreditCard = z.output<typeof outputCreditCardSchema>;

export const cardArtSchema = z.object({
    cardBrand: z.string().optional(),
    cardImageHeight: z.string().optional(),
    cardImageUrl: z.string().optional(),
    cardImageWidth: z.string().optional(),
    cardType: z.string().optional(),
});
const outputCardArtSchema = z.object({
    cardBrand: z.string().optional(),
    cardImageHeight: z.string().optional(),
    cardImageUrl: z.string().optional(),
    cardImageWidth: z.string().optional(),
    cardType: z.string().optional(),
});
export type CardArt = z.output<typeof outputCardArtSchema>;

export const creditCardMaskedSchema = z.object({
    cardNumber: z.string().length(8),
    expirationDate: z.string().min(4).max(7),
    cardType: z.string().optional(),
    cardArt: cardArtSchema.optional(),
    issuerNumber: z.string().length(6).optional(),
    isPaymentToken: z.boolean().optional(),
});
const outputCreditCardMaskedSchema = z.object({
    cardNumber: z.string(),
    expirationDate: z.string(),
    cardType: z.string().optional(),
    cardArt: outputCardArtSchema.optional(),
    issuerNumber: z.string().optional(),
    isPaymentToken: z.boolean().optional(),
});
export type CreditCardMasked = z.output<typeof outputCreditCardMaskedSchema>;

export const ccAuthenticationSchema = z.object({
    authenticationIndicator: z.string(),
    cardholderAuthenticationValue: z.string(),
});
const outputCcAuthenticationSchema = z.object({
    authenticationIndicator: z.string(),
    cardholderAuthenticationValue: z.string(),
});
export type CcAuthentication = z.output<typeof outputCcAuthenticationSchema>;

export const bankAccountSchema = z.object({
    accountType: bankAccountTypeSchema.optional(),
    routingNumber: z.string().max(9),
    accountNumber: z.string().max(17),
    nameOnAccount: z.string().max(22),
    echeckType: echeckTypeSchema.optional(),
    bankName: z.string().max(50).optional(),
    checkNumber: z.string().max(15).optional(),
});
const outputBankAccountSchema = z.object({
    accountType: outputBankAccountTypeSchema.optional(),
    routingNumber: z.string(),
    accountNumber: z.string(),
    nameOnAccount: z.string(),
    echeckType: outputEcheckTypeSchema.optional(),
    bankName: z.string().optional(),
    checkNumber: z.string().optional(),
});
export type BankAccount = z.output<typeof outputBankAccountSchema>;

export const bankAccountMaskedSchema = z.object({
    accountType: bankAccountTypeSchema.optional(),
    routingNumber: z.string().length(8),
    accountNumber: z.string().length(8),
    nameOnAccount: z.string().max(22),
    echeckType: echeckTypeSchema.optional(),
    bankName: z.string().max(50).optional(),
});
const outputBankAccountMaskedSchema = z.object({
    accountType: outputBankAccountTypeSchema.optional(),
    routingNumber: z.string(),
    accountNumber: z.string(),
    nameOnAccount: z.string(),
    echeckType: outputEcheckTypeSchema.optional(),
    bankName: z.string().optional(),
});
export type BankAccountMasked = z.output<typeof outputBankAccountMaskedSchema>;

export const opaqueDataSchema = z.object({
    dataDescriptor: z.string(),
    dataValue: z.string(),
    dataKey: z.string().optional(),
    expirationTimeStamp: z.iso.datetime().optional(),
});
const outputOpaqueDataSchema = z.object({
    dataDescriptor: z.string(),
    dataValue: z.string(),
    dataKey: z.string().optional(),
    expirationTimeStamp: z.string().optional(),
});
export type OpaqueData = z.output<typeof outputOpaqueDataSchema>;

export const paymentSimpleSchema = z.union([
    z.object({ creditCard: creditCardSimpleSchema }),
    z.object({ bankAccount: bankAccountSchema }),
]);
const outputPaymentSimpleSchema = z.union([
    z.object({ creditCard: outputCreditCardSimpleSchema }),
    z.object({ bankAccount: outputBankAccountSchema }),
]);
export type PaymentSimple = z.output<typeof outputPaymentSimpleSchema>;

export const encodingSchema = z.enum(["Base64", "Hex"]);
const outputEncodingSchema = z.enum(["Base64", "Hex"]);
export type Encoding = z.output<typeof outputEncodingSchema>;

export const encryptionAlgorithmSchema = z.enum(["TDES", "AES", "RSA"]);
const outputEncryptionAlgorithmSchema = z.enum(["TDES", "AES", "RSA"]);
export type EncryptionAlgorithm = z.output<typeof outputEncryptionAlgorithmSchema>;

export const operationSchema = z.enum(["DECRYPT"]);
const outputOperationSchema = z.enum(["DECRYPT"]);
export type Operation = z.output<typeof outputOperationSchema>;

export const keyManagementSchemeSchema = z.object({
    DUKPT: z.object({
        Operation: operationSchema,
        Mode: z.object({ PIN: z.string().optional(), Data: z.string().optional() }),
        DeviceInfo: z.object({ Description: z.string() }),
        EncryptedData: z.object({ Value: z.string() }),
    }),
});
const outputKeyManagementSchemeSchema = z.object({
    DUKPT: z.object({
        Operation: outputOperationSchema,
        Mode: z.object({ PIN: z.string().optional(), Data: z.string().optional() }),
        DeviceInfo: z.object({ Description: z.string() }),
        EncryptedData: z.object({ Value: z.string() }),
    }),
});
export type KeyManagementScheme = z.output<typeof outputKeyManagementSchemeSchema>;

export const keyValueSchema = z.object({
    Encoding: encodingSchema,
    EncryptionAlgorithm: encryptionAlgorithmSchema,
    Scheme: keyManagementSchemeSchema,
});
const outputKeyValueSchema = z.object({
    Encoding: outputEncodingSchema,
    EncryptionAlgorithm: outputEncryptionAlgorithmSchema,
    Scheme: outputKeyManagementSchemeSchema,
});
export type KeyValue = z.output<typeof outputKeyValueSchema>;

export const keyBlockSchema = z.object({ Value: keyValueSchema });
const outputKeyBlockSchema = z.object({ Value: outputKeyValueSchema });
export type KeyBlock = z.output<typeof outputKeyBlockSchema>;

export const encryptedTrackDataSchema = z.object({ FormOfPayment: keyBlockSchema });
const outputEncryptedTrackDataSchema = z.object({ FormOfPayment: outputKeyBlockSchema });
export type EncryptedTrackData = z.output<typeof outputEncryptedTrackDataSchema>;

export const payPalSchema = z.object({
    successUrl: z.string().max(2048).optional(),
    cancelUrl: z.string().max(2048).optional(),
    paypalLc: z.string().max(2).optional(),
    paypalHdrImg: z.string().max(127).optional(),
    paypalPayflowcolor: z.string().max(6).optional(),
    payerID: z.string().max(255).optional(),
});
const outputPayPalSchema = z.object({
    successUrl: z.string().optional(),
    cancelUrl: z.string().optional(),
    paypalLc: z.string().optional(),
    paypalHdrImg: z.string().optional(),
    paypalPayflowcolor: z.string().optional(),
    payerID: z.string().optional(),
});
export type PayPal = z.output<typeof outputPayPalSchema>;

export const paymentEmvSchema = z.object({
    emvData: z.unknown(),
    emvDescriptor: z.unknown(),
    emvVersion: z.unknown(),
});
const outputPaymentEmvSchema = z.object({
    emvData: z.unknown(),
    emvDescriptor: z.unknown(),
    emvVersion: z.unknown(),
});
export type PaymentEmv = z.output<typeof outputPaymentEmvSchema>;

export const paymentSchema = z
    .union([
        z.object({ creditCard: creditCardSchema }),
        z.object({ bankAccount: bankAccountSchema }),
        z.object({ trackData: creditCardTrackSchema }),
        z.object({ encryptedTrackData: encryptedTrackDataSchema }),
        z.object({ payPal: payPalSchema }),
        z.object({ opaqueData: opaqueDataSchema }),
        z.object({ emv: paymentEmvSchema }),
    ])
    .and(z.object({ dataSource: z.string().optional() }));
const outputPaymentSchema = z
    .union([
        z.object({ creditCard: outputCreditCardSchema }),
        z.object({ bankAccount: outputBankAccountSchema }),
        z.object({ trackData: outputCreditCardTrackSchema }),
        z.object({ encryptedTrackData: outputEncryptedTrackDataSchema }),
        z.object({ payPal: outputPayPalSchema }),
        z.object({ opaqueData: outputOpaqueDataSchema }),
        z.object({ emv: outputPaymentEmvSchema }),
    ])
    .and(z.object({ dataSource: z.string().optional() }));
export type Payment = z.output<typeof outputPaymentSchema>;

export const tokenMaskedSchema = z.object({
    tokenSource: z.string().optional(),
    tokenNumber: z.string(),
    expirationDate: z.string().min(4).max(7),
    tokenRequestorId: z.string().optional(),
});
const outputTokenMaskedSchema = z.object({
    tokenSource: z.string().optional(),
    tokenNumber: z.string(),
    expirationDate: z.string(),
    tokenRequestorId: z.string().optional(),
});
export type TokenMasked = z.output<typeof outputTokenMaskedSchema>;

export const paymentMaskedSchema = z.union([
    z.object({ creditCard: creditCardMaskedSchema }),
    z.object({ bankAccount: bankAccountMaskedSchema }),
    z.object({ tokenInformation: tokenMaskedSchema }),
]);
const outputPaymentMaskedSchema = z.union([
    z.object({ creditCard: outputCreditCardMaskedSchema }),
    z.object({ bankAccount: outputBankAccountMaskedSchema }),
    z.object({ tokenInformation: outputTokenMaskedSchema }),
]);
export type PaymentMasked = z.output<typeof outputPaymentMaskedSchema>;

export const orderSchema = z.object({
    invoiceNumber: z.string().max(20).optional(),
    description: z.string().max(255).optional(),
    discountAmount: decimalSchema.optional(),
    taxIsAfterDiscount: z.boolean().optional(),
    totalTaxTypeCode: z.string().max(3).optional(),
    purchaserVATRegistrationNumber: z.string().max(21).optional(),
    merchantVATRegistrationNumber: z.string().max(21).optional(),
    vatInvoiceReferenceNumber: z.string().max(15).optional(),
    purchaserCode: z.string().max(17).optional(),
    summaryCommodityCode: z.string().max(4).optional(),
    purchaseOrderDateUTC: z.iso.date().optional(),
    supplierOrderReference: z.string().max(25).optional(),
    authorizedContactName: z.string().max(36).optional(),
    cardAcceptorRefNumber: z.string().max(25).optional(),
    amexDataTAA1: z.string().max(40).optional(),
    amexDataTAA2: z.string().max(40).optional(),
    amexDataTAA3: z.string().max(40).optional(),
    amexDataTAA4: z.string().max(40).optional(),
});
const outputOrderSchema = z.object({
    invoiceNumber: z.string().optional(),
    description: z.string().optional(),
    discountAmount: z.instanceof(Decimal).optional(),
    taxIsAfterDiscount: z.boolean().optional(),
    totalTaxTypeCode: z.string().optional(),
    purchaserVATRegistrationNumber: z.string().optional(),
    merchantVATRegistrationNumber: z.string().optional(),
    vatInvoiceReferenceNumber: z.string().optional(),
    purchaserCode: z.string().optional(),
    summaryCommodityCode: z.string().optional(),
    purchaseOrderDateUTC: z.string().optional(),
    supplierOrderReference: z.string().optional(),
    authorizedContactName: z.string().optional(),
    cardAcceptorRefNumber: z.string().optional(),
    amexDataTAA1: z.string().optional(),
    amexDataTAA2: z.string().optional(),
    amexDataTAA3: z.string().optional(),
    amexDataTAA4: z.string().optional(),
});
export type Order = z.output<typeof outputOrderSchema>;

export const orderExSchema = orderSchema.and(
    z.object({ purchaseOrderNumber: z.string().max(25).optional() }),
);
const outputOrderExSchema = outputOrderSchema.and(
    z.object({ purchaseOrderNumber: z.string().optional() }),
);
export type OrderEx = z.output<typeof outputOrderExSchema>;

export const customerSchema = z.object({
    type: customerTypeSchema.optional(),
    id: z.string().max(20).optional(),
    email: z.string().max(255).optional(),
    phoneNumber: z.string().max(25).optional(),
    faxNumber: z.string().max(25).optional(),
    driversLicense: driversLicenseSchema.optional(),
    taxId: numericStringSchema.optional(),
});
const outputCustomerSchema = z.object({
    type: outputCustomerTypeSchema.optional(),
    id: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    faxNumber: z.string().optional(),
    driversLicense: outputDriversLicenseSchema.optional(),
    taxId: outputNumericStringSchema.optional(),
});
export type Customer = z.output<typeof outputCustomerSchema>;

export const customerDataSchema = z.object({
    type: customerTypeSchema.optional(),
    id: z.string().max(20).optional(),
    email: z.string().max(255).optional(),
    driversLicense: driversLicenseSchema.optional(),
    taxId: z.string().min(8).max(9).optional(),
});
const outputCustomerDataSchema = z.object({
    type: outputCustomerTypeSchema.optional(),
    id: z.string().optional(),
    email: z.string().optional(),
    driversLicense: outputDriversLicenseSchema.optional(),
    taxId: z.string().optional(),
});
export type CustomerData = z.output<typeof outputCustomerDataSchema>;

export const impersonationAuthenticationSchema = z.object({
    partnerLoginId: z.string().max(25),
    partnerTransactionKey: z.string().max(16),
});
const outputImpersonationAuthenticationSchema = z.object({
    partnerLoginId: z.string(),
    partnerTransactionKey: z.string(),
});
export type ImpersonationAuthentication = z.output<typeof outputImpersonationAuthenticationSchema>;

export const fingerPrintSchema = z.object({
    hashValue: z.string(),
    sequence: z.string().optional(),
    timestamp: z.string(),
    currencyCode: z.string().optional(),
    amount: z.string().optional(),
});
const outputFingerPrintSchema = z.object({
    hashValue: z.string(),
    sequence: z.string().optional(),
    timestamp: z.string(),
    currencyCode: z.string().optional(),
    amount: z.string().optional(),
});
export type FingerPrint = z.output<typeof outputFingerPrintSchema>;

export const merchantAuthenticationSchema = z
    .object({ name: z.string().max(25).optional() })
    .and(
        z.union([
            z.object({ transactionKey: z.string().max(16) }),
            z.object({ sessionToken: z.string().optional() }),
            z.object({ password: z.string().max(40) }),
            z.object({ impersonationAuthentication: impersonationAuthenticationSchema.optional() }),
            z.object({ fingerPrint: fingerPrintSchema.optional() }),
            z.object({ clientKey: z.string().optional() }),
            z.object({ accessToken: z.string().optional() }),
        ]),
    )
    .and(
        z.object({
            mobileDeviceId: z.string().max(60).optional(),
            encPassword: z.string().optional(),
            encMobileDeviceId: z.string().optional(),
        }),
    );
const outputMerchantAuthenticationSchema = z
    .object({ name: z.string().optional() })
    .and(
        z.union([
            z.object({ transactionKey: z.string() }),
            z.object({ sessionToken: z.string().optional() }),
            z.object({ password: z.string() }),
            z.object({
                impersonationAuthentication: outputImpersonationAuthenticationSchema.optional(),
            }),
            z.object({ fingerPrint: outputFingerPrintSchema.optional() }),
            z.object({ clientKey: z.string().optional() }),
            z.object({ accessToken: z.string().optional() }),
        ]),
    )
    .and(
        z.object({
            mobileDeviceId: z.string().optional(),
            encPassword: z.string().optional(),
            encMobileDeviceId: z.string().optional(),
        }),
    );
export type MerchantAuthentication = z.output<typeof outputMerchantAuthenticationSchema>;

export const paymentDetailsSchema = z.object({
    currency: z.string().optional(),
    promoCode: z.string().optional(),
    misc: z.string().optional(),
    giftWrap: z.string().optional(),
    discount: z.string().optional(),
    tax: z.string().optional(),
    shippingHandling: z.string().optional(),
    subTotal: z.string().optional(),
    orderID: z.string().optional(),
    amount: z.string().optional(),
});
const outputPaymentDetailsSchema = z.object({
    currency: z.string().optional(),
    promoCode: z.string().optional(),
    misc: z.string().optional(),
    giftWrap: z.string().optional(),
    discount: z.string().optional(),
    tax: z.string().optional(),
    shippingHandling: z.string().optional(),
    subTotal: z.string().optional(),
    orderID: z.string().optional(),
    amount: z.string().optional(),
});
export type PaymentDetails = z.output<typeof outputPaymentDetailsSchema>;

export const decryptPaymentDataRequestSchema = z.object({
    opaqueData: opaqueDataSchema,
    callId: z.string().optional(),
});
const outputDecryptPaymentDataRequestSchema = z.object({
    opaqueData: outputOpaqueDataSchema,
    callId: z.string().optional(),
});
export type DecryptPaymentDataRequest = z.output<typeof outputDecryptPaymentDataRequestSchema>;

export const customerAddressSchema = nameAndAddressSchema.and(
    z.object({
        phoneNumber: z.string().max(25).optional(),
        faxNumber: z.string().max(25).optional(),
        email: z.string().optional(),
    }),
);
const outputCustomerAddressSchema = outputNameAndAddressSchema.and(
    z.object({
        phoneNumber: z.string().optional(),
        faxNumber: z.string().optional(),
        email: z.string().optional(),
    }),
);
export type CustomerAddress = z.output<typeof outputCustomerAddressSchema>;

export const decryptPaymentDataResponseSchema = z.object({
    shippingInfo: customerAddressSchema.optional(),
    billingInfo: customerAddressSchema.optional(),
    cardInfo: creditCardMaskedSchema.optional(),
    paymentDetails: paymentDetailsSchema.optional(),
});
const outputDecryptPaymentDataResponseSchema = z.object({
    shippingInfo: outputCustomerAddressSchema.optional(),
    billingInfo: outputCustomerAddressSchema.optional(),
    cardInfo: outputCreditCardMaskedSchema.optional(),
    paymentDetails: outputPaymentDetailsSchema.optional(),
});
export type DecryptPaymentDataResponse = z.output<typeof outputDecryptPaymentDataResponseSchema>;

export const webCheckOutTypeSchema = z.enum(["PAN", "TOKEN"]);
const outputWebCheckOutTypeSchema = z.enum(["PAN", "TOKEN"]);
export type WebCheckOutType = z.output<typeof outputWebCheckOutTypeSchema>;

export const webCheckOutDataTypeTokenSchema = z.object({
    cardNumber: z.string().min(4).max(16),
    expirationDate: z.string().min(4).max(7),
    cardCode: cardCodeSchema.optional(),
    zip: z.string().min(1).max(20).optional(),
    fullName: z.string().min(1).max(64).optional(),
});
const outputWebCheckOutDataTypeTokenSchema = z.object({
    cardNumber: z.string(),
    expirationDate: z.string(),
    cardCode: outputCardCodeSchema.optional(),
    zip: z.string().optional(),
    fullName: z.string().optional(),
});
export type WebCheckOutDataTypeToken = z.output<typeof outputWebCheckOutDataTypeTokenSchema>;

export const webCheckOutDataSchema = z.object({
    type: webCheckOutTypeSchema,
    id: z.string().min(1).max(64),
    token: webCheckOutDataTypeTokenSchema.optional(),
    bankToken: bankAccountSchema.optional(),
});
const outputWebCheckOutDataSchema = z.object({
    type: outputWebCheckOutTypeSchema,
    id: z.string(),
    token: outputWebCheckOutDataTypeTokenSchema.optional(),
    bankToken: outputBankAccountSchema.optional(),
});
export type WebCheckOutData = z.output<typeof outputWebCheckOutDataSchema>;

export const securePaymentContainerRequestSchema = z.object({ data: webCheckOutDataSchema });
const outputSecurePaymentContainerRequestSchema = z.object({ data: outputWebCheckOutDataSchema });
export type SecurePaymentContainerRequest = z.output<
    typeof outputSecurePaymentContainerRequestSchema
>;

export const securePaymentContainerResponseSchema = z.object({ opaqueData: opaqueDataSchema });
const outputSecurePaymentContainerResponseSchema = z.object({ opaqueData: outputOpaqueDataSchema });
export type SecurePaymentContainerResponse = z.output<
    typeof outputSecurePaymentContainerResponseSchema
>;

export const securePaymentContainerErrorSchema = z.object({
    code: z.string(),
    description: z.string(),
});
const outputSecurePaymentContainerErrorSchema = z.object({
    code: z.string(),
    description: z.string(),
});
export type SecurePaymentContainerError = z.output<typeof outputSecurePaymentContainerErrorSchema>;

export const paymentScheduleSchema = z.object({
    interval: z
        .object({
            length: integerSchema
                .check(createMinInclusiveCheck(new Decimal("1")))
                .check(createMaxInclusiveCheck(new Decimal("32000"))),
            unit: arbSubscriptionUnitSchema,
        })
        .optional(),
    startDate: z.iso.date().optional(),
    totalOccurrences: integerSchema
        .check(createMinInclusiveCheck(new Decimal("1")))
        .check(createMaxInclusiveCheck(new Decimal("32000")))
        .optional(),
    trialOccurrences: integerSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createMaxInclusiveCheck(new Decimal("32000")))
        .optional(),
});
const outputPaymentScheduleSchema = z.object({
    interval: z.object({ length: z.number(), unit: outputArbSubscriptionUnitSchema }).optional(),
    startDate: z.string().optional(),
    totalOccurrences: z.number().optional(),
    trialOccurrences: z.number().optional(),
});
export type PaymentSchedule = z.output<typeof outputPaymentScheduleSchema>;

export const arbSubscriptionSchema = z.object({
    name: z.string().max(50).optional(),
    paymentSchedule: paymentScheduleSchema.optional(),
    amount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    trialAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    payment: paymentSchema.optional(),
    order: orderSchema.optional(),
    customer: customerSchema.optional(),
    billTo: nameAndAddressSchema.optional(),
    shipTo: nameAndAddressSchema.optional(),
    profile: customerProfileIdSchema.optional(),
});
const outputArbSubscriptionSchema = z.object({
    name: z.string().optional(),
    paymentSchedule: outputPaymentScheduleSchema.optional(),
    amount: z.instanceof(Decimal).optional(),
    trialAmount: z.instanceof(Decimal).optional(),
    payment: outputPaymentSchema.optional(),
    order: outputOrderSchema.optional(),
    customer: outputCustomerSchema.optional(),
    billTo: outputNameAndAddressSchema.optional(),
    shipTo: outputNameAndAddressSchema.optional(),
    profile: outputCustomerProfileIdSchema.optional(),
});
export type ArbSubscription = z.output<typeof outputArbSubscriptionSchema>;

export const customerProfileBaseSchema = z.object({
    merchantCustomerId: z.string().max(20).optional(),
    description: z.string().max(255).optional(),
    email: z.string().max(255).optional(),
});
const outputCustomerProfileBaseSchema = z.object({
    merchantCustomerId: z.string().optional(),
    description: z.string().optional(),
    email: z.string().optional(),
});
export type CustomerProfileBase = z.output<typeof outputCustomerProfileBaseSchema>;

export const customerProfileExSchema = customerProfileBaseSchema.and(
    z.object({ customerProfileId: numericStringSchema.optional() }),
);
const outputCustomerProfileExSchema = outputCustomerProfileBaseSchema.and(
    z.object({ customerProfileId: outputNumericStringSchema.optional() }),
);
export type CustomerProfileEx = z.output<typeof outputCustomerProfileExSchema>;

export const customerPaymentProfileBaseSchema = z.object({
    customerType: customerTypeSchema.optional(),
    billTo: customerAddressSchema.optional(),
});
const outputCustomerPaymentProfileBaseSchema = z.object({
    customerType: outputCustomerTypeSchema.optional(),
    billTo: outputCustomerAddressSchema.optional(),
});
export type CustomerPaymentProfileBase = z.output<typeof outputCustomerPaymentProfileBaseSchema>;

export const subscriptionIdListSchema = createUnwrapSchema(
    createMaybeArraySchema(numericStringSchema, outputNumericStringSchema),
    z.array(outputNumericStringSchema),
    "subscriptionId",
);
const outputSubscriptionIdListSchema = z.array(outputNumericStringSchema);
export type SubscriptionIdList = z.output<typeof outputSubscriptionIdListSchema>;

export const networkTransIdSchema = alphaNumericSpaceStringSchema;
const outputNetworkTransIdSchema = outputAlphaNumericSpaceStringSchema;
export type NetworkTransId = z.output<typeof outputNetworkTransIdSchema>;

export const customerPaymentProfileMaskedSchema = customerPaymentProfileBaseSchema.and(
    z.object({
        customerProfileId: numericStringSchema.optional(),
        customerPaymentProfileId: numericStringSchema,
        defaultPaymentProfile: z.boolean().optional(),
        payment: paymentMaskedSchema.optional(),
        driversLicense: driversLicenseMaskedSchema.optional(),
        taxId: z.string().length(8).optional(),
        subscriptionIds: subscriptionIdListSchema.optional(),
        originalNetworkTransId: networkTransIdSchema.optional(),
        originalAuthAmount: decimalSchema
            .check(createMinInclusiveCheck(new Decimal("0")))
            .check(createFractionDigitsCheck(4))
            .optional(),
        excludeFromAccountUpdater: z.boolean().optional(),
    }),
);
const outputCustomerPaymentProfileMaskedSchema = outputCustomerPaymentProfileBaseSchema.and(
    z.object({
        customerProfileId: outputNumericStringSchema.optional(),
        customerPaymentProfileId: outputNumericStringSchema,
        defaultPaymentProfile: z.boolean().optional(),
        payment: outputPaymentMaskedSchema.optional(),
        driversLicense: outputDriversLicenseMaskedSchema.optional(),
        taxId: z.string().optional(),
        subscriptionIds: outputSubscriptionIdListSchema.optional(),
        originalNetworkTransId: outputNetworkTransIdSchema.optional(),
        originalAuthAmount: z.instanceof(Decimal).optional(),
        excludeFromAccountUpdater: z.boolean().optional(),
    }),
);
export type CustomerPaymentProfileMasked = z.output<
    typeof outputCustomerPaymentProfileMaskedSchema
>;

export const customerAddressExSchema = customerAddressSchema.and(
    z.object({ customerAddressId: numericStringSchema.optional() }),
);
const outputCustomerAddressExSchema = outputCustomerAddressSchema.and(
    z.object({ customerAddressId: outputNumericStringSchema.optional() }),
);
export type CustomerAddressEx = z.output<typeof outputCustomerAddressExSchema>;

export const subscriptionCustomerProfileSchema = customerProfileExSchema.and(
    z.object({
        paymentProfile: customerPaymentProfileMaskedSchema.optional(),
        shippingProfile: customerAddressExSchema.optional(),
    }),
);
const outputSubscriptionCustomerProfileSchema = outputCustomerProfileExSchema.and(
    z.object({
        paymentProfile: outputCustomerPaymentProfileMaskedSchema.optional(),
        shippingProfile: outputCustomerAddressExSchema.optional(),
    }),
);
export type SubscriptionCustomerProfile = z.output<typeof outputSubscriptionCustomerProfileSchema>;

export const arbSubscriptionMaskedSchema = z.object({
    name: z.string().max(50).optional(),
    paymentSchedule: paymentScheduleSchema.optional(),
    amount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    trialAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    status: arbSubscriptionStatusSchema.optional(),
    profile: subscriptionCustomerProfileSchema.optional(),
    order: orderSchema.optional(),
    arbTransactions: arbTransactionListSchema.optional(),
});
const outputArbSubscriptionMaskedSchema = z.object({
    name: z.string().optional(),
    paymentSchedule: outputPaymentScheduleSchema.optional(),
    amount: z.instanceof(Decimal).optional(),
    trialAmount: z.instanceof(Decimal).optional(),
    status: outputArbSubscriptionStatusSchema.optional(),
    profile: outputSubscriptionCustomerProfileSchema.optional(),
    order: outputOrderSchema.optional(),
    arbTransactions: outputArbTransactionListSchema.optional(),
});
export type ArbSubscriptionMasked = z.output<typeof outputArbSubscriptionMaskedSchema>;

export const mobileDeviceSchema = z.object({
    mobileDeviceId: z.string().max(60),
    description: z.string().max(60).optional(),
    phoneNumber: z.string().max(20).optional(),
    devicePlatform: z.string().max(255).optional(),
    deviceActivation: deviceActivationSchema.optional(),
});
const outputMobileDeviceSchema = z.object({
    mobileDeviceId: z.string(),
    description: z.string().optional(),
    phoneNumber: z.string().optional(),
    devicePlatform: z.string().optional(),
    deviceActivation: outputDeviceActivationSchema.optional(),
});
export type MobileDevice = z.output<typeof outputMobileDeviceSchema>;

export const subMerchantSchema = z.object({
    identifier: z.string().max(40),
    doingBusinessAs: z.string().max(50).optional(),
    paymentServiceProviderName: z.string().max(40).optional(),
    paymentServiceFacilitator: z.string().max(20).optional(),
    streetAddress: z.string().max(40).optional(),
    phone: z.string().max(20).optional(),
    email: z.string().max(40).optional(),
    postalCode: z.string().max(20).optional(),
    city: z.string().max(30).optional(),
    regionCode: z.string().max(10).optional(),
    countryCode: z.string().max(10).optional(),
});
const outputSubMerchantSchema = z.object({
    identifier: z.string(),
    doingBusinessAs: z.string().optional(),
    paymentServiceProviderName: z.string().optional(),
    paymentServiceFacilitator: z.string().optional(),
    streetAddress: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    regionCode: z.string().optional(),
    countryCode: z.string().optional(),
});
export type SubMerchant = z.output<typeof outputSubMerchantSchema>;

export const paymentProfileSchema = z.object({
    paymentProfileId: numericStringSchema,
    cardCode: cardCodeSchema.optional(),
});
const outputPaymentProfileSchema = z.object({
    paymentProfileId: outputNumericStringSchema,
    cardCode: outputCardCodeSchema.optional(),
});
export type PaymentProfile = z.output<typeof outputPaymentProfileSchema>;

export const customerProfilePaymentSchema = z.object({
    createProfile: z.boolean().optional(),
    customerProfileId: numericStringSchema.optional(),
    paymentProfile: paymentProfileSchema.optional(),
    shippingProfileId: numericStringSchema.optional(),
});
const outputCustomerProfilePaymentSchema = z.object({
    createProfile: z.boolean().optional(),
    customerProfileId: outputNumericStringSchema.optional(),
    paymentProfile: outputPaymentProfileSchema.optional(),
    shippingProfileId: outputNumericStringSchema.optional(),
});
export type CustomerProfilePayment = z.output<typeof outputCustomerProfilePaymentSchema>;

export const solutionSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    vendorName: z.string().optional(),
});
const outputSolutionSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    vendorName: z.string().optional(),
});
export type Solution = z.output<typeof outputSolutionSchema>;

export const extendedAmountSchema = z.object({
    amount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    name: z.string().max(31).optional(),
    description: z.string().max(255).optional(),
});
const outputExtendedAmountSchema = z.object({
    amount: z.instanceof(Decimal),
    name: z.string().optional(),
    description: z.string().optional(),
});
export type ExtendedAmount = z.output<typeof outputExtendedAmountSchema>;

export const userFieldSchema = z.object({
    name: z.string().optional(),
    value: z.string().optional(),
});
const outputUserFieldSchema = z.object({
    name: z.string().optional(),
    value: z.string().optional(),
});
export type UserField = z.output<typeof outputUserFieldSchema>;

export const processingOptionsSchema = z.object({
    isFirstRecurringPayment: z.boolean().optional(),
    isFirstSubsequentAuth: z.boolean().optional(),
    isSubsequentAuth: z.boolean().optional(),
    isStoredCredentials: z.boolean().optional(),
});
const outputProcessingOptionsSchema = z.object({
    isFirstRecurringPayment: z.boolean().optional(),
    isFirstSubsequentAuth: z.boolean().optional(),
    isSubsequentAuth: z.boolean().optional(),
    isStoredCredentials: z.boolean().optional(),
});
export type ProcessingOptions = z.output<typeof outputProcessingOptionsSchema>;

export const merchantInitTransReasonSchema = z.enum([
    "resubmission",
    "delayedCharge",
    "reauthorization",
    "noShow",
]);
const outputMerchantInitTransReasonSchema = z.enum([
    "resubmission",
    "delayedCharge",
    "reauthorization",
    "noShow",
]);
export type MerchantInitTransReason = z.output<typeof outputMerchantInitTransReasonSchema>;

export const subsequentAuthInformationSchema = z.object({
    originalNetworkTransId: networkTransIdSchema.optional(),
    originalAuthAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    reason: merchantInitTransReasonSchema.optional(),
});
const outputSubsequentAuthInformationSchema = z.object({
    originalNetworkTransId: outputNetworkTransIdSchema.optional(),
    originalAuthAmount: z.instanceof(Decimal).optional(),
    reason: outputMerchantInitTransReasonSchema.optional(),
});
export type SubsequentAuthInformation = z.output<typeof outputSubsequentAuthInformationSchema>;

export const otherTaxSchema = z.object({
    nationalTaxAmount: decimalSchema.optional(),
    localTaxAmount: decimalSchema.optional(),
    alternateTaxAmount: decimalSchema.optional(),
    alternateTaxId: z.string().max(15).optional(),
    vatTaxRate: decimalSchema
        .check(createTotalDigitsCheck(5))
        .check(createFractionDigitsCheck(5))
        .optional(),
    vatTaxAmount: decimalSchema.optional(),
});
const outputOtherTaxSchema = z.object({
    nationalTaxAmount: z.instanceof(Decimal).optional(),
    localTaxAmount: z.instanceof(Decimal).optional(),
    alternateTaxAmount: z.instanceof(Decimal).optional(),
    alternateTaxId: z.string().optional(),
    vatTaxRate: z.instanceof(Decimal).optional(),
    vatTaxAmount: z.instanceof(Decimal).optional(),
});
export type OtherTax = z.output<typeof outputOtherTaxSchema>;

export const authorizationIndicatorSchema = z.object({
    authorizationIndicator: authIndicatorSchema.optional(),
});
const outputAuthorizationIndicatorSchema = z.object({
    authorizationIndicator: outputAuthIndicatorSchema.optional(),
});
export type AuthorizationIndicator = z.output<typeof outputAuthorizationIndicatorSchema>;

export const transactionRequestSchema = z.object({
    transactionType: z.string(),
    amount: decimalSchema.optional(),
    currencyCode: z.string().optional(),
    payment: paymentSchema.optional(),
    profile: customerProfilePaymentSchema.optional(),
    solution: solutionSchema.optional(),
    callId: z.string().optional(),
    terminalNumber: z.string().optional(),
    authCode: z.string().optional(),
    refTransId: z.string().optional(),
    splitTenderId: z.string().optional(),
    order: orderSchema.optional(),
    lineItems: arrayOfLineItemSchema.optional(),
    tax: extendedAmountSchema.optional(),
    duty: extendedAmountSchema.optional(),
    shipping: extendedAmountSchema.optional(),
    taxExempt: z.boolean().optional(),
    poNumber: z.string().optional(),
    customer: customerDataSchema.optional(),
    billTo: customerAddressSchema.optional(),
    shipTo: nameAndAddressSchema.optional(),
    customerIP: z.string().optional(),
    cardholderAuthentication: ccAuthenticationSchema.optional(),
    retail: transRetailInfoSchema.optional(),
    employeeId: z.string().optional(),
    transactionSettings: arrayOfSettingSchema.optional(),
    userFields: createUnwrapSchema(
        createMaybeArraySchema(userFieldSchema, outputUserFieldSchema, { max: 20 }),
        z.array(outputUserFieldSchema),
        "userField",
    ).optional(),
    surcharge: extendedAmountSchema.optional(),
    merchantDescriptor: z.string().optional(),
    subMerchant: subMerchantSchema.optional(),
    tip: extendedAmountSchema.optional(),
    processingOptions: processingOptionsSchema.optional(),
    subsequentAuthInformation: subsequentAuthInformationSchema.optional(),
    otherTax: otherTaxSchema.optional(),
    shipFrom: nameAndAddressSchema.optional(),
    authorizationIndicatorType: authorizationIndicatorSchema.optional(),
    tapToPhone: z.boolean().optional(),
});
const outputTransactionRequestSchema = z.object({
    transactionType: z.string(),
    amount: z.instanceof(Decimal).optional(),
    currencyCode: z.string().optional(),
    payment: outputPaymentSchema.optional(),
    profile: outputCustomerProfilePaymentSchema.optional(),
    solution: outputSolutionSchema.optional(),
    callId: z.string().optional(),
    terminalNumber: z.string().optional(),
    authCode: z.string().optional(),
    refTransId: z.string().optional(),
    splitTenderId: z.string().optional(),
    order: outputOrderSchema.optional(),
    lineItems: outputArrayOfLineItemSchema.optional(),
    tax: outputExtendedAmountSchema.optional(),
    duty: outputExtendedAmountSchema.optional(),
    shipping: outputExtendedAmountSchema.optional(),
    taxExempt: z.boolean().optional(),
    poNumber: z.string().optional(),
    customer: outputCustomerDataSchema.optional(),
    billTo: outputCustomerAddressSchema.optional(),
    shipTo: outputNameAndAddressSchema.optional(),
    customerIP: z.string().optional(),
    cardholderAuthentication: outputCcAuthenticationSchema.optional(),
    retail: outputTransRetailInfoSchema.optional(),
    employeeId: z.string().optional(),
    transactionSettings: outputArrayOfSettingSchema.optional(),
    userFields: z.array(outputUserFieldSchema).optional(),
    surcharge: outputExtendedAmountSchema.optional(),
    merchantDescriptor: z.string().optional(),
    subMerchant: outputSubMerchantSchema.optional(),
    tip: outputExtendedAmountSchema.optional(),
    processingOptions: outputProcessingOptionsSchema.optional(),
    subsequentAuthInformation: outputSubsequentAuthInformationSchema.optional(),
    otherTax: outputOtherTaxSchema.optional(),
    shipFrom: outputNameAndAddressSchema.optional(),
    authorizationIndicatorType: outputAuthorizationIndicatorSchema.optional(),
    tapToPhone: z.boolean().optional(),
});
export type TransactionRequest = z.output<typeof outputTransactionRequestSchema>;

export const settingNameSchema = z.enum([
    "emailCustomer",
    "merchantEmail",
    "allowPartialAuth",
    "headerEmailReceipt",
    "footerEmailReceipt",
    "recurringBilling",
    "duplicateWindow",
    "testRequest",
    "hostedProfileReturnUrl",
    "hostedProfileReturnUrlText",
    "hostedProfilePageBorderVisible",
    "hostedProfileIFrameCommunicatorUrl",
    "hostedProfileHeadingBgColor",
    "hostedProfileValidationMode",
    "hostedProfileBillingAddressRequired",
    "hostedProfileCardCodeRequired",
    "hostedProfileBillingAddressOptions",
    "hostedProfileManageOptions",
    "hostedPaymentIFrameCommunicatorUrl",
    "hostedPaymentButtonOptions",
    "hostedPaymentReturnOptions",
    "hostedPaymentOrderOptions",
    "hostedPaymentPaymentOptions",
    "hostedPaymentBillingAddressOptions",
    "hostedPaymentShippingAddressOptions",
    "hostedPaymentSecurityOptions",
    "hostedPaymentCustomerOptions",
    "hostedPaymentStyleOptions",
    "typeEmailReceipt",
    "hostedProfilePaymentOptions",
    "hostedProfileSaveButtonText",
    "hostedPaymentVisaCheckoutOptions",
]);
const outputSettingNameSchema = z.enum([
    "emailCustomer",
    "merchantEmail",
    "allowPartialAuth",
    "headerEmailReceipt",
    "footerEmailReceipt",
    "recurringBilling",
    "duplicateWindow",
    "testRequest",
    "hostedProfileReturnUrl",
    "hostedProfileReturnUrlText",
    "hostedProfilePageBorderVisible",
    "hostedProfileIFrameCommunicatorUrl",
    "hostedProfileHeadingBgColor",
    "hostedProfileValidationMode",
    "hostedProfileBillingAddressRequired",
    "hostedProfileCardCodeRequired",
    "hostedProfileBillingAddressOptions",
    "hostedProfileManageOptions",
    "hostedPaymentIFrameCommunicatorUrl",
    "hostedPaymentButtonOptions",
    "hostedPaymentReturnOptions",
    "hostedPaymentOrderOptions",
    "hostedPaymentPaymentOptions",
    "hostedPaymentBillingAddressOptions",
    "hostedPaymentShippingAddressOptions",
    "hostedPaymentSecurityOptions",
    "hostedPaymentCustomerOptions",
    "hostedPaymentStyleOptions",
    "typeEmailReceipt",
    "hostedProfilePaymentOptions",
    "hostedProfileSaveButtonText",
    "hostedPaymentVisaCheckoutOptions",
]);
export type SettingName = z.output<typeof outputSettingNameSchema>;

export const emvTagSchema = z.object({
    name: z.string().optional(),
    value: z.string().optional(),
    formatted: z.string().optional(),
});
const outputEmvTagSchema = z.object({
    name: z.string().optional(),
    value: z.string().optional(),
    formatted: z.string().optional(),
});
export type EmvTag = z.output<typeof outputEmvTagSchema>;

export const customerPaymentProfileSchema = customerPaymentProfileBaseSchema.and(
    z.object({
        payment: paymentSchema.optional(),
        driversLicense: driversLicenseSchema.optional(),
        taxId: z.string().min(8).max(9).optional(),
        defaultPaymentProfile: z.boolean().optional(),
        subsequentAuthInformation: subsequentAuthInformationSchema.optional(),
        excludeFromAccountUpdater: z.boolean().optional(),
    }),
);
const outputCustomerPaymentProfileSchema = outputCustomerPaymentProfileBaseSchema.and(
    z.object({
        payment: outputPaymentSchema.optional(),
        driversLicense: outputDriversLicenseSchema.optional(),
        taxId: z.string().optional(),
        defaultPaymentProfile: z.boolean().optional(),
        subsequentAuthInformation: outputSubsequentAuthInformationSchema.optional(),
        excludeFromAccountUpdater: z.boolean().optional(),
    }),
);
export type CustomerPaymentProfile = z.output<typeof outputCustomerPaymentProfileSchema>;

export const customerPaymentProfileExSchema = customerPaymentProfileSchema.and(
    z.object({ customerPaymentProfileId: numericStringSchema.optional() }),
);
const outputCustomerPaymentProfileExSchema = outputCustomerPaymentProfileSchema.and(
    z.object({ customerPaymentProfileId: outputNumericStringSchema.optional() }),
);
export type CustomerPaymentProfileEx = z.output<typeof outputCustomerPaymentProfileExSchema>;

export const customerProfileSchema = customerProfileBaseSchema.and(
    z.object({
        paymentProfiles: createMaybeArraySchema(
            customerPaymentProfileSchema,
            outputCustomerPaymentProfileSchema,
        ),
        shipToList: createMaybeArraySchema(customerAddressSchema, outputCustomerAddressSchema),
        profileType: customerProfileTypeSchema.optional(),
    }),
);
const outputCustomerProfileSchema = outputCustomerProfileBaseSchema.and(
    z.object({
        paymentProfiles: z.array(outputCustomerPaymentProfileSchema),
        shipToList: z.array(outputCustomerAddressSchema),
        profileType: outputCustomerProfileTypeSchema.optional(),
    }),
);
export type CustomerProfile = z.output<typeof outputCustomerProfileSchema>;

export const customerProfileInfoExSchema = customerProfileExSchema.and(
    z.object({ profileType: customerProfileTypeSchema.optional() }),
);
const outputCustomerProfileInfoExSchema = outputCustomerProfileExSchema.and(
    z.object({ profileType: outputCustomerProfileTypeSchema.optional() }),
);
export type CustomerProfileInfoEx = z.output<typeof outputCustomerProfileInfoExSchema>;

export const customerProfileMaskedSchema = customerProfileExSchema.and(
    z.object({
        paymentProfiles: createMaybeArraySchema(
            customerPaymentProfileMaskedSchema,
            outputCustomerPaymentProfileMaskedSchema,
        ),
        shipToList: createMaybeArraySchema(customerAddressExSchema, outputCustomerAddressExSchema),
        profileType: customerProfileTypeSchema.optional(),
    }),
);
const outputCustomerProfileMaskedSchema = outputCustomerProfileExSchema.and(
    z.object({
        paymentProfiles: z.array(outputCustomerPaymentProfileMaskedSchema),
        shipToList: z.array(outputCustomerAddressExSchema),
        profileType: outputCustomerProfileTypeSchema.optional(),
    }),
);
export type CustomerProfileMasked = z.output<typeof outputCustomerProfileMaskedSchema>;

export const profileTransAmountSchema = z.object({
    amount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    tax: extendedAmountSchema.optional(),
    shipping: extendedAmountSchema.optional(),
    duty: extendedAmountSchema.optional(),
    lineItems: createMaybeArraySchema(lineItemSchema, outputLineItemSchema, { max: 30 }),
});
const outputProfileTransAmountSchema = z.object({
    amount: z.instanceof(Decimal),
    tax: outputExtendedAmountSchema.optional(),
    shipping: outputExtendedAmountSchema.optional(),
    duty: outputExtendedAmountSchema.optional(),
    lineItems: z.array(outputLineItemSchema),
});
export type ProfileTransAmount = z.output<typeof outputProfileTransAmountSchema>;

export const profileTransOrderSchema = profileTransAmountSchema.and(
    z.object({
        customerProfileId: numericStringSchema,
        customerPaymentProfileId: numericStringSchema,
        customerShippingAddressId: numericStringSchema.optional(),
        order: orderExSchema.optional(),
        taxExempt: z.boolean().optional(),
        recurringBilling: z.boolean().optional(),
        cardCode: cardCodeSchema.optional(),
        splitTenderId: numericStringSchema.optional(),
        processingOptions: processingOptionsSchema.optional(),
        subsequentAuthInformation: subsequentAuthInformationSchema.optional(),
        authorizationIndicatorType: authorizationIndicatorSchema.optional(),
    }),
);
const outputProfileTransOrderSchema = outputProfileTransAmountSchema.and(
    z.object({
        customerProfileId: outputNumericStringSchema,
        customerPaymentProfileId: outputNumericStringSchema,
        customerShippingAddressId: outputNumericStringSchema.optional(),
        order: outputOrderExSchema.optional(),
        taxExempt: z.boolean().optional(),
        recurringBilling: z.boolean().optional(),
        cardCode: outputCardCodeSchema.optional(),
        splitTenderId: outputNumericStringSchema.optional(),
        processingOptions: outputProcessingOptionsSchema.optional(),
        subsequentAuthInformation: outputSubsequentAuthInformationSchema.optional(),
        authorizationIndicatorType: outputAuthorizationIndicatorSchema.optional(),
    }),
);
export type ProfileTransOrder = z.output<typeof outputProfileTransOrderSchema>;

export const profileTransAuthCaptureSchema = profileTransOrderSchema;
const outputProfileTransAuthCaptureSchema = outputProfileTransOrderSchema;
export type ProfileTransAuthCapture = z.output<typeof outputProfileTransAuthCaptureSchema>;

export const profileTransAuthOnlySchema = profileTransOrderSchema;
const outputProfileTransAuthOnlySchema = outputProfileTransOrderSchema;
export type ProfileTransAuthOnly = z.output<typeof outputProfileTransAuthOnlySchema>;

export const profileTransPriorAuthCaptureSchema = profileTransAmountSchema.and(
    z.object({
        customerProfileId: numericStringSchema.optional(),
        customerPaymentProfileId: numericStringSchema.optional(),
        customerShippingAddressId: numericStringSchema.optional(),
        transId: numericStringSchema,
    }),
);
const outputProfileTransPriorAuthCaptureSchema = outputProfileTransAmountSchema.and(
    z.object({
        customerProfileId: outputNumericStringSchema.optional(),
        customerPaymentProfileId: outputNumericStringSchema.optional(),
        customerShippingAddressId: outputNumericStringSchema.optional(),
        transId: outputNumericStringSchema,
    }),
);
export type ProfileTransPriorAuthCapture = z.output<
    typeof outputProfileTransPriorAuthCaptureSchema
>;

export const profileTransCaptureOnlySchema = profileTransOrderSchema.and(
    z.object({ approvalCode: z.string().max(6) }),
);
const outputProfileTransCaptureOnlySchema = outputProfileTransOrderSchema.and(
    z.object({ approvalCode: z.string() }),
);
export type ProfileTransCaptureOnly = z.output<typeof outputProfileTransCaptureOnlySchema>;

export const profileTransRefundSchema = profileTransAmountSchema.and(
    z.object({
        customerProfileId: numericStringSchema.optional(),
        customerPaymentProfileId: numericStringSchema.optional(),
        customerShippingAddressId: numericStringSchema.optional(),
        creditCardNumberMasked: z.string().min(8).max(8).optional(),
        bankRoutingNumberMasked: z.string().min(8).max(8).optional(),
        bankAccountNumberMasked: z.string().min(8).max(8).optional(),
        order: orderExSchema.optional(),
        transId: numericStringSchema.optional(),
    }),
);
const outputProfileTransRefundSchema = outputProfileTransAmountSchema.and(
    z.object({
        customerProfileId: outputNumericStringSchema.optional(),
        customerPaymentProfileId: outputNumericStringSchema.optional(),
        customerShippingAddressId: outputNumericStringSchema.optional(),
        creditCardNumberMasked: z.string().optional(),
        bankRoutingNumberMasked: z.string().optional(),
        bankAccountNumberMasked: z.string().optional(),
        order: outputOrderExSchema.optional(),
        transId: outputNumericStringSchema.optional(),
    }),
);
export type ProfileTransRefund = z.output<typeof outputProfileTransRefundSchema>;

export const profileTransVoidSchema = z.object({
    customerProfileId: numericStringSchema.optional(),
    customerPaymentProfileId: numericStringSchema.optional(),
    customerShippingAddressId: numericStringSchema.optional(),
    transId: numericStringSchema,
});
const outputProfileTransVoidSchema = z.object({
    customerProfileId: outputNumericStringSchema.optional(),
    customerPaymentProfileId: outputNumericStringSchema.optional(),
    customerShippingAddressId: outputNumericStringSchema.optional(),
    transId: outputNumericStringSchema,
});
export type ProfileTransVoid = z.output<typeof outputProfileTransVoidSchema>;

export const profileTransactionSchema = z.union([
    z.object({ profileTransAuthCapture: profileTransAuthCaptureSchema }),
    z.object({ profileTransAuthOnly: profileTransAuthOnlySchema }),
    z.object({ profileTransPriorAuthCapture: profileTransPriorAuthCaptureSchema }),
    z.object({ profileTransCaptureOnly: profileTransCaptureOnlySchema }),
    z.object({ profileTransRefund: profileTransRefundSchema }),
    z.object({ profileTransVoid: profileTransVoidSchema }),
]);
const outputProfileTransactionSchema = z.union([
    z.object({ profileTransAuthCapture: outputProfileTransAuthCaptureSchema }),
    z.object({ profileTransAuthOnly: outputProfileTransAuthOnlySchema }),
    z.object({ profileTransPriorAuthCapture: outputProfileTransPriorAuthCaptureSchema }),
    z.object({ profileTransCaptureOnly: outputProfileTransCaptureOnlySchema }),
    z.object({ profileTransRefund: outputProfileTransRefundSchema }),
    z.object({ profileTransVoid: outputProfileTransVoidSchema }),
]);
export type ProfileTransaction = z.output<typeof outputProfileTransactionSchema>;

export const returnedItemSchema = z.object({
    id: numericStringSchema,
    dateUTC: z.iso.datetime(),
    dateLocal: z.iso.datetime(),
    code: z.string(),
    description: z.string(),
});
const outputReturnedItemSchema = z.object({
    id: outputNumericStringSchema,
    dateUTC: z.string(),
    dateLocal: z.string(),
    code: z.string(),
    description: z.string(),
});
export type ReturnedItem = z.output<typeof outputReturnedItemSchema>;

export const arrayOfReturnedItemSchema = createUnwrapSchema(
    createMaybeArraySchema(returnedItemSchema, outputReturnedItemSchema),
    z.array(outputReturnedItemSchema),
    "returnedItem",
);
const outputArrayOfReturnedItemSchema = z.array(outputReturnedItemSchema);
export type ArrayOfReturnedItem = z.output<typeof outputArrayOfReturnedItemSchema>;

export const merchantAdviceSchema = z.object({
    code: alphaNumericSpaceStringSchema,
    description: z.string().optional(),
});
const outputMerchantAdviceSchema = z.object({
    code: outputAlphaNumericSpaceStringSchema,
    description: z.string().optional(),
});
export type MerchantAdvice = z.output<typeof outputMerchantAdviceSchema>;

export const transactionDetailsSchema = z.object({
    transId: numericStringSchema,
    refTransId: numericStringSchema.optional(),
    splitTenderId: numericStringSchema.optional(),
    submitTimeUTC: z.iso.datetime(),
    submitTimeLocal: z.iso.datetime(),
    transactionType: z.string(),
    transactionStatus: z.string(),
    responseCode: integerSchema,
    responseReasonCode: integerSchema,
    subscription: subscriptionPaymentSchema.optional(),
    responseReasonDescription: z.string(),
    authCode: z.string().max(6).optional(),
    AVSResponse: z.string().max(1).optional(),
    cardCodeResponse: z.string().max(1).optional(),
    CAVVResponse: z.string().max(1).optional(),
    FDSFilterAction: z.string().optional(),
    FDSFilters: arrayOfFdsFilterSchema.optional(),
    batch: batchDetailsSchema.optional(),
    order: orderExSchema.optional(),
    requestedAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    authAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    settleAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    tax: extendedAmountSchema.optional(),
    shipping: extendedAmountSchema.optional(),
    duty: extendedAmountSchema.optional(),
    lineItems: arrayOfLineItemSchema.optional(),
    prepaidBalanceRemaining: decimalSchema.check(createFractionDigitsCheck(4)).optional(),
    taxExempt: z.boolean().optional(),
    payment: paymentMaskedSchema,
    customer: customerDataSchema.optional(),
    billTo: customerAddressSchema.optional(),
    shipTo: nameAndAddressSchema.optional(),
    recurringBilling: z.boolean().optional(),
    customerIP: z.string().optional(),
    product: z.string().optional(),
    entryMode: z.string().optional(),
    marketType: z.string().optional(),
    mobileDeviceId: z.string().optional(),
    customerSignature: z.string().optional(),
    returnedItems: arrayOfReturnedItemSchema.optional(),
    solution: solutionSchema.optional(),
    emvDetails: createUnwrapSchema(
        createMaybeArraySchema(
            z.object({ tagId: z.string(), data: z.string() }),
            z.object({ tagId: z.string(), data: z.string() }),
            { min: 1 },
        ),
        z.array(z.object({ tagId: z.string(), data: z.string() })),
        "tag",
    ).optional(),
    profile: customerProfileIdSchema.optional(),
    surcharge: extendedAmountSchema.optional(),
    employeeId: z.string().optional(),
    tip: extendedAmountSchema.optional(),
    otherTax: otherTaxSchema.optional(),
    shipFrom: nameAndAddressSchema.optional(),
    networkTransId: networkTransIdSchema.optional(),
    originalNetworkTransId: networkTransIdSchema.optional(),
    originalAuthAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    authorizationIndicator: z.string().optional(),
    merchantAdvice: merchantAdviceSchema.optional(),
    tapToPhone: z.boolean(),
});
const outputTransactionDetailsSchema = z.object({
    transId: outputNumericStringSchema,
    refTransId: outputNumericStringSchema.optional(),
    splitTenderId: outputNumericStringSchema.optional(),
    submitTimeUTC: z.string(),
    submitTimeLocal: z.string(),
    transactionType: z.string(),
    transactionStatus: z.string(),
    responseCode: z.number(),
    responseReasonCode: z.number(),
    subscription: outputSubscriptionPaymentSchema.optional(),
    responseReasonDescription: z.string(),
    authCode: z.string().optional(),
    AVSResponse: z.string().optional(),
    cardCodeResponse: z.string().optional(),
    CAVVResponse: z.string().optional(),
    FDSFilterAction: z.string().optional(),
    FDSFilters: outputArrayOfFdsFilterSchema.optional(),
    batch: outputBatchDetailsSchema.optional(),
    order: outputOrderExSchema.optional(),
    requestedAmount: z.instanceof(Decimal).optional(),
    authAmount: z.instanceof(Decimal),
    settleAmount: z.instanceof(Decimal),
    tax: outputExtendedAmountSchema.optional(),
    shipping: outputExtendedAmountSchema.optional(),
    duty: outputExtendedAmountSchema.optional(),
    lineItems: outputArrayOfLineItemSchema.optional(),
    prepaidBalanceRemaining: z.instanceof(Decimal).optional(),
    taxExempt: z.boolean().optional(),
    payment: outputPaymentMaskedSchema,
    customer: outputCustomerDataSchema.optional(),
    billTo: outputCustomerAddressSchema.optional(),
    shipTo: outputNameAndAddressSchema.optional(),
    recurringBilling: z.boolean().optional(),
    customerIP: z.string().optional(),
    product: z.string().optional(),
    entryMode: z.string().optional(),
    marketType: z.string().optional(),
    mobileDeviceId: z.string().optional(),
    customerSignature: z.string().optional(),
    returnedItems: outputArrayOfReturnedItemSchema.optional(),
    solution: outputSolutionSchema.optional(),
    emvDetails: z.array(z.object({ tagId: z.string(), data: z.string() })).optional(),
    profile: outputCustomerProfileIdSchema.optional(),
    surcharge: outputExtendedAmountSchema.optional(),
    employeeId: z.string().optional(),
    tip: outputExtendedAmountSchema.optional(),
    otherTax: outputOtherTaxSchema.optional(),
    shipFrom: outputNameAndAddressSchema.optional(),
    networkTransId: outputNetworkTransIdSchema.optional(),
    originalNetworkTransId: outputNetworkTransIdSchema.optional(),
    originalAuthAmount: z.instanceof(Decimal).optional(),
    authorizationIndicator: z.string().optional(),
    merchantAdvice: outputMerchantAdviceSchema.optional(),
    tapToPhone: z.boolean(),
});
export type TransactionDetails = z.output<typeof outputTransactionDetailsSchema>;

export const transactionResponseSchema = z.object({
    responseCode: z.string().optional(),
    rawResponseCode: z.string().optional(),
    authCode: z.string().optional(),
    avsResultCode: z.string().optional(),
    cvvResultCode: z.string().optional(),
    cavvResultCode: z.string().optional(),
    transId: z.string().optional(),
    refTransID: z.string().optional(),
    transHash: z.string().optional(),
    testRequest: z.string().optional(),
    accountNumber: z.string().optional(),
    entryMode: z.string().optional(),
    accountType: z.string().optional(),
    splitTenderId: z.string().optional(),
    prePaidCard: z
        .object({
            requestedAmount: z.string().optional(),
            approvedAmount: z.string().optional(),
            balanceOnCard: z.string().optional(),
        })
        .optional(),
    messages: createUnwrapSchema(
        createMaybeArraySchema(
            z.object({ code: z.string().optional(), description: z.string().optional() }),
            z.object({ code: z.string().optional(), description: z.string().optional() }),
        ),
        z.array(z.object({ code: z.string().optional(), description: z.string().optional() })),
        "message",
    ).optional(),
    errors: createUnwrapSchema(
        createMaybeArraySchema(
            z.object({ errorCode: z.string().optional(), errorText: z.string().optional() }),
            z.object({ errorCode: z.string().optional(), errorText: z.string().optional() }),
        ),
        z.array(z.object({ errorCode: z.string().optional(), errorText: z.string().optional() })),
        "error",
    ).optional(),
    splitTenderPayments: createUnwrapSchema(
        createMaybeArraySchema(
            z.object({
                transId: z.string().optional(),
                responseCode: z.string().optional(),
                responseToCustomer: z.string().optional(),
                authCode: z.string().optional(),
                accountNumber: z.string().optional(),
                accountType: z.string().optional(),
                requestedAmount: z.string().optional(),
                approvedAmount: z.string().optional(),
                balanceOnCard: z.string().optional(),
            }),
            z.object({
                transId: z.string().optional(),
                responseCode: z.string().optional(),
                responseToCustomer: z.string().optional(),
                authCode: z.string().optional(),
                accountNumber: z.string().optional(),
                accountType: z.string().optional(),
                requestedAmount: z.string().optional(),
                approvedAmount: z.string().optional(),
                balanceOnCard: z.string().optional(),
            }),
        ),
        z.array(
            z.object({
                transId: z.string().optional(),
                responseCode: z.string().optional(),
                responseToCustomer: z.string().optional(),
                authCode: z.string().optional(),
                accountNumber: z.string().optional(),
                accountType: z.string().optional(),
                requestedAmount: z.string().optional(),
                approvedAmount: z.string().optional(),
                balanceOnCard: z.string().optional(),
            }),
        ),
        "splitTenderPayment",
    ).optional(),
    userFields: createUnwrapSchema(
        createMaybeArraySchema(userFieldSchema, outputUserFieldSchema, { max: 20 }),
        z.array(outputUserFieldSchema),
        "userField",
    ).optional(),
    shipTo: nameAndAddressSchema.optional(),
    secureAcceptance: z
        .object({
            SecureAcceptanceUrl: z.string().optional(),
            PayerID: z.string().optional(),
            PayerEmail: z.string().optional(),
        })
        .optional(),
    emvResponse: z
        .object({
            tlvData: z.string().optional(),
            tags: createUnwrapSchema(
                createMaybeArraySchema(emvTagSchema, outputEmvTagSchema, { min: 1 }),
                z.array(outputEmvTagSchema),
                "tag",
            ).optional(),
        })
        .optional(),
    transHashSha2: z.string().optional(),
    profile: customerProfileIdSchema.optional(),
    networkTransId: networkTransIdSchema.optional(),
    merchantAdvice: merchantAdviceSchema.optional(),
});
const outputTransactionResponseSchema = z.object({
    responseCode: z.string().optional(),
    rawResponseCode: z.string().optional(),
    authCode: z.string().optional(),
    avsResultCode: z.string().optional(),
    cvvResultCode: z.string().optional(),
    cavvResultCode: z.string().optional(),
    transId: z.string().optional(),
    refTransID: z.string().optional(),
    transHash: z.string().optional(),
    testRequest: z.string().optional(),
    accountNumber: z.string().optional(),
    entryMode: z.string().optional(),
    accountType: z.string().optional(),
    splitTenderId: z.string().optional(),
    prePaidCard: z
        .object({
            requestedAmount: z.string().optional(),
            approvedAmount: z.string().optional(),
            balanceOnCard: z.string().optional(),
        })
        .optional(),
    messages: z
        .array(z.object({ code: z.string().optional(), description: z.string().optional() }))
        .optional(),
    errors: z
        .array(z.object({ errorCode: z.string().optional(), errorText: z.string().optional() }))
        .optional(),
    splitTenderPayments: z
        .array(
            z.object({
                transId: z.string().optional(),
                responseCode: z.string().optional(),
                responseToCustomer: z.string().optional(),
                authCode: z.string().optional(),
                accountNumber: z.string().optional(),
                accountType: z.string().optional(),
                requestedAmount: z.string().optional(),
                approvedAmount: z.string().optional(),
                balanceOnCard: z.string().optional(),
            }),
        )
        .optional(),
    userFields: z.array(outputUserFieldSchema).optional(),
    shipTo: outputNameAndAddressSchema.optional(),
    secureAcceptance: z
        .object({
            SecureAcceptanceUrl: z.string().optional(),
            PayerID: z.string().optional(),
            PayerEmail: z.string().optional(),
        })
        .optional(),
    emvResponse: z
        .object({ tlvData: z.string().optional(), tags: z.array(outputEmvTagSchema).optional() })
        .optional(),
    transHashSha2: z.string().optional(),
    profile: outputCustomerProfileIdSchema.optional(),
    networkTransId: outputNetworkTransIdSchema.optional(),
    merchantAdvice: outputMerchantAdviceSchema.optional(),
});
export type TransactionResponse = z.output<typeof outputTransactionResponseSchema>;

export const deliveryMethodSchema = z.enum(["EMAIL", "SMS"]);
const outputDeliveryMethodSchema = z.enum(["EMAIL", "SMS"]);
export type DeliveryMethod = z.output<typeof outputDeliveryMethodSchema>;

export const pinDeliveryRequestSchema = z.object({
    deliveryMethod: deliveryMethodSchema,
    activationCode: z.string(),
});
const outputPinDeliveryRequestSchema = z.object({
    deliveryMethod: outputDeliveryMethodSchema,
    activationCode: z.string(),
});
export type PinDeliveryRequest = z.output<typeof outputPinDeliveryRequestSchema>;

export const pinVerifyRequestSchema = z.object({
    pin: z.string(),
    biometricsPublicKey: z.string().optional(),
    activationCode: z.string(),
});
const outputPinVerifyRequestSchema = z.object({
    pin: z.string(),
    biometricsPublicKey: z.string().optional(),
    activationCode: z.string(),
});
export type PinVerifyRequest = z.output<typeof outputPinVerifyRequestSchema>;

export const aNetApiRequestSchema = z.object({
    merchantAuthentication: merchantAuthenticationSchema,
    clientId: z.string().max(30).optional(),
    refId: z.string().max(50).optional(),
});
const outputANetApiRequestSchema = z.object({
    merchantAuthentication: outputMerchantAuthenticationSchema,
    clientId: z.string().optional(),
    refId: z.string().optional(),
});
export type ANetApiRequest = z.output<typeof outputANetApiRequestSchema>;

export const emailSettingsSchema = z.codec(
    z.object({
        setting: createMaybeArraySchema(settingSchema, outputSettingSchema),
        version: integerSchema.optional(),
    }),
    z.object({
        items: z.array(outputSettingSchema),
        version: z.number().optional(),
    }),
    {
        decode: ({ setting, version }) => ({ items: setting, version }),
        encode: ({ items, version }) => ({ setting: items, version }),
    },
);
const outputEmailSettingsSchema = z.object({
    items: z.array(outputSettingSchema),
    version: z.number().optional(),
});
export type EmailSettings = z.output<typeof outputEmailSettingsSchema>;

export const messageTypeSchema = z.enum(["Ok", "Error"]);
const outputMessageTypeSchema = z.enum(["Ok", "Error"]);
export type MessageType = z.output<typeof outputMessageTypeSchema>;

export const messagesSchema = z.object({
    resultCode: messageTypeSchema,
    message: createMaybeArraySchema(
        z.object({ code: z.string(), text: z.string() }),
        z.object({ code: z.string(), text: z.string() }),
        { min: 1 },
    ),
});
const outputMessagesSchema = z.object({
    resultCode: outputMessageTypeSchema,
    message: z.array(z.object({ code: z.string(), text: z.string() })),
});
export type Messages = z.output<typeof outputMessagesSchema>;

export const aNetApiResponseSchema = z
    .object({ refId: z.string().optional() })
    .and(z.object({ messages: messagesSchema }))
    .and(z.object({ sessionToken: z.string().optional() }));
const outputANetApiResponseSchema = z
    .object({ refId: z.string().optional() })
    .and(z.object({ messages: outputMessagesSchema }))
    .and(z.object({ sessionToken: z.string().optional() }));
export type ANetApiResponse = z.output<typeof outputANetApiResponseSchema>;

export const errorResponseSchema = aNetApiResponseSchema;
const outputErrorResponseSchema = outputANetApiResponseSchema;
export type ErrorResponse = z.output<typeof outputErrorResponseSchema>;

export const isAliveRequestSchema = z.object({ refId: z.string().max(50).optional() });
const outputIsAliveRequestSchema = z.object({ refId: z.string().optional() });
export type IsAliveRequest = z.output<typeof outputIsAliveRequestSchema>;

export const isAliveResponseSchema = z.object({});
const outputIsAliveResponseSchema = z.object({});
export type IsAliveResponse = z.output<typeof outputIsAliveResponseSchema>;

export const authenticateTestRequestSchema = z.object({});
const outputAuthenticateTestRequestSchema = z.object({});
export type AuthenticateTestRequest = z.output<typeof outputAuthenticateTestRequestSchema>;

export const authenticateTestResponseSchema = z.object({});
const outputAuthenticateTestResponseSchema = z.object({});
export type AuthenticateTestResponse = z.output<typeof outputAuthenticateTestResponseSchema>;

export const arbCreateSubscriptionRequestSchema = z.object({ subscription: arbSubscriptionSchema });
const outputArbCreateSubscriptionRequestSchema = z.object({
    subscription: outputArbSubscriptionSchema,
});
export type ArbCreateSubscriptionRequest = z.output<
    typeof outputArbCreateSubscriptionRequestSchema
>;

export const arbCreateSubscriptionResponseSchema = z.object({
    subscriptionId: numericStringSchema.optional(),
    profile: customerProfileIdSchema.optional(),
});
const outputArbCreateSubscriptionResponseSchema = z.object({
    subscriptionId: outputNumericStringSchema.optional(),
    profile: outputCustomerProfileIdSchema.optional(),
});
export type ArbCreateSubscriptionResponse = z.output<
    typeof outputArbCreateSubscriptionResponseSchema
>;

export const arbUpdateSubscriptionRequestSchema = z.object({
    subscriptionId: numericStringSchema,
    subscription: arbSubscriptionSchema,
});
const outputArbUpdateSubscriptionRequestSchema = z.object({
    subscriptionId: outputNumericStringSchema,
    subscription: outputArbSubscriptionSchema,
});
export type ArbUpdateSubscriptionRequest = z.output<
    typeof outputArbUpdateSubscriptionRequestSchema
>;

export const arbUpdateSubscriptionResponseSchema = z.object({
    profile: customerProfileIdSchema.optional(),
});
const outputArbUpdateSubscriptionResponseSchema = z.object({
    profile: outputCustomerProfileIdSchema.optional(),
});
export type ArbUpdateSubscriptionResponse = z.output<
    typeof outputArbUpdateSubscriptionResponseSchema
>;

export const arbCancelSubscriptionRequestSchema = z.object({ subscriptionId: numericStringSchema });
const outputArbCancelSubscriptionRequestSchema = z.object({
    subscriptionId: outputNumericStringSchema,
});
export type ArbCancelSubscriptionRequest = z.output<
    typeof outputArbCancelSubscriptionRequestSchema
>;

export const arbCancelSubscriptionResponseSchema = z.object({});
const outputArbCancelSubscriptionResponseSchema = z.object({});
export type ArbCancelSubscriptionResponse = z.output<
    typeof outputArbCancelSubscriptionResponseSchema
>;

export const arbGetSubscriptionStatusRequestSchema = z.object({
    subscriptionId: numericStringSchema,
});
const outputArbGetSubscriptionStatusRequestSchema = z.object({
    subscriptionId: outputNumericStringSchema,
});
export type ArbGetSubscriptionStatusRequest = z.output<
    typeof outputArbGetSubscriptionStatusRequestSchema
>;

export const arbGetSubscriptionStatusResponseSchema = z.object({
    status: arbSubscriptionStatusSchema.optional(),
});
const outputArbGetSubscriptionStatusResponseSchema = z.object({
    status: outputArbSubscriptionStatusSchema.optional(),
});
export type ArbGetSubscriptionStatusResponse = z.output<
    typeof outputArbGetSubscriptionStatusResponseSchema
>;

export const createCustomerProfileRequestSchema = z.object({
    profile: customerProfileSchema,
    validationMode: validationModeSchema.optional(),
});
const outputCreateCustomerProfileRequestSchema = z.object({
    profile: outputCustomerProfileSchema,
    validationMode: outputValidationModeSchema.optional(),
});
export type CreateCustomerProfileRequest = z.output<
    typeof outputCreateCustomerProfileRequestSchema
>;

export const createCustomerProfileResponseSchema = z.object({
    customerProfileId: numericStringSchema.optional(),
    customerPaymentProfileIdList: arrayOfNumericStringSchema,
    customerShippingAddressIdList: arrayOfNumericStringSchema,
    validationDirectResponseList: arrayOfStringSchema,
});
const outputCreateCustomerProfileResponseSchema = z.object({
    customerProfileId: outputNumericStringSchema.optional(),
    customerPaymentProfileIdList: outputArrayOfNumericStringSchema,
    customerShippingAddressIdList: outputArrayOfNumericStringSchema,
    validationDirectResponseList: outputArrayOfStringSchema,
});
export type CreateCustomerProfileResponse = z.output<
    typeof outputCreateCustomerProfileResponseSchema
>;

export const createProfileResponseSchema = z.object({
    messages: messagesSchema,
    customerProfileId: numericStringSchema.optional(),
    customerPaymentProfileIdList: arrayOfNumericStringSchema.optional(),
    customerShippingAddressIdList: arrayOfNumericStringSchema.optional(),
});
const outputCreateProfileResponseSchema = z.object({
    messages: outputMessagesSchema,
    customerProfileId: outputNumericStringSchema.optional(),
    customerPaymentProfileIdList: outputArrayOfNumericStringSchema.optional(),
    customerShippingAddressIdList: outputArrayOfNumericStringSchema.optional(),
});
export type CreateProfileResponse = z.output<typeof outputCreateProfileResponseSchema>;

export const createCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    paymentProfile: customerPaymentProfileSchema,
    validationMode: validationModeSchema.optional(),
});
const outputCreateCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    paymentProfile: outputCustomerPaymentProfileSchema,
    validationMode: outputValidationModeSchema.optional(),
});
export type CreateCustomerPaymentProfileRequest = z.output<
    typeof outputCreateCustomerPaymentProfileRequestSchema
>;

export const createCustomerPaymentProfileResponseSchema = z.object({
    customerProfileId: numericStringSchema.optional(),
    customerPaymentProfileId: numericStringSchema.optional(),
    validationDirectResponse: z.string().max(2048).optional(),
});
const outputCreateCustomerPaymentProfileResponseSchema = z.object({
    customerProfileId: outputNumericStringSchema.optional(),
    customerPaymentProfileId: outputNumericStringSchema.optional(),
    validationDirectResponse: z.string().optional(),
});
export type CreateCustomerPaymentProfileResponse = z.output<
    typeof outputCreateCustomerPaymentProfileResponseSchema
>;

export const createCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    address: customerAddressSchema,
    defaultShippingAddress: z.boolean().optional(),
});
const outputCreateCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    address: outputCustomerAddressSchema,
    defaultShippingAddress: z.boolean().optional(),
});
export type CreateCustomerShippingAddressRequest = z.output<
    typeof outputCreateCustomerShippingAddressRequestSchema
>;

export const createCustomerShippingAddressResponseSchema = z.object({
    customerProfileId: numericStringSchema.optional(),
    customerAddressId: numericStringSchema.optional(),
});
const outputCreateCustomerShippingAddressResponseSchema = z.object({
    customerProfileId: outputNumericStringSchema.optional(),
    customerAddressId: outputNumericStringSchema.optional(),
});
export type CreateCustomerShippingAddressResponse = z.output<
    typeof outputCreateCustomerShippingAddressResponseSchema
>;

export const createCustomerProfileFromTransactionRequestSchema = z.object({
    transId: numericStringSchema,
    customer: customerProfileBaseSchema.optional(),
    customerProfileId: numericStringSchema.optional(),
    defaultPaymentProfile: z.boolean().optional(),
    defaultShippingAddress: z.boolean().optional(),
    profileType: customerProfileTypeSchema.optional(),
});
const outputCreateCustomerProfileFromTransactionRequestSchema = z.object({
    transId: outputNumericStringSchema,
    customer: outputCustomerProfileBaseSchema.optional(),
    customerProfileId: outputNumericStringSchema.optional(),
    defaultPaymentProfile: z.boolean().optional(),
    defaultShippingAddress: z.boolean().optional(),
    profileType: outputCustomerProfileTypeSchema.optional(),
});
export type CreateCustomerProfileFromTransactionRequest = z.output<
    typeof outputCreateCustomerProfileFromTransactionRequestSchema
>;

export const getCustomerProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema.optional(),
    merchantCustomerId: z.string().max(20).optional(),
    email: z.string().optional(),
    unmaskExpirationDate: z.boolean().optional(),
    includeIssuerInfo: z.boolean().optional(),
});
const outputGetCustomerProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema.optional(),
    merchantCustomerId: z.string().optional(),
    email: z.string().optional(),
    unmaskExpirationDate: z.boolean().optional(),
    includeIssuerInfo: z.boolean().optional(),
});
export type GetCustomerProfileRequest = z.output<typeof outputGetCustomerProfileRequestSchema>;

export const getCustomerProfileResponseSchema = z.object({
    profile: customerProfileMaskedSchema.optional(),
    subscriptionIds: subscriptionIdListSchema.optional(),
});
const outputGetCustomerProfileResponseSchema = z.object({
    profile: outputCustomerProfileMaskedSchema.optional(),
    subscriptionIds: outputSubscriptionIdListSchema.optional(),
});
export type GetCustomerProfileResponse = z.output<typeof outputGetCustomerProfileResponseSchema>;

export const getCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    customerPaymentProfileId: numericStringSchema.optional(),
    unmaskExpirationDate: z.boolean().optional(),
    includeIssuerInfo: z.boolean().optional(),
});
const outputGetCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerPaymentProfileId: outputNumericStringSchema.optional(),
    unmaskExpirationDate: z.boolean().optional(),
    includeIssuerInfo: z.boolean().optional(),
});
export type GetCustomerPaymentProfileRequest = z.output<
    typeof outputGetCustomerPaymentProfileRequestSchema
>;

export const getCustomerPaymentProfileResponseSchema = z.object({
    paymentProfile: customerPaymentProfileMaskedSchema.optional(),
});
const outputGetCustomerPaymentProfileResponseSchema = z.object({
    paymentProfile: outputCustomerPaymentProfileMaskedSchema.optional(),
});
export type GetCustomerPaymentProfileResponse = z.output<
    typeof outputGetCustomerPaymentProfileResponseSchema
>;

export const getCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    customerAddressId: numericStringSchema.optional(),
});
const outputGetCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerAddressId: outputNumericStringSchema.optional(),
});
export type GetCustomerShippingAddressRequest = z.output<
    typeof outputGetCustomerShippingAddressRequestSchema
>;

export const getCustomerShippingAddressResponseSchema = z.object({
    defaultShippingAddress: z.boolean().optional(),
    address: customerAddressExSchema.optional(),
    subscriptionIds: subscriptionIdListSchema.optional(),
});
const outputGetCustomerShippingAddressResponseSchema = z.object({
    defaultShippingAddress: z.boolean().optional(),
    address: outputCustomerAddressExSchema.optional(),
    subscriptionIds: outputSubscriptionIdListSchema.optional(),
});
export type GetCustomerShippingAddressResponse = z.output<
    typeof outputGetCustomerShippingAddressResponseSchema
>;

export const updateCustomerProfileRequestSchema = z.object({
    profile: customerProfileInfoExSchema,
});
const outputUpdateCustomerProfileRequestSchema = z.object({
    profile: outputCustomerProfileInfoExSchema,
});
export type UpdateCustomerProfileRequest = z.output<
    typeof outputUpdateCustomerProfileRequestSchema
>;

export const updateCustomerProfileResponseSchema = z.object({});
const outputUpdateCustomerProfileResponseSchema = z.object({});
export type UpdateCustomerProfileResponse = z.output<
    typeof outputUpdateCustomerProfileResponseSchema
>;

export const updateCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    paymentProfile: customerPaymentProfileExSchema,
    validationMode: validationModeSchema.optional(),
});
const outputUpdateCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    paymentProfile: outputCustomerPaymentProfileExSchema,
    validationMode: outputValidationModeSchema.optional(),
});
export type UpdateCustomerPaymentProfileRequest = z.output<
    typeof outputUpdateCustomerPaymentProfileRequestSchema
>;

export const updateCustomerPaymentProfileResponseSchema = z.object({
    validationDirectResponse: z.string().max(2048).optional(),
});
const outputUpdateCustomerPaymentProfileResponseSchema = z.object({
    validationDirectResponse: z.string().optional(),
});
export type UpdateCustomerPaymentProfileResponse = z.output<
    typeof outputUpdateCustomerPaymentProfileResponseSchema
>;

export const updateCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    address: customerAddressExSchema,
    defaultShippingAddress: z.boolean().optional(),
});
const outputUpdateCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    address: outputCustomerAddressExSchema,
    defaultShippingAddress: z.boolean().optional(),
});
export type UpdateCustomerShippingAddressRequest = z.output<
    typeof outputUpdateCustomerShippingAddressRequestSchema
>;

export const updateCustomerShippingAddressResponseSchema = z.object({});
const outputUpdateCustomerShippingAddressResponseSchema = z.object({});
export type UpdateCustomerShippingAddressResponse = z.output<
    typeof outputUpdateCustomerShippingAddressResponseSchema
>;

export const deleteCustomerProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema,
});
const outputDeleteCustomerProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
});
export type DeleteCustomerProfileRequest = z.output<
    typeof outputDeleteCustomerProfileRequestSchema
>;

export const deleteCustomerProfileResponseSchema = z.object({});
const outputDeleteCustomerProfileResponseSchema = z.object({});
export type DeleteCustomerProfileResponse = z.output<
    typeof outputDeleteCustomerProfileResponseSchema
>;

export const deleteCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    customerPaymentProfileId: numericStringSchema,
});
const outputDeleteCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerPaymentProfileId: outputNumericStringSchema,
});
export type DeleteCustomerPaymentProfileRequest = z.output<
    typeof outputDeleteCustomerPaymentProfileRequestSchema
>;

export const deleteCustomerPaymentProfileResponseSchema = z.object({});
const outputDeleteCustomerPaymentProfileResponseSchema = z.object({});
export type DeleteCustomerPaymentProfileResponse = z.output<
    typeof outputDeleteCustomerPaymentProfileResponseSchema
>;

export const deleteCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    customerAddressId: numericStringSchema,
});
const outputDeleteCustomerShippingAddressRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerAddressId: outputNumericStringSchema,
});
export type DeleteCustomerShippingAddressRequest = z.output<
    typeof outputDeleteCustomerShippingAddressRequestSchema
>;

export const deleteCustomerShippingAddressResponseSchema = z.object({});
const outputDeleteCustomerShippingAddressResponseSchema = z.object({});
export type DeleteCustomerShippingAddressResponse = z.output<
    typeof outputDeleteCustomerShippingAddressResponseSchema
>;

export const createCustomerProfileTransactionRequestSchema = z.object({
    transaction: profileTransactionSchema,
    extraOptions: z.string().max(1024).optional(),
});
const outputCreateCustomerProfileTransactionRequestSchema = z.object({
    transaction: outputProfileTransactionSchema,
    extraOptions: z.string().optional(),
});
export type CreateCustomerProfileTransactionRequest = z.output<
    typeof outputCreateCustomerProfileTransactionRequestSchema
>;

export const createCustomerProfileTransactionResponseSchema = z.object({
    transactionResponse: transactionResponseSchema.optional(),
    directResponse: z.string().max(2048).optional(),
});
const outputCreateCustomerProfileTransactionResponseSchema = z.object({
    transactionResponse: outputTransactionResponseSchema.optional(),
    directResponse: z.string().optional(),
});
export type CreateCustomerProfileTransactionResponse = z.output<
    typeof outputCreateCustomerProfileTransactionResponseSchema
>;

export const validateCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    customerPaymentProfileId: numericStringSchema,
    customerShippingAddressId: numericStringSchema.optional(),
    cardCode: cardCodeSchema.optional(),
    validationMode: validationModeSchema,
});
const outputValidateCustomerPaymentProfileRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerPaymentProfileId: outputNumericStringSchema,
    customerShippingAddressId: outputNumericStringSchema.optional(),
    cardCode: outputCardCodeSchema.optional(),
    validationMode: outputValidationModeSchema,
});
export type ValidateCustomerPaymentProfileRequest = z.output<
    typeof outputValidateCustomerPaymentProfileRequestSchema
>;

export const validateCustomerPaymentProfileResponseSchema = z.object({
    directResponse: z.string().max(2048).optional(),
});
const outputValidateCustomerPaymentProfileResponseSchema = z.object({
    directResponse: z.string().optional(),
});
export type ValidateCustomerPaymentProfileResponse = z.output<
    typeof outputValidateCustomerPaymentProfileResponseSchema
>;

export const getCustomerProfileIdsRequestSchema = z.object({});
const outputGetCustomerProfileIdsRequestSchema = z.object({});
export type GetCustomerProfileIdsRequest = z.output<
    typeof outputGetCustomerProfileIdsRequestSchema
>;

export const getCustomerProfileIdsResponseSchema = z.object({ ids: arrayOfNumericStringSchema });
const outputGetCustomerProfileIdsResponseSchema = z.object({
    ids: outputArrayOfNumericStringSchema,
});
export type GetCustomerProfileIdsResponse = z.output<
    typeof outputGetCustomerProfileIdsResponseSchema
>;

export const updateSplitTenderGroupRequestSchema = z.object({
    splitTenderId: z.string(),
    splitTenderStatus: splitTenderStatusSchema,
});
const outputUpdateSplitTenderGroupRequestSchema = z.object({
    splitTenderId: z.string(),
    splitTenderStatus: outputSplitTenderStatusSchema,
});
export type UpdateSplitTenderGroupRequest = z.output<
    typeof outputUpdateSplitTenderGroupRequestSchema
>;

export const updateSplitTenderGroupResponseSchema = z.object({});
const outputUpdateSplitTenderGroupResponseSchema = z.object({});
export type UpdateSplitTenderGroupResponse = z.output<
    typeof outputUpdateSplitTenderGroupResponseSchema
>;

export const getTransactionDetailsRequestSchema = z.union([
    z.object({ transId: numericStringSchema }),
    z.object({ transrefId: z.string().max(50) }),
]);
const outputGetTransactionDetailsRequestSchema = z.union([
    z.object({ transId: outputNumericStringSchema }),
    z.object({ transrefId: z.string() }),
]);
export type GetTransactionDetailsRequest = z.output<
    typeof outputGetTransactionDetailsRequestSchema
>;

export const getTransactionDetailsResponseSchema = z.object({
    transaction: transactionDetailsSchema,
    clientId: z.string().max(30).optional(),
    transrefId: z.string().max(50).optional(),
});
const outputGetTransactionDetailsResponseSchema = z.object({
    transaction: outputTransactionDetailsSchema,
    clientId: z.string().optional(),
    transrefId: z.string().optional(),
});
export type GetTransactionDetailsResponse = z.output<
    typeof outputGetTransactionDetailsResponseSchema
>;

export const createTransactionRequestSchema = z.union([
    z.object({ transactionRequest: transactionRequestSchema }),
    z.object({ transactionRequestEnc: z.string() }),
]);
const outputCreateTransactionRequestSchema = z.union([
    z.object({ transactionRequest: outputTransactionRequestSchema }),
    z.object({ transactionRequestEnc: z.string() }),
]);
export type CreateTransactionRequest = z.output<typeof outputCreateTransactionRequestSchema>;

export const createTransactionResponseSchema = z.object({
    transactionResponse: transactionResponseSchema,
    profileResponse: createProfileResponseSchema.optional(),
});
const outputCreateTransactionResponseSchema = z.object({
    transactionResponse: outputTransactionResponseSchema,
    profileResponse: outputCreateProfileResponseSchema.optional(),
});
export type CreateTransactionResponse = z.output<typeof outputCreateTransactionResponseSchema>;

export const heldTransactionRequestSchema = z.object({
    action: afdsTransactionSchema,
    refTransId: z.string(),
});
const outputHeldTransactionRequestSchema = z.object({
    action: outputAfdsTransactionSchema,
    refTransId: z.string(),
});
export type HeldTransactionRequest = z.output<typeof outputHeldTransactionRequestSchema>;

export const updateHeldTransactionRequestSchema = z.object({
    heldTransactionRequest: heldTransactionRequestSchema,
});
const outputUpdateHeldTransactionRequestSchema = z.object({
    heldTransactionRequest: outputHeldTransactionRequestSchema,
});
export type UpdateHeldTransactionRequest = z.output<
    typeof outputUpdateHeldTransactionRequestSchema
>;

export const updateHeldTransactionResponseSchema = z.object({
    transactionResponse: transactionResponseSchema.optional(),
});
const outputUpdateHeldTransactionResponseSchema = z.object({
    transactionResponse: outputTransactionResponseSchema.optional(),
});
export type UpdateHeldTransactionResponse = z.output<
    typeof outputUpdateHeldTransactionResponseSchema
>;

export const getBatchStatisticsRequestSchema = z.object({ batchId: numericStringSchema });
const outputGetBatchStatisticsRequestSchema = z.object({ batchId: outputNumericStringSchema });
export type GetBatchStatisticsRequest = z.output<typeof outputGetBatchStatisticsRequestSchema>;

export const getBatchStatisticsResponseSchema = z.object({ batch: batchDetailsSchema.optional() });
const outputGetBatchStatisticsResponseSchema = z.object({
    batch: outputBatchDetailsSchema.optional(),
});
export type GetBatchStatisticsResponse = z.output<typeof outputGetBatchStatisticsResponseSchema>;

export const getSettledBatchListRequestSchema = z.object({
    includeStatistics: z.boolean().optional(),
    firstSettlementDate: z.iso.datetime().optional(),
    lastSettlementDate: z.iso.datetime().optional(),
    posRedirectToMint: z.boolean().optional(),
});
const outputGetSettledBatchListRequestSchema = z.object({
    includeStatistics: z.boolean().optional(),
    firstSettlementDate: z.string().optional(),
    lastSettlementDate: z.string().optional(),
    posRedirectToMint: z.boolean().optional(),
});
export type GetSettledBatchListRequest = z.output<typeof outputGetSettledBatchListRequestSchema>;

export const getSettledBatchListResponseSchema = z.object({
    batchList: arrayOfBatchDetailsSchema.optional(),
});
const outputGetSettledBatchListResponseSchema = z.object({
    batchList: outputArrayOfBatchDetailsSchema.optional(),
});
export type GetSettledBatchListResponse = z.output<typeof outputGetSettledBatchListResponseSchema>;

export const transactionListOrderFieldSchema = z.enum(["id", "submitTimeUTC"]);
const outputTransactionListOrderFieldSchema = z.enum(["id", "submitTimeUTC"]);
export type TransactionListOrderField = z.output<typeof outputTransactionListOrderFieldSchema>;

export const transactionListSortingSchema = z.object({
    orderBy: transactionListOrderFieldSchema,
    orderDescending: z.boolean(),
});
const outputTransactionListSortingSchema = z.object({
    orderBy: outputTransactionListOrderFieldSchema,
    orderDescending: z.boolean(),
});
export type TransactionListSorting = z.output<typeof outputTransactionListSortingSchema>;

export const pagingSchema = z.object({
    limit: integerSchema
        .check(createMinInclusiveCheck(new Decimal("1")))
        .check(createMaxInclusiveCheck(new Decimal("1000"))),
    offset: integerSchema
        .check(createMinInclusiveCheck(new Decimal("1")))
        .check(createMaxInclusiveCheck(new Decimal("100000"))),
});
const outputPagingSchema = z.object({ limit: z.number(), offset: z.number() });
export type Paging = z.output<typeof outputPagingSchema>;

export const getTransactionListRequestSchema = z.object({
    batchId: numericStringSchema.optional(),
    sorting: transactionListSortingSchema.optional(),
    paging: pagingSchema.optional(),
    posRedirectToMint: z.boolean().optional(),
});
const outputGetTransactionListRequestSchema = z.object({
    batchId: outputNumericStringSchema.optional(),
    sorting: outputTransactionListSortingSchema.optional(),
    paging: outputPagingSchema.optional(),
    posRedirectToMint: z.boolean().optional(),
});
export type GetTransactionListRequest = z.output<typeof outputGetTransactionListRequestSchema>;

export const getTransactionListResponseSchema = z.object({
    transactions: arrayOfTransactionSummarySchema.optional(),
    totalNumInResultSet: integerSchema.optional(),
});
const outputGetTransactionListResponseSchema = z.object({
    transactions: outputArrayOfTransactionSummarySchema.optional(),
    totalNumInResultSet: z.number().optional(),
});
export type GetTransactionListResponse = z.output<typeof outputGetTransactionListResponseSchema>;

export const getHostedProfilePageRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    hostedProfileSettings: arrayOfSettingSchema.optional(),
});
const outputGetHostedProfilePageRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    hostedProfileSettings: outputArrayOfSettingSchema.optional(),
});
export type GetHostedProfilePageRequest = z.output<typeof outputGetHostedProfilePageRequestSchema>;

export const getHostedProfilePageResponseSchema = z.object({ token: z.string() });
const outputGetHostedProfilePageResponseSchema = z.object({ token: z.string() });
export type GetHostedProfilePageResponse = z.output<
    typeof outputGetHostedProfilePageResponseSchema
>;

export const getUnsettledTransactionListRequestSchema = z.object({
    status: transactionGroupStatusSchema.optional(),
    sorting: transactionListSortingSchema.optional(),
    paging: pagingSchema.optional(),
    posRedirectToMint: z.boolean().optional(),
});
const outputGetUnsettledTransactionListRequestSchema = z.object({
    status: outputTransactionGroupStatusSchema.optional(),
    sorting: outputTransactionListSortingSchema.optional(),
    paging: outputPagingSchema.optional(),
    posRedirectToMint: z.boolean().optional(),
});
export type GetUnsettledTransactionListRequest = z.output<
    typeof outputGetUnsettledTransactionListRequestSchema
>;

export const getHostedPaymentPageRequestSchema = z.object({
    transactionRequest: transactionRequestSchema,
    hostedPaymentSettings: arrayOfSettingSchema.optional(),
});
const outputGetHostedPaymentPageRequestSchema = z.object({
    transactionRequest: outputTransactionRequestSchema,
    hostedPaymentSettings: outputArrayOfSettingSchema.optional(),
});
export type GetHostedPaymentPageRequest = z.output<typeof outputGetHostedPaymentPageRequestSchema>;

export const getHostedPaymentPageResponseSchema = z.object({ token: z.string() });
const outputGetHostedPaymentPageResponseSchema = z.object({ token: z.string() });
export type GetHostedPaymentPageResponse = z.output<
    typeof outputGetHostedPaymentPageResponseSchema
>;

export const getUnsettledTransactionListResponseSchema = z.object({
    transactions: arrayOfTransactionSummarySchema.optional(),
    totalNumInResultSet: integerSchema.optional(),
});
const outputGetUnsettledTransactionListResponseSchema = z.object({
    transactions: outputArrayOfTransactionSummarySchema.optional(),
    totalNumInResultSet: z.number().optional(),
});
export type GetUnsettledTransactionListResponse = z.output<
    typeof outputGetUnsettledTransactionListResponseSchema
>;

export const mobileDeviceRegistrationRequestSchema = z.object({ mobileDevice: mobileDeviceSchema });
const outputMobileDeviceRegistrationRequestSchema = z.object({
    mobileDevice: outputMobileDeviceSchema,
});
export type MobileDeviceRegistrationRequest = z.output<
    typeof outputMobileDeviceRegistrationRequestSchema
>;

export const mobileDeviceRegistrationResponseSchema = z.object({});
const outputMobileDeviceRegistrationResponseSchema = z.object({});
export type MobileDeviceRegistrationResponse = z.output<
    typeof outputMobileDeviceRegistrationResponseSchema
>;

export const mobileDeviceLoginRequestSchema = z.object({});
const outputMobileDeviceLoginRequestSchema = z.object({});
export type MobileDeviceLoginRequest = z.output<typeof outputMobileDeviceLoginRequestSchema>;

export const mobileDeviceLoginPinRequestSchema = z.object({ pinDeliveryRequestEnc: z.string() });
const outputMobileDeviceLoginPinRequestSchema = z.object({ pinDeliveryRequestEnc: z.string() });
export type MobileDeviceLoginPinRequest = z.output<typeof outputMobileDeviceLoginPinRequestSchema>;

export const mobileDeviceLoginVerifyPinRequestSchema = z.object({
    pinVerifyRequestEnc: z.string(),
});
const outputMobileDeviceLoginVerifyPinRequestSchema = z.object({ pinVerifyRequestEnc: z.string() });
export type MobileDeviceLoginVerifyPinRequest = z.output<
    typeof outputMobileDeviceLoginVerifyPinRequestSchema
>;

export const mobileDeviceLoginVerifyChallengeRequestSchema = z.object({
    pinVerifyRequestEnc: z.string(),
});
const outputMobileDeviceLoginVerifyChallengeRequestSchema = z.object({
    pinVerifyRequestEnc: z.string(),
});
export type MobileDeviceLoginVerifyChallengeRequest = z.output<
    typeof outputMobileDeviceLoginVerifyChallengeRequestSchema
>;

export const mobileDeviceLoginPinResponseSchema = z.object({});
const outputMobileDeviceLoginPinResponseSchema = z.object({});
export type MobileDeviceLoginPinResponse = z.output<
    typeof outputMobileDeviceLoginPinResponseSchema
>;

export const mobileDeviceLoginVerifyPinResponseSchema = z.object({});
const outputMobileDeviceLoginVerifyPinResponseSchema = z.object({});
export type MobileDeviceLoginVerifyPinResponse = z.output<
    typeof outputMobileDeviceLoginVerifyPinResponseSchema
>;

export const mobileDeviceLoginVerifyChallengeResponseSchema = z.object({
    merchantContact: merchantContactSchema,
    userPermissions: arrayOfPermissionSchema,
    merchantAccount: transRetailInfoSchema.optional(),
    acceptanceDevicesAccount: acceptanceDevicesAccountSchema.optional(),
});
const outputMobileDeviceLoginVerifyChallengeResponseSchema = z.object({
    merchantContact: outputMerchantContactSchema,
    userPermissions: outputArrayOfPermissionSchema,
    merchantAccount: outputTransRetailInfoSchema.optional(),
    acceptanceDevicesAccount: outputAcceptanceDevicesAccountSchema.optional(),
});
export type MobileDeviceLoginVerifyChallengeResponse = z.output<
    typeof outputMobileDeviceLoginVerifyChallengeResponseSchema
>;

export const mobileDeviceLoginResponseSchema = z.object({
    merchantContact: merchantContactSchema,
    userPermissions: arrayOfPermissionSchema,
    merchantAccount: transRetailInfoSchema.optional(),
    acceptanceDevicesAccount: acceptanceDevicesAccountSchema.optional(),
});
const outputMobileDeviceLoginResponseSchema = z.object({
    merchantContact: outputMerchantContactSchema,
    userPermissions: outputArrayOfPermissionSchema,
    merchantAccount: outputTransRetailInfoSchema.optional(),
    acceptanceDevicesAccount: outputAcceptanceDevicesAccountSchema.optional(),
});
export type MobileDeviceLoginResponse = z.output<typeof outputMobileDeviceLoginResponseSchema>;

export const mobileDeviceMfaLoginRequestSchema = z.object({
    signatureKey: z.string().max(2048).optional(),
});
const outputMobileDeviceMfaLoginRequestSchema = z.object({ signatureKey: z.string().optional() });
export type MobileDeviceMfaLoginRequest = z.output<typeof outputMobileDeviceMfaLoginRequestSchema>;

export const mobileDeviceMfaLoginResponseSchema = z.object({
    merchantContact: merchantContactSchema,
    userPermissions: arrayOfPermissionSchema,
    merchantAccount: transRetailInfoSchema.optional(),
    acceptanceDevicesAccount: acceptanceDevicesAccountSchema.optional(),
    sessionToken: z.string().optional(),
    activationCode: z.string().optional(),
    vbaDecision: z.string().optional(),
    fingerprint: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
});
const outputMobileDeviceMfaLoginResponseSchema = z.object({
    merchantContact: outputMerchantContactSchema,
    userPermissions: outputArrayOfPermissionSchema,
    merchantAccount: outputTransRetailInfoSchema.optional(),
    acceptanceDevicesAccount: outputAcceptanceDevicesAccountSchema.optional(),
    sessionToken: z.string().optional(),
    activationCode: z.string().optional(),
    vbaDecision: z.string().optional(),
    fingerprint: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
});
export type MobileDeviceMfaLoginResponse = z.output<
    typeof outputMobileDeviceMfaLoginResponseSchema
>;

export const logoutRequestSchema = z.object({});
const outputLogoutRequestSchema = z.object({});
export type LogoutRequest = z.output<typeof outputLogoutRequestSchema>;

export const logoutResponseSchema = z.object({});
const outputLogoutResponseSchema = z.object({});
export type LogoutResponse = z.output<typeof outputLogoutResponseSchema>;

export const sendCustomerTransactionReceiptRequestSchema = z.object({
    transId: numericStringSchema,
    customerEmail: z.string(),
    emailSettings: emailSettingsSchema.optional(),
});
const outputSendCustomerTransactionReceiptRequestSchema = z.object({
    transId: outputNumericStringSchema,
    customerEmail: z.string(),
    emailSettings: outputEmailSettingsSchema.optional(),
});
export type SendCustomerTransactionReceiptRequest = z.output<
    typeof outputSendCustomerTransactionReceiptRequestSchema
>;

export const sendCustomerTransactionReceiptResponseSchema = z.object({});
const outputSendCustomerTransactionReceiptResponseSchema = z.object({});
export type SendCustomerTransactionReceiptResponse = z.output<
    typeof outputSendCustomerTransactionReceiptResponseSchema
>;

export const arbGetSubscriptionListSearchTypeSchema = z.enum([
    "cardExpiringThisMonth",
    "subscriptionActive",
    "subscriptionExpiringThisMonth",
    "subscriptionInactive",
]);
const outputArbGetSubscriptionListSearchTypeSchema = z.enum([
    "cardExpiringThisMonth",
    "subscriptionActive",
    "subscriptionExpiringThisMonth",
    "subscriptionInactive",
]);
export type ArbGetSubscriptionListSearchType = z.output<
    typeof outputArbGetSubscriptionListSearchTypeSchema
>;

export const arbGetSubscriptionListOrderFieldSchema = z.enum([
    "id",
    "name",
    "status",
    "createTimeStampUTC",
    "lastName",
    "firstName",
    "accountNumber",
    "amount",
    "pastOccurrences",
]);
const outputArbGetSubscriptionListOrderFieldSchema = z.enum([
    "id",
    "name",
    "status",
    "createTimeStampUTC",
    "lastName",
    "firstName",
    "accountNumber",
    "amount",
    "pastOccurrences",
]);
export type ArbGetSubscriptionListOrderField = z.output<
    typeof outputArbGetSubscriptionListOrderFieldSchema
>;

export const arbGetSubscriptionListSortingSchema = z.object({
    orderBy: arbGetSubscriptionListOrderFieldSchema,
    orderDescending: z.boolean(),
});
const outputArbGetSubscriptionListSortingSchema = z.object({
    orderBy: outputArbGetSubscriptionListOrderFieldSchema,
    orderDescending: z.boolean(),
});
export type ArbGetSubscriptionListSorting = z.output<
    typeof outputArbGetSubscriptionListSortingSchema
>;

export const arbGetSubscriptionListRequestSchema = z.object({
    searchType: arbGetSubscriptionListSearchTypeSchema,
    sorting: arbGetSubscriptionListSortingSchema.optional(),
    paging: pagingSchema.optional(),
});
const outputArbGetSubscriptionListRequestSchema = z.object({
    searchType: outputArbGetSubscriptionListSearchTypeSchema,
    sorting: outputArbGetSubscriptionListSortingSchema.optional(),
    paging: outputPagingSchema.optional(),
});
export type ArbGetSubscriptionListRequest = z.output<
    typeof outputArbGetSubscriptionListRequestSchema
>;

export const subscriptionDetailSchema = z.object({
    id: integerSchema,
    name: z.string().optional(),
    status: arbSubscriptionStatusSchema,
    createTimeStampUTC: z.iso.datetime(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    totalOccurrences: integerSchema,
    pastOccurrences: integerSchema,
    paymentMethod: paymentMethodSchema,
    accountNumber: z.string().optional(),
    invoice: z.string().optional(),
    amount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4)),
    currencyCode: z.string().optional(),
    customerProfileId: integerSchema,
    customerPaymentProfileId: integerSchema,
    customerShippingProfileId: integerSchema.optional(),
});
const outputSubscriptionDetailSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    status: outputArbSubscriptionStatusSchema,
    createTimeStampUTC: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    totalOccurrences: z.number(),
    pastOccurrences: z.number(),
    paymentMethod: outputPaymentMethodSchema,
    accountNumber: z.string().optional(),
    invoice: z.string().optional(),
    amount: z.instanceof(Decimal),
    currencyCode: z.string().optional(),
    customerProfileId: z.number(),
    customerPaymentProfileId: z.number(),
    customerShippingProfileId: z.number().optional(),
});
export type SubscriptionDetail = z.output<typeof outputSubscriptionDetailSchema>;

export const arrayOfSubscriptionSchema = createUnwrapSchema(
    createMaybeArraySchema(subscriptionDetailSchema, outputSubscriptionDetailSchema),
    z.array(outputSubscriptionDetailSchema),
    "subscriptionDetail",
);
const outputArrayOfSubscriptionSchema = z.array(outputSubscriptionDetailSchema);
export type ArrayOfSubscription = z.output<typeof outputArrayOfSubscriptionSchema>;

export const arbGetSubscriptionListResponseSchema = z.object({
    totalNumInResultSet: integerSchema.optional(),
    subscriptionDetails: arrayOfSubscriptionSchema.optional(),
});
const outputArbGetSubscriptionListResponseSchema = z.object({
    totalNumInResultSet: z.number().optional(),
    subscriptionDetails: outputArrayOfSubscriptionSchema.optional(),
});
export type ArbGetSubscriptionListResponse = z.output<
    typeof outputArbGetSubscriptionListResponseSchema
>;

export const customerProfileSummarySchema = z.object({
    customerProfileId: z.string().optional(),
    description: z.string().optional(),
    merchantCustomerId: z.string(),
    email: z.string().optional(),
    createdDate: z.iso.datetime(),
});
const outputCustomerProfileSummarySchema = z.object({
    customerProfileId: z.string().optional(),
    description: z.string().optional(),
    merchantCustomerId: z.string(),
    email: z.string().optional(),
    createdDate: z.string(),
});
export type CustomerProfileSummary = z.output<typeof outputCustomerProfileSummarySchema>;

export const enumCollectionSchema = z.object({
    customerProfileSummaryType: customerProfileSummarySchema,
    paymentSimpleType: paymentSimpleSchema,
    accountTypeEnum: accountTypeSchema,
    cardTypeEnum: cardTypeSchema,
    FDSFilterActionEnum: fdsFilterActionSchema,
    permissionsEnum: permissionsSchema,
    settingNameEnum: settingNameSchema,
    settlementStateEnum: settlementStateSchema,
    transactionStatusEnum: transactionStatusSchema,
    transactionTypeEnum: transactionTypeSchema,
});
const outputEnumCollectionSchema = z.object({
    customerProfileSummaryType: outputCustomerProfileSummarySchema,
    paymentSimpleType: outputPaymentSimpleSchema,
    accountTypeEnum: outputAccountTypeSchema,
    cardTypeEnum: outputCardTypeSchema,
    FDSFilterActionEnum: outputFdsFilterActionSchema,
    permissionsEnum: outputPermissionsSchema,
    settingNameEnum: outputSettingNameSchema,
    settlementStateEnum: outputSettlementStateSchema,
    transactionStatusEnum: outputTransactionStatusSchema,
    transactionTypeEnum: outputTransactionTypeSchema,
});
export type EnumCollection = z.output<typeof outputEnumCollectionSchema>;

export const customerPaymentProfileSearchTypeSchema = z.enum(["cardsExpiringInMonth"]);
const outputCustomerPaymentProfileSearchTypeSchema = z.enum(["cardsExpiringInMonth"]);
export type CustomerPaymentProfileSearchType = z.output<
    typeof outputCustomerPaymentProfileSearchTypeSchema
>;

export const customerPaymentProfileOrderFieldSchema = z.enum(["id"]);
const outputCustomerPaymentProfileOrderFieldSchema = z.enum(["id"]);
export type CustomerPaymentProfileOrderField = z.output<
    typeof outputCustomerPaymentProfileOrderFieldSchema
>;

export const customerPaymentProfileSortingSchema = z.object({
    orderBy: customerPaymentProfileOrderFieldSchema,
    orderDescending: z.boolean(),
});
const outputCustomerPaymentProfileSortingSchema = z.object({
    orderBy: outputCustomerPaymentProfileOrderFieldSchema,
    orderDescending: z.boolean(),
});
export type CustomerPaymentProfileSorting = z.output<
    typeof outputCustomerPaymentProfileSortingSchema
>;

export const getCustomerPaymentProfileListRequestSchema = z.object({
    searchType: customerPaymentProfileSearchTypeSchema,
    month: z.string().min(4).max(7),
    sorting: customerPaymentProfileSortingSchema.optional(),
    paging: pagingSchema.optional(),
});
const outputGetCustomerPaymentProfileListRequestSchema = z.object({
    searchType: outputCustomerPaymentProfileSearchTypeSchema,
    month: z.string(),
    sorting: outputCustomerPaymentProfileSortingSchema.optional(),
    paging: outputPagingSchema.optional(),
});
export type GetCustomerPaymentProfileListRequest = z.output<
    typeof outputGetCustomerPaymentProfileListRequestSchema
>;

export const customerPaymentProfileListItemSchema = z.object({
    defaultPaymentProfile: z.boolean().optional(),
    customerPaymentProfileId: integerSchema,
    customerProfileId: integerSchema,
    billTo: customerAddressSchema,
    payment: paymentMaskedSchema,
    originalNetworkTransId: networkTransIdSchema.optional(),
    originalAuthAmount: decimalSchema
        .check(createMinInclusiveCheck(new Decimal("0")))
        .check(createFractionDigitsCheck(4))
        .optional(),
    excludeFromAccountUpdater: z.boolean().optional(),
});
const outputCustomerPaymentProfileListItemSchema = z.object({
    defaultPaymentProfile: z.boolean().optional(),
    customerPaymentProfileId: z.number(),
    customerProfileId: z.number(),
    billTo: outputCustomerAddressSchema,
    payment: outputPaymentMaskedSchema,
    originalNetworkTransId: outputNetworkTransIdSchema.optional(),
    originalAuthAmount: z.instanceof(Decimal).optional(),
    excludeFromAccountUpdater: z.boolean().optional(),
});
export type CustomerPaymentProfileListItem = z.output<
    typeof outputCustomerPaymentProfileListItemSchema
>;

export const arrayOfCustomerPaymentProfileListItemSchema = createUnwrapSchema(
    createMaybeArraySchema(
        customerPaymentProfileListItemSchema,
        outputCustomerPaymentProfileListItemSchema,
    ),
    z.array(outputCustomerPaymentProfileListItemSchema),
    "paymentProfile",
);
const outputArrayOfCustomerPaymentProfileListItemSchema = z.array(
    outputCustomerPaymentProfileListItemSchema,
);
export type ArrayOfCustomerPaymentProfileListItem = z.output<
    typeof outputArrayOfCustomerPaymentProfileListItemSchema
>;

export const getCustomerPaymentProfileListResponseSchema = z.object({
    totalNumInResultSet: integerSchema,
    paymentProfiles: arrayOfCustomerPaymentProfileListItemSchema.optional(),
});
const outputGetCustomerPaymentProfileListResponseSchema = z.object({
    totalNumInResultSet: z.number(),
    paymentProfiles: outputArrayOfCustomerPaymentProfileListItemSchema.optional(),
});
export type GetCustomerPaymentProfileListResponse = z.output<
    typeof outputGetCustomerPaymentProfileListResponseSchema
>;

export const arbGetSubscriptionRequestSchema = z.object({
    subscriptionId: numericStringSchema,
    includeTransactions: z.boolean().optional(),
});
const outputArbGetSubscriptionRequestSchema = z.object({
    subscriptionId: outputNumericStringSchema,
    includeTransactions: z.boolean().optional(),
});
export type ArbGetSubscriptionRequest = z.output<typeof outputArbGetSubscriptionRequestSchema>;

export const arbGetSubscriptionResponseSchema = z.object({
    subscription: arbSubscriptionMaskedSchema,
});
const outputArbGetSubscriptionResponseSchema = z.object({
    subscription: outputArbSubscriptionMaskedSchema,
});
export type ArbGetSubscriptionResponse = z.output<typeof outputArbGetSubscriptionResponseSchema>;

export const getTransactionListForCustomerRequestSchema = z.object({
    customerProfileId: numericStringSchema,
    customerPaymentProfileId: numericStringSchema.optional(),
    sorting: transactionListSortingSchema.optional(),
    paging: pagingSchema.optional(),
});
const outputGetTransactionListForCustomerRequestSchema = z.object({
    customerProfileId: outputNumericStringSchema,
    customerPaymentProfileId: outputNumericStringSchema.optional(),
    sorting: outputTransactionListSortingSchema.optional(),
    paging: outputPagingSchema.optional(),
});
export type GetTransactionListForCustomerRequest = z.output<
    typeof outputGetTransactionListForCustomerRequestSchema
>;

export const getAuJobSummaryRequestSchema = z.object({ month: z.string().min(4).max(7) });
const outputGetAuJobSummaryRequestSchema = z.object({ month: z.string() });
export type GetAuJobSummaryRequest = z.output<typeof outputGetAuJobSummaryRequestSchema>;

export const auResponseSchema = z.object({
    auReasonCode: z.string(),
    profileCount: integerSchema,
    reasonDescription: z.string(),
});
const outputAuResponseSchema = z.object({
    auReasonCode: z.string(),
    profileCount: z.number(),
    reasonDescription: z.string(),
});
export type AuResponse = z.output<typeof outputAuResponseSchema>;

export const arrayOfAuResponseSchema = createUnwrapSchema(
    createMaybeArraySchema(auResponseSchema, outputAuResponseSchema),
    z.array(outputAuResponseSchema),
    "auResponse",
);
const outputArrayOfAuResponseSchema = z.array(outputAuResponseSchema);
export type ArrayOfAuResponse = z.output<typeof outputArrayOfAuResponseSchema>;

export const getAuJobSummaryResponseSchema = z.object({
    auSummary: arrayOfAuResponseSchema.optional(),
});
const outputGetAuJobSummaryResponseSchema = z.object({
    auSummary: outputArrayOfAuResponseSchema.optional(),
});
export type GetAuJobSummaryResponse = z.output<typeof outputGetAuJobSummaryResponseSchema>;

export const auJobTypeSchema = z.enum(["all", "updates", "deletes"]);
const outputAuJobTypeSchema = z.enum(["all", "updates", "deletes"]);
export type AuJobType = z.output<typeof outputAuJobTypeSchema>;

export const getAuJobDetailsRequestSchema = z.object({
    month: z.string().min(4).max(7),
    modifiedTypeFilter: auJobTypeSchema.optional(),
    paging: pagingSchema.optional(),
});
const outputGetAuJobDetailsRequestSchema = z.object({
    month: z.string(),
    modifiedTypeFilter: outputAuJobTypeSchema.optional(),
    paging: outputPagingSchema.optional(),
});
export type GetAuJobDetailsRequest = z.output<typeof outputGetAuJobDetailsRequestSchema>;

export const auDetailsSchema = z.object({
    customerProfileID: integerSchema,
    customerPaymentProfileID: integerSchema,
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    updateTimeUTC: z.string(),
    auReasonCode: z.string(),
    reasonDescription: z.string(),
});
const outputAuDetailsSchema = z.object({
    customerProfileID: z.number(),
    customerPaymentProfileID: z.number(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    updateTimeUTC: z.string(),
    auReasonCode: z.string(),
    reasonDescription: z.string(),
});
export type AuDetails = z.output<typeof outputAuDetailsSchema>;

export const auUpdateSchema = auDetailsSchema.and(
    z.object({ newCreditCard: creditCardMaskedSchema, oldCreditCard: creditCardMaskedSchema }),
);
const outputAuUpdateSchema = outputAuDetailsSchema.and(
    z.object({
        newCreditCard: outputCreditCardMaskedSchema,
        oldCreditCard: outputCreditCardMaskedSchema,
    }),
);
export type AuUpdate = z.output<typeof outputAuUpdateSchema>;

export const auDeleteSchema = auDetailsSchema.and(z.object({ creditCard: creditCardMaskedSchema }));
const outputAuDeleteSchema = outputAuDetailsSchema.and(
    z.object({ creditCard: outputCreditCardMaskedSchema }),
);
export type AuDelete = z.output<typeof outputAuDeleteSchema>;

export const listOfAuDetailsSchema = z.union([
    z.object({ auUpdate: auUpdateSchema.optional() }),
    z.object({ auDelete: auDeleteSchema.optional() }),
]);
const outputListOfAuDetailsSchema = z.union([
    z.object({ auUpdate: outputAuUpdateSchema.optional() }),
    z.object({ auDelete: outputAuDeleteSchema.optional() }),
]);
export type ListOfAuDetails = z.output<typeof outputListOfAuDetailsSchema>;

export const getAuJobDetailsResponseSchema = z.object({
    totalNumInResultSet: integerSchema.optional(),
    auDetails: listOfAuDetailsSchema.optional(),
});
const outputGetAuJobDetailsResponseSchema = z.object({
    totalNumInResultSet: z.number().optional(),
    auDetails: outputListOfAuDetailsSchema.optional(),
});
export type GetAuJobDetailsResponse = z.output<typeof outputGetAuJobDetailsResponseSchema>;

export const getMerchantDetailsRequestSchema = z.object({});
const outputGetMerchantDetailsRequestSchema = z.object({});
export type GetMerchantDetailsRequest = z.output<typeof outputGetMerchantDetailsRequestSchema>;

export const currencyCodeSchema = z.string().min(3).max(3);
const outputCurrencyCodeSchema = z.string();
export type CurrencyCode = z.output<typeof outputCurrencyCodeSchema>;

export const arrayOfCurrencyCodeSchema = createUnwrapSchema(
    createMaybeArraySchema(currencyCodeSchema, outputCurrencyCodeSchema),
    z.array(outputCurrencyCodeSchema),
    "currency",
);
const outputArrayOfCurrencyCodeSchema = z.array(outputCurrencyCodeSchema);
export type ArrayOfCurrencyCode = z.output<typeof outputArrayOfCurrencyCodeSchema>;

export const arrayOfCardSchema = createUnwrapSchema(
    createMaybeArraySchema(z.string(), z.string(), { max: 30 }),
    z.array(z.string()),
    "cardType",
);
const outputArrayOfCardSchema = z.array(z.string());
export type ArrayOfCard = z.output<typeof outputArrayOfCardSchema>;

export const processorSchema = z.object({
    name: z.string().max(255),
    id: integerSchema,
    cardTypes: arrayOfCardSchema.optional(),
});
const outputProcessorSchema = z.object({
    name: z.string(),
    id: z.number(),
    cardTypes: outputArrayOfCardSchema.optional(),
});
export type Processor = z.output<typeof outputProcessorSchema>;

export const arrayOfProcessorSchema = createUnwrapSchema(
    createMaybeArraySchema(processorSchema, outputProcessorSchema),
    z.array(outputProcessorSchema),
    "processor",
);
const outputArrayOfProcessorSchema = z.array(outputProcessorSchema);
export type ArrayOfProcessor = z.output<typeof outputArrayOfProcessorSchema>;

export const marketSchema = z.string().max(50);
const outputMarketSchema = z.string();
export type Market = z.output<typeof outputMarketSchema>;

export const arrayOfMarketSchema = createUnwrapSchema(
    createMaybeArraySchema(marketSchema, outputMarketSchema),
    z.array(outputMarketSchema),
    "marketType",
);
const outputArrayOfMarketSchema = z.array(outputMarketSchema);
export type ArrayOfMarket = z.output<typeof outputArrayOfMarketSchema>;

export const productCodeSchema = z.string().max(3);
const outputProductCodeSchema = z.string();
export type ProductCode = z.output<typeof outputProductCodeSchema>;

export const arrayOfProductCodeSchema = createUnwrapSchema(
    createMaybeArraySchema(productCodeSchema, outputProductCodeSchema),
    z.array(outputProductCodeSchema),
    "productCode",
);
const outputArrayOfProductCodeSchema = z.array(outputProductCodeSchema);
export type ArrayOfProductCode = z.output<typeof outputArrayOfProductCodeSchema>;

export const paymentMethodsTypeSchema = z.enum([
    "Visa",
    "MasterCard",
    "Discover",
    "AmericanExpress",
    "DinersClub",
    "JCB",
    "EnRoute",
    "Echeck",
    "Paypal",
    "VisaCheckout",
    "ApplePay",
    "AndroidPay",
    "GooglePay",
]);
const outputPaymentMethodsTypeSchema = z.enum([
    "Visa",
    "MasterCard",
    "Discover",
    "AmericanExpress",
    "DinersClub",
    "JCB",
    "EnRoute",
    "Echeck",
    "Paypal",
    "VisaCheckout",
    "ApplePay",
    "AndroidPay",
    "GooglePay",
]);
export type PaymentMethodsType = z.output<typeof outputPaymentMethodsTypeSchema>;

export const arrayOfPaymentMethodSchema = createUnwrapSchema(
    createMaybeArraySchema(paymentMethodsTypeSchema, outputPaymentMethodsTypeSchema),
    z.array(outputPaymentMethodsTypeSchema),
    "paymentMethod",
);
const outputArrayOfPaymentMethodSchema = z.array(outputPaymentMethodsTypeSchema);
export type ArrayOfPaymentMethod = z.output<typeof outputArrayOfPaymentMethodSchema>;

export const getMerchantDetailsResponseSchema = z.object({
    isTestMode: z.boolean().optional(),
    processors: arrayOfProcessorSchema,
    merchantName: z.string(),
    gatewayId: numericStringSchema,
    marketTypes: arrayOfMarketSchema,
    productCodes: arrayOfProductCodeSchema,
    paymentMethods: arrayOfPaymentMethodSchema,
    currencies: arrayOfCurrencyCodeSchema,
    publicClientKey: z.string().optional(),
    businessInformation: customerAddressSchema.optional(),
    merchantTimeZone: z.string().max(100).optional(),
    contactDetails: arrayOfContactDetailSchema.optional(),
});
const outputGetMerchantDetailsResponseSchema = z.object({
    isTestMode: z.boolean().optional(),
    processors: outputArrayOfProcessorSchema,
    merchantName: z.string(),
    gatewayId: outputNumericStringSchema,
    marketTypes: outputArrayOfMarketSchema,
    productCodes: outputArrayOfProductCodeSchema,
    paymentMethods: outputArrayOfPaymentMethodSchema,
    currencies: outputArrayOfCurrencyCodeSchema,
    publicClientKey: z.string().optional(),
    businessInformation: outputCustomerAddressSchema.optional(),
    merchantTimeZone: z.string().optional(),
    contactDetails: outputArrayOfContactDetailSchema.optional(),
});
export type GetMerchantDetailsResponse = z.output<typeof outputGetMerchantDetailsResponseSchema>;

export const updateMerchantDetailsRequestSchema = z.object({ isTestMode: z.boolean() });
const outputUpdateMerchantDetailsRequestSchema = z.object({ isTestMode: z.boolean() });
export type UpdateMerchantDetailsRequest = z.output<
    typeof outputUpdateMerchantDetailsRequestSchema
>;

export const updateMerchantDetailsResponseSchema = z.object({});
const outputUpdateMerchantDetailsResponseSchema = z.object({});
export type UpdateMerchantDetailsResponse = z.output<
    typeof outputUpdateMerchantDetailsResponseSchema
>;

export const getCustomerPaymentProfileNonceRequestSchema = z.object({
    connectedAccessToken: z.string(),
    customerProfileId: numericStringSchema,
    customerPaymentProfileId: numericStringSchema,
});
const outputGetCustomerPaymentProfileNonceRequestSchema = z.object({
    connectedAccessToken: z.string(),
    customerProfileId: outputNumericStringSchema,
    customerPaymentProfileId: outputNumericStringSchema,
});
export type GetCustomerPaymentProfileNonceRequest = z.output<
    typeof outputGetCustomerPaymentProfileNonceRequestSchema
>;

export const getCustomerPaymentProfileNonceResponseSchema = z.object({
    opaqueData: opaqueDataSchema.optional(),
});
const outputGetCustomerPaymentProfileNonceResponseSchema = z.object({
    opaqueData: outputOpaqueDataSchema.optional(),
});
export type GetCustomerPaymentProfileNonceResponse = z.output<
    typeof outputGetCustomerPaymentProfileNonceResponseSchema
>;
