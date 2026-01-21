import type { Send } from "../client.js";
import {
    type ArbCancelSubscriptionRequest,
    type ArbCancelSubscriptionResponse,
    type ArbCreateSubscriptionRequest,
    type ArbCreateSubscriptionResponse,
    type ArbGetSubscriptionListRequest,
    type ArbGetSubscriptionListResponse,
    type ArbGetSubscriptionRequest,
    type ArbGetSubscriptionResponse,
    type ArbGetSubscriptionStatusRequest,
    type ArbGetSubscriptionStatusResponse,
    type ArbUpdateSubscriptionRequest,
    type ArbUpdateSubscriptionResponse,
    arbCancelSubscriptionRequestSchema,
    arbCancelSubscriptionResponseSchema,
    arbCreateSubscriptionRequestSchema,
    arbCreateSubscriptionResponseSchema,
    arbGetSubscriptionListRequestSchema,
    arbGetSubscriptionListResponseSchema,
    arbGetSubscriptionRequestSchema,
    arbGetSubscriptionResponseSchema,
    arbGetSubscriptionStatusRequestSchema,
    arbGetSubscriptionStatusResponseSchema,
    arbUpdateSubscriptionRequestSchema,
    arbUpdateSubscriptionResponseSchema,
} from "../schemas.js";

/**
 * Automated Recurring Billing (ARB) subscription management endpoints.
 *
 * Enables you to create and manage recurring billing subscriptions.
 */
export class ArbSubscriptionEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Creates a new recurring billing subscription.
     *
     * Enables you to set up automatic recurring payments with the specified
     * frequency and duration. Supports payment via credit card, bank account,
     * or existing customer payment profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#recurring-billing-create-a-subscription
     */
    public async createSubscription(
        params: ArbCreateSubscriptionRequest,
    ): Promise<ArbCreateSubscriptionResponse> {
        return this.send({
            request: {
                rootKey: "ARBCreateSubscriptionRequest",
                schema: arbCreateSubscriptionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "ARBCreateSubscriptionResponse",
                schema: arbCreateSubscriptionResponseSchema,
            },
        });
    }

    /**
     * Retrieves subscription details.
     *
     * Returns complete subscription information including payment details,
     * schedule, and current status for a specified subscription ID.
     *
     * @see https://developer.authorize.net/api/reference/index.html#recurring-billing-get-subscription
     */
    public async getSubscription(
        params: ArbGetSubscriptionRequest,
    ): Promise<ArbGetSubscriptionResponse> {
        return this.send({
            request: {
                rootKey: "ARBGetSubscriptionRequest",
                schema: arbGetSubscriptionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "ARBGetSubscriptionResponse",
                schema: arbGetSubscriptionResponseSchema,
            },
        });
    }

    /**
     * Retrieves the status of a subscription.
     *
     * Returns the current status (active, expired, suspended, canceled, or
     * terminated) for a subscription.
     *
     * @see https://developer.authorize.net/api/reference/index.html#recurring-billing-get-subscription-status
     */
    public async getSubscriptionStatus(
        params: ArbGetSubscriptionStatusRequest,
    ): Promise<ArbGetSubscriptionStatusResponse> {
        return this.send({
            request: {
                rootKey: "ARBGetSubscriptionStatusRequest",
                schema: arbGetSubscriptionStatusRequestSchema,
                values: params,
            },
            response: {
                rootKey: "ARBGetSubscriptionStatusResponse",
                schema: arbGetSubscriptionStatusResponseSchema,
            },
        });
    }

    /**
     * Retrieves a list of subscriptions.
     *
     * Returns subscription information based on specified search and sort
     * criteria.
     *
     * @see https://developer.authorize.net/api/reference/index.html#recurring-billing-get-a-list-of-subscriptions
     */
    public async getSubscriptionList(
        params: ArbGetSubscriptionListRequest,
    ): Promise<ArbGetSubscriptionListResponse> {
        return this.send({
            request: {
                rootKey: "ARBGetSubscriptionListRequest",
                schema: arbGetSubscriptionListRequestSchema,
                values: params,
            },
            response: {
                rootKey: "ARBGetSubscriptionListResponse",
                schema: arbGetSubscriptionListResponseSchema,
            },
        });
    }

    /**
     * Updates an existing subscription.
     *
     * Modifies subscription information such as payment details, billing
     * amount, or schedule.
     *
     * @see https://developer.authorize.net/api/reference/index.html#recurring-billing-update-a-subscription
     */
    public async updateSubscription(
        params: ArbUpdateSubscriptionRequest,
    ): Promise<ArbUpdateSubscriptionResponse> {
        return this.send({
            request: {
                rootKey: "ARBUpdateSubscriptionRequest",
                schema: arbUpdateSubscriptionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "ARBUpdateSubscriptionResponse",
                schema: arbUpdateSubscriptionResponseSchema,
            },
        });
    }

    /**
     * Cancels an existing subscription.
     *
     * Stops all future scheduled payments for the subscription.
     *
     * @see https://developer.authorize.net/api/reference/index.html#recurring-billing-cancel-a-subscription
     */
    public async cancelSubscription(
        params: ArbCancelSubscriptionRequest,
    ): Promise<ArbCancelSubscriptionResponse> {
        return this.send({
            request: {
                rootKey: "ARBCancelSubscriptionRequest",
                schema: arbCancelSubscriptionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "ARBCancelSubscriptionResponse",
                schema: arbCancelSubscriptionResponseSchema,
            },
        });
    }
}
