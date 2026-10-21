import { createAsyncThunk } from '@reduxjs/toolkit';

import { searchBrandsApi } from '../../api/client';

const NOT_FOUND_GOODS_ID = '00000000-0000-0000-0000-000000000000';

function isEmptyResult(item) {
  return item.goodsID === NOT_FOUND_GOODS_ID || item.brand === '';
}

export const searchBrands = createAsyncThunk(
  'search/searchBrands',
  async ({ number }, { signal, rejectWithValue }) => {
    try {
      const goods = await searchBrandsApi({ number, signal });
      return goods.filter((item) => !isEmptyResult(item));
    } catch (err) {
      return rejectWithValue({ message: err.message, code: err.code });
    }
  },
);
