import SequenceServices from "../services/sequence.services";
import { useState } from "react";
import { SequenceEditPageResponse, SequencesByUserIdResponse } from "../types/response.types";
import { UpdateSequenceAndSchedulePayload, UpdateSequencePayload } from "../types/payload.types";

const useSequence = () => {

  const [sequences, setSequences] = useState<SequencesByUserIdResponse | null>(null)
  const [sequence, setSequence] = useState<SequenceEditPageResponse | null>(null)

  const callGetSequencesByIdApi = (sequenceId: string) => {
    SequenceServices.getSequencesById(sequenceId)
      .then((response) => {
        setSequence(response.data.data.sequence)
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callSequencesByUserIdApi = () => {
    SequenceServices.getSequencesByUserId()
      .then((response) => {
        setSequences(response.data)
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callCreateSequenceApi = (name: string) => {
    SequenceServices.createSequence({ name })
      .then((response) => {
        if (sequences?.data) {
          setSequences({
            ...sequences,
            data: {
              ...sequences.data,
              sequences: [
                ...sequences.data.sequences,
                {
                  _id: response.data.data._id,
                  name: response.data.data.name
                }
              ]
            }
          })
        }
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callUpdateSequenceApi = (updateSequencePayload: UpdateSequencePayload) => {
    SequenceServices.updateSequence(updateSequencePayload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callUpdateSequenceAndScheduleApi = (updateSequenceAndSchedulePayload: UpdateSequenceAndSchedulePayload) => {
    SequenceServices.updateSequenceAndSchedule(updateSequenceAndSchedulePayload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  return {
    sequences,
    sequence,
    callSequencesByUserIdApi,
    callCreateSequenceApi,
    callGetSequencesByIdApi,
    callUpdateSequenceApi,
    callUpdateSequenceAndScheduleApi
  }
}

export default useSequence;