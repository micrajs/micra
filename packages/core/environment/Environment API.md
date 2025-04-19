# Environment API

## **Summary**

The **Micra Environment API** provides a type-safe, platform-agnostic, and event-driven interface for accessing and managing environment variables across different runtime environments. Designed for modular applications, it enables consistent configuration management through validation, transformation, and reactivity, while abstracting away platform-specific differences.

## **Problem Statement**

Managing environment variables across diverse platforms and runtime contexts is error-prone and inconsistent. Developers face challenges such as:

- Lack of type safety when reading configuration values.
- Difficulty in validating and transforming environment inputs.
- Limited support for observing configuration changes in real time.
- Inconsistent APIs across environments like Node.js, Workers, or Deno.
- Risk of unintentional exposure of secrets or sensitive data.

The Micra Environment API aims to resolve these inconsistencies by offering a standardized, extensible, and secure way to manage environment configuration in a unified and developer-friendly manner.

## **Motivations & Goals**

The Environment API is driven by several key objectives:

- **Developer Confidence & Type Safety**: Empower developers to reliably access and validate environment variables with static typing and schema enforcement.
- **Platform-Agnostic Consistency**: Provide a single unified API that works across JavaScript (Node.js, Deno, Workers, Bun, etc.) and other environments without platform-specific adaptations.
- **Reactive Configuration**: Leverage Micra’s event-driven architecture to enable reactivity—automatically responding to environment changes at runtime.
- **Flexibility & Extensibility**: Support schema validation, type transformation, mutation, and scope isolation, all while remaining highly customizable.
- **Security by Design**: Minimize exposure of secrets with redaction, serialization controls, and integration with secure storage systems.
- **Observability & Introspection**: Offer inspection and telemetry-friendly features without compromising security.
- **Developer Experience**: Include CLI and tooling support for common developer workflows, like validation and .env scaffolding.

## **Constraints**

The design is bound by several explicit and implicit constraints:

- **Strict Platform Agnosticism**: It must not assume the presence of Node.js or browser-specific globals. All access must be abstracted through pluggable adapters.
- **Event-Driven Core**: All mutations, loads, or reloads should integrate with Micra’s event emitter to remain consistent with the broader ecosystem.
- **Safe by Default**: Read-only behavior is preferred; mutation capabilities must be explicitly enabled to avoid unintended side effects.
- **Runtime-Safe Transformations**: All transformations and validations should occur at runtime with fallbacks and safety guards.
- **Schema-First Orientation**: Developers are encouraged to define schemas up front to benefit from validation, transformation, and type inference.
- **No Implicit Global State**: The environment API must operate in well-defined scopes or contexts; global mutation or pollution should be avoided.
- **Minimal Footprint**: The core API should remain lightweight, while more complex integrations (e.g., remote config, secrets managers) may be implemented via extensions or adapters.

## Research

### How do Node.js `process.env` and Deno’s `Deno.env` handle type safety and could Micra improve upon their limitations?

Node.js and Deno provide mechanisms to access environment variables, but they differ in their approaches to type safety and security. Micra can enhance these aspects by integrating type validation, schema enforcement, and secure access patterns.

#### Node.js: `process.env`

**Access Pattern:**

In Node.js, environment variables are accessed via `process.env`, which is an object containing the user environment.

```javascript
const port = process.env.PORT;
```

**Type Safety Limitations:**

- All values in `process.env` are strings or undefined.
- No built-in validation or type coercion.
- Potential runtime errors if variables are missing or improperly formatted.

**Improving Type Safety:**

TypeScript users can extend the `ProcessEnv` interface to define expected environment variables:

```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
```

However, this approach doesn't enforce validation at runtime. Libraries like Zod can be used for runtime validation:

```typescript
import {z} from 'zod';

const envSchema = z.object({
  PORT: z.string().nonempty(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

const env = envSchema.parse(process.env);
```

#### Deno: `Deno.env`

**Access Pattern:**

Deno provides the `Deno.env` API to access environment variables:

```typescript
const port = Deno.env.get('PORT');
```

**Security Model:**

- Deno is secure by default; accessing environment variables requires explicit permission via the `--allow-env` flag.

**Type Safety Limitations:**

- Similar to Node.js, all values are strings or undefined.
- No built-in support for type validation or coercion.

**Improving Type Safety:**

Deno users can implement runtime validation using libraries like Zod, similar to the Node.js approach.

#### Micra's Potential Enhancements

Micra should address the limitations of both Node.js and Deno by introducing:

- **Schema Validation:** Define schemas for environment variables using libraries like Zod to enforce structure and types.

- **Type Coercion:** Automatically convert environment variable strings to appropriate types (e.g., numbers, booleans).

- **Secure Access:** Implement access controls to prevent unauthorized access to sensitive variables.

- **Developer Experience:** Provide clear error messages and documentation for missing or invalid environment variables.

### What schema validation strategies do frameworks like NestJS or AdonisJS use for environment configuration, and how might Micra integrate or differ?

Frameworks like **NestJS** and **AdonisJS** implement robust strategies for environment variable validation to ensure application configurations are reliable and secure. Examining their approaches provides valuable insights into how **Micra** might integrate similar or enhanced mechanisms.

#### **NestJS Environment Variable Validation**

NestJS utilizes the `@nestjs/config` package to manage and validate environment variables. It offers two primary methods for validation:

1. **Joi Schema Validation:**

   - Developers can define a Joi schema that specifies the expected structure and constraints of environment variables.
   - This schema is passed to the `ConfigModule.forRoot()` method, enabling automatic validation during application startup.

   _Example:_

   ```typescript
   import * as Joi from 'joi';
   import {Module} from '@nestjs/common';
   import {ConfigModule} from '@nestjs/config';

   @Module({
     imports: [
       ConfigModule.forRoot({
         validationSchema: Joi.object({
           NODE_ENV: Joi.string()
             .valid('development', 'production', 'test')
             .default('development'),
           PORT: Joi.number().default(3000),
         }),
       }),
     ],
   })
   export class AppModule {}
   ```

   In this setup, `NODE_ENV` is constrained to specific values with a default, and `PORT` has a default value if not provided.

