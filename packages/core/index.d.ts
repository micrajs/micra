/**
 * The `Micra` namespace contains all core abstractions, contracts, and utilities
 * defined by the Micra framework. This namespace serves as the central reference
 * for implementing framework-specific components and adhering to its specifications.
 *
 * Framework developers and contributors should use the `Micra` namespace to
 * define and interact with entities like service providers, environments, kernels,
 * and other foundational abstractions.
 *
 * @example
 * ```typescript
 * class CustomServiceProvider implements Micra.ServiceProvider {
 *   register() {
 *     console.log('Registering services...');
 *   }
 *   boot() {
 *     console.log('Booting services...');
 *   }
 * }
 * ```
 */
export namespace Micra {
  export {
    //
  };
}

declare global {
  /**
   * The `Application` namespace allows developers to define app-specific types
   * and interfaces that extend or customize the behavior of the Micra framework.
   * This includes entities like custom services, environment variables, and other
   * application-specific constructs.
   *
   * The `Application` namespace is designed to be extended globally, enabling
   * seamless integration with the framework's abstractions while preserving
   * flexibility and scalability for individual applications.
   *
   * @example
   * ```typescript
   * // register.d.ts
   * declare global {
   *   namespace Application {
   *     interface Services {
   *       userService: { findUser(id: string): User };
   *     }
   *     interface EnvironmentVariables {
   *       API_URL: string;
   *       DEBUG_MODE: boolean;
   *     }
   *   }
   * }
   *
   * export {};
   * ```
   */
  namespace Application {
    // Add app-specific types and interfaces here
  }
}
