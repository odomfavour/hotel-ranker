import { createSlice } from '@reduxjs/toolkit';
import hotel from '../../images/hotel.jpg';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('hotels');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};

const saveState = (state) => {
  console.log(state);
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('hotels', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const initialState = loadState() || [
  {
    id: 1,
    name: 'Hotel A',
    country: 'United States',
    address: '123 Main St, Cityville',
    image: hotel,
    rating: 3,
  },
];

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addHotel: (state, action) => {
      state.push(action.payload);
      console.log(action);
      saveState(state);
    },
    deleteHotel: (state, action) => {
      const newState = state.filter((hotel) => hotel.id !== action.payload.id);
      saveState(newState);
      return newState;
    },
    updateHotel: (state, action) => {
      const hotelIndex = state.findIndex(
        (hotel) => hotel.id === action.payload.id
      );
      if (hotelIndex !== -1) {
        state[hotelIndex] = action.payload;
        saveState(state);
      }
    },
  },
});

export const { addHotel, deleteHotel, updateHotel, openHotelAddedModal } =
  hotelsSlice.actions;
export default hotelsSlice.reducer;
