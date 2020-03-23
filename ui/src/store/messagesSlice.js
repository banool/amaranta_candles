import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: []
  },
  reducers: {
    push: (state, action) => {
      state.messages.push(action.payload.message);
    }
  }
});

export const { push } = messagesSlice.actions;

export default messagesSlice.reducer;
