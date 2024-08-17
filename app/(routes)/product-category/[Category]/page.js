'use client'

import React, { useEffect, useState } from 'react';
import GlobalApi from "@/utils/GlobalApi";
import Products from '@/app/products/page';
import { ShoppingCart } from 'lucide-react';

const CategorizedProduct = ({ params }) => {
    const [getFilteredProducts, setGetFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GlobalApi.getFilteredCategory(params.Category);
                setGetFilteredProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.Category]);

    return (
        <div className='min-h-screen'>
            <h1 className="text-2xl font-semibold text-center uppercase bg-blue-800 text-white rounded-full dark:text-white">{params.Category}</h1>
            {loading ? (
               <div className="min-h-screen flex justify-center items-center">
               <ShoppingCart size={90}  color='green' className='animate-bounce '/>
             </div>
            ) : getFilteredProducts.length > 0 ? (
                <Products getProduct={getFilteredProducts} />
            ) : (
                <div className='min-h-screen flex justify-center items-center'>No Products Found ...</div>
            )}
        </div>
    );
}

export default CategorizedProduct