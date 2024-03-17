import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

//test route
app.get("/api/v1/test", async (req, res) => {
    res.send("This is a test route");
});

fetchAndStoreProducts();

//importing routes
import authRouter from "./routes/auth.routes.js";
import { fetchAndStoreProducts } from "./utils/fetchAndStoreProducts.js";
import productRouter from "./routes/product.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

export default app;
