import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setVoteNotification(state, action) {
      return `you voted '${action.payload}'`;
    },
    removeNotification() {
      return '';
    }
  }
});

export const { setVoteNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;