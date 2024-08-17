import { ArrowBigRight, ArrowBigRightDashIcon } from 'lucide-react';
import { IoArrowBack } from "react-icons/io5";
import Link from 'next/link';
import React from 'react'
import { HiCheckBadge } from "react-icons/hi2";
const OrderConfirmation = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-green-300'>
        <div className="rounded-full bg-green-400 ring ring-green-400 p-5">
        <HiCheckBadge size={90} color='green' className='m-5 animate-[ping_2s_ease-in-out_infinite]'/>
        </div>
        
        <h1 className="text-xl sm:text-3xl text-white text-center font-semibold">Order Confirmed!!!!</h1>
        <Link href='/' className='flex gap-2 justify-center items-center underline'><IoArrowBack size={20} />Back to Shopping</Link>

    </div>
  )
}

export default OrderConfirmation