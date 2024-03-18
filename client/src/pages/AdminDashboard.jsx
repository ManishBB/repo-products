import { useDispatch, useSelector } from "react-redux";
import { getPendingRequestsData, getProductsData } from "../utils/ApiUtils";
import { getPendingRequests, getProducts } from "../store/productsSlice";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const AdminDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductsData = async () => {
            const productsJson = await getProductsData();
            const pendingRequestsJson = await getPendingRequestsData();

            dispatch(getProducts(productsJson.data));
            dispatch(getPendingRequests(pendingRequestsJson.data));
        };

        fetchProductsData();
    }, []);

    const products = useSelector((state) => state.products.products);
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

export default AdminDashboard;
