export const SESSION_TOKEN = "SESSION_TOKEN";
export const CURRENT_LOGIN = "CURRENT_LOGIN";
export const CURRENT_LOC = "CURRENT_LOC";

export const addDataToLocalStorage = (key: string, data: string): void => {
    localStorage.setItem(key, data)
}

export const getDataFromLocalStorageByKey = (key: string): string | null => {
    return localStorage.getItem(key)
}

export const removeDataFromLocalStorageByKey = (key: string): void => {
    localStorage.removeItem(key)
}