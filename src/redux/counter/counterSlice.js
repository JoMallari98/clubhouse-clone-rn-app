import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  loading: false,
  error: undefined,
  result: undefined,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    triggerSaga: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    triggerSagaSucceeded: (state, action) => {
      state.loading = false;
      state.result = action.payload;
    },
    triggerSagaFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
