import AuthServices from "../services/auth.services";
import { LoginPayload } from "../types/payload.types";
import { useAppDispatch } from "./useRedux";
import {loginUser, logoutUser} from "../store/slice/userSlice";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const login = (loginPayload: LoginPayload) => {
    AuthServices.login(loginPayload)
      .then(() => {
        dispatch(loginUser());
      })
      .catch(() => { });
  };

  const logout = () => {
    AuthServices.logout()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch(() => { });
  }

  return { login, logout };
}

export default useLogin;