2. **Custom Validation Function:**

   - Developers can create a custom `validate` function that uses `class-validator` and `class-transformer` to enforce validation rules.
   - This function processes the environment configuration and throws errors if validation fails.

   _Example:_

   ```typescript
   import {plainToInstance} from 'class-transformer';
   import {IsNumber, IsString, validateSync} from 'class-validator';

   class EnvironmentVariables {
     @IsString()
     DATABASE_HOST: string;

     @IsNumber()
     DATABASE_PORT: number;
   }

   export function validate(config: Record<string, unknown>) {
     const validatedConfig = plainToInstance(EnvironmentVariables, config, {
       enableImplicitConversion: true,
     });
     const errors = validateSync(validatedConfig, {
       skipMissingProperties: false,
     });

     if (errors.length > 0) {
       throw new Error(errors.toString());
     }
     return validatedConfig;
   }
   ```

   This function ensures that `DATABASE_HOST` is a string and `DATABASE_PORT` is a number, throwing an error if these conditions are not met.

#### **AdonisJS Environment Variable Validation**

AdonisJS provides a built-in `Env` module that facilitates environment variable validation with a schema-based approach:

- **Schema Definition:**

  - Validation rules are defined using the `Env.create` method, specifying the expected format and constraints for each environment variable.
  - The schema supports various types, including strings, numbers, booleans, and enums.

  _Example:_

  ```typescript
  import Env from '@adonisjs/core/env';

  export default await Env.create(new URL('../', import.meta.url), {
    HOST: Env.schema.string({format: 'host'}),
    PORT: Env.schema.number(),
    APP_KEY: Env.schema.string(),
    NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  });
  ```

  In this configuration, `HOST` must be a valid host string, `PORT` a number, `APP_KEY` a string, and `NODE_ENV` one of the specified values.

- **Validation Execution:**
  - The validation is performed automatically when the `env.ts` file is imported, typically during the application's boot process.
  - If any variable fails validation, the application will refuse to start, ensuring that misconfigurations are caught early.

#### **Potential Integration into Micra**

Micra should adopt and enhance these strategies to provide robust environment variable validation:

1. **Schema-Based Validation:**

   - Should implement a schema definition system similar to AdonisJS, allowing developers to specify expected types and constraints for environment variables.
   - Should utilize TypeScript's type system in conjunction with validation libraries like Zod or Yup to enforce these schemas.

   This approach would ensure that environment variables conform to the specified schema, throwing descriptive errors if validation fails.

2. **Early Validation During Bootstrapping:**

   - Should incorporate validation checks early in the application lifecycle, preventing the application from starting if critical environment variables are missing or misconfigured.
   - Should provide clear and actionable error messages to facilitate debugging.

3. **Type Safety and IntelliSense:**

   - Should leverage TypeScript's capabilities to infer types from the validation schema, providing developers with type safety and IntelliSense support when accessing environment variables.
   - This should enhance the developer experience by catching type-related errors at compile time.

4. **Extensibility and Customization:**
   - Should allow developers to define custom validation functions for complex scenarios that may not be covered by standard schemas.
   - Should ensure that the validation system is flexible and can be tailored to the specific needs of different projects.

### In what ways does Go’s `viper` or Rust’s `envy` manage layered or scoped environment configurations, and should Micra adopt a similar layering model?

Frameworks like Go's **Viper** and Rust's **envy** offer layered configuration management by combining multiple sources such as files, environment variables, and defaults. Micra can adopt similar strategies to enhance its configuration handling.

#### Go's Viper: Layered Configuration

Viper allows loading configurations from various sources with a defined precedence:

1. Explicit calls to `Set`
2. Command-line flags
3. Environment variables
4. Configuration files
5. Remote key/value stores
6. Defaults

**Example:**

```go
viper.SetDefault("port", 8080)

viper.SetConfigName("config")
viper.AddConfigPath(".")
err := viper.ReadInConfig()
if err != nil {
    // Handle error
}

viper.AutomaticEnv()
viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

port := viper.GetInt("port")
```

In this setup, Viper:

- Sets a default value for `port`.
- Reads from a configuration file named `config` in the current directory.
- Overrides with environment variables, replacing dots with underscores (e.g., `PORT`).

This layering ensures that environment variables can override configuration file values, which in turn can override defaults.

#### Rust's envy: Environment Variable Deserialization

The `envy` crate in Rust focuses on deserializing environment variables into strongly typed structs using Serde.

**Example:**

```rust
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Config {
    port: u16,
    debug: bool,
}

fn main() {
    let config = envy::from_env::<Config>().expect("Failed to load config");
    println!("{:?}", config);
}
```

This approach ensures type safety by mapping environment variables to struct fields. However, `envy` doesn't natively support layering with configuration files or defaults.

#### Micra's Potential Layering Model

Micra should enhance its configuration management by adopting a layered approach similar to Viper and extending it with type safety akin to envy.

**Proposed Layering Order:**

1. Defaults defined in code.
2. Environment variables.
3. Runtime overrides via environment service providers.

**Benefits:**

- **Flexibility:** Should allow configurations to be overridden in different environments without changing code.
- **Type Safety:** Should ensure that configurations are of expected types, reducing runtime errors.
- **Maintainability:** Clear precedence rules should make it easier to understand which configuration is in effect.

**Implementation Considerations:**

- Should use schema validation libraries to enforce type safety.
- Should provide adapters for different configuration sources.

### How do other ecosystems handle runtime reactivity for configuration changes, if at all, and what trade-offs come with introducing event-driven behavior in Micra?

Various ecosystems implement runtime reactivity for configuration changes to enhance flexibility, responsiveness, and operational efficiency. Micra can draw inspiration from these implementations while considering the associated trade-offs.

#### **Runtime Reactivity in Other Ecosystems**

##### **1. AWS AppConfig**

AWS AppConfig enables applications to dynamically update configurations without redeployment. It integrates with AWS EventBridge to notify services of configuration changes, allowing for immediate adjustments. This approach supports feature flagging, operational tuning, and staged rollouts.

_Example:_

