import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchGoodsApi } from '../../api/client';

import { normalizeGoods } from './normalize';

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async ({ number, brand, info }, { signal, rejectWithValue }) => {
    try {
      const goods = await fetchGoodsApi({ number, brand, info, signal });
      return normalizeGoods(goods);
    } catch (err) {
      return rejectWithValue({ message: err.message, code: err.code });
    }
  },
);

let currentRequest = null;

export function requestGoods(dispatch, params) {
  if (currentRequest) {
    currentRequest.abort();
  }
  currentRequest = dispatch(fetchGoods(params));
  return currentRequest;
}
