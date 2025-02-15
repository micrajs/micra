/**
 * Checks if the given value is a record (plain object) and not null, undefined, or an array.
 *
 * @param maybeRecord - The value to be checked.
 * @returns A boolean indicating whether the value is a record.
 *
 * @example
 * ```ts
 * isRecord({ key: 'value' }); // true
 * isRecord(null); // false
 * isRecord([1, 2, 3]); // false
 * isRecord('string'); // false
 * ```
 */
export function isRecord(maybeRecord: any): maybeRecord is Record<any, any> {
  return maybeRecord != null && typeof maybeRecord === 'object' && !Array.isArray(maybeRecord);
}
