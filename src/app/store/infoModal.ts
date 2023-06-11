"use client";

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface InfoModalStatusInterface {
  infoModalStatus: boolean;
  movie?: number;
}

const initialState: InfoModalStatusInterface = {
  infoModalStatus: false,
  movie: undefined,
};

export const infoModalSlice = createSlice({
  name: "infoModal",
  initialState,
  reducers: {
    // Action to set the infoModal status
    setInfoModalStatus(state, action) {
      state.infoModalStatus = action.payload;
    },
    setInfoModalMovieId(state, action) {
      state.movie = action.payload;
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

export const { setInfoModalMovieId, setInfoModalStatus } =
  infoModalSlice.actions;

export default infoModalSlice.reducer;
