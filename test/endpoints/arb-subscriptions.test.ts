import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { ArbSubscriptionEndpoints } from "../../src/index.js";
import { testEndpoint } from "../test-helpers.js";

describe("ArbSubscriptionEndpoints", () => {
    describe("createSubscription", () => {
        it("should create a subscription", async () => {
            await testEndpoint((send) => new ArbSubscriptionEndpoints(send), "createSubscription", {
                userInput: {
                    subscription: {
                        name: "Monthly Subscription",
                        paymentSchedule: {
                            interval: {
                                length: 1,
                                unit: "months",
                            },
                            startDate: "2025-02-01",
                            totalOccurrences: 12,
                        },
                        amount: new Decimal("29.99"),
                        payment: {
                            creditCard: {
                                cardNumber: "4111111111111111",
                                expirationDate: "2026-12",
                            },
                        },
                        billTo: {
                            firstName: "Jane",
                            lastName: "Smith",
                        },
                    },
                },
                expectedEncoded: {
                    subscription: {
                        name: "Monthly Subscription",
                        paymentSchedule: {
                            interval: {
                                length: "1",
                                unit: "months",
                            },
                            startDate: "2025-02-01",
                            totalOccurrences: "12",
                        },
                        amount: "29.99",
                        payment: {
                            creditCard: {
                                cardNumber: "4111111111111111",
                                expirationDate: "2026-12",
                            },
                        },
                        billTo: {
                            firstName: "Jane",
                            lastName: "Smith",
                        },
                    },
                },
                serverResponse: {
                    subscriptionId: "987654321",
                    profile: {
                        customerProfileId: "123456789",
                        customerPaymentProfileId: "987654321",
                    },
                },
                expectedDecoded: {
                    subscriptionId: "987654321",
                    profile: {
                        customerProfileId: "123456789",
                        customerPaymentProfileId: "987654321",
                    },
                },
            });
        });
    });

    describe("getSubscriptionStatus", () => {
        it("should get subscription status", async () => {
            await testEndpoint(
                (send) => new ArbSubscriptionEndpoints(send),
                "getSubscriptionStatus",
                {
                    userInput: {
                        subscriptionId: "987654321",
                    },
                    expectedEncoded: {
                        subscriptionId: "987654321",
                    },
                    serverResponse: {
                        status: "active",
                    },
                    expectedDecoded: {
                        status: "active",
                    },
                },
            );
        });
    });

    describe("createSubscription with customer profile", () => {
        it("should create a subscription from customer profile", async () => {
            await testEndpoint((send) => new ArbSubscriptionEndpoints(send), "createSubscription", {
                userInput: {
                    subscription: {
                        name: "Sample subscription",
                        paymentSchedule: {
                            interval: {
                                length: 1,
                                unit: "months",
                            },
                            startDate: "2020-08-30",
                            totalOccurrences: 12,
                            trialOccurrences: 1,
                        },
                        amount: new Decimal("10.29"),
                        trialAmount: new Decimal("0.00"),
                        profile: {
                            customerProfileId: "39931060",
                            customerPaymentProfileId: "36223863",
                            customerAddressId: "37726371",
                        },
                    },
                },
                expectedEncoded: {
                    subscription: {
                        name: "Sample subscription",
                        paymentSchedule: {
                            interval: {
                                length: "1",
                                unit: "months",
                            },
                            startDate: "2020-08-30",
                            totalOccurrences: "12",
                            trialOccurrences: "1",
                        },
                        amount: "10.29",
                        trialAmount: "0",
                        profile: {
                            customerProfileId: "39931060",
                            customerPaymentProfileId: "36223863",
                            customerAddressId: "37726371",
                        },
                    },
                },
                serverResponse: {
                    subscriptionId: "158383",
                    profile: {
                        customerProfileId: "39931060",
                        customerPaymentProfileId: "36223863",
                        customerAddressId: "37726371",
                    },
                },
                expectedDecoded: {
                    subscriptionId: "158383",
                    profile: {
                        customerProfileId: "39931060",
                        customerPaymentProfileId: "36223863",
                        customerAddressId: "37726371",
                    },
                },
            });
        });

        it("should create a subscription with payment info", async () => {
            await testEndpoint((send) => new ArbSubscriptionEndpoints(send), "createSubscription", {
                userInput: {
                    subscription: {
                        name: "Sample subscription",
                        paymentSchedule: {
                            interval: {
                                length: 1,
                                unit: "months",
                            },
                            startDate: "2020-08-30",
                            totalOccurrences: 12,
                            trialOccurrences: 1,
                        },
                        amount: new Decimal("10.29"),
                        trialAmount: new Decimal("0.00"),
                        payment: {
                            creditCard: {
                                cardNumber: "4111111111111111",
                                expirationDate: "2025-12",
                            },
                        },
                        billTo: {
                            firstName: "John",
                            lastName: "Smith",
                        },
                    },
                },
                expectedEncoded: {
                    subscription: {
                        name: "Sample subscription",
                        paymentSchedule: {
                            interval: {
                                length: "1",
                                unit: "months",
                            },
                            startDate: "2020-08-30",
                            totalOccurrences: "12",
                            trialOccurrences: "1",
                        },
                        amount: "10.29",
                        trialAmount: "0",
                        payment: {
                            creditCard: {
                                cardNumber: "4111111111111111",
                                expirationDate: "2025-12",
                            },
                        },
                        billTo: {
                            firstName: "John",
                            lastName: "Smith",
                        },
                    },
                },
                serverResponse: {
                    subscriptionId: "158383",
                    profile: {
                        customerProfileId: "247135",
                        customerPaymentProfileId: "215458",
                        customerAddressId: "189691",
                    },
                },
                expectedDecoded: {
                    subscriptionId: "158383",
                    profile: {
                        customerProfileId: "247135",
                        customerPaymentProfileId: "215458",
                        customerAddressId: "189691",
                    },
                },
            });
        });
    });

    describe("updateSubscription", () => {
        it("should update a subscription", async () => {
            await testEndpoint((send) => new ArbSubscriptionEndpoints(send), "updateSubscription", {
                userInput: {
                    subscriptionId: "100748",
                    subscription: {
                        payment: {
                            creditCard: {
                                cardNumber: "4111111111111111",
                                expirationDate: "2025-12",
                            },
                        },
                    },
                },
                expectedEncoded: {
                    subscriptionId: "100748",
                    subscription: {
                        payment: {
                            creditCard: {
                                cardNumber: "4111111111111111",
                                expirationDate: "2025-12",
                            },
                        },
                    },
                },
                serverResponse: {
                    profile: {
                        customerProfileId: "247135",
                        customerPaymentProfileId: "215458",
                        customerAddressId: "189691",
                    },
                },
                expectedDecoded: {
                    profile: {
                        customerProfileId: "247135",
                        customerPaymentProfileId: "215458",
                        customerAddressId: "189691",
                    },
                },
            });
        });
    });

    describe("cancelSubscription", () => {
        it("should cancel a subscription", async () => {
            await testEndpoint((send) => new ArbSubscriptionEndpoints(send), "cancelSubscription", {
                userInput: {
                    subscriptionId: "100748",
                },
                expectedEncoded: {
                    subscriptionId: "100748",
                },
                serverResponse: {},
                expectedDecoded: {},
            });
        });
    });

    describe("getSubscription", () => {
        it("should get a subscription with transactions", async () => {
            await testEndpoint((send) => new ArbSubscriptionEndpoints(send), "getSubscription", {
                userInput: {
                    subscriptionId: "4818507",
                    includeTransactions: true,
                },
                expectedEncoded: {
                    subscriptionId: "4818507",
                    includeTransactions: true,
                },
                serverResponse: {
                    subscription: {
                        name: "Sample subscription",
                        paymentSchedule: {
                            interval: {
                                length: "7",
                                unit: "days",
                            },
                            startDate: "2017-09-09",
                            totalOccurrences: "9999",
                            trialOccurrences: "1",
                        },
                        amount: "10.29",
                        trialAmount: "1.00",
                        status: "active",
                        profile: {
                            merchantCustomerId: "973",
                            description: "Profile description here",
                            email: "TestEmail5555@domain.com",
                            customerProfileId: "1812912918",
                            paymentProfile: {
                                customerType: "individual",
                                billTo: {
                                    firstName: "Arte",
                                    lastName: "Johnson",
                                    company: "test Co.",
                                    address: "123 Test St.",
                                    city: "Testville",
                                    state: "AZ",
                                    zip: "85282",
                                    country: "US",
                                },
                                customerPaymentProfileId: "1807515631",
                                payment: {
                                    creditCard: {
                                        cardNumber: "XXXX1111",
                                        expirationDate: "XXXX",
                                    },
                                },
                            },
                            shippingProfile: {
                                firstName: "Aaron",
                                lastName: "Wright",
                                company: "Testing, Inc.",
                                address: "123 Testing St.",
                                city: "Lehi",
                                state: "UT",
                                zip: "84043",
                                country: "US",
                                phoneNumber: "520-254-5038",
                                customerAddressId: "1811684122",
                            },
                        },
                        arbTransactions: {
                            arbTransaction: [
                                {
                                    response: "The credit card has expired.",
                                    submitTimeUTC: "2017-09-14T18:40:31.247Z",
                                    payNum: "2",
                                    attemptNum: "1",
                                },
                            ],
                        },
                    },
                },
                expectedDecoded: {
                    subscription: {
                        name: "Sample subscription",
                        paymentSchedule: {
                            interval: {
                                length: 7,
                                unit: "days",
                            },
                            startDate: "2017-09-09",
                            totalOccurrences: 9999,
                            trialOccurrences: 1,
                        },
                        amount: new Decimal("10.29"),
                        trialAmount: new Decimal("1.00"),
                        status: "active",
                        profile: {
                            merchantCustomerId: "973",
                            description: "Profile description here",
                            email: "TestEmail5555@domain.com",
                            customerProfileId: "1812912918",
                            paymentProfile: {
                                customerType: "individual",
                                billTo: {
                                    firstName: "Arte",
                                    lastName: "Johnson",
                                    company: "test Co.",
                                    address: "123 Test St.",
                                    city: "Testville",
                                    state: "AZ",
                                    zip: "85282",
                                    country: "US",
                                },
                                customerPaymentProfileId: "1807515631",
                                payment: {
                                    creditCard: {
                                        cardNumber: "XXXX1111",
                                        expirationDate: "XXXX",
                                    },
                                },
                            },
                            shippingProfile: {
                                firstName: "Aaron",
                                lastName: "Wright",
                                company: "Testing, Inc.",
                                address: "123 Testing St.",
                                city: "Lehi",
                                state: "UT",
                                zip: "84043",
                                country: "US",
                                phoneNumber: "520-254-5038",
                                customerAddressId: "1811684122",
                            },
                        },
                        arbTransactions: [
                            {
                                response: "The credit card has expired.",
                                submitTimeUTC: "2017-09-14T18:40:31.247Z",
                                payNum: 2,
                                attemptNum: 1,
                            },
                        ],
                    },
                },
            });
        });
    });
});
