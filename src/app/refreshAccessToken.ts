import axios from 'axios';

import { updateToken } from '../features/auth/authSlice';
import { store } from './store';

export const refreshAccessToken = async () => {
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
