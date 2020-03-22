export interface LocalStorageService<T> {
  get(key: symbol): T;
  set(key: symbol, value: T): void;
}
