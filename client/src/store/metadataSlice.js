import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editQuizId: null,
    deleteQuizId: null,
    createdQuizzes: null,
};

const metadataSlice = createSlice({
    name: "metadata",
    initialState,
    reducers: {
        getEditQuizId: (state, action) => {
            state.editQuizId = action.payload;
        },
        removeEditQuizId: (state, action) => {
            state.editQuizId = null;
        },
        getDeleteQuizId: (state, action) => {
            state.deleteQuizId = action.payload;
        },
        removeDeleteQuizId: (state, action) => {
            state.deleteQuizId = null;
        },
    },
});

export const {
    getEditQuizId,
    removeEditQuizId,
    getDeleteQuizId,
    removeDeleteQuizId,
} = metadataSlice.actions;

export default metadataSlice.reducer;
