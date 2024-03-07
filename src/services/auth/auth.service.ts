// создаем инстанс аксиоса, для прикрепления в хедер токена авторизации
import axios from "axios";
import { loadState } from "../../store/storage";
import { JWT } from "../../store/user/userAuthorization.slice";

export const BASE_URL = "https://js-test.kitactive.ru/api";

export const instanceAxios = axios.create({
  baseURL: BASE_URL,
});

const urlsSkipAuth = ["/register", "/login"];

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      return config;
    }
    config.headers.Authorization = `Bearer ${loadState(JWT)}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
