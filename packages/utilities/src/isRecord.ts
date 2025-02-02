export function isRecord(maybeRecord: any): maybeRecord is Record<any, any> {
  return maybeRecord != null && typeof maybeRecord === 'object' && !Array.isArray(maybeRecord);
}
