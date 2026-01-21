import type { Send } from "../client.js";
import {
    type CreateTransactionRequest,
    type CreateTransactionResponse,
    createTransactionRequestSchema,
    createTransactionResponseSchema,
    type UpdateSplitTenderGroupRequest,
    type UpdateSplitTenderGroupResponse,
    updateSplitTenderGroupRequestSchema,
    updateSplitTenderGroupResponseSchema,
} from "../schemas.js";

/**
 * Payment transaction endpoints for processing various types of payment transactions.
 *
 * Supports authorization, capture, void, refund, and other transaction types.
 */
export class PaymentTransactionEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Creates a payment transaction.
     *
     * Enables you to submit a wide variety of transaction requests depending on
     * how you structure it. Different values in the transactionType field or
     * the payment field create different types of transactions.
     *
     * Supported transaction types:
     *
     * - Payment Transactions:
     *   - Charge a Credit Card
     *   - Authorize a Credit Card
     *   - Capture a Previously Authorized Amount
     *   - Capture Funds Authorized Through Another Channel
     *   - Refund a Transaction
     *   - Void a Transaction
     *   - Debit a Bank Account
     *   - Credit a Bank Account
     *   - Charge a Customer Profile
     *   - Charge a Tokenized Credit Card
     * - Mobile In-App Transactions:
     *   - Create an Apple Pay Transaction
     *   - Create a Google Pay Transaction
     * - Accept Suite:
     *   - Create an Accept Payment Transaction
     *
     * @see https://developer.authorize.net/api/reference/index.html#payment-transactions
     */
    public async createTransaction(
        params: CreateTransactionRequest,
    ): Promise<CreateTransactionResponse> {
        return this.send({
            request: {
                rootKey: "createTransactionRequest",
                schema: createTransactionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "createTransactionResponse",
                schema: createTransactionResponseSchema,
            },
        });
    }

    /**
     * Updates a split tender group.
     *
     * Manages split tender transactions where payment is split across multiple
     * payment methods.
     *
     * @see https://developer.authorize.net/api/reference/index.html#payment-transactions-update-split-tender-group
     */
    public async updateSplitTenderGroup(
        params: UpdateSplitTenderGroupRequest,
    ): Promise<UpdateSplitTenderGroupResponse> {
        return this.send({
            request: {
                rootKey: "updateSplitTenderGroupRequest",
                schema: updateSplitTenderGroupRequestSchema,
                values: params,
            },
            response: {
                rootKey: "updateSplitTenderGroupResponse",
                schema: updateSplitTenderGroupResponseSchema,
            },
        });
    }
}
