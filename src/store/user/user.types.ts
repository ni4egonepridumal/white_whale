// интерфейсы для регистрации пользователя
export interface IRegistrationData {
  isError: null | string;
  isLoaded: boolean;
}
// интерфейсы для авторизации пользователя
export interface IDataFromForm {
  name?: string;
  email: string;
  password: string;
}
export interface IToken {}

export interface IAuthorization {
  isLoaded: boolean;
  isError: null | string;
  token: string | undefined | null;
  status?: string;
}
