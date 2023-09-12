import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedCategory: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItemsAndCategory: (state, action) => {
      state.items = action.payload.items;
      state.selectedCategory = action.payload.selectedCategory;
    },
  },
});

export const { setItemsAndCategory } = productsSlice.actions;

export default productsSlice.reducer;
