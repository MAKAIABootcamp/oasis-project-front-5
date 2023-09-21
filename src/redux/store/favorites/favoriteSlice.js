import { createSlice } from "@reduxjs/toolkit";
import { addToFavoritesInFirestore, removeFromFavoritesInFirestore } from "./favoritesAPI";

const initialState = {
  favorites: [], 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);

      addToFavoritesInFirestore(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      removeFromFavoritesInFirestore(action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

