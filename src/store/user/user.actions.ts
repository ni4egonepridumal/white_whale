import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, instanceAxios } from "../../services/auth/auth.service";
import { IDataFromForm } from "./user.types";
import axios, { AxiosError } from "axios";

export const fetchRegistration = createAsyncThunk<_, IDataFromForm>(
  "userRegistration/fetchRegistration",
  async (dataFromForm, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: "POST",
        url: "/register",
        data: dataFromForm,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchAuthorization = createAsyncThunk<_, IDataFromForm>(
  "userAuthorization/fetchAuthorization",
  async (dataFromForm, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: "POST",
        url: "/login",
        data: dataFromForm,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchLogout = createAsyncThunk<_, string | null>(
  "userLogout/fetchLogout",
  async (token, { rejectWithValue }) => {
    console.log("token из экшена !!!", token);
    try {
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        url: `${BASE_URL}/logout`,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);
