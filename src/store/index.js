import { configureStore } from '@reduxjs/toolkit';

import goodsReducer from '../features/goods/goodsSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    goods: goodsReducer,
  },
});
