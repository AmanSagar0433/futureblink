import http from "../utils/http-common";
import { CreateSequenceResponse, SequenceByIdResponse, SequencesByUserIdResponse, UpdateSequenceResponse } from "../types/response.types";
import { CreateSequencePayload, UpdateSequenceAndSchedulePayload, UpdateSequencePayload } from "../types/payload.types";

class SequenceService {
  getSequencesById(sequenceId: string) {
    return http.post<SequenceByIdResponse>("/api/sequenceById", { sequenceId }, {
      withCredentials: true,
    });
  }
  getSequencesByUserId() {
    return http.post<SequencesByUserIdResponse>("/api/sequencesByUserId", {
      withCredentials: true,
    });
  }
  createSequence(createSequencePayload: CreateSequencePayload) {
    return http.post<CreateSequenceResponse>("/api/createSequence", createSequencePayload, {
      withCredentials: true,
    })
  }
  updateSequence(updateSequencePayload: UpdateSequencePayload) {
    return http.post<UpdateSequenceResponse>("/api/updateSequence", updateSequencePayload, {
      withCredentials: true,
    })
  }
  updateSequenceAndSchedule(updateSequenceAndSchedulePayload: UpdateSequenceAndSchedulePayload) {
    return http.post<UpdateSequenceResponse>("/api/updateSequenceAndSchedule", updateSequenceAndSchedulePayload, {
      withCredentials: true,
    })
  }
}

export default new SequenceService();