const BASE_URL = "http://localhost:3000";

let user = {};

const request = {
  async get(url, query = {}) {
    const queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&");
    console.log(queryString);
    const response = await fetch(`${BASE_URL}${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
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
  async put(url) {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
