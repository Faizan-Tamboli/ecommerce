import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to handle sorting change
  const handleSortChange = (event) => {
    searchParams.set("sort", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row items-center justify-between px-4">
      <label className="text-gray-700 font-medium mb-2 sm:mb-0">
        Sort by:
      </label>
      <select
        onChange={handleSortChange}
        value={searchParams.get("sort") || ""}
        className="border rounded-md p-2 w-full sm:w-auto"
      >
        <option value="">Select</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A to Z</option>
        <option value="name_desc">Name: Z to A</option>
        <option value="popularity">Most Popular</option>
      </select>
    </div>
  );
};

export default SortOptions;
