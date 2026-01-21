import { describe, it } from "node:test";
import { Decimal } from "decimal.js";
import { CustomerProfileEndpoints } from "../../src/index.js";
import { testEndpoint } from "../test-helpers.js";

describe("CustomerProfileEndpoints", () => {
    describe("createCustomerProfile", () => {
        it("should create a customer profile", async () => {
            await testEndpoint(
                (send) => new CustomerProfileEndpoints(send),
                "createCustomerProfile",
                {
                    userInput: {
                        profile: {
                            merchantCustomerId: "Merchant_Customer_ID",
                            description: "Profile description here",
                            email: "customer-profile-email@here.com",
                            paymentProfiles: [
                                {
                                    customerType: "individual",
                                    payment: {
                                        creditCard: {
                                            cardNumber: "4111111111111111",
                                            expirationDate: "2025-12",
                                        },
                                    },
                                },
                            ],
                            shipToList: [],
                        },
                        validationMode: "testMode",
                    },
                    expectedEncoded: {
                        profile: {
                            merchantCustomerId: "Merchant_Customer_ID",
                            description: "Profile description here",
                            email: "customer-profile-email@here.com",
                            paymentProfiles: [
                                {
                                    customerType: "individual",
                                    payment: {
                                        creditCard: {
                                            cardNumber: "4111111111111111",
                                            expirationDate: "2025-12",
                                        },
                                    },
                                },
                            ],
                            shipToList: [],
                        },
                        validationMode: "testMode",
                    },
                    serverResponse: {
                        customerProfileId: "527262",
                        customerPaymentProfileIdList: {
                            numericString: ["86"],
                        },
                        customerShippingAddressIdList: {
                            numericString: [],
                        },
                        validationDirectResponseList: {
                            string: [
                                "1,1,1,This transaction has been approved.,AJ10K8,Y,10585,none,Test transaction for ValidateCustomerPaymentProfile.,0.00,CC,auth_only,MerchantCustID,Customer FirstName,Customer LastName,,123 Main St.,Bellevue,WA,98004,US,123-123-1235,,customer-profile-email@here.com,,,,,,,,,0.00,0.00,0.00,FALSE,none,675F28BF1C590B17CD2892CD75EC4B67,P,2,,,,,,,,,,,XXXX1111,Visa,,,,,,,0STSMT7WLO5D80U0KJR4Z9A,,,,,,,,,,",
                            ],
                        },
                    },
                    expectedDecoded: {
                        customerProfileId: "527262",
                        customerPaymentProfileIdList: ["86"],
                        customerShippingAddressIdList: [],
                        validationDirectResponseList: [
                            "1,1,1,This transaction has been approved.,AJ10K8,Y,10585,none,Test transaction for ValidateCustomerPaymentProfile.,0.00,CC,auth_only,MerchantCustID,Customer FirstName,Customer LastName,,123 Main St.,Bellevue,WA,98004,US,123-123-1235,,customer-profile-email@here.com,,,,,,,,,0.00,0.00,0.00,FALSE,none,675F28BF1C590B17CD2892CD75EC4B67,P,2,,,,,,,,,,,XXXX1111,Visa,,,,,,,0STSMT7WLO5D80U0KJR4Z9A,,,,,,,,,,",
                        ],
                    },
                },
            );
        });
    });
    describe("getCustomerProfile", () => {
        it("should get customer profile", async () => {
            await testEndpoint((send) => new CustomerProfileEndpoints(send), "getCustomerProfile", {
                userInput: {
                    customerProfileId: "123456789",
                    includeIssuerInfo: true,
                },
                expectedEncoded: {
                    customerProfileId: "123456789",
                    includeIssuerInfo: true,
                },
                serverResponse: {
                    profile: {
                        merchantCustomerId: "CUST-12345",
                        description: "John Doe Customer Profile",
                        email: "john.doe@example.com",
                        customerProfileId: "123456789",
                        paymentProfiles: [
                            {
                                billTo: {
                                    firstName: "John",
                                    lastName: "Doe",
                                    address: "123 Main St",
                                    city: "Seattle",
                                    state: "WA",
                                    zip: "98101",
                                    country: "US",
                                },
                                customerPaymentProfileId: "987654321",
                                payment: {
                                    creditCard: {
                                        cardNumber: "XXXX1111",
                                        expirationDate: "XXXX",
                                    },
                                },
                            },
                        ],
                        shipToList: [],
                    },
                    subscriptionIds: {
                        subscriptionId: [],
                    },
                },
                expectedDecoded: {
                    profile: {
                        merchantCustomerId: "CUST-12345",
                        description: "John Doe Customer Profile",
                        email: "john.doe@example.com",
                        customerProfileId: "123456789",
                        paymentProfiles: [
                            {
                                billTo: {
                                    firstName: "John",
                                    lastName: "Doe",
                                    address: "123 Main St",
                                    city: "Seattle",
                                    state: "WA",
                                    zip: "98101",
                                    country: "US",
                                },
                                customerPaymentProfileId: "987654321",
                                payment: {
                                    creditCard: {
                                        cardNumber: "XXXX1111",
                                        expirationDate: "XXXX",
                                    },
                                },
                            },
                        ],
                        shipToList: [],
                    },
                    subscriptionIds: [],
                },
            });
        });

        it("should get customer profile with issuer info", async () => {
            const serverResponse = {
                profile: {
                    paymentProfiles: [
                        {
                            customerPaymentProfileId: "87",
                            payment: {
                                creditCard: {
                                    cardNumber: "XXXX1111",
                                    expirationDate: "XXXX",
                                    cardType: "Visa",
                                    issuerNumber: "411111",
                                },
                            },
                            originalNetworkTransId: "0TN1VE648DFCJSHQ81GZH9F",
                            originalAuthAmount: "0",
                            billTo: {
                                phoneNumber: "000-000-0000",
                                firstName: "John",
                                lastName: "Doe",
                                address: "123 Main St.",
                                city: "Bellevue",
                                state: "WA",
                                zip: "98004",
                                country: "US",
                            },
                        },
                    ],
                    profileType: "regular",
                    customerProfileId: "527262",
                    merchantCustomerId: "MerchantCustID",
                    description: "Profile description here",
                    email: "customer-profile-email@here.com",
                },
            };

            await testEndpoint((send) => new CustomerProfileEndpoints(send), "getCustomerProfile", {
                userInput: {
                    customerProfileId: "10000",
                    includeIssuerInfo: true,
                },
                expectedEncoded: {
                    customerProfileId: "10000",
                    includeIssuerInfo: true,
                },
                serverResponse,
                expectedDecoded: {
                    profile: {
                        paymentProfiles: [
                            {
                                customerPaymentProfileId: "87",
                                payment: {
                                    creditCard: {
                                        cardNumber: "XXXX1111",
                                        expirationDate: "XXXX",
                                        cardType: "Visa",
                                        issuerNumber: "411111",
                                    },
                                },
                                originalNetworkTransId: "0TN1VE648DFCJSHQ81GZH9F",
                                originalAuthAmount: new Decimal("0"),
                                billTo: {
                                    phoneNumber: "000-000-0000",
                                    firstName: "John",
                                    lastName: "Doe",
                                    address: "123 Main St.",
                                    city: "Bellevue",
                                    state: "WA",
                                    zip: "98004",
                                    country: "US",
                                },
                            },
                        ],
                        profileType: "regular",
                        shipToList: [],
                        customerProfileId: "527262",
                        merchantCustomerId: "MerchantCustID",
                        description: "Profile description here",
                        email: "customer-profile-email@here.com",
                    },
                },
            });
        });
    });

    describe("getCustomerProfileIds", () => {
        it("should get all customer profile IDs", async () => {
            await testEndpoint(
                (send) => new CustomerProfileEndpoints(send),
                "getCustomerProfileIds",
                {
                    userInput: {},
                    expectedEncoded: {},
                    serverResponse: {
                        ids: {
                            numericString: ["47988", "47997", "48458", "48468", "189118", "190178"],
                        },
                    },
                    expectedDecoded: {
                        ids: ["47988", "47997", "48458", "48468", "189118", "190178"],
                    },
                },
            );
        });
    });

    describe("updateCustomerProfile", () => {
        it("should update a customer profile", async () => {
            await testEndpoint(
                (send) => new CustomerProfileEndpoints(send),
                "updateCustomerProfile",
                {
                    userInput: {
                        profile: {
                            merchantCustomerId: "custId123",
                            description: "some description",
                            email: "newaddress@example.com",
                            customerProfileId: "10000",
                        },
                    },
                    expectedEncoded: {
                        profile: {
                            merchantCustomerId: "custId123",
                            description: "some description",
                            email: "newaddress@example.com",
                            customerProfileId: "10000",
                        },
                    },
                    serverResponse: {},
                    expectedDecoded: {},
                },
            );
        });
    });

    describe("deleteCustomerProfile", () => {
        it("should delete a customer profile", async () => {
            await testEndpoint(
                (send) => new CustomerProfileEndpoints(send),
                "deleteCustomerProfile",
                {
                    userInput: {
                        customerProfileId: "10000",
                    },
                    expectedEncoded: {
                        customerProfileId: "10000",
                    },
                    serverResponse: {},
                    expectedDecoded: {},
                },
            );
        });
    });
});
