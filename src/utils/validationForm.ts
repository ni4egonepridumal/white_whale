import {
  IErrorsMessage,
  IErrorsStatus,
  IFormValidState
} from './validationForm.types';

// вспомогательные функции для валидации инпутов в формах

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValidState: IFormValidState,
  setFormValidState: React.Dispatch<React.SetStateAction<IFormValidState>>
) => {
  const { name, value } = e.target;
  setFormValidState({
    ...formValidState,
    [name]: value
  });
};

export const validate = (
  formValidState: IFormValidState,
  setErrorsStatus: React.Dispatch<React.SetStateAction<IErrorsStatus>>,
  setFormValidState: React.Dispatch<React.SetStateAction<IFormValidState>>,
  setErrorsMessage: React.Dispatch<React.SetStateAction<IErrorsMessage>>
) => {
  // name
  if (!formValidState.name?.trim().length) {
    setFormValidState((state: IFormValidState) => ({
      ...state,
      name: formValidState.name
    }));
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, name: true }));
    setErrorsMessage((state: IErrorsMessage) => ({
      ...state,
      name: 'поле обязательно'
    }));
  } else if (formValidState.name.length <= 3) {
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, name: true }));
    setErrorsMessage((state: IErrorsMessage) => ({
      ...state,
      name: 'имя длиннее 3 символов'
    }));
  } else {
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, name: false }));
    setErrorsMessage((state: IErrorsMessage) => ({ ...state, name: '' }));
  }
  // email
  if (!formValidState.email?.trim().length) {
    setFormValidState((state: IFormValidState) => ({
      ...state,
      email: formValidState.email
    }));
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, email: true }));
    setErrorsMessage((state: IErrorsMessage) => ({
      ...state,
      email: 'поле обязательно'
    }));
  } else if (!/\S+@\S+\.\S+/.test(formValidState.email)) {
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, email: true }));
    setErrorsMessage((state: IErrorsMessage) => ({
      ...state,
      email: 'введите корректный email'
    }));
  } else {
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, email: false }));
    setErrorsMessage((state: IErrorsMessage) => ({ ...state, email: '' }));
  }
  // password
  if (!formValidState.password?.trim().length) {
    setFormValidState((state: IFormValidState) => ({
      ...state,
      password: formValidState.password
    }));
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, password: true }));
    setErrorsMessage((state: IErrorsMessage) => ({
      ...state,
      password: 'поле обязательно'
    }));
  } else {
    setErrorsStatus((state: IErrorsStatus) => ({ ...state, password: false }));
    setErrorsMessage((state: IErrorsMessage) => ({ ...state, password: '' }));
  }
};

export const getInputs = (
  e: React.FormEvent,
  formValidState: IFormValidState,
  setFormValidState: React.Dispatch<React.SetStateAction<IFormValidState>>,
  setErrorsStatus: React.Dispatch<React.SetStateAction<IErrorsStatus>>,
  setErrorsMessage: React.Dispatch<React.SetStateAction<IErrorsMessage>>
) => {
  e.preventDefault();
  //@ts-expect-error
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  let isFormValid: boolean = true;
  // name
  if (!formProps.name?.trim().length) {
    setFormValidState((state) => ({ ...state, name: formValidState.name }));
    setErrorsStatus((state) => ({ ...state, name: true }));
    setErrorsMessage((state) => ({ ...state, name: 'поле обязательно' }));
    isFormValid = false;
  } else {
    setErrorsMessage((state) => ({ ...state, name: '' }));
    setErrorsStatus((state) => ({ ...state, name: false }));
  }
  //email
  if (!formProps.email?.trim().length) {
    setFormValidState((state) => ({ ...state, email: formValidState.email }));
    setErrorsStatus((state) => ({ ...state, email: true }));
    setErrorsMessage((state) => ({ ...state, email: 'поле обязательно' }));
    isFormValid = false;
  } else {
    setErrorsMessage((state) => ({ ...state, email: '' }));
    setErrorsStatus((state) => ({ ...state, email: false }));
  }
  //password
  if (!formProps.password?.trim().length) {
    setFormValidState((state) => ({
      ...state,
      password: formValidState.password
    }));
    setErrorsStatus((state) => ({ ...state, password: true }));
    setErrorsMessage((state) => ({ ...state, password: 'поле обязательно' }));
    isFormValid = false;
  } else {
    setErrorsMessage((state) => ({ ...state, password: '' }));
    setErrorsStatus((state) => ({ ...state, password: false }));
  }
  if (!isFormValid) {
    return;
  }
};
