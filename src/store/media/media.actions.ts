import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, instanceAxios } from "../../services/auth/auth.service";
import { AxiosError } from "axios";
import { loadState } from "../storage";
import { IPost, IRemoveId } from "./media.types";

const token = loadState("token_white");

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
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchPostFiles = createAsyncThunk<_, IPost>(
  "postMedia/fetchPostFiles",
  async (data, { rejectWithValue }) => {
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
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchRemoveMedia = createAsyncThunk<_, IRemoveId>(
  "removeMedia/fetchRemoveMedia",
  async (id, { rejectWithValue }) => {
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
      // @ts-ignore
      return rejectWithValue(err?.response?.data);
    }
  }
);

// в данном случае использую fetch, для корректной работы с blob
export async function fetchGetMedia(media: IPost) {
  const response = await fetch(`${BASE_URL}/media/${media.id}`, {
    headers: { Authorization: `Bearer ${token}` },
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
