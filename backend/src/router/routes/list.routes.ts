import { Router } from "express";
import { createContactsFn, createNewList, getListByIdFn, getListsByUserIdFn, getListsWithContactsCountFn, updateListNameFn } from "../../controller/list.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";


export default (router: Router) => {
  router.post("/listById", LOGGED_IN_USER, getListByIdFn);
  router.post("/listsByUserId", LOGGED_IN_USER, getListsByUserIdFn);
  router.post("/createList", LOGGED_IN_USER, createNewList);
  router.post("/updateListName", LOGGED_IN_USER, updateListNameFn);
  router.post("/createContacts", LOGGED_IN_USER, createContactsFn);
  router.post("/listsWithContactsCount", LOGGED_IN_USER, getListsWithContactsCountFn);
};