export const SESSION_TOKEN = "SESSION_TOKEN";

export const addDataToLocalStorage = (key: string, data: any): void => {
    localStorage.setItem(key, data)
}

export const getDataFromLocalStorageByKey = (key: string): any => {
    return localStorage.getItem(key)
}

export const removeDataFromLocalStorageByKey = (key: string): void => {
    localStorage.removeItem(key)
}