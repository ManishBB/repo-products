import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import { Review } from "../models/Review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllProducts = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const allProducts = await Product.find();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allProducts,
                "All products fetched successfully"
            )
        );
};

const getProduct = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const { productId } = req.params;

    const product = await Product.findById(productId);

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Products fetched successfully"));
};

const updateProduct = async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(404, "Unauthorized!");
    }

    const {
        newProductName,
        newProductImage,
        newProductDescription,
        newProductDepartment,
        newProductPrice,
    } = req.body;

    const product = await Product.findOneAndUpdate(
        { _id: req.body.productId },
        {
            $set: {
                productName: newProductName,
                productImage: newProductImage,
                productDescription: newProductDescription,
                productDepartment: newProductDepartment,
                productPrice: newProductPrice,
            },
        }
    );

    const createdProduct = await Product.findById(product._id);

    if (!createdProduct)
        throw new ApiError(500, "Something went wrong while updating product");

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdProduct, "Product updated successfully")
        );
};

const changeProductDetails = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const {
        productId,
        newProductName,
        newProductImage,
        newProductDescription,
        newProductDepartment,
        newProductPrice,
        changedFields,
    } = req.body;

    const reviewProduct = await Review.create({
        productId: productId,
        teamMemberId: req.user._id,
        changes: {
            productName: newProductName,
            price: newProductPrice,
            image: newProductImage,
            productDescription: newProductDescription,
            department: newProductDepartment,
        },
        changedFields: changedFields,
    });

    const createdReviewProduct = await Review.findById(reviewProduct._id);

    if (!createdReviewProduct)
        throw new ApiError(
            500,
            "Something went wrong while creating a new quiz"
        );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdReviewProduct,
                "Quiz registered successfully"
            )
        );
};

const approvedReviewProduct = async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail || req.user.role !== "admin")
            throw new ApiError(400, "Unauthorized Access");

        const { reviewId } = req.params;

        // Check if reviewId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: "Invalid reviewId" });
        }

        // Find the review by ID
        const review = await Review.findById(reviewId);

        // Check if review exists
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if review status is already approved
        if (review.status === "approved") {
            return res
                .status(400)
                .json({ message: "Review status is already approved" });
        }

        // Apply changes to the product schema
        const product = await Product.findOneAndUpdate(
            { _id: review.productId },
            { $set: review.changes },
            { new: true }
        );

        // Update the review status to 'approved'
        review.status = "approved";
        await review.save();

        // Respond with success message and updated product data
        return res
            .status(200)
            .json({ message: "Review status updated to approved", product });
    } catch (error) {
        console.error("Error approving review:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const rejectReviewProduct = async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail || req.user.role !== "admin")
            throw new ApiError(400, "Unauthorized Access");

        const { reviewId } = req.params;

        // Check if reviewId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: "Invalid reviewId" });
        }

        // Find the review by ID and update its status to 'rejected'
        const review = await Review.findByIdAndUpdate(
            reviewId,
            { status: "rejected" },
            { new: true }
        );

        // Check if review exists
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Respond with the updated review
        return res
            .status(200)
            .json({ message: "Review status updated to rejected", review });
    } catch (error) {
        console.error("Error rejecting review:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getPendingReviews = async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail || req.user.role !== "admin")
            throw new ApiError(400, "Unauthorized Access");

        // Aggregate pipeline to match documents with status "pending"
        const pendingReviews = await Review.aggregate([
            {
                $match: { status: "pending" },
            },
        ]);

        // Respond with the pending reviews
        return res.status(200).json({ pendingReviews });
    } catch (error) {
        console.error("Error fetching pending reviews:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getReviewSubmissions = async (req, res) => {
    try {
        if (req.user.role !== "teamMember")
            throw new ApiError(400, "Unauthorized Access");

        // Aggregate pipeline to match documents with status "pending"
        const reviewSubmissions = await Review.aggregate([
            {
                $match: { teamMemberId: req.user._id },
            },
        ]);

        // Respond with the pending reviews
        return res.status(200).json({ reviewSubmissions });
    } catch (error) {
        console.error("Error fetching review Submissions:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getTeamMemberProfileStats = async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail || req.user.role !== "admin")
            throw new ApiError(400, "Unauthorized Access");

        const profileStats = await Review.aggregate([
            {
                $match: { teamMemberId: req.user._id },
            },
            {
                $group: {
                    _id: "$status", // Group by status field
                    count: { $sum: 1 }, // Count the number of documents in each group
                },
            },
        ]);

        const counts = {
            pending: 0,
            approved: 0,
            rejected: 0,
        };

        profileStats.forEach((item) => {
            counts[item._id] = item.count;
        });

        // Respond with the pending reviews
        return res.status(200).json({ counts });
    } catch (error) {
        console.error("Error while fetching profile stats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAdminProfileStats = async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail || req.user.role !== "admin")
            throw new ApiError(400, "Unauthorized Access");

        const profileStats = await Review.aggregate([
            {
                $group: {
                    _id: "$status", // Group by status field
                    count: { $sum: 1 }, // Count the number of documents in each group
                },
            },
        ]);

        const counts = {
            pending: 0,
            approved: 0,
            rejected: 0,
        };

        profileStats.forEach((item) => {
            counts[item._id] = item.count;
        });

        // Respond with the pending reviews
        return res.status(200).json({ counts });
    } catch (error) {
        console.error("Error while fetching profile stats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export {
    getAllProducts,
    updateProduct,
    changeProductDetails,
    approvedReviewProduct,
    rejectReviewProduct,
    getPendingReviews,
    getReviewSubmissions,
    getTeamMemberProfileStats,
    getAdminProfileStats,
    getProduct,
};
