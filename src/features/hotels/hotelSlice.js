import { createSlice } from '@reduxjs/toolkit';
import hotel from '../../images/hotel.jpg';

// Load state from local storage or use initial state
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

// Save state to local storage
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
  {
    id: 2,
    name: 'Hotel B',
    country: 'United Kingdom',
    address: '456 High St, Townsville',
    image: hotel,
    rating: 2,
  },
  {
    id: 3,
    name: 'Hotel B',
    country: 'United Kingdom',
    address: '456 High St, Townsville',
    image: hotel,
    rating: 4,
  },
  {
    id: 4,
    name: 'Hotel B',
    country: 'United Kingdom',
    address: '456 High St, Townsville',
    image: hotel,
    rating: 4,
  },
  {
    id: 5,
    name: 'Hotel B',
    country: 'United Kingdom',
    address: '456 High St, Townsville',
    image: hotel,
    rating: 4,
  },
  {
    id: 6,
    name: 'Hotel B',
    country: 'United Kingdom',
    address: '456 High St, Townsville',
    image: hotel,
    rating: 4,
  },
  {
    id: 7,
    name: 'Hotel B',
    country: 'United Kingdom',
    address: '456 High St, Townsville',
    image: hotel,
    rating: 4,
  },
  // Add more hotels as needed
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
      console.log(state);
      console.log(action);
      //   return state.filter((hotel) => hotel.id !== action.payload);
      const newState = state.filter((hotel) => hotel.id !== action.payload.id);
      console.log(newState);
      saveState(newState);
      return newState;
    },
    updateHotel: (state, action) => {
      const hotelIndex = state.findIndex(
        (hotel) => hotel.id === action.payload.id
      );
      if (hotelIndex !== -1) {
        // Update the existing hotel with the new data
        state[hotelIndex] = action.payload;
        saveState(state);
      }
    },
    // Other CRUD operations...
  },
});

export const { addHotel, deleteHotel, updateHotel } = hotelsSlice.actions;
export default hotelsSlice.reducer;
