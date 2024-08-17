import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { IndianRupee, Trash2 } from 'lucide-react';
const CartCard = ({key, item, onDeleteItem}) => {
  

  return (
    
        <div className="grid grid-cols-2 items-center bg-green-200 rounded-lg" key={key}>
            <Image src={item.image} alt='' width={1000} height={1000} className='bg-contain w-[70%] h-[70%] bg-green-300 rounded-xl p-4 m-4 hover:scale-105'/>
            <div className="flex flex-col pr-4">
                <h1 className="text-sm text-black flex gap-2 font-semibold">{item.name}</h1>
                <div className="text-xs text-slate-500 justify-end">Qty:{item.quantity}</div>
                <div className="text-xl font-semibold flex items-center">
                <IndianRupee size={20}/>{item.amount}
                </div>
                {/* <div className="text-2xl font-semibold flex items-center"> <IndianRupee size={20}/>30</div> */}
                <Button className="bg-red-600 flex gap-1 border-none  hover:bg-red-500" onClick={()=>onDeleteItem(item?.id)}>Remove Item<Trash2 size={20}/></Button>
            </div>
         </div>
  )
}

export default CartCard