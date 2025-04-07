import mongoose, { Schema, Document, Types } from "mongoose";

export type Contact = {
  name: string;
  email: string;
  number: string;
};

export type List = {
  userId: Types.ObjectId;
  name: string;
  contacts: Contact[];
};

interface ListDocument extends Document, List { }

const listSchema = new Schema<ListDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    contacts: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        number: { type: String, required: true },
      },
    ],
  },
  { versionKey: false }
);

listSchema.path("contacts").default([]);

export const ListModel = mongoose.model<ListDocument>("List", listSchema);
