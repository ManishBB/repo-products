import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import metadataSlice from "./metadataSlice";
import productsSlice from "./productsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productsSlice,
        metadata: metadataSlice,
    },
});

export default store;
