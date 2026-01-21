import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { AcceptSuiteEndpoints } from "../../src/index.js";
import { testEndpoint } from "../test-helpers.js";

describe("AcceptSuiteEndpoints", () => {
    describe("getAcceptPaymentPage", () => {
        it("should get accept payment page token", async () => {
            await testEndpoint((send) => new AcceptSuiteEndpoints(send), "getAcceptPaymentPage", {
                userInput: {
                    transactionRequest: {
                        transactionType: "authCaptureTransaction",
                        amount: new Decimal("10"),
                    },
                    hostedPaymentSettings: [
                        {
                            settingName: "hostedPaymentReturnOptions",
                            settingValue:
                                '{"showReceipt": true, "url": "https://example.com/return"}',
                        },
                    ],
                },
                expectedEncoded: {
                    transactionRequest: {
                        transactionType: "authCaptureTransaction",
                        amount: "10",
                    },
                    hostedPaymentSettings: {
                        setting: [
                            {
                                settingName: "hostedPaymentReturnOptions",
                                settingValue:
                                    '{"showReceipt": true, "url": "https://example.com/return"}',
                            },
                        ],
                    },
                },
                serverResponse: {
                    token: "ABC123TOKEN456",
                },
                expectedDecoded: {
                    token: "ABC123TOKEN456",
                },
            });
        });
    });

    describe("getAcceptCustomerProfilePage", () => {
        it("should get accept customer profile page token", async () => {
            await testEndpoint(
                (send) => new AcceptSuiteEndpoints(send),
                "getAcceptCustomerProfilePage",
                {
                    userInput: {
                        customerProfileId: "123456",
                        hostedProfileSettings: [
                            {
                                settingName: "hostedProfileReturnUrl",
                                settingValue: "https://example.com/profile/return",
                            },
                        ],
                    },
                    expectedEncoded: {
                        customerProfileId: "123456",
                        hostedProfileSettings: {
                            setting: [
                                {
                                    settingName: "hostedProfileReturnUrl",
                                    settingValue: "https://example.com/profile/return",
                                },
                            ],
                        },
                    },
                    serverResponse: {
                        token: "DEF789TOKEN012",
                    },
                    expectedDecoded: {
                        token: "DEF789TOKEN012",
                    },
                },
            );
        });
    });
});
