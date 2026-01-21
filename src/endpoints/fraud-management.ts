import type { Send } from "../client.js";
import {
    type UpdateHeldTransactionRequest,
    type UpdateHeldTransactionResponse,
    updateHeldTransactionRequestSchema,
    updateHeldTransactionResponseSchema,
} from "../schemas.js";

/**
 * Fraud management endpoints for reviewing and managing held transactions.
 *
 * Allows you to approve, decline, or manage transactions held for review by
 * fraud detection tools.
 */
export class FraudManagementEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Updates a held transaction.
     *
     * Approves or declines transactions that have been held for review by fraud
     * detection systems.
     *
     * @see https://developer.authorize.net/api/reference/index.html#fraud-management-approve-or-decline-held-transaction
     */
    public async updateHeldTransaction(
        params: UpdateHeldTransactionRequest,
    ): Promise<UpdateHeldTransactionResponse> {
        return this.send({
            request: {
                rootKey: "updateHeldTransactionRequest",
                schema: updateHeldTransactionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "updateHeldTransactionResponse",
                schema: updateHeldTransactionResponseSchema,
            },
        });
    }
}
