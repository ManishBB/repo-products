import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: [
        {
            type: String,
            required: true,
        },
    ],
    productDescription: { 
        type: String, 
        required: true 
    },
    department: { 
        type: String, 
        required: true 
    },
});

export const Product = mongoose.model("Product", productSchema);
