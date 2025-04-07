import { Router } from "express";
import { createSequenceFn, getSequenceByIdFn, getSequencesByUserIdFn, updateSequenceAndScheduleFn, updateSequenceFn } from "../../controller/sequence.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";


export default (router: Router) => {
  router.post("/createSequence", LOGGED_IN_USER, createSequenceFn)
  router.post("/sequenceById", LOGGED_IN_USER, getSequenceByIdFn)
  router.post("/sequencesByUserId", LOGGED_IN_USER, getSequencesByUserIdFn)
  router.post("/updateSequence", LOGGED_IN_USER, updateSequenceFn)
  router.post("/updateSequenceAndSchedule", LOGGED_IN_USER, updateSequenceAndScheduleFn)
}