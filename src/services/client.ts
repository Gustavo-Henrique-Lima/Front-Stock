import axios, { AxiosError } from 'axios';

import { env } from '@/lib/env';
import { redirectTo } from '@/lib/navigation';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('access_token');
      redirectTo('/401');
    }

    if (status && status >= 500) {
      redirectTo('/500');
    }

    return Promise.reject(error);
  },
);
