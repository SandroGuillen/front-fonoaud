const BASE_URL = "http://localhost:3000";

const request = {
  async get(url) {
    return await (
      await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  },
  async post(url, data = {}) {
    return await (
      await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  },
  async put(url) {
    return await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async delete(url) {
    return await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
