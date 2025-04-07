import { Router } from "express";
import { isUserLoggedIn, login, logout, register } from "../../controller/auth.controller";

export default (router: Router) => {
  router.post("/login", login)
  router.post("/logout", logout)
  router.post("/register", register)
  router.post("/isUserLoggedIn", isUserLoggedIn)
}