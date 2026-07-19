---
tags:
  - library/javascript
  - category/networking
  - "#title/axios"
aliases:
  - Axios
---

# Axios

> HTTP client

## Related Libraries
- [[Fetch API]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

Promise-based HTTP client for browsers and Node.js.

- **Docs:** https://axios-http.com/docs/intro
- **Download:** https://github.com/axios/axios

> **Note:** Axios rejects non-2xx responses by default. Wrap requests in `try`/`catch` and use `error.response` when the server sent an error response.

### Installation

**Local**

```html
<script src="path/to/axios.min.js"></script>
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

**Package manager**

```bash
npm install axios
```

### Examples

#### GET JSON data

Fetches data and returns the response body from `response.data`.

```js
async function loadUsers() {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Could not load users:", error.message);
    throw error;
  }
}
```

#### POST JSON data

Sends an object as JSON and returns the resource created by the server.

```js
async function createUser(user) {
  const response = await axios.post("/api/users", user);
  return response.data;
}
```

#### Reusable API client

Sets a base URL and common headers once, then uses the client throughout the application.

```js
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

const response = await api.get("/projects");
console.log(response.data);
```

#### Add an authentication token

Uses a request interceptor so every request includes the current bearer token.

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

---

## Navigation
- [[Libary-Master]]
