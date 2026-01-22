# Better Authorize.NET

A modern, type-safe TypeScript/Node.js client for the [Authorize.NET](https://www.authorize.net/) payment gateway.

[![Release](https://github.com/dasprid/better-authorize-net/actions/workflows/release.yml/badge.svg)](https://github.com/dasprid/better-authorize-net/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/DASPRiD/better-authorize-net/graph/badge.svg?token=U2AXYbIrXO)](https://codecov.io/gh/DASPRiD/better-authorize-net)
[![npm version](https://img.shields.io/npm/v/better-authorize-net.svg)](https://www.npmjs.com/package/better-authorize-net)
[![License](https://img.shields.io/badge/license-BSD--2--Clause-blue.svg)](LICENSE)

## Features

- **100% Type-Safe** - Full TypeScript support with auto-generated types from the official Authorize.NET XSD schema
- **Precision-Safe Decimal Handling** - Uses `decimal.js` to prevent floating-point errors in financial calculations
- **Runtime Validation** - Request and response validation powered by [Zod](https://github.com/colinhacks/zod)
- **Modern & Lightweight** - ESM-only, minimal dependencies (just Zod and decimal.js)
- **Complete API Coverage** - Supports the entire Authorize.NET API
- **Auto-Generated Schemas** - Schemas are generated directly from Authorize.NET's official XSD, ensuring accuracy and easy updates
- **Smart Array Handling** - Automatically unwraps objects with a single array property into just the array for better developer experience
- **Correct Element Ordering** - Since Authorize.NET's API is XML-based with JSON as a thin wrapper, element order matters. This library automatically emits request properties in the correct order as defined by the XSD schema, preventing errors that can occur with incorrect ordering (a known issue in the official SDK)

## Installation

```bash
npm install better-authorize-net
```

```bash
pnpm add better-authorize-net
```

```bash
yarn add better-authorize-net
```

## Quick Start

```typescript
import { AuthorizeNetClient } from "better-authorize-net";
import { Decimal } from "decimal.js";

// Initialize the client
const client = new AuthorizeNetClient(
  "sandbox", // or "production"
  {
    name: "YOUR_API_LOGIN_ID",
    transactionKey: "YOUR_TRANSACTION_KEY"
  }
);

// Create a payment transaction
const response = await client.paymentTransactions.createTransaction({
  transactionRequest: {
    transactionType: "authCaptureTransaction",
    amount: new Decimal("29.99"),
    payment: {
      creditCard: {
        cardNumber: "4111111111111111",
        expirationDate: "2025-12",
        cardCode: "123"
      }
    }
  }
});

console.log("Transaction ID:", response.transactionResponse.transId);
```

## Usage Examples

### Creating a Customer Profile

```typescript
import { Decimal } from "decimal.js";

const profile = await client.customerProfiles.createCustomerProfile({
  profile: {
    merchantCustomerId: "customer123",
    email: "customer@example.com",
    paymentProfiles: [
      {
        billTo: {
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          city: "Seattle",
          state: "WA",
          zip: "98101",
          country: "US"
        },
        payment: {
          creditCard: {
            cardNumber: "4111111111111111",
            expirationDate: "2025-12"
          }
        }
      }
    ]
  }
});

console.log("Customer Profile ID:", profile.customerProfileId);
```

### Creating a Subscription

```typescript
import { Decimal } from "decimal.js";

const subscription = await client.arbSubscriptions.createSubscription({
  subscription: {
    name: "Monthly Membership",
    paymentSchedule: {
      interval: {
        length: 1,
        unit: "months"
      },
      startDate: "2024-01-01",
      totalOccurrences: 12
    },
    amount: new Decimal("29.99"),
    payment: {
      creditCard: {
        cardNumber: "4111111111111111",
        expirationDate: "2025-12"
      }
    },
    billTo: {
      firstName: "Jane",
      lastName: "Smith"
    }
  }
});

console.log("Subscription ID:", subscription.subscriptionId);
```

### Error Handling

```typescript
import { AuthorizeNetError } from "better-authorize-net";

try {
  await client.paymentTransactions.createTransaction({
    // ... transaction details
  });
} catch (error) {
  if (error instanceof AuthorizeNetError) {
    // Access structured error messages
    error.messages.forEach(msg => {
      console.error(`[${msg.code}] ${msg.text}`);
    });
  } else {
    throw error;
  }
}
```

## API Documentation

The client exposes the following endpoint groups:

- **`client.paymentTransactions`** - Payment processing (authorize, capture, refund, void, etc.)
- **`client.customerProfiles`** - Customer profile management (CIM)
- **`client.arbSubscriptions`** - Recurring billing subscriptions
- **`client.accountUpdater`** - Automatic credit card updater
- **`client.transactionReporting`** - Transaction details and batch reporting
- **`client.acceptSuite`** - Accept.js payment nonce processing
- **`client.fraudManagement`** - Fraud detection settings
- **`client.mobileInApp`** - Mobile payment processing
- **`client.utility`** - Utility functions (merchant details, etc.)

All methods are fully typed. Your IDE will provide autocomplete and type checking for all requests and responses.

## Advantages Over the Official SDK

This library provides significant improvements over the [official Authorize.NET Node.js SDK](https://github.com/AuthorizeNet/sdk-node):

| Feature                | better-authorize-net                                 | Official SDK                                                    |
|------------------------|------------------------------------------------------|-----------------------------------------------------------------|
| **TypeScript Support** | ✅ Full native TypeScript with auto-generated types   | ❌ JavaScript only (`@types/authorize-net` has only `any` types) |
| **Decimal Precision**  | ✅ Uses `decimal.js` to prevent floating-point errors | ❌ Uses native JavaScript numbers (precision issues)             |
| **Runtime Validation** | ✅ Zod-powered request/response validation            | ❌ No runtime validation                                         |
| **Modern ES Modules**  | ✅ ESM-only, tree-shakeable                           | ⚠️ CommonJS-based                                               |
| **Error Handling**     | ✅ Structured error objects with codes                | ⚠️ String-based errors                                          |
| **Array Handling**     | ✅ Smart unwrapping of single-item arrays             | ❌ Manual handling required                                      |

## Development

### Prerequisites

- Node.js 21+ 
- pnpm 10+

### Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Format code
pnpm format

# Lint and fix issues
pnpm check
```

### Regenerating Schemas

The Zod schemas in `src/schemas.ts` are auto-generated from the official Authorize.NET XSD schema.

To regenerate schemas after updating the XSD file:

```bash
pnpm generate-schemas
```

This will:
1. Parse the Authorize.NET XSD schema
2. Generate Zod schemas for all types
3. Generate TypeScript types from schemas
4. Handle type inheritance, optional/required fields, and arrays
5. Sort schemas by dependencies
6. Format the output with Biome

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

BSD-2-Clause - see [LICENSE](LICENSE) for details.

## Related Links

- [Official Authorize.NET Documentation](https://developer.authorize.net/)
- [Official Authorize.NET Node.js SDK](https://github.com/AuthorizeNet/sdk-node)
- [Authorize.NET API Reference](https://developer.authorize.net/api/reference/)

## Author

Ben Scholzen 'DASPRiD'

---

**Note:** This is an independent project and is not officially affiliated with or endorsed by Authorize.NET.
