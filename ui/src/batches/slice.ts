import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { Batch } from "./types";

interface BatchesDict {
  [id: number]: Batch;
}

interface BatchesSliceState {
  batches: BatchesDict;
}

interface GetBatchesSuccessAction {
  batches: Batch[];
}

interface GetBatchSuccessAction {
  batch: Batch;
}

let initialState: BatchesSliceState = {
  batches: {}
};

const batchesSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    getBatchesSuccess: (state, action: PayloadAction<GetBatchesSuccessAction>) => {
      const { batches } = action.payload;
      state.batches = {};
      batches.forEach(batch => (state.batches[batch.id] = batch));
    },
    getBatchSuccess: (state, action: PayloadAction<GetBatchSuccessAction>) => {
      const { batch } = action.payload;
      state.batches[batch.id] = batch;
    }
  }
});

export const { getBatchesSuccess, getBatchSuccess } = batchesSlice.actions;
export const batchesSelector = (state: RootState): Batch[] => Object.values(state.batches.batches);
export const batchSelector = (id: number) => (state: RootState): Batch => state.batches.batches[id];

export default batchesSlice.reducer;
