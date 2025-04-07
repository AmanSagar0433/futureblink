import { UpdateListNamePayload ,ListItemPayload} from "../types/payload.types";
import { ContactResponse,ListItemResponse,ListByIdResponse, ListWithContactsCountResponse ,UpdateListNameResponse} from "../types/response.types";
import { Contact, List,  ListWithContactsCount } from "../types/types";
import http from "../utils/http-common";

class ListServices {
  getListById(_id: string) {
    return http.post<ListByIdResponse>("/api/listById", { _id }, {
      withCredentials: true,
    });
  }
  getListsByUserId() {
    return http.post<List[]>("/api/listsByUserId", {
      withCredentials: true,
    });
  }
  createList(name: string) {
    return http.post<ListItemResponse>("/api/createList", { name }, {
      withCredentials: true,
    });
  }
  updateListName(updateListNamePayload:UpdateListNamePayload) {
    
    return http.post<UpdateListNameResponse>("/api/updateListName", updateListNamePayload, {
      withCredentials: true,
    });
  }
  createContacts(
    listId: string,
    contacts: Contact[]
  ) {
    return http.post<ContactResponse[]>("/api/createContacts", { listId, contacts }, {
      withCredentials: true,
    });
  }
  listWithContactsCount() {
    return http.post<ListWithContactsCountResponse>("/api/listsWithContactsCount", {
      withCredentials: true,
    });
  }
}

export default new ListServices();