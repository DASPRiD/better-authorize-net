import { z } from "zod";
import {
    AcceptSuiteEndpoints,
    ArbSubscriptionEndpoints,
    CustomerProfileEndpoints,
    FraudManagementEndpoints,
    MobileInAppEndpoints,
    PaymentTransactionEndpoints,
    TransactionReportingEndpoints,
    UtilityEndpoints,
} from "./endpoints/index.js";
import {
    aNetApiRequestSchema,
    aNetApiResponseSchema,
    type MerchantAuthentication,
    type Messages,
} from "./schemas.js";

export type SendParams<TRequest, TResponse> = {
    request: {
        rootKey: string;
        schema: z.ZodType<TRequest>;
        values: TRequest;
    };
    response: {
        rootKey: string;
        schema: z.ZodType<TResponse>;
    };
};

export type Send = <TRequest, TResponse>(
    params: SendParams<TRequest, TResponse>,
) => Promise<TResponse>;

type ReviverContext = {
    source: string;
};

const reviver = (_key: string, value: unknown, context?: ReviverContext): unknown => {
    // Authorize Net transmit decimals as JSON numbers. We keep them as strings
    // to avoid precision loss. The Zod schemas convert them either to Decimal
    // instances or numbers (when defined as integer).
    if (typeof value === "number") {
        if (context?.source !== undefined) {
            return context.source;
        }

        console.warn(
            "Unsupported ES version, upgrade to NodeJS 21 or higher to avoid precision loss",
        );
        return value.toString();
    }

    return value;
};

/**
 * Main client for interacting with the Authorize.Net API.
 *
 * Provides access to all Authorize.Net API endpoints organized by functional
 * area.
 *
 * @example
 * ```ts
 * const client = new AuthorizeNetClient('sandbox', {
 *   name: 'YOUR_API_LOGIN_ID',
 *   transactionKey: 'YOUR_TRANSACTION_KEY'
 * });
 *
 * // Use the client to make API calls
 * const response = await client.paymentTransactions.createTransaction({...});
 * ```
 */
export class AuthorizeNetClient {
    private readonly apiEndpoint: string;
    private readonly merchantAuthentication: MerchantAuthentication;

    /** Accept Suite endpoints for secure payment data handling */
    public readonly acceptSuite: AcceptSuiteEndpoints;
    /** Automated Recurring Billing (ARB) subscription management endpoints */
    public readonly arbSubscriptions: ArbSubscriptionEndpoints;
    /** Customer Information Manager (CIM) profile management endpoints */
    public readonly customerProfiles: CustomerProfileEndpoints;
    /** Fraud management endpoints for reviewing and managing held transactions */
    public readonly fraudManagement: FraudManagementEndpoints;
    /** Mobile in-app payment endpoints */
    public readonly mobileInApp: MobileInAppEndpoints;
    /** Payment transaction endpoints for processing payments */
    public readonly paymentTransactions: PaymentTransactionEndpoints;
    /** Transaction reporting endpoints for retrieving transaction data */
    public readonly transactionReporting: TransactionReportingEndpoints;
    /** Utility endpoints for authentication testing and hosted payment pages */
    public readonly utility: UtilityEndpoints;

    /**
     * Creates a new AuthorizeNetClient instance.
     */
    public constructor(
        environment: "sandbox" | "production",
        merchantAuthentication: MerchantAuthentication,
    ) {
        this.apiEndpoint =
            environment === "sandbox"
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";
        this.merchantAuthentication = merchantAuthentication;

        const send: Send = async (params) => {
            const baseRequestBody = aNetApiRequestSchema.encode({
                merchantAuthentication: this.merchantAuthentication,
            });

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    ...baseRequestBody,
                    [params.request.rootKey]: params.request.schema.encode(params.request.values),
                }),
            });

            const rawJson = await response.text();
            const json = JSON.parse(rawJson, reviver);
            const apiResponse = aNetApiResponseSchema.parse(json);

            if (apiResponse.messages.resultCode === "Error") {
                throw new AuthorizeNetError(apiResponse.messages.message);
            }

            const responseContainerSchema = z.object({
                [params.response.rootKey]: params.response.schema,
            });
            const responseContainer = responseContainerSchema.parse(json);
            return responseContainer[params.response.rootKey];
        };

        this.acceptSuite = new AcceptSuiteEndpoints(send);
        this.arbSubscriptions = new ArbSubscriptionEndpoints(send);
        this.customerProfiles = new CustomerProfileEndpoints(send);
        this.fraudManagement = new FraudManagementEndpoints(send);
        this.mobileInApp = new MobileInAppEndpoints(send);
        this.paymentTransactions = new PaymentTransactionEndpoints(send);
        this.transactionReporting = new TransactionReportingEndpoints(send);
        this.utility = new UtilityEndpoints(send);
    }
}

/**
 * Error thrown when an Authorize.Net API request fails.
 *
 * Contains the error messages returned by the Authorize.Net API.
 */
export class AuthorizeNetError extends Error {
    /**
     * Array of error messages from the Authorize.Net API, each containing a
     * code and text description
     */
    public readonly messages: Messages["message"];

    /**
     * Creates a new AuthorizeNetError instance.
     */
    public constructor(messages: Messages["message"]) {
        super(messages.map((m) => `[${m.code}] ${m.text}`).join("; "));
        this.name = "AuthorizeNetError";
        this.messages = messages;
    }
}
