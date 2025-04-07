import { Request, Response } from "express";
import { createSequence, getSequenceById, getSequencesByUserId, updateSequence } from "../db/repositories/sequence.repository";
import { scheduleEmail } from "../jobs/scheduler";

export const createSequenceFn = async (req: Request, res: Response) => {
  const { name } = req.body;

  const userResponse = req.userResponse;

  if (userResponse) {
    const sequence = await createSequence({
      name, userId: userResponse._id
    })

    return res.status(200).json({
      message: `Sequence "${name}" is create`,
      data: {
        _id: sequence._id,
        name: sequence.name
      }
    })
  }

  return res.status(500).json({ message: "Internal Server Error" });
}

export const getSequenceByIdFn = async (req: Request, res: Response) => {
  const { sequenceId } = req.body;

  const sequence = await getSequenceById(sequenceId)

  res.status(200).json({
    message: "",
    data: {
      sequence
    }
  })
}

export const getSequencesByUserIdFn = async (req: Request, res: Response) => {
  const userResponse = req.userResponse;

  if (userResponse) {
    const sequences = await getSequencesByUserId(userResponse._id)
    return res.status(200).json({
      message: "",
      data: {
        sequences
      }
    })
  }

  return res.status(500).json({ message: "Internal Server Error" });
}

export const updateSequenceFn = async (req: Request, res: Response) => {
  const { sequence } = req.body

  await updateSequence(sequence._id, sequence)

  return res.status(200).json({
    message: "Successfuly updated"
  })
}

export const updateSequenceAndScheduleFn = async (req: Request, res: Response) => {
  const { sequence, scheduledAt } = req.body

  await updateSequence(sequence._id, sequence)
 
  await scheduleEmail(sequence, scheduledAt)
  
  return res.status(200).json({
    message: "Successfuly updated"
  })
}