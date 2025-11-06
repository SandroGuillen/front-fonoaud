const BASE_URL = window.location.href.includes("127")
  ? "http://localhost:3000"
  : "https://9dt9sktn-3000.use.devtunnels.ms";

const request = {
  async get(url, query = {}) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const response = await fetch(`${BASE_URL}${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      data: await response.json(),
      status: response.status,
    };
  },
  async post(url, data = {}) {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      data: await response.json(),
      status: response.status,
    };
  },
  async put(url, data = {}) {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return {
      data: await response.json(),
      status: response.status,
    };
  },
  async delete(url) {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      data: await response.json(),
      status: response.status,
    };
  },
};
