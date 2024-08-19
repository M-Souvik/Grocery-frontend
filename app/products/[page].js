import React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import ProductCard from '@/components/ProductCard'

const Products = ({getProduct}) => {
  return (
    <>
    
    <div className="container py-2">
    <Carousel>
        <CarouselContent className="p-3">
            {getProduct?.map((product,index)=>{
                return(
                    <>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <ProductCard key={index} product={product}/>
                </CarouselItem>
                </>
                )
            })}
        
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
   
    </div>
    </>
  )
}

export default Products