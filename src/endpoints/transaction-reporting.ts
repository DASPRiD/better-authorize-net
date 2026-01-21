import type { Send } from "../client.js";
import {
    type GetAuJobDetailsRequest,
    type GetAuJobDetailsResponse,
    type GetAuJobSummaryRequest,
    type GetAuJobSummaryResponse,
    type GetBatchStatisticsRequest,
    type GetBatchStatisticsResponse,
    type GetMerchantDetailsRequest,
    type GetMerchantDetailsResponse,
    type GetSettledBatchListRequest,
    type GetSettledBatchListResponse,
    type GetTransactionDetailsRequest,
    type GetTransactionDetailsResponse,
    type GetTransactionListForCustomerRequest,
    type GetTransactionListRequest,
    type GetTransactionListResponse,
    type GetUnsettledTransactionListRequest,
    type GetUnsettledTransactionListResponse,
    getAuJobDetailsRequestSchema,
    getAuJobDetailsResponseSchema,
    getAuJobSummaryRequestSchema,
    getAuJobSummaryResponseSchema,
    getBatchStatisticsRequestSchema,
    getBatchStatisticsResponseSchema,
    getMerchantDetailsRequestSchema,
    getMerchantDetailsResponseSchema,
    getSettledBatchListRequestSchema,
    getSettledBatchListResponseSchema,
    getTransactionDetailsRequestSchema,
    getTransactionDetailsResponseSchema,
    getTransactionListForCustomerRequestSchema,
    getTransactionListRequestSchema,
    getTransactionListResponseSchema,
    getUnsettledTransactionListRequestSchema,
    getUnsettledTransactionListResponseSchema,
} from "../schemas.js";

/**
 * Transaction reporting endpoints for retrieving transaction data and batch information.
 *
 * Provides access to transaction history, details, and batch settlement
 * information.
 */
export class TransactionReportingEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Retrieves detailed information for a specific transaction.
     *
     * Returns comprehensive transaction data including payment details,
     * customer information, and transaction status.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-transaction-details
     */
    public async getTransactionDetails(
        params: GetTransactionDetailsRequest,
    ): Promise<GetTransactionDetailsResponse> {
        return this.send({
            request: {
                rootKey: "getTransactionDetailsRequest",
                schema: getTransactionDetailsRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getTransactionDetailsResponse",
                schema: getTransactionDetailsResponseSchema,
            },
        });
    }

    /**
     * Retrieves a list of unsettled transactions.
     *
     * Returns all transactions that have not yet been included in a settlement
     * batch.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-unsettled-transaction-list
     */
    public async getUnsettledTransactionList(
        params: GetUnsettledTransactionListRequest,
    ): Promise<GetUnsettledTransactionListResponse> {
        return this.send({
            request: {
                rootKey: "getUnsettledTransactionListRequest",
                schema: getUnsettledTransactionListRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getUnsettledTransactionListResponse",
                schema: getUnsettledTransactionListResponseSchema,
            },
        });
    }

    /**
     * Retrieves a list of transactions for a specific batch.
     *
     * Returns transactions that are part of a specified settlement batch.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-transaction-list
     */
    public async getTransactionList(
        params: GetTransactionListRequest,
    ): Promise<GetTransactionListResponse> {
        return this.send({
            request: {
                rootKey: "getTransactionListRequest",
                schema: getTransactionListRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getTransactionListResponse",
                schema: getTransactionListResponseSchema,
            },
        });
    }

    /**
     * Retrieves a list of transactions for a specific customer.
     *
     * Returns transaction history for a customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-customer-profile-transaction-list
     */
    public async getTransactionListForCustomer(
        params: GetTransactionListForCustomerRequest,
    ): Promise<GetTransactionListResponse> {
        return this.send({
            request: {
                rootKey: "getTransactionListForCustomerRequest",
                schema: getTransactionListForCustomerRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getTransactionListResponse",
                schema: getTransactionListResponseSchema,
            },
        });
    }

    /**
     * Retrieves statistics for a settlement batch.
     *
     * Returns detailed statistics for a single batch, including transaction
     * counts and totals by payment type.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-batch-statistics
     */
    public async getBatchStatistics(
        params: GetBatchStatisticsRequest,
    ): Promise<GetBatchStatisticsResponse> {
        return this.send({
            request: {
                rootKey: "getBatchStatisticsRequest",
                schema: getBatchStatisticsRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getBatchStatisticsResponse",
                schema: getBatchStatisticsResponseSchema,
            },
        });
    }

    /**
     * Retrieves a list of settled batches.
     *
     * Returns batch information for all settled batches within a specified date
     * range. Includes batch ID, settlement time, settlement state, and
     * optionally batch statistics.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-settled-batch-list
     */
    public async getSettledBatchList(
        params: GetSettledBatchListRequest,
    ): Promise<GetSettledBatchListResponse> {
        return this.send({
            request: {
                rootKey: "getSettledBatchListRequest",
                schema: getSettledBatchListRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getSettledBatchListResponse",
                schema: getSettledBatchListResponseSchema,
            },
        });
    }

    /**
     * Retrieves merchant account details.
     *
     * Returns merchant account information including merchant profile ID and
     * other account details. Useful for OAuth and Accept integrations.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-merchant-details
     */
    public async getMerchantDetails(
        params: GetMerchantDetailsRequest,
    ): Promise<GetMerchantDetailsResponse> {
        return this.send({
            request: {
                rootKey: "getMerchantDetailsRequest",
                schema: getMerchantDetailsRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getMerchantDetailsResponse",
                schema: getMerchantDetailsResponseSchema,
            },
        });
    }

    /**
     * Retrieves summary information for an Account Updater job.
     *
     * Returns high-level statistics for an Account Updater job including counts
     * of updated, closed, and error accounts.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-account-updater-job-summary
     */
    public async getAuJobSummary(params: GetAuJobSummaryRequest): Promise<GetAuJobSummaryResponse> {
        return this.send({
            request: {
                rootKey: "getAuJobSummaryRequest",
                schema: getAuJobSummaryRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getAuJobSummaryResponse",
                schema: getAuJobSummaryResponseSchema,
            },
        });
    }

    /**
     * Retrieves detailed information for an Account Updater job.
     *
     * Returns detailed results for a specific Account Updater job, including
     * which accounts were updated, deleted, or had errors.
     *
     * @see https://developer.authorize.net/api/reference/index.html#transaction-reporting-get-account-updater-job-details
     */
    public async getAuJobDetails(params: GetAuJobDetailsRequest): Promise<GetAuJobDetailsResponse> {
        return this.send({
            request: {
                rootKey: "getAuJobDetailsRequest",
                schema: getAuJobDetailsRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getAuJobDetailsResponse",
                schema: getAuJobDetailsResponseSchema,
            },
        });
    }
}
