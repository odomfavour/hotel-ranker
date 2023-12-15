// CategorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('categories');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('categories', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const initialState = loadState() || [
  { id: 1, label: '1 Star', value: '1' },
  { id: 2, label: '2 Star', value: '2' },
  { id: 3, label: '3 Star', value: '3' },
];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
      saveState(state);
    },
    editCategory: (state, action) => {
      const { oldCategory, newCategory } = action.payload;
      const index = state.findIndex(
        (category) => category.id === oldCategory.id
      );
      if (index !== -1) {
        state[index] = newCategory;
        saveState(state);
      }
    },
    deleteCategory: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
        saveState(state);
      }
    },
  },
});

export const { addCategory, editCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
