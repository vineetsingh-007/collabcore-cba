// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555/api';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('collab_token');
      localStorage.removeItem('collab_user');
      window.location.href = '/login';
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Error');
  }
  return res.json();
};

export const api = {
  get: async (url: string) => {
    const res = await fetch(API_URL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("collab_token") || ""}`
      }
    });
    return handleResponse(res);
  },

  post: async (url: string, data: any) => {
    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("collab_token") || ""}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  put: async (url: string, data: any) => {
    const res = await fetch(API_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("collab_token") || ""}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  delete: async (url: string) => {
    const res = await fetch(API_URL + url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("collab_token") || ""}`
      }
    });
    return handleResponse(res);
  }
};