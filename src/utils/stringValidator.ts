/**
 * Ensures the value is a valid GUID
 * @param value string value
 * @return {boolean}
 */
export const isValidGUID = (value: string): boolean => {
  if (value.length > 0) {
    if (!/^(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}$/.test(value)) {
      return false;
    }
  }

  return true;
};
