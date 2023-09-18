import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedCategory: "Todo",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItemsAndCategory: (state, action) => {
      state.items = action.payload.items;
      state.selectedCategory = action.payload.selectedCategory;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setItemsAndCategory, setSelectedCategory } = productsSlice.actions;

export default productsSlice.reducer;
