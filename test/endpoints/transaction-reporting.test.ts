import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { TransactionReportingEndpoints } from "../../src/index.js";
import { testEndpoint } from "../test-helpers.js";

describe("TransactionReportingEndpoints", () => {
    describe("getTransactionDetails", () => {
        it("should get transaction details", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getTransactionDetails",
                {
                    userInput: {
                        transId: "2148061808",
                    },
                    expectedEncoded: {
                        transId: "2148061808",
                    },
                    serverResponse: {
                        transaction: {
                            transId: "2148061808",
                            submitTimeUTC: "2025-01-15T10:30:00Z",
                            submitTimeLocal: "2025-01-15T02:30:00Z",
                            transactionType: "authCaptureTransaction",
                            transactionStatus: "settledSuccessfully",
                            responseCode: "1",
                            responseReasonCode: "1",
                            responseReasonDescription: "This transaction has been approved.",
                            authCode: "UGELQC",
                            AVSResponse: "Y",
                            batch: {
                                batchId: "12345",
                                settlementTimeUTC: "2025-01-16T00:00:00Z",
                                settlementTimeLocal: "2025-01-15T16:00:00Z",
                                settlementState: "settledSuccessfully",
                            },
                            order: {
                                invoiceNumber: "INV-12345",
                                description: "Product Description",
                            },
                            authAmount: "5",
                            settleAmount: "5",
                            payment: {
                                creditCard: {
                                    cardNumber: "XXXX0015",
                                    expirationDate: "XXXX",
                                    cardType: "Mastercard",
                                },
                            },
                            customer: {},
                            billTo: {
                                phoneNumber: "",
                                faxNumber: "",
                            },
                            recurringBilling: false,
                            product: "",
                            marketType: "",
                            tapToPhone: false,
                        },
                    },
                    expectedDecoded: {
                        transaction: {
                            transId: "2148061808",
                            submitTimeUTC: "2025-01-15T10:30:00Z",
                            submitTimeLocal: "2025-01-15T02:30:00Z",
                            transactionType: "authCaptureTransaction",
                            transactionStatus: "settledSuccessfully",
                            responseCode: 1,
                            responseReasonCode: 1,
                            responseReasonDescription: "This transaction has been approved.",
                            authCode: "UGELQC",
                            AVSResponse: "Y",
                            batch: {
                                batchId: "12345",
                                settlementTimeUTC: "2025-01-16T00:00:00Z",
                                settlementTimeLocal: "2025-01-15T16:00:00Z",
                                settlementState: "settledSuccessfully",
                            },
                            order: {
                                invoiceNumber: "INV-12345",
                                description: "Product Description",
                            },
                            authAmount: new Decimal("5"),
                            settleAmount: new Decimal("5"),
                            payment: {
                                creditCard: {
                                    cardNumber: "XXXX0015",
                                    expirationDate: "XXXX",
                                    cardType: "Mastercard",
                                },
                            },
                            customer: {},
                            billTo: {
                                phoneNumber: "",
                                faxNumber: "",
                            },
                            recurringBilling: false,
                            product: "",
                            marketType: "",
                            tapToPhone: false,
                        },
                    },
                },
            );
        });
    });

    describe("getSettledBatchList", () => {
        it("should get settled batch list", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getSettledBatchList",
                {
                    userInput: {
                        firstSettlementDate: "2016-01-01T08:15:30Z",
                        lastSettlementDate: "2016-01-30T08:15:30Z",
                        includeStatistics: true,
                    },
                    expectedEncoded: {
                        firstSettlementDate: "2016-01-01T08:15:30Z",
                        lastSettlementDate: "2016-01-30T08:15:30Z",
                        includeStatistics: true,
                    },
                    serverResponse: {
                        batchList: {
                            batch: [
                                {
                                    batchId: "3214864",
                                    settlementTimeUTC: "2016-01-18T08:15:30.000Z",
                                    settlementTimeLocal: "2016-01-18T01:15:30.000Z",
                                    settlementState: "settledSuccessfully",
                                    paymentMethod: "creditCard",
                                    statistics: {
                                        statistic: [
                                            {
                                                accountType: "Visa",
                                                chargeAmount: "318.00",
                                                chargeCount: "3",
                                                refundAmount: "50.00",
                                                refundCount: "1",
                                                voidCount: "0",
                                                declineCount: "0",
                                                errorCount: "0",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    expectedDecoded: {
                        batchList: [
                            {
                                batchId: "3214864",
                                settlementTimeUTC: "2016-01-18T08:15:30.000Z",
                                settlementTimeLocal: "2016-01-18T01:15:30.000Z",
                                settlementState: "settledSuccessfully",
                                paymentMethod: "creditCard",
                                statistics: [
                                    {
                                        accountType: "Visa",
                                        chargeAmount: new Decimal("318"),
                                        chargeCount: 3,
                                        refundAmount: new Decimal("50"),
                                        refundCount: 1,
                                        voidCount: 0,
                                        declineCount: 0,
                                        errorCount: 0,
                                    },
                                ],
                            },
                        ],
                    },
                },
            );
        });
    });

    describe("getUnsettledTransactionList", () => {
        it("should get unsettled transaction list", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getUnsettledTransactionList",
                {
                    userInput: {},
                    expectedEncoded: {},
                    serverResponse: {
                        transactions: {
                            transaction: [
                                {
                                    transId: "2162566217",
                                    submitTimeUTC: "2011-09-01T16:30:49Z",
                                    submitTimeLocal: "2011-09-01T10:30:49Z",
                                    transactionStatus: "authorizedPendingCapture",
                                    invoiceNumber: "60",
                                    firstName: "Ellen",
                                    accountType: "MasterCard",
                                    accountNumber: "XXXX0015",
                                    settleAmount: "1018.88",
                                    hasReturnedItems: false,
                                },
                            ],
                        },
                    },
                    expectedDecoded: {
                        transactions: [
                            {
                                transId: "2162566217",
                                submitTimeUTC: "2011-09-01T16:30:49Z",
                                submitTimeLocal: "2011-09-01T10:30:49Z",
                                transactionStatus: "authorizedPendingCapture",
                                invoiceNumber: "60",
                                firstName: "Ellen",
                                accountType: "MasterCard",
                                accountNumber: "XXXX0015",
                                settleAmount: new Decimal("1018.88"),
                                hasReturnedItems: false,
                            },
                        ],
                    },
                },
            );
        });
    });

    describe("getBatchStatistics", () => {
        it("should get batch statistics", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getBatchStatistics",
                {
                    userInput: {
                        batchId: "1221577",
                    },
                    expectedEncoded: {
                        batchId: "1221577",
                    },
                    serverResponse: {
                        batch: {
                            batchId: "1221577",
                            settlementTimeUTC: "2011-09-01T16:38:54.000Z",
                            settlementTimeLocal: "2011-09-01T10:38:54.000Z",
                            settlementState: "settledSuccessfully",
                            paymentMethod: "creditCard",
                            statistics: {
                                statistic: [
                                    {
                                        accountType: "Visa",
                                        chargeAmount: "318.00",
                                        chargeCount: "3",
                                        refundAmount: "50.00",
                                        refundCount: "1",
                                        voidCount: "0",
                                        declineCount: "0",
                                        errorCount: "0",
                                    },
                                ],
                            },
                        },
                    },
                    expectedDecoded: {
                        batch: {
                            batchId: "1221577",
                            settlementTimeUTC: "2011-09-01T16:38:54.000Z",
                            settlementTimeLocal: "2011-09-01T10:38:54.000Z",
                            settlementState: "settledSuccessfully",
                            paymentMethod: "creditCard",
                            statistics: [
                                {
                                    accountType: "Visa",
                                    chargeAmount: new Decimal("318"),
                                    chargeCount: 3,
                                    refundAmount: new Decimal("50"),
                                    refundCount: 1,
                                    voidCount: 0,
                                    declineCount: 0,
                                    errorCount: 0,
                                },
                            ],
                        },
                    },
                },
            );
        });
    });

    describe("getMerchantDetails", () => {
        it("should get merchant details", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getMerchantDetails",
                {
                    userInput: {},
                    expectedEncoded: {},
                    serverResponse: {
                        isTestMode: true,
                        processors: {
                            processor: {
                                name: "TEST_PROCESSOR",
                                id: "1",
                            },
                        },
                        merchantName: "Test Merchant",
                        gatewayId: "123456",
                        marketTypes: {
                            marketType: "eCommerce",
                        },
                        productCodes: {
                            productCode: "CNP",
                        },
                        paymentMethods: {
                            paymentMethod: ["Visa"],
                        },
                        currencies: {
                            currency: ["USD"],
                        },
                    },
                    expectedDecoded: {
                        isTestMode: true,
                        processors: [
                            {
                                name: "TEST_PROCESSOR",
                                id: 1,
                            },
                        ],
                        merchantName: "Test Merchant",
                        gatewayId: "123456",
                        marketTypes: ["eCommerce"],
                        productCodes: ["CNP"],
                        paymentMethods: ["Visa"],
                        currencies: ["USD"],
                    },
                },
            );
        });
    });

    describe("getAuJobSummary", () => {
        it("should get account updater job summary", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getAuJobSummary",
                {
                    userInput: {
                        month: "2025-01",
                    },
                    expectedEncoded: {
                        month: "2025-01",
                    },
                    serverResponse: {
                        auSummary: {
                            auResponse: {
                                auReasonCode: "CARD_UPDATED",
                                profileCount: "5",
                                reasonDescription: "Card has been updated",
                            },
                        },
                    },
                    expectedDecoded: {
                        auSummary: [
                            {
                                auReasonCode: "CARD_UPDATED",
                                profileCount: 5,
                                reasonDescription: "Card has been updated",
                            },
                        ],
                    },
                },
            );
        });
    });

    describe("getAuJobDetails", () => {
        it("should get account updater job details", async () => {
            await testEndpoint(
                (send) => new TransactionReportingEndpoints(send),
                "getAuJobDetails",
                {
                    userInput: {
                        month: "2025-01",
                        modifiedTypeFilter: "all",
                    },
                    expectedEncoded: {
                        month: "2025-01",
                        modifiedTypeFilter: "all",
                    },
                    serverResponse: {
                        totalNumInResultSet: "1",
                        auDetails: {
                            auUpdate: {
                                customerProfileID: "123456",
                                customerPaymentProfileID: "789012",
                                firstName: "John",
                                lastName: "Doe",
                                updateTimeUTC: "2025-01-15T10:30:00Z",
                                auReasonCode: "CARD_UPDATED",
                                reasonDescription: "Card has been updated",
                                newCreditCard: {
                                    cardNumber: "XXXX1111",
                                    expirationDate: "XXXX",
                                },
                                oldCreditCard: {
                                    cardNumber: "XXXX2222",
                                    expirationDate: "XXXX",
                                },
                            },
                        },
                    },
                    expectedDecoded: {
                        totalNumInResultSet: 1,
                        auDetails: {
                            auUpdate: {
                                customerProfileID: 123456,
                                customerPaymentProfileID: 789012,
                                firstName: "John",
                                lastName: "Doe",
                                updateTimeUTC: "2025-01-15T10:30:00Z",
                                auReasonCode: "CARD_UPDATED",
                                reasonDescription: "Card has been updated",
                                newCreditCard: {
                                    cardNumber: "XXXX1111",
                                    expirationDate: "XXXX",
                                },
                                oldCreditCard: {
                                    cardNumber: "XXXX2222",
                                    expirationDate: "XXXX",
                                },
                            },
                        },
                    },
                },
            );
        });
    });
});
