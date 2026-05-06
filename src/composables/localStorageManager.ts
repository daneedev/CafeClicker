export function saveToLocalStorage(key: string, value: any) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue) as T;
  } catch (e) {
    console.error("Error loading from localStorage", e);
    return null;
  }
}

export function removeFromLocalStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing from localStorage", e);
  }
}
