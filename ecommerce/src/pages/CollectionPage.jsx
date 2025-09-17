import React, { useEffect, useState, useRef } from 'react';
import {FaFilter} from 'react-icons/fa';
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const toggleSidebar = ()=>{
        setIsSideBarOpen(!isSideBarOpen);
    }

    const handleClickOutside = (e)=>{
        //close side bar if click outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsSideBarOpen(false);
            }
            
    }   
    
    useEffect(()=>{
        //add event listner for clicks
        document.addEventListener('mousedown', handleClickOutside )
        //clean event listner when component unmounts
        document.removeEventListener('mousedown', handleClickOutside)

    })

    useEffect(() => {
        setTimeout(() => {
            const fetchProducts = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=3" }]
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 120,
                    images: [{ url: "https://picsum.photos/500/500?random=4" }]
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 90,
                    images: [{ url: "https://picsum.photos/500/500?random=5" }]
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 150,
                    images: [{ url: "https://picsum.photos/500/500?random=6" }]
                },
                {
                    _id: 5,
                    name: "Product 5",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=7" }]
                },
                {
                    _id: 6,
                    name: "Product 6",
                    price: 120,
                    images: [{ url: "https://picsum.photos/500/500?random=8" }]
                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 90,
                    images: [{ url: "https://picsum.photos/500/500?random=9" }]
                },
                {
                    _id: 8,
                    name: "Product 8",
                    price: 150,
                    images: [{ url: "https://picsum.photos/500/500?random=10" }]
                }
            ];

            setProducts(fetchProducts);
        }, 1000);
    }, []); // Added dependency array

    return (
        <div className='flex flex-col lg:flex-row'>
            <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2'/>Filters
            </button>

            {/* filter side bar  */}
            <div ref={sidebarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white
            overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0
            ` }>
                <FilterSideBar/>
            </div>
            <div className="flex-grow p-4 ">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                {/* sort option  */}
                <SortOptions/>

                {/* product grid  */}
                <ProductGrid products={products} />
            </div>
        </div>
    );
};

export default CollectionPage;
