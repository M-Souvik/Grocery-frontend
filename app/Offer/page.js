import React from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { LucideShoppingBasket } from 'lucide-react'
import { RiDiscountPercentFill } from "react-icons/ri"
const Offer = () => {
  return (
    
    <div className="bg-blue-100 p-4 w-full h-fit">
      <div className="grid grid-cols-1 rounded-md  p-4">
        <h1 className="text-2xl font-bold flex justify-center">Limited Period Offers<RiDiscountPercentFill size={30} color='green'/></h1>
        <Separator className="my-4 bg-black"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="grid grid-cols-2 shadow-xl p-2 rounded-xl justify-center bg-slate-100 hover:scale-110 transition-all duration-300 hover:border-2 hover:border-blue-500 border border-slate-600 h-fit w-fit"> 
                <div className="w-full md:w-5/6">
                    <Image src="/assets/milk.png" alt="milk" width={1000} height={1000} className='w-full h-full object-cover'/>
                </div>
                <div className="mt-4 md:mt-0">
                    <p>Amul Milk</p>
                    <p>500ml</p>
                    <p>Valid till 5th August</p>
                    <p className='font-bold text-xl'>$1</p>
                    <Button className='bg-blue-500 text-white flex gap-2'>Add to cart <LucideShoppingBasket size={20}/></Button>
                </div>
        </div>
        <div className="grid grid-cols-2 shadow-xl p-2 rounded-xl justify-center bg-slate-100 hover:scale-110 transition-all duration-300 hover:border-2 hover:border-blue-500 border border-slate-600"> 
                <div className="w-5/6">
                    <Image src="/assets/milk.png" alt="milk" width={1000} height={1000} className='w-full h-full object-cover'/>
                </div>
                <div>
                    <p>Amul Milk</p>
                    <p>500ml</p>
                    <p>Valid till 5th August</p>
                    <p className='font-bold text-xl'>$1</p>
                    <Button className='bg-blue-500 text-white flex gap-2'>Add to cart <LucideShoppingBasket size={20}/></Button>
                </div>
        </div>
        <div className="grid grid-cols-2 shadow-xl p-2 rounded-xl justify-center bg-slate-100 hover:scale-110 transition-all duration-300 hover:border-2 hover:border-blue-500 border border-slate-600"> 
                <div className="w-5/6">
                    <Image src="/assets/milk.png" alt="milk" width={1000} height={1000} className='w-full h-full object-cover'/>
                </div>
                <div>
                    <p>Amul Milk</p>
                    <p>500ml</p>
                    <p>Valid till 5th August</p>
                    <p className='font-bold text-xl'>$1</p>
                    <Button className='bg-blue-500 text-white flex gap-2'>Add to cart <LucideShoppingBasket size={20}/></Button>
                </div>
        </div>
        </div>
      </div>
     
    
    </div>
    
    
  )
}

export default Offer