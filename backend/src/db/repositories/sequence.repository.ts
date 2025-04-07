import { Types } from "mongoose";
import { SequenceModel } from "../../models/suquence.model";


export const getSequenceById = (
  id: string
) => SequenceModel.findById(id);

export const getSequencesByUserId = (
  userId: string
) => SequenceModel.aggregate([
  {
    $match: {
      userId: new Types.ObjectId(userId)
    }
  },
  {
    $project: {
      _id: true,
      name: true
    }
  }
])

export const createSequence = (
  values: Record<string, any>
) => new SequenceModel(values).save().then((sequence) => sequence.toObject());

export const updateSequence = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return SequenceModel.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: false }
  );
};