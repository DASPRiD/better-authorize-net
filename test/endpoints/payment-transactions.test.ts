import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { PaymentTransactionEndpoints } from "../../src/index.js";
import { testEndpoint } from "../test-helpers.js";

describe("PaymentTransactionEndpoints", () => {
    describe("createTransaction", () => {
        it("authCaptureTransaction - charge a credit card", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "authCaptureTransaction",
                            amount: new Decimal("5"),
                            payment: {
                                creditCard: {
                                    cardNumber: "5424000000000015",
                                    expirationDate: "2025-12",
                                    cardCode: "999",
                                },
                            },
                            order: {
                                invoiceNumber: "INV-12345",
                                description: "Product Description",
                            },
                            billTo: {
                                firstName: "Ellen",
                                lastName: "Johnson",
                                company: "Souveniropolis",
                                address: "14 Main Street",
                                city: "Pecan Springs",
                                state: "TX",
                                zip: "44628",
                                country: "US",
                            },
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "authCaptureTransaction",
                            amount: "5",
                            payment: {
                                creditCard: {
                                    cardNumber: "5424000000000015",
                                    expirationDate: "2025-12",
                                    cardCode: "999",
                                },
                            },
                            order: {
                                invoiceNumber: "INV-12345",
                                description: "Product Description",
                            },
                            billTo: {
                                firstName: "Ellen",
                                lastName: "Johnson",
                                company: "Souveniropolis",
                                address: "14 Main Street",
                                city: "Pecan Springs",
                                state: "TX",
                                zip: "44628",
                                country: "US",
                            },
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "HW617E",
                            avsResultCode: "Y",
                            cvvResultCode: "P",
                            cavvResultCode: "2",
                            transId: "2157047189",
                            refTransID: "",
                            transHash: "0B428D8A928AAC61121AF2F6EAC5FF3F",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                            userFields: { userField: [] },
                            transHashSha2: "",
                            SupplementalDataQualificationIndicator: 0,
                            networkTransId: "123456789012345",
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "HW617E",
                            avsResultCode: "Y",
                            cvvResultCode: "P",
                            cavvResultCode: "2",
                            transId: "2157047189",
                            refTransID: "",
                            transHash: "0B428D8A928AAC61121AF2F6EAC5FF3F",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                            userFields: [],
                            transHashSha2: "",
                            networkTransId: "123456789012345",
                        },
                    },
                },
            );
        });

        it("authOnlyTransaction - authorize a credit card", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "authOnlyTransaction",
                            amount: new Decimal("10.50"),
                            payment: {
                                creditCard: {
                                    cardNumber: "4111111111111111",
                                    expirationDate: "2026-03",
                                    cardCode: "123",
                                },
                            },
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "authOnlyTransaction",
                            amount: "10.5",
                            payment: {
                                creditCard: {
                                    cardNumber: "4111111111111111",
                                    expirationDate: "2026-03",
                                    cardCode: "123",
                                },
                            },
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "ABC123",
                            avsResultCode: "Y",
                            cvvResultCode: "M",
                            cavvResultCode: "2",
                            transId: "2148061809",
                            refTransID: "",
                            transHash: "1234567890ABCDEF",
                            testRequest: "0",
                            accountNumber: "XXXX1111",
                            accountType: "Visa",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                            userFields: { userField: [] },
                            transHashSha2: "",
                            SupplementalDataQualificationIndicator: 0,
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "ABC123",
                            avsResultCode: "Y",
                            cvvResultCode: "M",
                            cavvResultCode: "2",
                            transId: "2148061809",
                            refTransID: "",
                            transHash: "1234567890ABCDEF",
                            testRequest: "0",
                            accountNumber: "XXXX1111",
                            accountType: "Visa",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                            userFields: [],
                            transHashSha2: "",
                        },
                    },
                },
            );
        });

        it("priorAuthCaptureTransaction - capture previously authorized amount", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "priorAuthCaptureTransaction",
                            amount: new Decimal("5"),
                            refTransId: "1234567890",
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "priorAuthCaptureTransaction",
                            amount: "5",
                            refTransId: "1234567890",
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "CAPTURE1",
                            avsResultCode: "P",
                            cvvResultCode: "P",
                            cavvResultCode: "2",
                            transId: "2148061810",
                            refTransID: "1234567890",
                            transHash: "ABCDEF1234567890",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                            userFields: { userField: [] },
                            transHashSha2: "",
                            SupplementalDataQualificationIndicator: 0,
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "CAPTURE1",
                            avsResultCode: "P",
                            cvvResultCode: "P",
                            cavvResultCode: "2",
                            transId: "2148061810",
                            refTransID: "1234567890",
                            transHash: "ABCDEF1234567890",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                            userFields: [],
                            transHashSha2: "",
                        },
                    },
                },
            );
        });

        it("refundTransaction - refund a transaction", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "refundTransaction",
                            amount: new Decimal("5.00"),
                            payment: {
                                creditCard: {
                                    cardNumber: "0015",
                                    expirationDate: "XXXX",
                                },
                            },
                            refTransId: "1234567890",
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "refundTransaction",
                            amount: "5",
                            payment: {
                                creditCard: {
                                    cardNumber: "0015",
                                    expirationDate: "XXXX",
                                },
                            },
                            refTransId: "1234567890",
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "",
                            avsResultCode: "P",
                            cvvResultCode: "",
                            cavvResultCode: "",
                            transId: "2148061811",
                            refTransID: "1234567890",
                            transHash: "REFUND1234567890",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                            userFields: { userField: [] },
                            transHashSha2: "",
                            SupplementalDataQualificationIndicator: 0,
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "",
                            avsResultCode: "P",
                            cvvResultCode: "",
                            cavvResultCode: "",
                            transId: "2148061811",
                            refTransID: "1234567890",
                            transHash: "REFUND1234567890",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                            userFields: [],
                            transHashSha2: "",
                        },
                    },
                },
            );
        });

        it("voidTransaction - void a transaction", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "voidTransaction",
                            refTransId: "1234567890",
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "voidTransaction",
                            refTransId: "1234567890",
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "",
                            avsResultCode: "P",
                            cvvResultCode: "P",
                            cavvResultCode: "2",
                            transId: "2148061812",
                            refTransID: "1234567890",
                            transHash: "VOID1234567890AB",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                            userFields: { userField: [] },
                            transHashSha2: "",
                            SupplementalDataQualificationIndicator: 0,
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "",
                            avsResultCode: "P",
                            cvvResultCode: "P",
                            cavvResultCode: "2",
                            transId: "2148061812",
                            refTransID: "1234567890",
                            transHash: "VOID1234567890AB",
                            testRequest: "0",
                            accountNumber: "XXXX0015",
                            accountType: "",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                            userFields: [],
                            transHashSha2: "",
                        },
                    },
                },
            );
        });

        it("captureOnlyTransaction - capture funds authorized through another channel", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "captureOnlyTransaction",
                            amount: new Decimal("5"),
                            payment: {
                                creditCard: {
                                    cardNumber: "5424000000000015",
                                    expirationDate: "2025-12",
                                    cardCode: "999",
                                },
                            },
                            authCode: "ROHNFQ",
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "captureOnlyTransaction",
                            amount: "5",
                            payment: {
                                creditCard: {
                                    cardNumber: "5424000000000015",
                                    expirationDate: "2025-12",
                                    cardCode: "999",
                                },
                            },
                            authCode: "ROHNFQ",
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "ROHNFQ",
                            avsResultCode: "P",
                            cvvResultCode: "",
                            cavvResultCode: "",
                            transId: "2149186851",
                            refTransID: "",
                            transHash: "E385C13A873EC470BB9AD7C2C9D02D13",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "ROHNFQ",
                            avsResultCode: "P",
                            cvvResultCode: "",
                            cavvResultCode: "",
                            transId: "2149186851",
                            refTransID: "",
                            transHash: "E385C13A873EC470BB9AD7C2C9D02D13",
                            accountNumber: "XXXX0015",
                            accountType: "Mastercard",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                        },
                    },
                },
            );
        });

        it("debit-a-bank-account", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "createTransaction",
                {
                    userInput: {
                        transactionRequest: {
                            transactionType: "authCaptureTransaction",
                            amount: new Decimal("5"),
                            payment: {
                                bankAccount: {
                                    accountType: "checking",
                                    routingNumber: "121042882",
                                    accountNumber: "123456789",
                                    nameOnAccount: "John Doe",
                                },
                            },
                            billTo: {
                                firstName: "Ellen",
                                lastName: "Johnson",
                                company: "Souveniropolis",
                                address: "14 Main Street",
                                city: "Pecan Springs",
                                state: "TX",
                                zip: "44628",
                                country: "US",
                            },
                        },
                    },
                    expectedEncoded: {
                        transactionRequest: {
                            transactionType: "authCaptureTransaction",
                            amount: "5",
                            payment: {
                                bankAccount: {
                                    accountType: "checking",
                                    routingNumber: "121042882",
                                    accountNumber: "123456789",
                                    nameOnAccount: "John Doe",
                                },
                            },
                            billTo: {
                                firstName: "Ellen",
                                lastName: "Johnson",
                                company: "Souveniropolis",
                                address: "14 Main Street",
                                city: "Pecan Springs",
                                state: "TX",
                                zip: "44628",
                                country: "US",
                            },
                        },
                    },
                    serverResponse: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "",
                            avsResultCode: "P",
                            cvvResultCode: "",
                            cavvResultCode: "",
                            transId: "2149186917",
                            refTransID: "",
                            transHash: "803D51FDF65043182BF264B8BAA8B2DF",
                            accountNumber: "XXXXX6789",
                            accountType: "eCheck",
                            messages: {
                                message: [
                                    {
                                        code: "1",
                                        description: "This transaction has been approved.",
                                    },
                                ],
                            },
                        },
                    },
                    expectedDecoded: {
                        transactionResponse: {
                            responseCode: "1",
                            authCode: "",
                            avsResultCode: "P",
                            cvvResultCode: "",
                            cavvResultCode: "",
                            transId: "2149186917",
                            refTransID: "",
                            transHash: "803D51FDF65043182BF264B8BAA8B2DF",
                            accountNumber: "XXXXX6789",
                            accountType: "eCheck",
                            messages: [
                                {
                                    code: "1",
                                    description: "This transaction has been approved.",
                                },
                            ],
                        },
                    },
                },
            );
        });
    });

    describe("updateSplitTenderGroup", () => {
        it("should update split tender group", async () => {
            await testEndpoint(
                (send) => new PaymentTransactionEndpoints(send),
                "updateSplitTenderGroup",
                {
                    userInput: {
                        splitTenderId: "987654",
                        splitTenderStatus: "voided",
                    },
                    expectedEncoded: {
                        splitTenderId: "987654",
                        splitTenderStatus: "voided",
                    },
                    serverResponse: {},
                    expectedDecoded: {},
                },
            );
        });
    });
});
