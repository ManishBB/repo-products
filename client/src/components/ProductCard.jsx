import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleViewProductClick = (productId) => {
        navigate(`/product/${productId}`, { state: productId });
    };
    return (
        <div>
            <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                    <img src={product.image[0]} alt="ui/ux review check" />
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            {product.productName}
                        </h5>
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            ${product.price}
                        </p>
                    </div>
                    <p className="block min-h-20 font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        {product.productDescription.length > 140 ? (
                            <p>{`${product.productDescription.slice(
                                0,
                                140
                            )}.....`}</p>
                        ) : (
                            <p>{product.productDescription}</p>
                        )}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                        className="flex items-center gap-2 px-4 -py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                        type="button"
                    >
                        {product.department}
                    </button>
                </div>
                <div className="p-6 pt-3">
                    <button
                        className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleViewProductClick(product._id)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
