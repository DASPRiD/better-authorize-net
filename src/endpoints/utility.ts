import type { Send } from "../client.js";
import {
    type AuthenticateTestRequest,
    type AuthenticateTestResponse,
    authenticateTestRequestSchema,
    authenticateTestResponseSchema,
    type IsAliveRequest,
    type IsAliveResponse,
    isAliveRequestSchema,
    isAliveResponseSchema,
    type SendCustomerTransactionReceiptRequest,
    type SendCustomerTransactionReceiptResponse,
    sendCustomerTransactionReceiptRequestSchema,
    sendCustomerTransactionReceiptResponseSchema,
    type UpdateMerchantDetailsRequest,
    type UpdateMerchantDetailsResponse,
    updateMerchantDetailsRequestSchema,
    updateMerchantDetailsResponseSchema,
} from "../schemas.js";

/**
 * Utility endpoints for authentication testing, hosted payment pages, and merchant account management.
 */
export class UtilityEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Tests authentication credentials.
     *
     * Validates your API Login ID and Transaction Key to confirm credentials
     * are valid and active.
     */
    public async authenticateTest(
        params: AuthenticateTestRequest,
    ): Promise<AuthenticateTestResponse> {
        return this.send({
            request: {
                rootKey: "authenticateTestRequest",
                schema: authenticateTestRequestSchema,
                values: params,
            },
            response: {
                rootKey: "authenticateTestResponse",
                schema: authenticateTestResponseSchema,
            },
        });
    }

    /**
     * Checks if the API is alive and responsive.
     *
     * Simple health check endpoint to verify API availability.
     */
    public async isAlive(params: IsAliveRequest): Promise<IsAliveResponse> {
        return this.send({
            request: {
                rootKey: "isAliveRequest",
                schema: isAliveRequestSchema,
                values: params,
            },
            response: {
                rootKey: "isAliveResponse",
                schema: isAliveResponseSchema,
            },
        });
    }

    /**
     * Updates merchant account details.
     *
     * Modifies merchant account settings and configuration.
     */
    public async updateMerchantDetails(
        params: UpdateMerchantDetailsRequest,
    ): Promise<UpdateMerchantDetailsResponse> {
        return this.send({
            request: {
                rootKey: "updateMerchantDetailsRequest",
                schema: updateMerchantDetailsRequestSchema,
                values: params,
            },
            response: {
                rootKey: "updateMerchantDetailsResponse",
                schema: updateMerchantDetailsResponseSchema,
            },
        });
    }

    /**
     * Sends a transaction receipt to a customer.
     *
     * Emails a transaction receipt to the customer's email address.
     */
    public async sendCustomerTransactionReceipt(
        params: SendCustomerTransactionReceiptRequest,
    ): Promise<SendCustomerTransactionReceiptResponse> {
        return this.send({
            request: {
                rootKey: "sendCustomerTransactionReceiptRequest",
                schema: sendCustomerTransactionReceiptRequestSchema,
                values: params,
            },
            response: {
                rootKey: "sendCustomerTransactionReceiptResponse",
                schema: sendCustomerTransactionReceiptResponseSchema,
            },
        });
    }
}
