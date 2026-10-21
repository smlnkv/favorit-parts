import { createSlice } from '@reduxjs/toolkit';

import { fetchGoods } from './goodsThunks';

const initialState = {
  selectedBrand: null,
  items: [],
  status: 'idle',
  error: null,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    resetGoods(state) {
      state.selectedBrand = null;
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.selectedBrand = action.meta.arg;
        state.items = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'error';
        state.error = action.payload ?? { message: action.error.message };
        state.items = [];
      });
  },
});

export const { resetGoods } = goodsSlice.actions;
export default goodsSlice.reducer;
