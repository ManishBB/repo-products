import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsData, getSubmissionsData } from "../utils/ApiUtils";
import { getProducts, getSubmissions } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";

const TeamMemberDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchQuizData = async () => {
            const productsJson = await getProductsData();
            const submissionsJson = await getSubmissionsData();

            dispatch(getProducts(productsJson.data));
            dispatch(getSubmissions(submissionsJson.data));
        };

        fetchQuizData();
    }, []);

    const products = useSelector((state) => state.products.products);

    console.log("Tis comes");
    return (
        products && (
            <div className="mt-10 flex justify-center flex-wrap space-between">
                {products.map((product) => (
                    <ProductCard product={product} />
                ))}
            </div>
        )
    );
};

export default TeamMemberDashboard;
