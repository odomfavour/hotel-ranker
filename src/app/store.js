import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from '../features/hotels/hotelSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    categories: categoriesReducer,
    modal: modalReducer,
  },
});
