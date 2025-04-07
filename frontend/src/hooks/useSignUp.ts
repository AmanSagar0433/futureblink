import { useState } from "react";
import AuthServices from "../services/auth.services";
import { SignupPayload } from "../types/payload.types";

const useSignUp = () => {
  const [isSignedIn, setSginedIn] = useState(false);

  const signup = (sgnupPayload: SignupPayload) => {
    AuthServices.signup(sgnupPayload)
      .then(() => {
        setSginedIn(true)
      })
      .catch(() => { });
  };

  return { isSignedIn, signup };
};

export default useSignUp;
