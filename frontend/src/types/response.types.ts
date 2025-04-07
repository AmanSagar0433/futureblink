import { Flowchart, Sequence } from "./types";

export type LoginStatusResponse = {
  data: {
    isUserLoggedIn: boolean;
  }
};

export type LoginResponse = {
  message: string;
}

export type SignupResponse = {
  message: string;
}

export type ListWithContactsCountResponse = {
  message: string;
  data: {
    _id: string;
    name: string;
    contactsCount: number;
  }[]
}

export type ContactResponse = {
  _id: string;
  name: string;
  email: string;
  number: string;
};

export type ListByIdResponse = {
  message: string;
  data: {
    userId: string;
    name: string;
    contacts: ContactResponse[];
  }
}

export type UpdateListNameResponse = {
  _id: string
  name: string
}

export type ListItemResponse = {
  _id: string,
  name: string,
  contactsSize: number,
}

export type SequenceResponse = {
  _id: string;
  name: string;
}


export type SequenceEditPageResponse = {
  _id: string;
  userId: string;
  name: string;
  flowchart: Flowchart;
}

export type SequencesByUserIdResponse = {
  message: string;
  data: {
    sequences: SequenceResponse[]
  }
}

export type SequenceByIdResponse = {
  message: string;
  data: {
    sequence: SequenceEditPageResponse
  }
}

export type CreateSequenceResponse = {
  message: string;
  data: {
    _id: string,
    name: string
  }
}

export type UpdateSequenceResponse = {
  message: string;
}

