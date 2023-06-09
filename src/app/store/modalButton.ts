import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ModalButtonInterface {
  options: string[];
}

const initialState: ModalButtonInterface = {
  options: [],
};

export const modalButtonSlice = createSlice({
  name: "infoModal",
  initialState,
  reducers: {
    // Action to set the infoModal status
    setModalButtonOptions(state, action) {
      state.options = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setModalButtonOptions } = modalButtonSlice.actions;

// export const selectInfoModalState = (state: AppState) => state.infoModal;

export default modalButtonSlice.reducer;