```json
{
  "source": "/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.AppConfiguration/configurationStores/{config-store}",
  "subject": "AppConfigKeyValueModified",
  "eventType": "Microsoft.AppConfiguration.KeyValueModified",
  "data": {
    "key": "FeatureToggle:NewFeature",
    "label": "Production",
    "etag": "abc123"
  },
  "eventTime": "2025-04-19T09:57:18Z",
  "id": "event-id-123",
  "dataVersion": "1.0"
}
```

Applications subscribed to such events can adjust their behavior accordingly.

##### **2. Azure App Configuration**

Azure App Configuration uses Azure Event Grid to dispatch events when configuration values change. Subscribers, such as Azure Functions or Logic Apps, can react to these events to update application settings in real-time.

_Example:_

```json
{
  "eventType": "Microsoft.AppConfiguration.KeyValueModified",
  "subject": "AppConfigKeyValueModified",
  "data": {
    "key": "AppSettings:MaxRetries",
    "label": "Production",
    "etag": "xyz789"
  },
  "eventTime": "2025-04-19T09:57:18Z",
  "id": "event-id-456",
  "dataVersion": "1.0"
}
```

This mechanism allows applications to respond promptly to configuration changes without polling.

##### **3. SaltStack**

SaltStack employs an event-driven architecture to manage configurations across large infrastructures. It listens for events and executes predefined reactions, enabling real-time configuration enforcement and remediation.

_Example:_

```yaml
reactor:
  - 'salt/minion/*/start':
      - /srv/reactor/start.sls
```

This setup triggers the `start.sls` state file when any minion starts, ensuring configurations are applied immediately.

#### **Trade-offs of Introducing Event-Driven Behavior in Micra**

##### **Advantages**

- **Dynamic Adaptability**: Applications can adjust configurations on-the-fly, enhancing responsiveness to changing conditions.

- **Reduced Downtime**: Eliminates the need for application restarts when updating configurations, improving availability.

- **Feature Management**: Facilitates feature toggling and gradual rollouts, enabling safer deployments.

##### **Challenges**

- **Increased Complexity**: Implementing an event-driven system adds architectural complexity, requiring careful design and maintenance.

- **Consistency Risks**: Ensuring all components receive and apply configuration changes uniformly can be challenging, potentially leading to inconsistent states.

- **Security Considerations**: Dynamic configurations must be secured to prevent unauthorized changes that could compromise the system.

- **Performance Overhead**: Real-time event processing may introduce additional load, necessitating efficient handling mechanisms.

#### **Implementation Considerations for Micra**

To effectively incorporate runtime reactivity, Micra should consider the following:

- **Event Subscription Mechanism**: Develop a robust event subscription and handling system to listen for and apply configuration changes.

- **Validation and Testing**: Implement rigorous validation of configuration changes to prevent the introduction of invalid settings.

- **Security Measures**: Ensure that only authorized sources can emit configuration change events, and that changes are authenticated and authorized.

- **Fallback Strategies**: Design fallback mechanisms to maintain operation in case of event processing failures or invalid configurations.

- **Monitoring and Logging**: Provide comprehensive monitoring and logging to track configuration changes and their impacts.

### What conventions exist in Python (`os.environ`) or Java (`System.getenv`) for read-only access, and how do they compare to Micra’s safe-by-default constraint?

In both Python and Java, accessing environment variables is intentionally designed to be read-only, ensuring application stability and security. Micra's "safe-by-default" constraint aligns with these conventions but offers enhanced flexibility through controlled mutability.

#### Python: `os.environ`

In Python, the `os.environ` object provides a mapping interface to the environment variables.

```python
import os

## Accessing an environment variable
db_host = os.environ.get("DB_HOST")

## Attempting to modify an environment variable
os.environ["DB_HOST"] = "localhost"
```

While `os.environ` allows modification within the Python process, these changes do not affect the parent process or other running processes. Moreover, changes made outside the Python process are not automatically reflected in `os.environ`, as it is initialized at the start of the Python process. 

#### Java: `System.getenv()`

In Java, the `System.getenv()` method provides access to environment variables.

```java
import java.util.Map;

public class EnvExample {
    public static void main(String[] args) {
        String dbHost = System.getenv("DB_HOST");
        System.out.println("DB_HOST: " + dbHost);
    }
}
```

The map returned by `System.getenv()` is unmodifiable. Attempting to modify it will result in an `UnsupportedOperationException`. This design ensures that environment variables remain consistent and unaltered during the application's runtime.

#### Micra's Safe-by-Default Constraint

Micra should adopt a "safe-by-default" approach, treating environment variables as immutable unless explicitly configured otherwise. This design choice aligns with the conventions in Python and Java, promoting stability and predictability.

**Key Features:**

- **Explicit Mutability:** Developers must explicitly enable mutability, preventing accidental changes.

- **Scoped Changes:** Changes can be scoped to specific environments or scopes, reducing unintended side effects.

- **Event-Driven Updates:** Micra should emit events on environment changes, allowing for reactive programming patterns.

By requiring explicit actions to modify environment variables, Micra ensures that applications remain secure and maintainable, adhering to best practices observed in other ecosystems.

### How do secret management strategies in platforms like .NET (e.g., `IConfiguration`) or HashiCorp Vault integrations in Rust/Go compare with Micra’s proposed redaction and sensitivity marking?

Platforms like .NET and HashiCorp Vault implement comprehensive strategies for managing sensitive information, focusing on secure storage, controlled access, and prevention of inadvertent exposure. Micra's proposed approach to secret management aligns with these principles while offering its own mechanisms for redaction and sensitivity marking.

#### Secret Management in .NET

In the .NET ecosystem, secret management is handled through a combination of configuration systems and dedicated tools:

- **User Secrets**: During development, .NET provides the Secret Manager tool to store sensitive data outside of source control. This tool stores secrets in a separate location on the developer's machine, preventing accidental commits of sensitive information.

  _Example:_

  ```bash
  dotnet user-secrets init
  dotnet user-secrets set "ApiKey" "your-api-key"
  ```

  These secrets can then be accessed in the application via the configuration system.

