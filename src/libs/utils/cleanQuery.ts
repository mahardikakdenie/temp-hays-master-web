export const cleanQuery = (obj: Record<string, unknown>, removeStr = true) => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => {
        if (value === undefined || value === null) return false;
        if (removeStr && value === '') return false;
        return true;
      })
      .map(([key, value]) => [key, String(value)]),
  );
};
