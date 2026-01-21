import type { Send } from "../client.js";
import {
    type LogoutRequest,
    type LogoutResponse,
    logoutRequestSchema,
    logoutResponseSchema,
    type MobileDeviceLoginPinRequest,
    type MobileDeviceLoginPinResponse,
    type MobileDeviceLoginRequest,
    type MobileDeviceLoginResponse,
    type MobileDeviceLoginVerifyChallengeRequest,
    type MobileDeviceLoginVerifyChallengeResponse,
    type MobileDeviceLoginVerifyPinRequest,
    type MobileDeviceLoginVerifyPinResponse,
    type MobileDeviceMfaLoginRequest,
    type MobileDeviceMfaLoginResponse,
    type MobileDeviceRegistrationRequest,
    type MobileDeviceRegistrationResponse,
    mobileDeviceLoginPinRequestSchema,
    mobileDeviceLoginPinResponseSchema,
    mobileDeviceLoginRequestSchema,
    mobileDeviceLoginResponseSchema,
    mobileDeviceLoginVerifyChallengeRequestSchema,
    mobileDeviceLoginVerifyChallengeResponseSchema,
    mobileDeviceLoginVerifyPinRequestSchema,
    mobileDeviceLoginVerifyPinResponseSchema,
    mobileDeviceMfaLoginRequestSchema,
    mobileDeviceMfaLoginResponseSchema,
    mobileDeviceRegistrationRequestSchema,
    mobileDeviceRegistrationResponseSchema,
} from "../schemas.js";

/**
 * Mobile in-app payment endpoints.
 *
 * Provides authentication and device management for mobile in-app payment
 * processing.
 */
export class MobileInAppEndpoints {
    private readonly send: Send;

    public constructor(send: Send) {
        this.send = send;
    }

    /**
     * Authenticates a mobile device login.
     *
     * Initiates the login process for a mobile device to access in-app payment
     * functionality.
     */
    public async mobileDeviceLogin(
        params: MobileDeviceLoginRequest,
    ): Promise<MobileDeviceLoginResponse> {
        return this.send({
            request: {
                rootKey: "mobileDeviceLoginRequest",
                schema: mobileDeviceLoginRequestSchema,
                values: params,
            },
            response: {
                rootKey: "mobileDeviceLoginResponse",
                schema: mobileDeviceLoginResponseSchema,
            },
        });
    }

    /**
     * Generates a PIN for mobile device login.
     *
     * Creates a PIN-based authentication method for mobile device access.
     */
    public async mobileDeviceLoginPin(
        params: MobileDeviceLoginPinRequest,
    ): Promise<MobileDeviceLoginPinResponse> {
        return this.send({
            request: {
                rootKey: "mobileDeviceLoginPinRequest",
                schema: mobileDeviceLoginPinRequestSchema,
                values: params,
            },
            response: {
                rootKey: "mobileDeviceLoginPinResponse",
                schema: mobileDeviceLoginPinResponseSchema,
            },
        });
    }

    /**
     * Verifies a PIN for mobile device login.
     *
     * Validates a PIN entered by the user to complete mobile device
     * authentication.
     */
    public async mobileDeviceLoginVerifyPin(
        params: MobileDeviceLoginVerifyPinRequest,
    ): Promise<MobileDeviceLoginVerifyPinResponse> {
        return this.send({
            request: {
                rootKey: "mobileDeviceLoginVerifyPinRequest",
                schema: mobileDeviceLoginVerifyPinRequestSchema,
                values: params,
            },
            response: {
                rootKey: "mobileDeviceLoginVerifyPinResponse",
                schema: mobileDeviceLoginVerifyPinResponseSchema,
            },
        });
    }

    /**
     * Verifies a challenge response for mobile device login.
     *
     * Validates a challenge response to complete multifactor authentication for
     * mobile device access.
     */
    public async mobileDeviceLoginVerifyChallenge(
        params: MobileDeviceLoginVerifyChallengeRequest,
    ): Promise<MobileDeviceLoginVerifyChallengeResponse> {
        return this.send({
            request: {
                rootKey: "mobileDeviceLoginVerifyChallengeRequest",
                schema: mobileDeviceLoginVerifyChallengeRequestSchema,
                values: params,
            },
            response: {
                rootKey: "mobileDeviceLoginVerifyChallengeResponse",
                schema: mobileDeviceLoginVerifyChallengeResponseSchema,
            },
        });
    }

    /**
     * Performs multifactor authentication login for a mobile device.
     *
     * Completes an MFA process for mobile device authentication.
     */
    public async mobileDeviceMfaLogin(
        params: MobileDeviceMfaLoginRequest,
    ): Promise<MobileDeviceMfaLoginResponse> {
        return this.send({
            request: {
                rootKey: "mobileDeviceMfaLoginRequest",
                schema: mobileDeviceMfaLoginRequestSchema,
                values: params,
            },
            response: {
                rootKey: "mobileDeviceMfaLoginResponse",
                schema: mobileDeviceMfaLoginResponseSchema,
            },
        });
    }

    /**
     * Registers a new mobile device.
     *
     * Enrolls a mobile device for in-app payment processing with a merchant
     * account.
     */
    public async mobileDeviceRegistration(
        params: MobileDeviceRegistrationRequest,
    ): Promise<MobileDeviceRegistrationResponse> {
        return this.send({
            request: {
                rootKey: "mobileDeviceRegistrationRequest",
                schema: mobileDeviceRegistrationRequestSchema,
                values: params,
            },
            response: {
                rootKey: "mobileDeviceRegistrationResponse",
                schema: mobileDeviceRegistrationResponseSchema,
            },
        });
    }

    /**
     * Logs out a mobile device session.
     *
     * Terminates the current mobile device session and invalidates the session
     * token.
     */
    public async logout(params: LogoutRequest): Promise<LogoutResponse> {
        return this.send({
            request: {
                rootKey: "logoutRequest",
                schema: logoutRequestSchema,
                values: params,
            },
            response: {
                rootKey: "logoutResponse",
                schema: logoutResponseSchema,
            },
        });
    }
}
