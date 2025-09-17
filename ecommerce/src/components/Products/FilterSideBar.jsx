import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: [],
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Grey", "Brown", "Pink", "Purple"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Rayon", "Linen", "Silk", "Wool"];
  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Modern Fits"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });

    setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  // Update URL Parameters
  const updateFilters = (updatedFilter) => {
    const newParams = { ...Object.fromEntries([...searchParams]), ...updatedFilter };
    setSearchParams(newParams);
  };

  // Function to handle selection changes
  const handleCategoryChange = (category) => updateFilters({ category });
  const handleGenderChange = (gender) => updateFilters({ gender });

  const handleCheckboxChange = (field, value) => {
    setFilter((prev) => {
      const updatedArray = prev[field].includes(value)
        ? prev[field].filter((item) => item !== value) // Remove if exists
        : [...prev[field], value]; // Add if not exists

      updateFilters({ [field]: updatedArray.join(",") });
      return { ...prev, [field]: updatedArray };
    });
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => [prev[0], value]);
    updateFilters({ maxPrice: value });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filter.category === category}
              onChange={() => handleCategoryChange(category)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
            />
            <label className="text-gray-700">{category}</label>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filter.gender === gender}
              onChange={() => handleGenderChange(gender)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
            />
            <label className="text-gray-700">{gender}</label>
          </div>
        ))}
      </div>

      {/* Colors Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center">
              <input
                type="checkbox"
                value={color}
                checked={filter.color.includes(color)}
                onChange={() => handleCheckboxChange("color", color)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
              />
              <label className="text-gray-700">{color}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Size Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center">
              <input
                type="checkbox"
                value={size}
                checked={filter.size.includes(size)}
                onChange={() => handleCheckboxChange("size", size)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
              />
              <label className="text-gray-700">{size}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Material Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={material}
              checked={filter.material.includes(material)}
              onChange={() => handleCheckboxChange("material", material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
            />
            <label className="text-gray-700">{material}</label>
          </div>
        ))}
      </div>

      {/* Brand Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={brand}
              checked={filter.brand.includes(brand)}
              onChange={() => handleCheckboxChange("brand", brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
            />
            <label className="text-gray-700">{brand}</label>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-blue-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="text-sm text-gray-700 flex justify-between">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
