import axios from "axios";
import conf from "../config/config";

export const getProductsData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.get(
            `${conf.baseUrl}/product/get-all-products`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        alert("Something went wrong while fetching quiz stats!");
    }
};

export const getProduct = async (productId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.get(
            `${conf.baseUrl}/product/get-product/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        alert("Something went wrong while fetching product");
    }
};

export const getSubmissionsData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.get(
            `${conf.baseUrl}/product/get-review-submissions`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        alert("Something went wrong while fetching trending quizzes!");
    }
};

export const getPendingRequestsData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.get(
            `${conf.baseUrl}/product/get-pending-reviews`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        alert("Something went wrong while fetching created quizzes!");
    }
};
