export function saveToLocalStorage(key: string, value: any) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    localStorage.setItem("lastSaved", Date.now().toString());
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
    localStorage.setItem("lastSaved", Date.now().toString());
  } catch (e) {
    console.error("Error removing from localStorage", e);
  }
}

export function clearLocalStorage() {
  try {
    localStorage.clear();
  } catch (e) {
    console.error("Error clearing localStorage", e);
  }
}

export function checkDataAndSave<T>(key: string, newData: T) {
  const existingData = loadFromLocalStorage<T>(key);
  if (JSON.stringify(existingData) !== JSON.stringify(newData)) {
    saveToLocalStorage(key, newData);
  }
}
