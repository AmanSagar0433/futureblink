import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import AuthServices from "../services/auth.services";
import { loginUser } from "../store/slice/userSlice";

export enum STATE {
  IDDLE,
  IS_LOADING,
  ERROR,
  INVALID_USER,
  VALID_USER,
}

const useIsUserLoggedIn = () => {
  const [state, setState] = useState<STATE>(STATE.IDDLE);

  const isUserLoggedIn = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isUserLoggedIn) {
      setState(STATE.IS_LOADING);
      AuthServices.isUserLoggedIn()
        .then((response: any) => {
          if (response.data.data.isUserLoggedIn) {
            setState(STATE.VALID_USER);
            dispatch(loginUser());
          } else {
            setState(STATE.INVALID_USER);
          }
        })
        .catch((e: Error) => {
          setState(STATE.ERROR);
        });
    } else {
      setState(STATE.VALID_USER);
    }
  }, []);

  return { state, isUserLoggedIn };
};

export default useIsUserLoggedIn;