- **Environment Variables**: For production environments, .NET encourages the use of environment variables to store secrets, ensuring they are not hardcoded or stored in configuration files.

- **Azure Key Vault**: Integration with Azure Key Vault allows for centralized management of secrets, providing features like access control, auditing, and automatic rotation.

Additionally, .NET offers mechanisms to prevent sensitive data from appearing in logs:

- **Redaction in Logging**: Using packages like `Microsoft.Extensions.Compliance.Redaction`, developers can define data classifications and apply redaction policies to ensure that sensitive information is masked in logs.

  _Example:_

  ```csharp
  [LogProperties]
  public class UserData
  {
      [SensitiveData]
      public string Password { get; set; }
  }
  ```

  In this example, the `Password` property would be redacted in logs, preventing exposure of sensitive information.

#### Secret Management with HashiCorp Vault

HashiCorp Vault provides a robust solution for managing secrets across various environments:

- **Centralized Secret Storage**: Vault stores secrets in a centralized location, allowing for consistent management and access control.

- **Dynamic Secrets**: Vault can generate secrets on-demand, such as database credentials, which are automatically revoked after a specified time-to-live (TTL).

- **Access Control and Auditing**: Vault enforces strict access policies and maintains audit logs of all secret access, enhancing security and compliance.

- **Integration with Applications**: Applications can retrieve secrets from Vault using its API or CLI, ensuring that sensitive data is not hardcoded or stored in configuration files.

  _Example:_

  ```bash
  vault kv get secret/myapp/config
  ```

  This command retrieves the secrets stored at the specified path, which can then be used by the application.

#### Comparison with Micra's Approach

Micra's proposed secret management strategy should emphasizes:

- **Sensitivity Marking**: Variables should be explicitly marked as sensitive, ensuring they are handled appropriately throughout the application lifecycle.

- **Redaction in Logs and Telemetry**: Micra should enforce redaction of sensitive variables in logs and telemetry data, preventing accidental exposure.

- **Controlled Mutability**: By default, environment variables should immutable in Micra, and any changes should be explicitly enabled, reducing the risk of unintended modifications.

- **Platform-Agnostic Integration**: Micra's design should allow for integration with various secret management systems, including HashiCorp Vault, by providing adapters that abstract platform-specific details.

### What are the benefits and limitations of `.env` file handling in PHP’s `symfony/dotenv` or Python’s `python-decouple`, and should Micra abstract this behind an adapter?

Frameworks like PHP’s Symfony and Python’s `python-decouple` utilize `.env` files to manage environment-specific configurations. These files offer a straightforward method for setting environment variables, but they come with both advantages and limitations.

#### Benefits of `.env` File Handling

**1. Separation of Configuration from Code**

