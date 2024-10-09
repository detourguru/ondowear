export const setLocalStorage = <T>(key: string, value: T) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
