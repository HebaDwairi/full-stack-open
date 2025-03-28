import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationContent(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    }
  }
});

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(setNotificationContent(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000);
  }
}

export const { setNotificationContent, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;