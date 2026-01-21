import type { Send } from "../client.js";
import {
    type CreateCustomerPaymentProfileRequest,
    type CreateCustomerPaymentProfileResponse,
    type CreateCustomerProfileFromTransactionRequest,
    type CreateCustomerProfileRequest,
    type CreateCustomerProfileResponse,
    type CreateCustomerProfileTransactionRequest,
    type CreateCustomerProfileTransactionResponse,
    type CreateCustomerShippingAddressRequest,
    type CreateCustomerShippingAddressResponse,
    createCustomerPaymentProfileRequestSchema,
    createCustomerPaymentProfileResponseSchema,
    createCustomerProfileFromTransactionRequestSchema,
    createCustomerProfileRequestSchema,
    createCustomerProfileResponseSchema,
    createCustomerProfileTransactionRequestSchema,
    createCustomerProfileTransactionResponseSchema,
    createCustomerShippingAddressRequestSchema,
    createCustomerShippingAddressResponseSchema,
    type DeleteCustomerPaymentProfileRequest,
    type DeleteCustomerPaymentProfileResponse,
    type DeleteCustomerProfileRequest,
    type DeleteCustomerProfileResponse,
    type DeleteCustomerShippingAddressRequest,
    type DeleteCustomerShippingAddressResponse,
    deleteCustomerPaymentProfileRequestSchema,
    deleteCustomerPaymentProfileResponseSchema,
    deleteCustomerProfileRequestSchema,
    deleteCustomerProfileResponseSchema,
    deleteCustomerShippingAddressRequestSchema,
    deleteCustomerShippingAddressResponseSchema,
    type GetCustomerPaymentProfileListRequest,
    type GetCustomerPaymentProfileListResponse,
    type GetCustomerPaymentProfileNonceRequest,
    type GetCustomerPaymentProfileNonceResponse,
    type GetCustomerPaymentProfileRequest,
    type GetCustomerPaymentProfileResponse,
    type GetCustomerProfileIdsRequest,
    type GetCustomerProfileIdsResponse,
    type GetCustomerProfileRequest,
    type GetCustomerProfileResponse,
    type GetCustomerShippingAddressRequest,
    type GetCustomerShippingAddressResponse,
    getCustomerPaymentProfileListRequestSchema,
    getCustomerPaymentProfileListResponseSchema,
    getCustomerPaymentProfileNonceRequestSchema,
    getCustomerPaymentProfileNonceResponseSchema,
    getCustomerPaymentProfileRequestSchema,
    getCustomerPaymentProfileResponseSchema,
    getCustomerProfileIdsRequestSchema,
    getCustomerProfileIdsResponseSchema,
    getCustomerProfileRequestSchema,
    getCustomerProfileResponseSchema,
    getCustomerShippingAddressRequestSchema,
    getCustomerShippingAddressResponseSchema,
    type UpdateCustomerPaymentProfileRequest,
    type UpdateCustomerPaymentProfileResponse,
    type UpdateCustomerProfileRequest,
    type UpdateCustomerProfileResponse,
    type UpdateCustomerShippingAddressRequest,
    type UpdateCustomerShippingAddressResponse,
    updateCustomerPaymentProfileRequestSchema,
    updateCustomerPaymentProfileResponseSchema,
    updateCustomerProfileRequestSchema,
    updateCustomerProfileResponseSchema,
    updateCustomerShippingAddressRequestSchema,
    updateCustomerShippingAddressResponseSchema,
    type ValidateCustomerPaymentProfileRequest,
    type ValidateCustomerPaymentProfileResponse,
    validateCustomerPaymentProfileRequestSchema,
    validateCustomerPaymentProfileResponseSchema,
} from "../schemas.js";

/**
 * Customer Information Manager (CIM) profile management endpoints.
 *
 * Allows you to store customer payment and address data for later use,
 * enabling convenient recurring billing and reducing PCI compliance
 * requirements.
 */
