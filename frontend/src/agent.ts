import axios from 'axios';
import { ENV } from 'constants/globals/env';
import { crash } from 'functions/events/events';

const http = axios.create({
  baseURL: ENV.api,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    crash(error.message);
    return Promise.reject(error);
  }
);

export default http;
