const getLocalStorage = () => {
    if (!(window && window.localStorage)) return undefined;
  
    return localStorage;
  };
  
  export const setItem = (key: string, value: string) => {
    const localStorage = getLocalStorage();
    if (!localStorage) return undefined;
  
    localStorage.setItem(key, value);
  };
  
  export const getItem = (key: string) => {
    const localStorage = getLocalStorage();
    if (!localStorage) return undefined;
  
    const item = localStorage.getItem(key);
    const itemJson = JSON.parse(item!);
    return itemJson;
  };
  
  export const deleteItem = (key: string) => {
    const localStorage = getLocalStorage();
    if (!localStorage) return undefined;
    const item = localStorage.removeItem(key);
  };