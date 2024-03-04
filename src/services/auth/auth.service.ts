// создаем инстанс аксиоса, для прикрепления в хедер токена авторизации
import axios from "axios";
import { loadState } from "../../store/storage";

const token = loadState("token_white");

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
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("Ошибка перед отправкой из АКСИОСА", error);
    return Promise.reject(error);
  }
);
