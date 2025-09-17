import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';

const selectProduct = {
    name: "Stylish Jacket",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish Jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
        {
            url: "https://picsum.photos/500/500?random=1",
            altText: "Stylish Jacket 1"
        },
        {
            url: "https://picsum.photos/500/500?random=2",
            altText: "Stylish Jacket 2"
        },
    ]
};

const similarProducts =[
    {
        _id:1,
        name:"product 1",
        price: 100,
        images: [
            {
                url: "https://picsum.photos/500/500?random=3",
            }
        ]
    },
    {
        _id:2,
        name:"product 1",
        price: 100,
        images: [
            {
                url: "https://picsum.photos/500/500?random=4",
            }
        ]
    },
    {
        _id:3,
        name:"product 1",
        price: 100,
        images: [
            {
                url: "https://picsum.photos/500/500?random=5",
            }
        ]
    },
    {
        _id:4,
        name:"product 1",
        price: 100,
        images: [
            {
                url: "https://picsum.photos/500/500?random=6",
            }
        ]
    },
]

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState(selectProduct.images[0].url);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleQuantityChange = (action) => {
        if (action === "plus") setSelectedQuantity((prev) => prev + 1);
        if (action === "minus" && selectedQuantity > 1) setSelectedQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select a color and size", { duration: 1000 });
            return;
        }

        setIsButtonDisabled(true);

        setTimeout(() => {
            toast.success("Product added to cart", { duration: 1000 });
            setIsButtonDisabled(false);
        }, 500);
    };

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    
                    {/* Left Thumbnails */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectProduct.images.map((image, index) => (
                            <img 
                                key={index} 
                                src={image.url} 
                                alt={image.altText} 
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border 
                                    ${mainImage === image.url ? "border-black" : "border-gray-400"}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img 
                                src={mainImage} 
                                alt="main product"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Mobile Thumbnails */}
                    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                        {selectProduct.images.map((image, index) => (
                            <img 
                                key={index} 
                                src={image.url} 
                                alt={image.altText} 
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border 
                                    ${mainImage === image.url ? "border-black" : "border-gray-400"}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectProduct.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-1 line-through">
                            {selectProduct.originalPrice && `$${selectProduct.originalPrice}`}
                        </p>
                        <p className="text-xl text-gray-500 mb-2">
                            ${selectProduct.price}
                        </p>
                        <p className="text-gray-600">{selectProduct.description}</p>

                        {/* Colors Section */}
                        <div className="mb-4">
                            <p className="text-gray-700">Color:</p>
                            <div className="flex gap-2 mt-2">
                                {selectProduct.colors.map((color) => (
                                    <button 
                                        key={color} 
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border 
                                            ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`} 
                                        style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.5)" }}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes Section */}
                        <div className="mb-4">
                            <p className="text-gray-700">Size:</p>
                            <div className="flex gap-2 mt-2">
                                {selectProduct.sizes.map((size) => (
                                    <button 
                                        onClick={() => setSelectedSize(size)}
                                        key={size} 
                                        className={`px-4 py-2 rounded border 
                                            ${selectedSize === size ? "bg-black text-white" : ""}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Section */}
                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button onClick={() => handleQuantityChange("minus")} 
                                    className="px-3 py-1 bg-gray-200 rounded text-lg">
                                    -
                                </button>
                                <span className="text-lg">{selectedQuantity}</span>
                                <button onClick={() => handleQuantityChange("plus")} 
                                    className="px-3 py-1 bg-gray-200 rounded text-lg">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCart} 
                            disabled={isButtonDisabled}
                            className="bg-black text-white py-2 px-4 rounded w-full mb-4 disabled:opacity-50"
                        >
                           {isButtonDisabled ? "Adding...": " ADD TO CART"}
                        </button>

                        {/* Characteristics Table */}
                        <div className="mt-10 text-gray-700">
                            <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-1">Brand</td>
                                        <td className="py-1">{selectProduct.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Material</td>
                                        <td className="py-1">{selectProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                    
                <div className="mt-20">
                    <h2 className="text-2xl text-center font-medium mb-4">
                        You may also like
                    </h2>
                    <ProductGrid products={similarProducts}/>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
