import { describe, it } from "node:test";
import { UtilityEndpoints } from "../../src/index.js";
import { testEndpoint } from "../test-helpers.js";

describe("UtilityEndpoints", () => {
    describe("authenticateTest", () => {
        it("should authenticate test", async () => {
            await testEndpoint((send) => new UtilityEndpoints(send), "authenticateTest", {
                userInput: {},
                expectedEncoded: {},
                serverResponse: {},
                expectedDecoded: {},
            });
        });
    });
});