- **Symfony**: Utilizes `.env` files to define environment variables, promoting a clear separation between code and configuration. This approach aligns with the [12-Factor App methodology](https://12factor.net/config).

- **Python-Decouple**: Encourages storing settings in `.env` files, keeping sensitive information like API keys and database credentials out of the source code.

**2. Ease of Use and Flexibility**

- **Symfony**: Supports multiple `.env` files (`.env`, `.env.local`, `.env.prod`, etc.) to cater to different environments. This allows developers to override default settings without modifying the main configuration.

- **Python-Decouple**: Allows for default values and type casting, making it easier to manage configurations across various environments.

**3. Improved Security Practices**

- **Symfony**: Encourages the use of `.env.local` for sensitive data, which should not be committed to version control. This practice helps prevent accidental exposure of secrets.

- **Python-Decouple**: By keeping sensitive configurations in `.env` files and out of the codebase, it reduces the risk of exposing secrets in version control systems.

#### Limitations of `.env` File Handling

**1. Security Risks**

- **Symfony**: If `.env` files are improperly managed, there's a risk of committing sensitive information to version control. Additionally, storing secrets in plain text poses security concerns.

- **Python-Decouple**: Similar risks exist if `.env` files are not excluded from version control or if they are shared insecurely.

**2. Lack of Advanced Features**

- **Symfony**: While it provides basic support for environment variables, it lacks advanced features like dynamic reloading or integration with secret management systems out of the box.

- **Python-Decouple**: Does not offer built-in support for features like environment variable validation or integration with external secret managers.

**3. Potential for Configuration Drift**

- **Symfony & Python-Decouple**: Managing multiple `.env` files across different environments can lead to configuration drift, where environments become inconsistent over time.

#### Should Micra Abstract `.env` Handling Behind an Adapter?

Given the benefits and limitations observed in Symfony and Python-Decouple, Micra could consider abstracting `.env` file handling behind an adapter.

**Advantages:**

- **Unified Interface**: An adapter can provide a consistent API for accessing configuration, regardless of the underlying source (e.g., `.env` files, environment variables, secret managers).

- **Enhanced Security**: By integrating with secret management systems, Micra can offer more secure handling of sensitive configurations.

- **Improved Flexibility**: An adapter allows for dynamic reloading and validation of configurations, addressing some limitations of traditional `.env` file handling.

**Considerations:**

- **Increased Complexity**: Introducing an adapter adds complexity to the system, which may not be necessary for all projects.

- **Learning Curve**: Developers familiar with traditional `.env` file handling may need to learn new patterns and practices.

### Do other platforms support introspection or dynamic reloading of environment state (e.g., watching `.env` files), and how should Micra weigh those behaviors against its minimal-footprint goal?

Several platforms support introspection and dynamic reloading of environment variables, though implementations and capabilities vary. Micra may consider these practices to enhance developer experience while balancing its minimal-footprint philosophy.

#### Introspection and Dynamic Reloading in Other Platforms

##### **1. Node.js with `dotenv`**

In Node.js, the `dotenv` package loads environment variables from a `.env` file into `process.env`. However, it does not natively support watching `.env` files for changes. Developers must manually reload the environment variables or restart the application to apply changes.

```javascript
require('dotenv').config();
// Changes to .env after this point won't be reflected unless reloaded manually.
```

##### **2. Vite**

Vite loads `.env` files at startup, including mode-specific files like `.env.production`. It does not watch for changes to these files during development. To apply changes, developers must restart the development server.

##### **3. Bun**

Bun currently lacks the ability to detect changes in `.env` files during runtime. A feature request has been made to enable dynamic detection of `.env` file changes when using the `--hot` flag, allowing applications to automatically reload configurations without manual restarts.

##### **4. NestJS**

NestJS uses the `ConfigModule` to load environment variables. While it supports loading different `.env` files based on the environment (e.g., `.env.test`, `.env.production`), it does not support dynamic reloading of these files during runtime.

#### Considerations for Micra

Micra could consider implementing dynamic reloading of environment variables with the following features:

- **File Watching**: Monitor `.env` files for changes and reload variables as needed.

- **Event Emission**: Emit events upon changes to environment variables, allowing parts of the application to respond accordingly.

- **Scoped Reloading**: Reload variables within specific scopes or contexts to prevent unintended side effects.

- **Security Measures**: Ensure that sensitive variables are handled securely during reloading, avoiding exposure in logs or error messages.

While dynamic reloading of environment variables can enhance developer experience, it introduces complexity, maintenance overhead and potential security considerations. Micra should use its event-driven architecture to manage these changes effectively, but should rely on existing tooling like vite or bun for file watching, rather than implementing its own solution.

### What patterns exist in JavaScript runtimes for serializing environment state safely, and how might Micra ensure secrets are excluded from logs or telemetry?

In JavaScript runtimes like Node.js, managing and serializing environment variables securely is crucial to prevent inadvertent exposure of sensitive data. Micra, aiming for a safe-by-default configuration system, might consider adopting and enhancing existing patterns to ensure secrets are excluded from logs or telemetry.

#### Patterns in JavaScript Runtimes for Safe Environment Serialization

##### 1. **Manual Redaction Before Logging**

Developers often manually redact sensitive fields before logging configuration objects.

```javascript
const config = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: '***', // Redacted
  API_KEY: '***', // Redacted
};

console.log(JSON.stringify(config));
```

While straightforward, this approach relies on developers remembering to redact sensitive fields, which can be error-prone.

##### 2. **Custom Serialization Functions**

Creating functions that automatically redact predefined sensitive keys enhances consistency.

```javascript
function redactEnv(env, sensitiveKeys) {
  return Object.fromEntries(
    Object.entries(env).map(([key, value]) =>
      sensitiveKeys.includes(key) ? [key, '***'] : [key, value],
    ),
  );
}

const safeEnv = redactEnv(process.env, ['DB_PASSWORD', 'API_KEY']);
console.log(JSON.stringify(safeEnv));
```

This method centralizes redaction logic but requires maintaining the list of sensitive keys.

##### 3. **Using External Libraries**

Libraries like `redactyl.js` provide utilities to recursively redact sensitive data in objects based on specified keys.

```javascript
const Redactyl = require('redactyl.js');

const redactyl = new Redactyl({
  properties: ['DB_PASSWORD'],
});

const data = {
  APP_NAME: 'Micra App',
  DB_PASSWORD: 'P@$$w0rd',
};

const redacted = redactyl.redact(data);
/* Result:
{
  APP_NAME: 'Micra App',
  DB_PASSWORD: '[REDACTED]',
}
*/
```

Such tools automate redaction but add external dependencies to the project.

#### Potential Strategies for Micra

Micra could implement the following strategies to ensure secrets are excluded from logs or telemetry:

##### 1. **Sensitivity Marking**

Allow developers to mark certain environment variables as sensitive.

```typescript
env.define({DB_PASSWORD: {sensitive: true}});
```

Micra might then automatically redact these variables during serialization or logging.

##### 2. **Custom Serialization Methods**

Provide built-in methods that serialize environment configurations while omitting or redacting sensitive fields.

```typescript
const safeConfig = env.toJSON();
console.log(JSON.stringify(safeConfig));
```

This approach standardizes safe serialization practices across applications.

##### 3. **Integration with Logging Systems**

Micra could integrate with popular logging libraries to automatically redact sensitive information.

```typescript
logger.info('Configuration:', env.toSafeJSON());
```

By embedding redaction logic within logging mechanisms, Micra ensures consistent handling of sensitive data.

### What trade-offs arise from disallowing implicit global state, especially in contrast with Node.js's global `process.env` or Go’s global `os.Getenv()`?

Disallowing implicit global state in configuration management—such as avoiding direct access to `process.env` in Node.js or `os.Getenv()` in Go—offers significant advantages in modularity, testability, and security. However, it also introduces certain trade-offs, particularly when compared to the convenience of global access patterns.

#### Trade-Offs of Avoiding Implicit Global State

##### **1. Enhanced Modularity and Testability**

**Benefit**: By avoiding global state, applications can achieve better modularity. Components become more predictable and easier to test, as they rely on explicit configuration passed during initialization.

**Example**:

```javascript
// Instead of accessing process.env directly within the module
class DatabaseClient {
  constructor(config) {
    this.host = config.DB_HOST;
    this.user = config.DB_USER;
  }
}

// During application bootstrap
const config = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
};

const dbClient = new DatabaseClient(config);
```

This approach decouples the module from the global environment, facilitating easier testing and reuse.

##### **2. Increased Boilerplate and Complexity**

**Drawback**: Avoiding global state can lead to more verbose code, as configurations need to be explicitly passed through multiple layers of the application. This can increase the complexity of the codebase, especially in large applications.

##### **3. Improved Security and Predictability**

**Benefit**: Restricting access to global state reduces the risk of unintended side effects and makes the application's behavior more predictable. It also minimizes the chances of sensitive information being inadvertently exposed.

#### Comparison with Node.js and Go

##### **Node.js (`process.env`)**

In Node.js, `process.env` provides global access to environment variables, which is convenient but can lead to tightly coupled code. Modules that access `process.env` directly are harder to test and reuse. Moreover, changes to environment variables during runtime can lead to unpredictable behavior.

##### **Go (`os.Getenv()`)**

Similarly, Go's `os.Getenv()` allows global access to environment variables. While this is straightforward, it can lead to challenges in testing and modularity. Some developers use global configuration structs initialized at startup to mitigate this, but this still introduces global state.

#### Potential Approach for Micra

Micra could adopt a configuration management approach that avoids implicit global state by:

- **Explicit Configuration Passing**: Encouraging the passing of configuration objects to modules and components, enhancing modularity and testability.

- **Scoped Configuration Contexts**: Implementing scoped contexts for configurations, allowing different parts of the application to operate with different configurations without interference.

- **Immutable Configuration Objects**: Using immutable configuration objects to prevent runtime modifications, ensuring consistent behavior throughout the application's lifecycle.

By adopting these strategies, Micra may provide a more robust and maintainable configuration management system, aligning with best practices in software design.

### Many frameworks conflate the concepts of environment variables and configuration. How should Micra differentiate between these concepts, and what are the implications for its API design?

Many frameworks conflate environment variables and configuration, treating them interchangeably. However, distinguishing between the two can lead to clearer application architecture and better security practices.

#### Differentiating Environment Variables and Configuration

**Environment Variables**:

- **Definition**: Key-value pairs provided by the operating system or container environment.
- **Purpose**: Store sensitive information (e.g., API keys, database credentials) and environment-specific settings.
- **Characteristics**:
  - Not version-controlled.
  - Set outside the application code.
  - Accessible via process-level APIs (e.g., `process.env` in Node.js).

**Configuration**:

- **Definition**: Application-specific settings that dictate behavior (e.g., feature toggles, logging levels).
- **Purpose**: Define how the application operates under various conditions.
- **Characteristics**:
  - Often stored in version-controlled files (e.g., JSON, YAML).
  - Can be overridden by environment variables for flexibility.
  - Loaded and parsed by the application at runtime.

#### Implications for Micra's API Design

Micra could benefit from a clear separation between environment variables and configuration:

1. **Layered Configuration Loading**:

   - **Approach**: Load default configurations from files, then override with environment variables.
   - **Benefit**: Provides sensible defaults while allowing environment-specific overrides.

2. **Schema Validation**:

   - **Approach**: Define schemas for configurations to validate types and required fields.
   - **Benefit**: Ensures configurations are complete and correctly typed.

3. **Explicit API Methods**:

   - **Approach**: Provide separate methods for accessing environment variables and configurations.
   - **Benefit**: Clarifies the source and purpose of each setting.

4. **Security Considerations**:
   - **Approach**: Restrict access to sensitive environment variables and prevent them from being logged.
   - **Benefit**: Protects sensitive information from accidental exposure.

By differentiating between environment variables and configuration, Micra can promote better application design, enhance security, and provide a more intuitive API for developers.

### What insights can be gained from tools like AWS Parameter Store or Firebase Remote Config regarding remote environment synchronization, and should Micra consider similar extensibility points?

Tools like AWS Systems Manager Parameter Store and Firebase Remote Config offer robust solutions for remote environment synchronization, providing valuable insights for Micra's potential extensibility in this area.

#### Insights from AWS Parameter Store

**AWS Systems Manager Parameter Store** offers secure, hierarchical storage for configuration data and secrets. Key features include:

- **Hierarchical Parameter Organization**: Parameters can be organized using a hierarchical structure (e.g., `/Prod/MyApp/DBPassword`), facilitating environment-specific configurations. 

- **Cross-Account Sharing**: Advanced parameters can be shared across AWS accounts using AWS Resource Access Manager (RAM), enabling centralized configuration management in multi-account environments.

- **Change Notifications**: Integration with Amazon EventBridge allows for monitoring parameter changes, enabling automated responses to configuration updates.

- **Versioning and Labeling**: Parameters support versioning, allowing for rollback and tracking of configuration changes over time.

#### Insights from Firebase Remote Config

**Firebase Remote Config** is a cloud service that enables dynamic configuration of applications without requiring users to download updates. Notable features include:

- **Real-Time Updates**: Applications can fetch and activate configuration changes in real-time, ensuring users receive the latest configurations promptly.

- **Conditional Configurations**: Parameters can be tailored based on user attributes, app versions, or device characteristics, allowing for targeted configurations.

- **A/B Testing and Personalization**: Integration with Firebase Analytics enables experimentation with different configurations to optimize user experiences.

- **Multi-Environment Synchronization**: Synchronization across multiple Firebase projects can be automated using CI/CD pipelines, ensuring consistency between development and production environments.

#### Considerations for Micra

Given these insights, Micra might consider the following extensibility points:

- **Adapter-Based Integration**: Implementing adapters for services like AWS Parameter Store and Firebase Remote Config could allow Micra to interface with these platforms, enabling centralized configuration management.

- **Hierarchical Configuration Support**: Adopting a hierarchical structure for environment variables may facilitate organized and scalable configuration management across different environments and applications.

- **Real-Time Configuration Updates**: Incorporating mechanisms to fetch and apply configuration changes in real-time could enhance the responsiveness of applications to configuration updates.

- **Environment-Specific Configurations**: Supporting conditional configurations based on environment, user attributes, or other criteria might provide flexibility in managing diverse deployment scenarios.

- **Versioning and Rollback**: Implementing version control for configurations could allow for tracking changes and rolling back to previous states if necessary.

By considering these extensibility points, Micra could enhance its capability to manage configurations dynamically and securely across various environments and platforms.

### Should Micra's API expose reactive subscribers similar to observable patterns in RxJS or C#’s `IObservable<T>` for fine-grained tracking of config changes?

Exposing reactive subscribers in Micra's Environment API—akin to observable patterns in RxJS or C#'s `IObservable<T>`—could significantly enhance its capability to track configuration changes in real-time. This approach aligns with modern reactive programming paradigms, offering both flexibility and responsiveness.

#### **Insights from RxJS and C#'s `IObservable<T>`**

**RxJS (JavaScript):**
RxJS provides a robust framework for handling asynchronous data streams. Developers can create observables that emit values over time, allowing subscribers to react to these emissions.

```javascript
import {BehaviorSubject} from 'rxjs';

const configSubject = new BehaviorSubject(initialConfig);

// Subscriber reacts to configuration changes
configSubject.subscribe((newConfig) => {
  console.log('Configuration updated:', newConfig);
});

// Emit a new configuration
configSubject.next(updatedConfig);
```

This pattern is prevalent in frameworks like Angular, where services often expose observables to allow components to react to data changes seamlessly.

**C#'s `IObservable<T>`:**
In .NET, the observer pattern is implemented using the `IObservable<T>` and `IObserver<T>` interfaces. This design enables a provider to push data to subscribers, who implement the `IObserver<T>` interface.

```csharp
public class ConfigProvider : IObservable<Config>
{
    private List<IObserver<Config>> observers = new List<IObserver<Config>>();

    public IDisposable Subscribe(IObserver<Config> observer)
    {
        if (!observers.Contains(observer))
            observers.Add(observer);
        return new Unsubscriber(observers, observer);
    }

    public void UpdateConfig(Config newConfig)
    {
        foreach (var observer in observers)
            observer.OnNext(newConfig);
    }
}
```

This model is particularly effective in scenarios requiring real-time updates, such as UI components reacting to data changes.

#### **Potential Implementation in Micra**

Micra could incorporate a reactive subscription mechanism to monitor environment configuration changes.

**Hypothetical Implementation:**

```javascript
// Define a reactive environment variable
const dbHost$ = env.observe('DB_HOST');

// Subscribe to changes
dbHost$.subscribe((newHost) => {
  console.log('Database host changed to:', newHost);
});
```

In this example, `env.observe` returns an observable that emits a new value whenever the `DB_HOST` environment variable changes. This allows different parts of the application to react to configuration changes in a decoupled manner.

Micra's current approach of utilizing `addEventListener` for configuration change notifications aligns with the principle of maintaining a lightweight and accessible API. This method offers a straightforward mechanism for components to react to changes without introducing the complexity associated with observable patterns.

#### **Comparing Event Listeners and Observables**

**Event Listeners:**

- **Simplicity:** `addEventListener` provides a familiar and easy-to-understand interface for developers, reducing the learning curve.
- **Performance:** Traditional event listeners are generally lightweight and introduce minimal overhead, making them suitable for applications where performance is critical.
- **Maintenance:** Managing event listeners is straightforward, with clear patterns for adding and removing listeners to prevent memory leaks.

**Observables (e.g., RxJS, `IObservable<T>`):**

- **Advanced Features:** Observables offer powerful capabilities like data stream composition, transformation, and filtering, which can be beneficial in complex scenarios.
- **Reactive Paradigm:** They enable a reactive programming model, allowing for more declarative code when dealing with asynchronous data streams.
- **Complexity:** Introducing observables can increase the cognitive load for developers unfamiliar with reactive programming concepts, potentially leading to a steeper learning curve.

#### **Trade-offs and Considerations for Micra**

While observables provide advanced features, their inclusion in Micra's API could introduce unnecessary complexity for many use cases. The current `addEventListener` approach offers a balance between functionality and simplicity, catering to a broad range of applications without imposing the overhead of a reactive programming model.

However, for applications that require more sophisticated configuration change handling, Micra could consider offering optional integrations with observable libraries. This would allow developers to opt-in to more complex patterns when needed, without burdening the core API with additional complexity.

#### **Conclusion**

Maintaining a simple and intuitive API is crucial for developer adoption and ease of use. Micra's use of `addEventListener` for configuration change notifications supports this goal, providing a clear and efficient mechanism for handling changes. While observables offer advanced capabilities, their complexity may not be justified for the majority of use cases. By potentially offering optional integrations for those who need them, Micra can cater to both simple and complex application requirements without compromising its core design principles.

## API Design

### Definition

```typescript
import type {ApplicationError} from '../error';
import type {EventEmitter} from '../event-emitter';

// Allowed data types for environment variables
export type EnvironmentVariableData =
  | string
  | number
  | boolean
  | symbol
  | null
  | undefined;

// Structure used to define rules for an environment variable
export interface EnvironmentDefinition<T = EnvironmentVariableData> {
  default?: T;
  required?: boolean;
  sensitive?: boolean;
  transform?: (input: unknown) => T;
  validate?: (value: unknown) => boolean;
}

// Configuration for serializing environment data
export interface EnvironmentSerializeOptions {
  includeSensitive?: boolean;
  pick?: string[];
  omit?: string[];
}

// Events emitted by the environment
export interface EnvironmentEventMap {
  'environment:change': {name: string; value: unknown};
  [`environment:change:${string}`]: {name: string; value: unknown};
  error: {name: string; error: ApplicationError};
}

// Main Environment interface
export interface Environment<
  Variables extends Record<string, EnvironmentVariableData> = Record<
    string,
    EnvironmentVariableData
  >,
> extends EventEmitter<EnvironmentEventMap> {
  get<T extends keyof Variables>(name: T): Variables[T] | undefined;
  get<T extends keyof Variables>(name: T, fallback: Variables[T]): Variables[T];

  has(name: string): boolean;
  missing(name: string): boolean;

  define<T extends keyof Variables>(
    key: T,
    definition: EnvironmentDefinition<Variables[T]>,
  ): void;
  define<
    Defs extends Partial<{
      [K in keyof Variables]: EnvironmentDefinition<Variables[K]>;
    }>,
  >(
    key: Defs,
  ): void;

  set<T extends keyof Variables>(name: T, value: Variables[T]): void;
  set(partial: Partial<Variables>): void;
  unset(name: keyof Variables): void;

  validate(): void;

  fork(overrides: Partial<Variables>): Environment<Variables>;

  toJSON(options?: EnvironmentSerializeOptions): Record<string, unknown>;
}
```

### Examples

#### Define and Get a Variable

```ts
env.define('PORT', {
  default: 3000,
});

env.get('PORT'); // 3000
env.set('PORT', 8080);
env.get('PORT'); // 8080
```

#### Get with Fallback

```ts
const mode = env.get('MODE', 'development'); // Returns 'development' if MODE is unset
```

#### Check for Presence

```ts
env.set('DEBUG', true);

env.has('DEBUG'); // true
env.missing('DEBUG'); // false

env.unset('DEBUG');

env.has('DEBUG'); // false
env.missing('DEBUG'); // true
```

#### Define Sensitive Variable and Serialize

```ts
env.define('SECRET_KEY', {
  required: true,
  sensitive: true,
});

env.set('SECRET_KEY', 'my-secret');

const config = env.toJSON();
// { SECRET_KEY: undefined } ← sensitive values are excluded

const full = env.toJSON({includeSensitive: true});
// { SECRET_KEY: 'my-secret' }
```

#### Define a Variable with Type Coercion and Validation

```ts
env.define('MAX_RETRIES', {
  default: 3,
  transform: (v) => parseInt(v, 10),
  validate: (v) => v >= 0 && v <= 10,
});

env.set('MAX_RETRIES', '5'); // transforms to number
const retries = env.get('MAX_RETRIES'); // 5
```

#### Set Multiple Variables at Once

```ts
env.set({
  HOST: 'localhost',
  PORT: 3000,
  DEBUG: true,
});
```

#### Forking a New Scoped Environment

```ts
const baseEnv = env.fork();
baseEnv.set('PORT', 8000);

const testEnv = baseEnv.fork();
testEnv.set('PORT', 3001);

console.log(baseEnv.get('PORT')); // 8000
console.log(testEnv.get('PORT')); // 3001
```

#### Event Listeners

```ts
env.addEventListener('environment:change', (event) => {
  console.log(`Changed ${event.detail.name} to`, event.detail.value);
});

env.addEventListener('error', (event) => {
  console.error(`Error on ${event.detail.name}: ${event.detail.error.message}`);
});

env.set('PORT', 4000);
// → "Changed PORT to 4000"
```

#### Validating Required Environment Variables

```ts
env.define('API_URL', {required: true});

env.validate(); // Throws error as API_URL is required
env.set('API_URL', 'https://api.example.com');
env.validate(); // Passes validation
```

#### Optional Environment Variable

```ts
env.define('DEBUG');
env.validate(); // Passes validation even if DEBUG is not set
```

#### Optional Pick and Omit in Serialization

```ts
const config = env.toJSON({pick: ['PORT', 'DEBUG']});
// { PORT: 3000, DEBUG: true }

const config = env.toJSON({omit: ['SECRET_KEY']});
const config = env.toJSON();
// { PORT: 3000, DEBUG: true, SECRET_KEY: undefined }
```

### Strengths

- **Type-Safe and Schema-Driven**: Strong typing of variables via the generic `Environment<Variables>` interface combined with runtime validation and transformation ensures both compile-time and runtime safety.
- **Error-First Design**: `define` and `set` operations now throw and emit descriptive errors on validation/transformation failure, enforcing correctness early.
- **Flat, Predictable Surface Area**: By intentionally remaining a flat key-value store, the API avoids overreaching into configuration domains and keeps responsibilities well-separated.
- **Scoped Inheritance**: The `fork(overrides)` method enables the creation of isolated or layered environments, promoting testability and environment-specific behavior with minimal overhead.
- **Efficient Serialization**: The `toJSON()` method now supports `pick` and `omit` options to filter output efficiently, helping reduce payload size and improve telemetry/logging performance.
- **Event-Driven Reactivity**: Built-in `change` and `error` events allow fine-grained observation and integration with other reactive components or tooling.
- **Safe by Default**: Sensitive variables are excluded from serialization unless explicitly requested, reducing the risk of leaking secrets to logs or UIs.
- **Transform Once, Use Often**: Validation and transformation occur only at definition and assignment time, not at retrieval, improving runtime performance.

### Limitations

- **No Deep Config Composition**: The API deliberately avoids supporting hierarchical namespaces or deeply nested configuration trees, which may be expected by users familiar with platforms like `.NET`, Viper, or Spring Boot.
- **No Native Remote/Async Support**: Loading from remote config stores, `.env` files, or async sources must be implemented at the application layer via lifecycle hooks or adapters—this separation is intentional but may surprise some users.
- **Strictness May Surprise**: The throwing behavior of `set` and `define`, while useful for correctness, may introduce unexpected breakage if users aren't prepared for runtime enforcement.
- **Limited Customization of Events**: While reactivity is supported through event emission, there is no wildcard or scoped event pattern (e.g. `change:PORT`) which might limit fine-grained subscriptions in more complex setups.

## Design Notes

The design of the Environment API has been refined iteratively based on comparative research, internal constraints, and developer ergonomics. Key decisions include:

- **Flat Key-Value Store:** Avoided deep/nested keys in favor of simplicity and clearer boundaries between environment and configuration layers. Grouping concerns are delegated to higher-level configuration modules.
- **Safe-By-Default Behavior:** Mutations (`set`, `define`) throw errors and emit events on failure, enforcing early correctness while aligning with Micra’s defensive programming philosophy.
- **Transform and Validate Once:** Transformations and validations are applied during `set` or `define`, not `get`, to minimize runtime overhead and avoid surprises during access.
- **Scoped Forking:** Introduced `fork(overrides)` to enable environment layering without introducing implicit global state.
- **Event-Driven Core:** Changes and errors are surfaced via `change` and `error` events to support observability and reactivity without requiring complex observable abstractions.
- **Selective Serialization:** `toJSON()` supports `pick` and `omit` to control output shape and prevent exposure of sensitive keys in logs or telemetry.

These decisions are rooted in Micra’s principles: platform agnosticism, developer experience, minimalism, and modular extensibility.

## Future Considerations

The current design establishes a minimal, type-safe foundation. Several extensions may be explored in future proposals:

- **Hierarchical Key Notation:** Support optional nested access (e.g., `env.get('database.host')`) via dot notation or namespaced keys—possibly in a separate configuration layer.
- **Environment Diffing or Snapshots:** Enable comparison of environments (e.g., before/after deploy) for auditing or rollback.
- **Immutable Mode:** Explore runtime modes that lock environments to fully immutable state after initialization, for enhanced safety in production.

These ideas are explicitly deferred to keep the initial implementation focused, maintainable, and easy to adopt. Future RFCs can explore these based on user demand and ecosystem maturity.
