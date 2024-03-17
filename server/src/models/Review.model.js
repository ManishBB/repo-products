import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    teamMemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    changes: {
        productName: { type: String },
        price: { type: Number },
        image: [{ type: String }],
        productDescription: { type: String },
        department: { type: String },
    },
    changedFields: [{ type: String, default: [] }],
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
});

export const Review = mongoose.model("Review", reviewSchema);
