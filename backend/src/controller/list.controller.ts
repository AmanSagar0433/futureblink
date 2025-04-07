import { Request, Response } from "express";
import { getListsByUserId, createList, createContacts, getContactById, getListsWithContactsCount, getListById, updateListName, getEmailsUsingListIds } from "../db/repositories/list.respository";
import { ListItem, ListWithContactsCountResponse } from "../types/response.types";


export const getListByIdFn = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const list = await getListById(_id);
  return res.status(200).json({
    message: "",
    data: list
  });
}

export const getListsByUserIdFn = async (req: Request, res: Response) => {
  const userResponse = req.userResponse;

  if (userResponse) {
    const lists = await getListsByUserId(userResponse._id)
    return res.status(200).json(lists);
  }

  return res.status(500).json({ message: "Internal Server Error" });
}

export const createNewList = async (req: Request, res: Response) => {
  const userResponse = req.userResponse;
  const { name } = req.body

  if (userResponse && name) {
    const list = await createList({
      userId: userResponse._id,
      name
    })

    return res.status(200).json({
      _id: list._id,
      name: list.name,
      contactsSize: list.contacts.length
    });
  }

  return res.status(500).json({ message: "Internal Server Error" });
}

export const updateListNameFn = async (req: Request, res: Response) => {
  const { listId, name } = req.body;

  const updateName = await updateListName(listId, name)

  return res.status(200).json(updateName);
}

export const createContactsFn = async (req: Request, res: Response) => {
  const { listId, contacts } = req.body

  const list = await createContacts(listId, contacts)

  return res.status(200).json(list?.contacts);
}


export const getListsWithContactsCountFn = async (req: Request, res: Response<ListWithContactsCountResponse>) => {
  try {
    const userResponse = req.userResponse;

    if (!userResponse) {
      return res.status(401).json({
        message: "Unauthorized: User information is missing.",
        data: []
      });
    }

    const listWithContactsCount = await getListsWithContactsCount(userResponse._id);
    return res.status(200).json({
      message: "",
      data: listWithContactsCount
    });
  } catch (error) {
    console.error("Error getting lists with contact count:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: []
    });
  }
};
