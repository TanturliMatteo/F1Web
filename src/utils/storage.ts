// localStorage throws when it is blocked (private mode, browser settings,
// full quota). It only holds conveniences, so a failure is ignored: the
// value is simply not remembered.

export const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Not saved: it lasts for this visit only
  }
};