export class CustomerProfileEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Creates a new customer profile.
     *
     * Stores customer payment and address data including payment profiles and
     * shipping addresses for convenient reuse in future transactions.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-create-customer-profile
     */
    public async createCustomerProfile(
        params: CreateCustomerProfileRequest,
    ): Promise<CreateCustomerProfileResponse> {
        return this.send({
            request: {
                rootKey: "createCustomerProfileRequest",
                schema: createCustomerProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "createCustomerProfileResponse",
                schema: createCustomerProfileResponseSchema,
            },
        });
    }

    /**
     * Retrieves an existing customer profile.
     *
     * Returns all customer profile information including payment profiles and
     * shipping addresses for the specified customer profile ID.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-get-customer-profile
     */
    public async getCustomerProfile(
        params: GetCustomerProfileRequest,
    ): Promise<GetCustomerProfileResponse> {
        return this.send({
            request: {
                rootKey: "getCustomerProfileRequest",
                schema: getCustomerProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getCustomerProfileResponse",
                schema: getCustomerProfileResponseSchema,
            },
        });
    }

    /**
     * Retrieves all customer profile IDs.
     *
     * Returns a list of all customer profile IDs associated with your merchant
     * account.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-get-customer-profile-ids
     */
    public async getCustomerProfileIds(
        params: GetCustomerProfileIdsRequest,
    ): Promise<GetCustomerProfileIdsResponse> {
        return this.send({
            request: {
                rootKey: "getCustomerProfileIdsRequest",
                schema: getCustomerProfileIdsRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getCustomerProfileIdsResponse",
                schema: getCustomerProfileIdsResponseSchema,
            },
        });
    }

    /**
     * Updates an existing customer profile.
     *
     * Modifies the information associated with an existing customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-update-customer-profile
     */
    public async updateCustomerProfile(
        params: UpdateCustomerProfileRequest,
    ): Promise<UpdateCustomerProfileResponse> {
        return this.send({
            request: {
                rootKey: "updateCustomerProfileRequest",
                schema: updateCustomerProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "updateCustomerProfileResponse",
                schema: updateCustomerProfileResponseSchema,
            },
        });
    }

    /**
     * Deletes an existing customer profile.
     *
     * Permanently removes a customer profile and all associated payment
     * profiles and shipping addresses.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-delete-customer-profile
     */
    public async deleteCustomerProfile(
        params: DeleteCustomerProfileRequest,
    ): Promise<DeleteCustomerProfileResponse> {
        return this.send({
            request: {
                rootKey: "deleteCustomerProfileRequest",
                schema: deleteCustomerProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "deleteCustomerProfileResponse",
                schema: deleteCustomerProfileResponseSchema,
            },
        });
    }

    /**
     * Creates a new payment profile for an existing customer.
     *
     * Adds credit card or bank account information to an established customer
     * profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-create-customer-payment-profile
     */
    public async createCustomerPaymentProfile(
        params: CreateCustomerPaymentProfileRequest,
    ): Promise<CreateCustomerPaymentProfileResponse> {
        return this.send({
            request: {
                rootKey: "createCustomerPaymentProfileRequest",
                schema: createCustomerPaymentProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "createCustomerPaymentProfileResponse",
                schema: createCustomerPaymentProfileResponseSchema,
            },
        });
    }

    /**
     * Retrieves a customer payment profile.
     *
     * Returns payment profile information for a specific customer payment
     * profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-get-customer-payment-profile
     */
    public async getCustomerPaymentProfile(
        params: GetCustomerPaymentProfileRequest,
    ): Promise<GetCustomerPaymentProfileResponse> {
        return this.send({
            request: {
                rootKey: "getCustomerPaymentProfileRequest",
                schema: getCustomerPaymentProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getCustomerPaymentProfileResponse",
                schema: getCustomerPaymentProfileResponseSchema,
            },
        });
    }

    /**
     * Updates a customer payment profile.
     *
     * Modifies payment information for an existing customer payment profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-update-customer-payment-profile
     */
    public async updateCustomerPaymentProfile(
        params: UpdateCustomerPaymentProfileRequest,
    ): Promise<UpdateCustomerPaymentProfileResponse> {
        return this.send({
            request: {
                rootKey: "updateCustomerPaymentProfileRequest",
                schema: updateCustomerPaymentProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "updateCustomerPaymentProfileResponse",
                schema: updateCustomerPaymentProfileResponseSchema,
            },
        });
    }

    /**
     * Deletes a customer payment profile.
     *
     * Permanently removes a payment profile from a customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-delete-customer-payment-profile
     */
    public async deleteCustomerPaymentProfile(
        params: DeleteCustomerPaymentProfileRequest,
    ): Promise<DeleteCustomerPaymentProfileResponse> {
        return this.send({
            request: {
                rootKey: "deleteCustomerPaymentProfileRequest",
                schema: deleteCustomerPaymentProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "deleteCustomerPaymentProfileResponse",
                schema: deleteCustomerPaymentProfileResponseSchema,
            },
        });
    }

    /**
     * Validates a customer payment profile.
     *
     * Generates a test transaction to verify an existing customer payment
     * profile is valid.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-validate-customer-payment-profile
     */
    public async validateCustomerPaymentProfile(
        params: ValidateCustomerPaymentProfileRequest,
    ): Promise<ValidateCustomerPaymentProfileResponse> {
        return this.send({
            request: {
                rootKey: "validateCustomerPaymentProfileRequest",
                schema: validateCustomerPaymentProfileRequestSchema,
                values: params,
            },
            response: {
                rootKey: "validateCustomerPaymentProfileResponse",
                schema: validateCustomerPaymentProfileResponseSchema,
            },
        });
    }

    /**
     * Creates a new shipping address for a customer profile.
     *
     * Adds a shipping address to an existing customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-create-customer-shipping-address
     */
    public async createCustomerShippingAddress(
        params: CreateCustomerShippingAddressRequest,
    ): Promise<CreateCustomerShippingAddressResponse> {
        return this.send({
            request: {
                rootKey: "createCustomerShippingAddressRequest",
                schema: createCustomerShippingAddressRequestSchema,
                values: params,
            },
            response: {
                rootKey: "createCustomerShippingAddressResponse",
                schema: createCustomerShippingAddressResponseSchema,
            },
        });
    }

    /**
     * Retrieves a customer shipping address.
     *
     * Returns shipping address information for a specific customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-get-customer-shipping-address
     */
    public async getCustomerShippingAddress(
        params: GetCustomerShippingAddressRequest,
    ): Promise<GetCustomerShippingAddressResponse> {
        return this.send({
            request: {
                rootKey: "getCustomerShippingAddressRequest",
                schema: getCustomerShippingAddressRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getCustomerShippingAddressResponse",
                schema: getCustomerShippingAddressResponseSchema,
            },
        });
    }

    /**
     * Updates a customer shipping address.
     *
     * Modifies an existing shipping address for a customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-update-customer-shipping-address
     */
    public async updateCustomerShippingAddress(
        params: UpdateCustomerShippingAddressRequest,
    ): Promise<UpdateCustomerShippingAddressResponse> {
        return this.send({
            request: {
                rootKey: "updateCustomerShippingAddressRequest",
                schema: updateCustomerShippingAddressRequestSchema,
                values: params,
            },
            response: {
                rootKey: "updateCustomerShippingAddressResponse",
                schema: updateCustomerShippingAddressResponseSchema,
            },
        });
    }

    /**
     * Deletes a customer shipping address.
     *
     * Permanently removes a shipping address from a customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-delete-customer-shipping-address
     */
    public async deleteCustomerShippingAddress(
        params: DeleteCustomerShippingAddressRequest,
    ): Promise<DeleteCustomerShippingAddressResponse> {
        return this.send({
            request: {
                rootKey: "deleteCustomerShippingAddressRequest",
                schema: deleteCustomerShippingAddressRequestSchema,
                values: params,
            },
            response: {
                rootKey: "deleteCustomerShippingAddressResponse",
                schema: deleteCustomerShippingAddressResponseSchema,
            },
        });
    }

    /**
     * Creates a customer profile from an existing transaction.
     *
     * Extracts payment and customer information from a previous transaction to
     * create a new customer profile.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-create-a-customer-profile-from-a-transaction
     */
    public async createCustomerProfileFromTransaction(
        params: CreateCustomerProfileFromTransactionRequest,
    ): Promise<CreateCustomerProfileTransactionResponse> {
        return this.send({
            request: {
                rootKey: "createCustomerProfileFromTransactionRequest",
                schema: createCustomerProfileFromTransactionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "createCustomerProfileTransactionResponse",
                schema: createCustomerProfileTransactionResponseSchema,
            },
        });
    }

    /**
     * Creates a transaction from a customer profile.
     *
     * Processes a payment using stored customer payment profile information.
     */
    public async createCustomerProfileTransaction(
        params: CreateCustomerProfileTransactionRequest,
    ): Promise<CreateCustomerProfileTransactionResponse> {
        return this.send({
            request: {
                rootKey: "createCustomerProfileTransactionRequest",
                schema: createCustomerProfileTransactionRequestSchema,
                values: params,
            },
            response: {
                rootKey: "createCustomerProfileTransactionResponse",
                schema: createCustomerProfileTransactionResponseSchema,
            },
        });
    }

    /**
     * Retrieves a list of customer payment profiles.
     *
     * Returns all payment profiles that match the specified search criteria.
     *
     * @see https://developer.authorize.net/api/reference/index.html#customer-profiles-get-customer-payment-profile-list
     */
    public async getCustomerPaymentProfileList(
        params: GetCustomerPaymentProfileListRequest,
    ): Promise<GetCustomerPaymentProfileListResponse> {
        return this.send({
            request: {
                rootKey: "getCustomerPaymentProfileListRequest",
                schema: getCustomerPaymentProfileListRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getCustomerPaymentProfileListResponse",
                schema: getCustomerPaymentProfileListResponseSchema,
            },
        });
    }

    /**
     * Retrieves payment nonce for a customer payment profile.
     *
     * Generates a one-time payment nonce that can be used with Accept.js for
     * secure payment processing.
     */
    public async getCustomerPaymentProfileNonce(
        params: GetCustomerPaymentProfileNonceRequest,
    ): Promise<GetCustomerPaymentProfileNonceResponse> {
        return this.send({
            request: {
                rootKey: "getCustomerPaymentProfileNonceRequest",
                schema: getCustomerPaymentProfileNonceRequestSchema,
                values: params,
            },
            response: {
                rootKey: "getCustomerPaymentProfileNonceResponse",
                schema: getCustomerPaymentProfileNonceResponseSchema,
            },
        });
    }
}
