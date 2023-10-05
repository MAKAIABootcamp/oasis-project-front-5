import { createSlice } from "@reduxjs/toolkit";
import { addToFavoritesInFirestore, removeFromFavoritesInFirestore } from "./favoritesAPI";

const initialState = {
  userFavorites: [], 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.userFavorites.push(action.payload);
      addToFavoritesInFirestore(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.userFavorites = state.userFavorites.filter(
        (item) => item.id !== action.payload.id
      );
      removeFromFavoritesInFirestore(action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

