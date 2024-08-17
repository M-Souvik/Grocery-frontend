

import CarouselSlider from "@/components/Carousel";
import Image from "next/image";
import { Container } from 'lucide-react';
import { ListRestart } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { Headset } from 'lucide-react';
import Products from "./products/page";
import Categories from "@/app/categories/page";
import Offer from "./Offer/page";
import Testimonials from "@/components/Testimonials";
import GlobalApi from "@/utils/GlobalApi";


export default async function Home() {
  const getProduct = await GlobalApi.getProduct();

  return (
    <>
    <div className="flex justify-center items-center px-4 ">
    <CarouselSlider/>
    </div>
     
    <div className="flex min-h-screen flex-col gap-6 px-10 sm:px-28 py-10">
     <div className="grid grid-cols-1 md:grid-cols-4 gap-5 dark:text-black">

     <div className="rounded-md p-5 flex justify-center items-center gap-3 bg-green-200 ">
     <Container className='w-10 h-10' color="green"/>
     <div className="flex flex-col gap-1">
     <h1 className="text-xl font-bold">Free Shipping</h1>
     <p className="text-sm font-light">Free Shipping on all orders over $100</p>
     </div>
     </div>

     <div className="rounded-md p-5 flex justify-center items-center gap-3 bg-green-200">
     <ListRestart className='w-10 h-10' color="green"/>
     <div className="flex flex-col gap-1">
     <h1 className="text-xl font-bold">Easy Return</h1>
     <p className="text-sm font-light">20 Days assured returns</p>
     </div>
     </div>

     <div className="rounded-md p-5 flex justify-center items-center gap-3 bg-green-200">
     <Handshake className='w-10 h-10' color="green"/>
     <div className="flex flex-col gap-1">
     <h1 className="text-xl font-bold">Secure Payment</h1>
     <p className="text-sm font-light">Use safe payment methods</p>
     </div>
     </div>

     <div className="rounded-md p-5 flex justify-center items-center gap-3 bg-green-200">
     <Headset className='w-10 h-10' color="green"/>
     <div className="flex flex-col gap-1">
     <h1 className="text-xl font-bold">Assistance Support</h1>
     <p className="text-sm font-light">Can contact us if ther is any problem</p>
     </div>
     </div>
     </div>
    
     <div >
      <h1 className="text-2xl text-left font-bold">Deal of the Day</h1>
      <div className="">
      <Products getProduct={getProduct}/>
      </div>
      
     </div>
     <div>
      <h1 className="text-2xl text-left font-bold">Shop By Categories</h1>
      <Categories/>
     </div> 
    </div> 
     <div className="w-full mt-12 bg-slate-200 p-10">
      <Testimonials/>
     </div> 
     </>
  );
}
