import { createSlice } from "@reduxjs/toolkit";

const notificationState = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    receiveNotification(state, action) {
      const notif = action.payload;
      if (!state[notif.id]) {
        state[action.payload.id] = notif;
        alert(notif.title);
      }
    },
  },
});

const notificationActions = notificationState.actions;
const notificationReducer = notificationState.reducer;

export { notificationActions, notificationReducer };
