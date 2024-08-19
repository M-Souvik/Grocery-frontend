'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import GlobalApi from '@/utils/GlobalApi';
import Link from 'next/link';



const Categories = () => {
  const [categories,setCategories]=useState({});

  useEffect(() => {
   getCategoryList();

  }, [])
  const  getCategoryList=async()=>{
    try{
    const response=await GlobalApi.getCategory();
    console.log("Getting response as "+response);
    setCategories(response.data);
    }catch(err){
      console.log(err);
    }
    
    }
  return (
    <div className='sm:px-5 py-2'>
  
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-7">
          {categories?.data?.length>0 ? (
            categories.data.map((category, index)=>(
              <Link  key={index} href={`/product-category/${category?.attributes?.title}`}  className="p-2 dark:bg-slate-950 border border-black dark:border-white bg-slate-100 w-full rounded-md cursor-default shadow-xl hover:bg-slate-200 transition-all duration-300">
             
              <Image src={category?.attributes?.img?.data?.attributes?.url} alt={category?.attributes?.title} width={1000} height={1000} className='w-full h-full object-contain  hover:scale-110 transition-all duration-300'/>
              
              </Link>
              
            ))
          ):(
              <div className="">
                No Categories ....
              </div>
          )}
          
        </div>
    </div>
  )
}

export default Categories