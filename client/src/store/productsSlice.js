import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    submissions: null,
    pendingRequests: null,
    stats: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload;
        },
        removeProducts: (state, action) => {
            state.products = null;
        },
        getSubmissions: (state, action) => {
            state.submissions = action.payload;
        },
        removeSubmissions: (state, action) => {
            state.submissions = null;
        },
        getPendingRequests: (state, action) => {
            state.pendingRequests = action.payload;
        },
        removePendingRequests: (state, action) => {
            state.createdQuizzes = null;
        },
        getStats: (state, action) => {
            state.stats = action.payload;
        },
        removeStats: (state, action) => {
            state.stats = null;
        },
    },
});

export const {
    getProducts,
    getPendingRequests,
    getSubmissions,
    getStats,
    removePendingRequests,
    removeProducts,
    removeStats,
    removeSubmissions,
} = productsSlice.actions;

export default productsSlice.reducer;
