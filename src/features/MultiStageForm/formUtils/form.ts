import { isEmpty } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { saveState, resetStore } from "./persist-state";
import { FormState, FirstStage, SecondStage } from "./form-types";

const initialState: FormState = {
  first: {} as FirstStage,
  second: {} as SecondStage,
};

const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFirst(state, action: PayloadAction<FirstStage>) {
      state.first = action.payload;
      saveState("first", action.payload);
    },
    saveSecond(state, action: PayloadAction<SecondStage>) {
      state.second = action.payload;
      saveState("second", action.payload);
    },
    resetState(state) {
      state = {} as FormState;
      resetStore();
    },
  },
});

export const selectFirstStage = (state: RootState) => state.form.first;
export const selectSecondStage = (state: RootState) => state.form.second;

export const isFormValidStage = (state: RootState) => {
  return {
    first: isEmpty(state.form.first),
    second: isEmpty(state.form.second),
  };
};

export default form.reducer;

export const { saveFirst, saveSecond } = form.actions;
