import { createSlice } from "@reduxjs/toolkit";
export interface dialogMessageState {
  isOpen: boolean;
  message: string;
}
const initialState: dialogMessageState = {
  isOpen: false,
  message: "",
};
export const dialogMessageSlice = createSlice({
  name: "dialogMessage",
  initialState,
  reducers: {
    setIsOpenDialogMessage: (state, action) => {
      state.isOpen = action?.payload?.isOpen;
      state.message = action?.payload?.message;
    },
  },
});
export const { setIsOpenDialogMessage } = dialogMessageSlice.actions;
export default dialogMessageSlice.reducer;
