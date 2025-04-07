import { Navigate, Outlet } from "react-router-dom";
import { ENDPOINTS } from "../config/constant";
import useIsUserLoggedIn, { STATE } from "../hooks/useIsUserLoggedIn";

export const ProtectedRoute = () => {
  const { state, isUserLoggedIn } = useIsUserLoggedIn();

  if (!isUserLoggedIn) return <Navigate to={ENDPOINTS.LOGIN} replace />;

  switch (state) {
    case STATE.IDDLE:
      return <div></div>;
    case STATE.IS_LOADING:
      return <div></div>;
    case STATE.ERROR:
      return <div></div>;
    case STATE.INVALID_USER:
      return <Navigate to={ENDPOINTS.LOGIN} replace />;
    case STATE.VALID_USER:
      return <Outlet />;
  }
};

export const AuthRoute = () => {

  const { state, isUserLoggedIn } = useIsUserLoggedIn();

  if (isUserLoggedIn) return <Navigate to={ENDPOINTS.HOME} replace />;

  switch (state) {
    case STATE.IDDLE:
      return <div></div>;;
    case STATE.IS_LOADING:
      return <div></div>;;
    case STATE.ERROR:
      return <Outlet />;
    case STATE.INVALID_USER:
      return <Outlet />;
    case STATE.VALID_USER:
      return <Navigate to={ENDPOINTS.HOME} replace />;
  }
};