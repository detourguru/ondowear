class LocalStorage {
  constructor() {}

  static setLocalStorage = <T>(key: string, value: T) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  static getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
  };
}

export default LocalStorage;
