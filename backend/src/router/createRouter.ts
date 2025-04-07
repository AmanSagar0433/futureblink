import { Router } from "express";
import list from "./routes/list.routes";
import auth from "./routes/auth.routes";
import sequence from "./routes/sequence.routes";

const router = Router();

export default (): Router => {
  auth(router)
  list(router)
  sequence(router)
  return router;
};