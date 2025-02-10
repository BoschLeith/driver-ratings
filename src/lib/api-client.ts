import axios from 'axios';

import { updateToken } from '@/redux/authSlice';
import { store } from '@/redux/store';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axios.get('/api/auth/refresh', {
      withCredentials: true,
    });

    const newToken = response.data.accessToken;

    store.dispatch(updateToken({ accessToken: newToken }));

    return newToken;
  } catch (error) {
    throw error;
  }
};

export default api;
