import exp from "constants";
import { Flowchart } from "./types";

export type LoginPayload = {
  number: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  number: string;
  password: string;
}

export type UpdateListNamePayload = {
  listId: string;
  name: string;
}

export type ListItemPayload = {
  name: string
}

export type CreateSequencePayload = {
  name: string
}

export type UpdateSequencePayload = {
  sequence: {
    _id: string;
    userId: string;
    name: string;
    flowchart: Flowchart;
  }
}

export type UpdateSequenceAndSchedulePayload = {
  scheduledAt: string;
  sequence: {
    _id: string;
    userId: string;
    name: string;
    flowchart: Flowchart;
  }
}