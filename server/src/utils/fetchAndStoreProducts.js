import axios from "axios";
import { Product } from "../models/Product.model.js";

export async function fetchAndStoreProducts() {
    try {
        // Check if any products already exist in the database
        const existingProductsCount = await Product.countDocuments();
        if (existingProductsCount > 0) {
            console.log(
                "Products already exist in the database. Skipping initialization."
            );
            return;
        }

        // Fetch products from the external API
        const response = await axios.get(
            "https://64e0caef50713530432cafa1.mockapi.io/api/products"
        ); // Replace with your API endpoint
        const products = response.data; // Assuming the API returns an array of products

        // Save products to the database
        await Product.insertMany(products);

        console.log("Products fetched and stored successfully.");
    } catch (error) {
        console.error("Error fetching and storing products:", error);
    }
}
