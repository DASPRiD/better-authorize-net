import assert from "node:assert/strict";
import type { Send, SendParams } from "../src/client.js";

/**
 * Test data structure for endpoint testing.
 * Contains all data needed to test bidirectional transformations.
 */
export type EndpointTestData<TRequest, TResponse> = {
    /** TypeScript object sent by the user (input to endpoint) */
    userInput: TRequest;
    /** Expected JSON object received by the server (after encoding) */
    expectedEncoded: Record<string, unknown>;
    /** Mock JSON response from the server */
    serverResponse: unknown;
    /** Expected TypeScript object received by user (after decoding) */
    expectedDecoded: TResponse;
};

/**
 * Universal test function for testing endpoint methods.
 * Tests the complete bidirectional transformation:
 * 1. userInput -> encode -> expectedEncoded
 * 2. serverResponse -> parse -> expectedDecoded
 */
export async function testEndpoint<TRequest, TResponse, TEndpoint>(
    endpointFactory: (send: Send) => TEndpoint,
    methodName: keyof TEndpoint,
    testData: EndpointTestData<TRequest, TResponse>,
): Promise<void> {
    let capturedEncodedRequest: unknown = null;

    const mockSend: Send = async <TReq, TRes>(params: SendParams<TReq, TRes>): Promise<TRes> => {
        capturedEncodedRequest = params.request.schema.encode(params.request.values);
        return params.response.schema.parse(testData.serverResponse);
    };

    const endpoint = endpointFactory(mockSend);
    const method = endpoint[methodName] as (input: TRequest) => Promise<TResponse>;
    const result = await method.call(endpoint, testData.userInput);

    assert.deepEqual(
        capturedEncodedRequest,
        testData.expectedEncoded,
        "Encoded request does not match expected",
    );
    assert.deepEqual(result, testData.expectedDecoded, "Decoded response does not match expected");
}
