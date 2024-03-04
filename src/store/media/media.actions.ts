// перенси типизацию в файл другой
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  JWT_token,
  instanceAxios,
} from "../../services/auth/auth.service";
import { AxiosError } from "axios";
// import { loadState } from "../storage";
import { JWT } from "../user/userAuthorization.slice";

// const token = loadState(JWT) ?? null;

export const fetchGetFiles = createAsyncThunk(
  "getAllMedia/fetchGetFiles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: "GET",
        url: "/media",
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
      console.log(err);
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

export interface IPost {
  createdAt: string;
  fileName: string;
  id: string;
  mimeType: string;
  name: string;
  url: string;
}

export const fetchPostFiles = createAsyncThunk<_, IPost>(
  "postMedia/fetchPostFiles",
  async (data, { rejectWithValue }) => {
    console.log("данные для отправки поста", data);
    try {
      const res = await instanceAxios({
        method: "POST",
        url: "/media/upload",
        data,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
      console.log(err);
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

interface IRemoveId {
  id: string;
}

export const fetchRemoveMedia = createAsyncThunk<_, IRemoveId>(
  "removeMedia/fetchRemoveMedia",
  async (id, { rejectWithValue }) => {
    console.log("данные для отправки поста", id);
    try {
      const res = await instanceAxios({
        method: "DELETE",
        url: `/media/${id}`,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
      console.log(err);
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);


interface IMedia {
  createdAt: string;
  fileName: string;
  id: string;
  mimeType: string;
  name: string;
  url: string;
}

export async function fetchGetMedia(media: IMedia) {
  const response = await fetch(`${BASE_URL}/media/${media.id}`, {
    headers: { Authorization: `Bearer ${JWT_token.token}` },
  });
  if (response.status === 200) {
    const blob = await response.blob();
    const downLoadURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downLoadURL;
    link.download = media.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
