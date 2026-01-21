/**
 * Configuration for fields that are marked as optional in the XSD,
 * but are always present on successful API responses.
 * 
 * Fields listed here will be made required in both input and output schemas,
 * so that Zod validation will fail if they're missing, allowing you to catch
 * incorrect expectations.
 * 
 * Only applies to root properties within response types.
 */

export type RequiredOnSuccessConfig = {
    /**
     * Map of response type names to their fields that should be required on success.
     * Key: Response type name (e.g., "ArbCreateSubscriptionResponse")
     * Value: Array of field names that should be required in both schemas
     */
    [responseTypeName: string]: string[];
};

export const requiredOnSuccessConfig: RequiredOnSuccessConfig = {
    // Fields that are always present on successful responses
    "ArbCreateSubscriptionResponse": ["subscriptionId"],
    "CreateCustomerProfileResponse": ["customerProfileId"],
    "CreateCustomerPaymentProfileResponse": ["customerProfileId", "customerPaymentProfileId"],
    "GetCustomerProfileResponse": ["profile"],
    "GetCustomerPaymentProfileResponse": ["paymentProfile"],
    "GetCustomerShippingAddressResponse": ["address"],
};
