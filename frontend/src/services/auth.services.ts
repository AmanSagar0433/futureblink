import { LoginPayload, SignupPayload } from "../types/payload.types";
import { LoginResponse, LoginStatusResponse, SignupResponse } from "../types/response.types";
import http from "../utils/http-common";

class AuthServices {
  login(loginPayload: LoginPayload) {
    return http.post<LoginResponse>("/api/login", loginPayload, {
      withCredentials: true,
    });
  }
  logout() {
    return http.post("/api/logout", {
      withCredentials: true,
    })
  }
  signup(signupPayload: SignupPayload) {
    return http.post<SignupResponse>("/api/register", signupPayload, {
      withCredentials: true,
    });
  }
  isUserLoggedIn() {
    return http.post<LoginStatusResponse>("api/isUserLoggedIn", {
      withCredentials: true,
    });
  }
}

export default new AuthServices();