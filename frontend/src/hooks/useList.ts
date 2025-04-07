import { useState } from "react";
import ListServices from "../services/list.services"
import { Contact } from "../types/types";
import { ListByIdResponse, ListWithContactsCountResponse, ContactResponse } from "../types/response.types";
import { toast } from "./use-toast";

const useList = () => {

  const [listWithContactsCount, setListWithContactsCount] = useState<ListWithContactsCountResponse | null>(null)
  const [list, setList] = useState<ListByIdResponse | null>(null)
  

  const callListByIdApi = (_id: string) => {
    ListServices.getListById(_id)
      .then((response: any) => {
        setList(response.data)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const listsByUserId = () => {
    ListServices.getListsByUserId()
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callCreateListApi = (name: string) => {
    ListServices.createList(name)
      .then((response) => {
        if (listWithContactsCount?.data) {
          setListWithContactsCount({
            ...listWithContactsCount,
            data:[
              ...listWithContactsCount.data,
              {
                _id: response.data._id,
                name: response.data.name,
                contactsCount: response.data.contactsSize
              }
            ]
          });
        }
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callUpdateListNameApi = (listId: string, name: string) => {
    ListServices.updateListName({listId,name})
      .then((response: any) => {
        console.log(response.data);
        if (list?.data) {
          setList({
            ...list,
            data: {
              ...list.data,
              name: name,
            },
          });
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callCreateContactsApi = (
    listId: string,
    contacts: Contact[]
  ) => {
    ListServices.createContacts(listId, contacts)
      .then((response) => {
        console.log(response.data);
        setList((prev) => {
          if (!prev?.data) return prev;
  
          return {
            ...prev,
            data: {
              ...prev.data,
              contacts: [
                ...prev.data.contacts,
                {
                  _id: response.data[0]._id,
                  name: response.data[0].name,
                  email: response.data[0].email,
                  number: response.data[0].number
                }
              ]
            }
          };
        });
        
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

    const callListWithContactsCountApi = () => {
    ListServices.listWithContactsCount()
      .then((response: any) => {
        setListWithContactsCount(response.data)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  return {
    listsByUserId,
    listWithContactsCount,
    list,
    callListWithContactsCountApi,
    callListByIdApi,
    callUpdateListNameApi,
    callCreateContactsApi,
    callCreateListApi,
  }
}

export default useList;