// backend/src/cache.js

class SimpleCache {
  constructor(ttlMs, maxEntries) {
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
    this.store = new Map(); // key -> { value, timestamp }
  }

  _isExpired(entry) {
    return Date.now() - entry.timestamp > this.ttlMs;
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (this._isExpired(entry)) {
      this.store.delete(key);
      return null;
    }

    // LRU: when accessed, move to end
    this.store.delete(key);
    this.store.set(key, entry);

    return entry.value;
  }

  set(key, value) {
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.maxEntries) {
      // Remove the least recently used (first inserted)
      const firstKey = this.store.keys().next().value;
      this.store.delete(firstKey);
    }

    this.store.set(key, { value, timestamp: Date.now() });
  }
}

module.exports = SimpleCache;
