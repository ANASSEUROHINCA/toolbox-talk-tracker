// Storage API implementation using localStorage
window.storage = {
  async get(key, shared = false) {
    try {
      const storageKey = shared ? `shared_${key}` : key;
      const value = localStorage.getItem(storageKey);
      if (value) {
        return { key, value, shared };
      }
      return null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  async set(key, value, shared = false) {
    try {
      const storageKey = shared ? `shared_${key}` : key;
      localStorage.setItem(storageKey, value);
      return { key, value, shared };
    } catch (error) {
      console.error('Storage set error:', error);
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      const storageKey = shared ? `shared_${key}` : key;
      localStorage.removeItem(storageKey);
      return { key, deleted: true, shared };
    } catch (error) {
      console.error('Storage delete error:', error);
      return null;
    }
  },

  async list(prefix = '', shared = false) {
    try {
      const keys = [];
      const storagePrefix = shared ? `shared_${prefix}` : prefix;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(storagePrefix)) {
          keys.push(key);
        }
      }
      return { keys, prefix, shared };
    } catch (error) {
      console.error('Storage list error:', error);
      return null;
    }
  }
};
