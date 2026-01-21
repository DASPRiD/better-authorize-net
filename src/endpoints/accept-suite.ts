import type { Send } from "../client.js";
import {
    type DecryptPaymentDataRequest,
    type DecryptPaymentDataResponse,
    decryptPaymentDataRequestSchema,
    decryptPaymentDataResponseSchema,
    type GetHostedPaymentPageRequest,
    type GetHostedPaymentPageResponse,
    type GetHostedProfilePageRequest,
    type GetHostedProfilePageResponse,
    getHostedPaymentPageRequestSchema,
    getHostedPaymentPageResponseSchema,
    getHostedProfilePageRequestSchema,
    getHostedProfilePageResponseSchema,
    type SecurePaymentContainerRequest,
    type SecurePaymentContainerResponse,
    securePaymentContainerRequestSchema,
    securePaymentContainerResponseSchema,
} from "../schemas.js";

/**
 * Accept Suite endpoints for secure payment data handling.
 *
 * Provides functionality for working with encrypted payment data, secure
 * payment containers, and hosted payment pages.
 */
export class AcceptSuiteEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Creates a secure payment container.
     *
     * Generates a secure container for payment data to be used with Accept.js
     * or Accept Hosted.
     */
    public securePaymentContainer(
        params: SecurePaymentContainerRequest,
    ): Promise<SecurePaymentContainerResponse> {
        return this.send({
            request: {
                rootKey: "securePaymentContainerRequest",
                schema: securePaymentContainerRequestSchema,
                values: params,
            },
            response: {
                rootKey: "securePaymentContainerResponse",
                schema: securePaymentContainerResponseSchema,
            },
        });
    }

    /**
     * Decrypts payment data.
     *
     * Decrypts payment data encrypted using Accept.js or other Accept Suite
     * tools.
     */
    public decryptPaymentData(
        params: DecryptPaymentDataRequest,
    ): Promise<DecryptPaymentDataResponse> {
        return this.send({
            request: {
                rootKey: "decryptPaymentDataRequest",
                schema: decryptPaymentDataRequestSchema,
                values: params,
            },
            response: {
                rootKey: "decryptPaymentDataResponse",
                schema: decryptPaymentDataResponseSchema,
            },
        });
    }

    /**
     * Gets an Accept payment page token.
     *
     * Returns a form token which can be used to request the Authorize.Net Accept
     * hosted payment page for PCI-compliant payment collection.
     *
     * @see https://developer.authorize.net/api/reference/index.html#accept-suite-get-an-accept-payment-page
     */
    public async getAcceptPaymentPage(
        params: GetHostedPaymentPageRequest,
    ): Promise<GetHostedPaymentPageResponse> {
        return this.send({
            request: {
                rootKey: "getHostedPaymentPageRequest",
                schema: getHostedPaymentPageRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getHostedPaymentPageResponse",
                schema: getHostedPaymentPageResponseSchema,
            },
        });
    }

    /**
     * Gets an Accept customer profile page token.
     *
     * Returns a token for the hosted customer profile management page, allowing
     * customers to manage their payment information in a PCI-compliant
     * interface.
     *
     * @see https://developer.authorize.net/api/reference/index.html#accept-suite-get-accept-customer-profile-page
     */
    public async getAcceptCustomerProfilePage(
        params: GetHostedProfilePageRequest,
    ): Promise<GetHostedProfilePageResponse> {
        return this.send({
            request: {
                rootKey: "getHostedProfilePageRequest",
                schema: getHostedProfilePageRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getHostedProfilePageResponse",
                schema: getHostedProfilePageResponseSchema,
            },
        });
    }
}
