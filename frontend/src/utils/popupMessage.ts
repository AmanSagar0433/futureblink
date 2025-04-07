import { AxiosError, AxiosResponse } from "axios";
import { toast } from "../hooks/use-toast";

export const handleSuccessPopupMessage = (response: AxiosResponse) => {
  const { message } = response.data
  if (message) {
    toast({
      title: message,
    })
  }
};

export const handleErrorPopupMessage = (error: AxiosError) => {
  const data = error.response?.data as { message?: string };
  if (data?.message) {
    toast({
      title: data.message,
      variant: "destructive"
    });
  }
};
