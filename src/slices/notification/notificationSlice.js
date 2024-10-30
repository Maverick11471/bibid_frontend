import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        setNotifications: (state, action) => {

            console.log(action.payload);

            state.notifications = action.payload.map(notification => notification.alertContent);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        }
    },
});

export const { setNotifications, addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
