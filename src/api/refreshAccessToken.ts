import axios from 'axios';

import { updateToken } from '../redux/authSlice';
import { store } from '../redux/store';

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
