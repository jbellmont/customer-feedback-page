const dateFormat = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

// https://mariusschulz.com/blog/deserializing-json-strings-as-javascript-date-objects
// Used to parse JSON dates as JS Date objects.
export function jsonDateReviver(key: string, value: any) {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}
