import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";
import { setVissible, setInvissible } from "../store/slice/loadingIndicatorSilce";
import { handleSuccessPopupMessage, handleErrorPopupMessage } from "./popupMessage";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  store.dispatch(setVissible());
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    handleSuccessPopupMessage(response);
    store.dispatch(setInvissible());
    return response;
  },
  (error: AxiosError) => {
    handleErrorPopupMessage(error);
    store.dispatch(setInvissible());
    return Promise.reject(error);
  }
);


export default instance;