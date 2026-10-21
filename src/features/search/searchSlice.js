import { createSlice } from '@reduxjs/toolkit';

import { searchBrands } from './searchThunks';

const initialState = {
  number: '',
  brands: [],
  status: 'idle',
  error: null,
  infoEnabled: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setNumber(state, action) {
      state.number = action.payload;
    },
    setInfoEnabled(state, action) {
      state.infoEnabled = action.payload;
    },
    resetSearch(state) {
      state.brands = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBrands.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        state.status = 'success';
        state.brands = action.payload;
      })
      .addCase(searchBrands.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'error';
        state.error = action.payload ?? { message: action.error.message };
      });
  },
});

export const { setNumber, setInfoEnabled, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
