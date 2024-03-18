import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProduct } from "../utils/ApiUtils";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import conf from "../config/config";

function ProductPage() {
    const location = useLocation();
    const [role, setRole] = useState();
    const [productData, setProductData] = useState(null);
    const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState();
    const [productImage, setProductImage] = useState("");
    const [productDepartment, setProductDepartment] = useState("");
    const [productPrice, setProductPrice] = useState("");

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setRole(userData.role);
        const productId = location?.state;
        const fetchProductData = async () => {
            const data = await getProduct(productId);
            setProductData(data.data);
        };

        fetchProductData();
    }, []);

    const handleUpdateProduct = async () => {
        try {
            if (productName === "") {
                setProductName(productData.productName);
            }

            if (productDescription === "") {
                setProductDescription(productData.productDescription);
            }

            if (productImage === "") {
                setProductImage(productData.productImage);
            }

            if (productPrice === "") {
                setProductPrice(productData.productPrice);
            }

            if (productDepartment === "") {
                setProductDepartment(productData.productDepartment);
            }

            console.log(
                productName,
                productImage,
                productDescription,
                productDepartment,
                productPrice
            );

            const response = await axios.patch(
                `${conf.baseUrl}/product/update-product`,
                {
                    productId: productData._id,
                    newProductName: productName,
                    newProductImage: productImage,
                    newProductDescription: productDescription,
                    newProductDepartment: productDepartment,
                    newProductPrice: productPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("accessToken")
                        )}`,
                    },
                }
            );

            setIsUpdatingProduct(!isUpdatingProduct);
        } catch (error) {
            alert(
                "Something went wrong while creating field! Please check if all fields are correctly formatted or check your network connection"
            );
        }
    };

    const handleSubmitReview = async () => {
        const changedFields = [];

        try {
            if (productName === "") {
                setProductName(productData.productName);
            } else {
                changedFields.push("productName");
            }

            if (productDescription === "") {
                setProductDescription(productData.productDescription);
            } else {
                changedFields.push("productDescription");
            }

            if (productImage === "") {
                setProductImage(productData.productImage);
            } else {
                changedFields.push("productImage");
            }

            if (productPrice === "") {
                setProductPrice(productData.productPrice);
            } else {
                changedFields.push("productPrice");
            }

            if (productDepartment === "") {
                setProductDepartment(productData.productDepartment);
            } else {
                changedFields.push("productDepartment");
            }

            const response = await axios.post(
                `${conf.baseUrl}/product/change-product`,
                {
                    productId: productData._id,
                    newProductName: productName,
                    newProductImage: productImage,
                    newProductDescription: productDescription,
                    newProductDepartment: productDepartment,
                    newProductPrice: productPrice,
                    changedFields,
                },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("accessToken")
                        )}`,
                    },
                }
            );

            setIsUpdatingProduct(!isUpdatingProduct);
        } catch (error) {
            alert(
                "Something went wrong while creating field! Please check if all fields are correctly formatted or check your network connection"
            );
        }
    };

    return (
        productData &&
        (!isUpdatingProduct ? (
            <div className="flex mt-20 items-center justify-center">
                <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
                    <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                        <img
                            src={productData.image[0]}
                            alt="card-image"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="p-6">
                        <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                            {productData.department}
                        </h6>
                        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {productData.productName}
                        </h4>
                        <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                            {productData.productDescription}
                        </p>
                        <div className="flex justify-between">
                            <p className="inline">
                                <button
                                    className="flex items-center gap-2 py-3 font-sans text-s font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                                    type="button"
                                >
                                    ${productData.price}
                                </button>
                            </p>
                            <button
                                class="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() =>
                                    setIsUpdatingProduct(!isUpdatingProduct)
                                }
                            >
                                Edit & Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex items-center justify-center">
                <Card color="transparent" shadow={false}>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Product Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder={productData.productName}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Product Image URL
                            </Typography>
                            <Input
                                size="lg"
                                placeholder={productData.image[0]}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                onChange={(e) =>
                                    setProductImage(e.target.value)
                                }
                            />
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Description
                            </Typography>
                            <Textarea
                                size="lg"
                                placeholder={productData.productDescription}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                onChange={(e) =>
                                    setProductDescription(e.target.value)
                                }
                            />
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Department
                            </Typography>
                            <Input
                                size="lg"
                                placeholder={productData.department}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                onChange={(e) =>
                                    setProductDepartment(e.target.value)
                                }
                            />
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Price
                            </Typography>
                            <Input
                                size="lg"
                                placeholder={productData.price}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                onChange={(e) =>
                                    setProductPrice(e.target.value)
                                }
                            />
                        </div>
                        {role === "admin" ? (
                            <Button
                                className="mt-6"
                                fullWidth
                                onClick={handleUpdateProduct}
                            >
                                Update Product
                            </Button>
                        ) : (
                            <Button
                                className="mt-6"
                                fullWidth
                                onClick={handleSubmitReview}
                            >
                                Submit for Review
                            </Button>
                        )}
                        <Button
                            className="mt-6"
                            fullWidth
                            onClick={() =>
                                setIsUpdatingProduct(!isUpdatingProduct)
                            }
                        >
                            Cancel
                        </Button>
                    </form>
                </Card>
            </div>
        ))
    );
}

export default ProductPage;
