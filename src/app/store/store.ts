"use client";

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { infoModalSlice, InfoModalStatusInterface } from "./infoModal";
import { modalButtonSlice, ModalButtonInterface } from "./modalButton";

export const infoModalStore = configureStore({
  reducer: {
    [infoModalSlice.name]: infoModalSlice.reducer,
  },
  devTools: true,
});

export const modalButtonStore = configureStore({
  reducer: {
    [modalButtonSlice.name]: modalButtonSlice.reducer,
  },
  devTools: true,
});
const rootReducer = {
  infoModal: infoModalSlice.reducer,
  modalButton: modalButtonSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppStore = {
  infoModal: InfoModalStatusInterface;
  modalButton: ModalButtonInterface;
};

export type AppDispatch = typeof infoModalStore.dispatch &
  typeof modalButtonStore.dispatch;

export type AppThunk = ThunkAction<void, AppStore, null, Action<string>>;
