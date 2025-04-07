import {configureStore} from "@reduxjs/toolkit";
import editSequencePageReducer from "./slice/editSequenceSlice";



export const editSequencePageStore = configureStore({
  reducer: {
    eidtSequence: editSequencePageReducer
  },
})

export type EditSequencePageRootState = ReturnType<typeof editSequencePageStore.getState>;
export type AppDispatch = typeof editSequencePageStore.dispatch;
