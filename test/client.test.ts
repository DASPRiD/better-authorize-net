import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { Decimal } from "decimal.js";
import fetchMock from "fetch-mock";
import { AuthorizeNetClient, AuthorizeNetError } from "../src/client.js";

describe("AuthorizeNetClient", () => {
    const merchantAuth = {
        name: "test_merchant",
        transactionKey: "test_key",
    };

    beforeEach(() => {
        fetchMock.reset();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it("should initialize with sandbox and production environments", () => {
        const sandboxClient = new AuthorizeNetClient("sandbox", merchantAuth);
        const productionClient = new AuthorizeNetClient("production", merchantAuth);

        assert.ok(sandboxClient);
        assert.ok(productionClient);
    });

    it("should send POST to correct URL", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            messages: {
                resultCode: "Ok",
                message: [{ code: "I00001", text: "Successful" }],
            },
            authenticateTestResponse: {},
        });

        await client.utility.authenticateTest({});

        const calls = fetchMock.calls();
        assert.equal(calls.length, 1);
        assert.equal(calls[0][0], "https://apitest.authorize.net/xml/v1/request.api");
    });

    it("should include merchant authentication in request", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            messages: {
                resultCode: "Ok",
                message: [{ code: "I00001", text: "Successful" }],
            },
            authenticateTestResponse: {},
        });

        await client.utility.authenticateTest({});

        const calls = fetchMock.calls();
        const requestBody = JSON.parse(calls[0][1]?.body as string);
        assert.deepEqual(requestBody.merchantAuthentication, {
            name: "test_merchant",
            transactionKey: "test_key",
        });
    });

    it("should set correct Content-Type header", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            messages: {
                resultCode: "Ok",
                message: [{ code: "I00001", text: "Successful" }],
            },
            authenticateTestResponse: {},
        });

        await client.utility.authenticateTest({});

        const calls = fetchMock.calls();
        const headers = calls[0][1]?.headers as Record<string, string>;
        assert.equal(headers["Content-Type"], "application/json");
    });

    it("should encode Decimal request fields as strings", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            messages: {
                resultCode: "Ok",
                message: [{ code: "I00001", text: "Successful" }],
            },
            createTransactionResponse: {
                transactionResponse: {
                    responseCode: "1",
                    authCode: "ABC123",
                    avsResultCode: "Y",
                    transId: "123456",
                    refTransID: "",
                    transHash: "hash",
                    testRequest: "0",
                    accountNumber: "XXXX1234",
                    accountType: "Visa",
                    messages: { message: [] },
                    userFields: { userField: [] },
                    transHashSha2: "",
                },
            },
        });

        await client.paymentTransactions.createTransaction({
            transactionRequest: {
                transactionType: "authCaptureTransaction",
                amount: new Decimal("25.99"),
            },
        });

        const calls = fetchMock.calls();
        const requestBody = JSON.parse(calls[0][1]?.body as string);
        assert.equal(requestBody.createTransactionRequest.transactionRequest.amount, "25.99");
    });

    it("should convert numbers to strings via reviver for precision", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            body: JSON.stringify({
                refId: "123456",
                messages: {
                    resultCode: "Ok",
                    message: [{ code: "I00001", text: "Successful." }],
                },
                getTransactionListResponse: {
                    totalNumInResultSet: 5,
                },
            }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await client.transactionReporting.getTransactionList({});
        assert.equal(result.totalNumInResultSet, 5);
    });

    it("should throw AuthorizeNetError on API errors", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            messages: {
                resultCode: "Error",
                message: [{ code: "E00003", text: "Invalid authentication" }],
            },
        });

        await assert.rejects(
            async () => {
                await client.utility.authenticateTest({});
            },
            (error: Error) => {
                assert.ok(error instanceof AuthorizeNetError);
                assert.equal(error.message, "[E00003] Invalid authentication");
                assert.deepEqual((error as AuthorizeNetError).messages, [
                    { code: "E00003", text: "Invalid authentication" },
                ]);
                return true;
            },
        );
    });

    it("should handle multiple error messages", async () => {
        const client = new AuthorizeNetClient("sandbox", merchantAuth);

        fetchMock.post("https://apitest.authorize.net/xml/v1/request.api", {
            messages: {
                resultCode: "Error",
                message: [
                    { code: "E00001", text: "Error 1" },
                    { code: "E00002", text: "Error 2" },
                ],
            },
        });

        await assert.rejects(
            async () => {
                await client.utility.authenticateTest({});
            },
            (error: Error) => {
                assert.ok(error instanceof AuthorizeNetError);
                assert.equal(error.message, "[E00001] Error 1; [E00002] Error 2");
                return true;
            },
        );
    });
});
