/*
 * KIT Alumni Network - Optimized API Client
 * Production API client with request caching and performance optimizations
 */

class ApiClient {
  constructor() {
    this.cache = new Map();
    this.cacheTTL = 300000; // 5 minutes default
    this.pendingRequests = new Map(); // Prevent duplicate requests
  }

  getApiBase() {
    if (window.ALUMNIX_CONFIG?.API_BASE_URL) {
      const base = window.ALUMNIX_CONFIG.API_BASE_URL;
      return base.endsWith('/api') ? base.slice(0, -4) : base;
    }
    return '';
  }

  getFullUrl(endpoint) {
    const base = this.getApiBase();
    const normalized = endpoint.startsWith('/api/') ? endpoint : `/api/${endpoint.replace(/^\/+/, '')}`;
    return base ? `${base}${normalized}` : normalized;
  }

  async getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    
    if (window.supabaseClient) {
      try {
        const { data } = await window.supabaseClient.auth.getSession();
        if (data?.session?.access_token) {
          headers['Authorization'] = `Bearer ${data.session.access_token}`;
        }
      } catch (e) {
        console.warn("[API] Auth fetch error:", e.message);
      }
    }
    
    return headers;
  }

  getCacheKey(method, url, params) {
    const key = `${method}:${url}:${JSON.stringify(params)}`;
    return key;
  }

  isCacheValid(timestamp) {
    return Date.now() - timestamp < this.cacheTTL;
  }

  async get(endpoint, params = {}, useCache = true) {
    const fullUrl = this.getFullUrl(endpoint);
    const url = new URL(fullUrl, window.location.origin);
    
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, val);
      }
    });

    const cacheKey = this.getCacheKey('GET', url.toString(), {});
    
    // Return cached response if valid
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (this.isCacheValid(cached.timestamp)) {
        console.log(`[API] Cache hit: ${endpoint}`);
        return cached.data;
      } else {
        this.cache.delete(cacheKey);
      }
    }

    // Return pending request if same call is already in flight
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    const headers = await this.getAuthHeaders();
    console.log(`[API] GET ${endpoint}`);
    
    const promise = fetch(url.toString(), { method: 'GET', headers })
      .then(r => this.handleResponse(r))
      .then(data => {
        if (useCache) {
          this.cache.set(cacheKey, { data, timestamp: Date.now() });
        }
        this.pendingRequests.delete(cacheKey);
        return data;
      })
      .catch(err => {
        this.pendingRequests.delete(cacheKey);
        throw err;
      });

    this.pendingRequests.set(cacheKey, promise);
    return promise;
  }

  async post(endpoint, data = {}) {
    const fullUrl = this.getFullUrl(endpoint);
    const headers = await this.getAuthHeaders();
    console.log(`[API] POST ${endpoint}`);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async patch(endpoint, data = {}) {
    const fullUrl = this.getFullUrl(endpoint);
    const headers = await this.getAuthHeaders();
    console.log(`[API] PATCH ${endpoint}`);
    
    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async delete(endpoint, data = {}) {
    const fullUrl = this.getFullUrl(endpoint);
    const headers = await this.getAuthHeaders();
    console.log(`[API] DELETE ${endpoint}`);
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(data)
    });
    
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    let result = {};
    
    if (contentType?.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { message: text };
    }

    if (response.status === 401) {
      console.warn("[API] Unauthorized (401) - redirecting to login");
      if (!window.location.pathname.includes("login.html") && !window.location.pathname.includes("index.html")) {
        window.location.href = "login.html";
      }
    }

    if (!response.ok) {
      const msg = result.error || result.message || `Status ${response.status}`;
      throw new Error(msg);
    }

    return result;
  }

  clearCache() {
    this.cache.clear();
  }

  invalidateCache(endpoint) {
    for (const [key] of this.cache) {
      if (key.includes(endpoint)) {
        this.cache.delete(key);
      }
    }
  }
}

window.apiClient = new ApiClient();
