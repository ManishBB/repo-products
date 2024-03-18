import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
    approvedReviewProduct,
    changeProductDetails,
    getAdminProfileStats,
    getAllProducts,
    getPendingReviews,
    getProduct,
    getReviewSubmissions,
    getTeamMemberProfileStats,
    rejectReviewProduct,
    updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/get-all-products").get(verifyUserJWT, getAllProducts);
router.route("/get-product/:productId").get(verifyUserJWT, getProduct);
router.route("/update-product").patch(verifyUserJWT, updateProduct);
router.route("/change-product").post(verifyUserJWT, changeProductDetails);
router
    .route("/approve-review-product/:reviewId")
    .patch(verifyUserJWT, approvedReviewProduct);
router
    .route("/reject-review-product/:reviewId")
    .patch(verifyUserJWT, rejectReviewProduct);
router.route("/get-pending-reviews").get(verifyUserJWT, getPendingReviews);
router
    .route("/get-review-submissions")
    .get(verifyUserJWT, getReviewSubmissions);
router
    .route("/get-member-submissions")
    .get(verifyUserJWT, getTeamMemberProfileStats);
router.route("/get-admin-submissions").get(verifyUserJWT, getAdminProfileStats);

export default router;
