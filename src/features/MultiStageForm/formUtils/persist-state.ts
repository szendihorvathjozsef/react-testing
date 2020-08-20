import { FormState } from "./form-types";

const DEFAULT_PERSISTED_STATE_KEY = "__REACT_TESTING__";
const DEFAULT_STORAGE_TYPE = window.sessionStorage;

type SetStore = <K extends keyof FormState>(
  name: K,
  value: FormState[K]
) => void;
type GetStore = () => FormState;

type StoreOptions = {
  name: string;
};

let setStore: SetStore;
let getStore: GetStore;
let storageName: string;
let storagetype = DEFAULT_STORAGE_TYPE;

function getBrowserStoreData(storeName: string, storageType: Storage) {
  const sessionStorageData = storageType.getItem(storeName);
  try {
    return sessionStorageData ? JSON.parse(sessionStorageData) : undefined;
  } catch {
    return undefined;
  }
}

function storeFactory(
  storeName = DEFAULT_PERSISTED_STATE_KEY,
  storageType = DEFAULT_STORAGE_TYPE
) {
  let store: FormState = getBrowserStoreData(storeName, storageType);

  const getName = (): string => storeName;

  const set = <K extends keyof FormState>(
    name: K,
    value: FormState[K]
  ): void => {
    store = { ...store, [name]: value };
  };

  const get: () => FormState = () => store;

  return {
    set,
    get,
    getName,
  };
}

function createBrowserStorage(): void {
  const methods = storeFactory();

  getStore = methods.get;
  setStore = methods.set;
  storageName = methods.getName();
}

function saveState<K extends keyof FormState>(name: K, value: FormState[K]) {
  setStore(name, value);
  storagetype.setItem(storageName, JSON.stringify(getStore()));
}

function getGlobalStore() {
  return getStore();
}

function resetStore() {
  storagetype.removeItem(storageName);
}

export {
  DEFAULT_PERSISTED_STATE_KEY,
  DEFAULT_STORAGE_TYPE,
  createBrowserStorage,
  saveState,
  getGlobalStore,
  resetStore,
};
