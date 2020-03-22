export interface ILocalStorageService<T> {
  get(key: Symbol): T;
  set(key: Symbol, value: T): void;
}
