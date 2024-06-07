import axios from 'axios';
import { signOut } from 'next-auth/react';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    if(error?.response?.status === 401) {
      signOut()
    }
    return Promise.reject(error);
  }
);

export default api;
