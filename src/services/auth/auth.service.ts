// коментарии
import axios from "axios";


export let JWT_token: { token: string | null } = { token: null };
if (typeof window !== "undefined") {
  JWT_token = {
    token: localStorage.getItem("token"),
  };
}

export const BASE_URL = "https://js-test.kitactive.ru/api";


export const instanceAxios = axios.create({
  baseURL: BASE_URL,
});

const urlsSkipAuth = ["/register", "/login"];

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      // console.log(
      //   "сработал перехватчик на запрос из исключения",
      //   JWT_token.token
      // );
      return config;
    }
    config.headers.Authorization = `Bearer ${JWT_token.token}`;
    // console.log(
    //   "сработал перехватчик на POST устанавливает токен",
    //   JWT_token.token
    // );
    return config;
  },
  (error) => {
    console.log("Ошибка перед отправкой из АКСИОСА", error);
    return Promise.reject(error);
  }
);

// instanceAxios.interceptors.response.use(
//     (response) => {
//         // console.log("сработал перехватчик после ответа без ошибок", response);
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (
//             error.response.status == 401 &&
//             error.response.data.detail !==
//             "No active account found with the given credentials"
//         ) {
//             try {
//                 // console.log("сработал перехватчик на 401 ошибку", error.response);
//                 const response = await axios.post(`${BASE_URL}auth/jwt/refresh/`, refresh);
//                 // console.log("данные из перехватчика на 401 ошибку", response);
//                 localStorage.setItem("access_token_svd", response.data.access);
//                 return instanceAxios.request(originalRequest);
//             } catch (error) {
//                 // console.log("ошибка интерцептора на обновления токенов", error);
//                 return Promise.reject(error);
//             }
//         } else if (
//             error.response.data.detail ===
//             "No active account found with the given credentials"
//         ) {
//             try {
//                 // console.log(
//                 //   "словил ошибку на No active account found with the given credentials",
//                 //   error
//                 // );
//             } catch (error) {
//                 return Promise.reject(error);
//             }
//         }
//         // console.log("сработал перехватчик ответа, с ошибкой без статуса 401");
//         return Promise.reject(error);
//     }
// );
