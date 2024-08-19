"use client"

import GlobalApi from '@/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment/moment';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { IndianRupee, ShoppingCart } from 'lucide-react';

const MyOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading]=useState(true)
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    console.log(orderList_);
    setOrderList(orderList_);
    setLoading(false)
  }

  useEffect(() => {
    if (!jwt) {
      router.push("/")
    } else {
      getMyOrder();
    }
  }, [jwt, router]) // Added jwt and router as dependencies

 if(loading){
  return(
    <>
    <div className="min-h-screen flex justify-center items-center">
      <ShoppingCart size={90}  color='green' className='animate-bounce '/>
    </div>
    </>
  )
 }

  return (
    <div className='flex flex-col gap-10 min-h-screen px-10'>
      <h1 className="text-3xl text-center bg-green-600 text-white font-semibold dark:text-black">My Orders</h1>
      <div>
        <h2 className="text-left text-green-600 font-semibold text-2xl">Order History</h2>
        <div className='bg-gray-200 flex flex-col gap-6 rounded-md dark:bg-gray-950 border border-black dark:border-white dark:text-white'>
          {orderList.map((item, index) => (
            <Collapsible key={index}> {/* Added key prop here */}
              <CollapsibleTrigger className='w-full'>
              <div className="flex gap-16 p-5 ">
                <div className="text-lg text-black dark:text-white"><span className=" font-semibold"> Ordered On: </span>{moment(item?.orderDate).format('DD/MM/YYYY')}</div> {/* Displaying order date */}
                <div className="text-lg text-black flex justify-center items-center dark:text-white"><span className=" font-semibold"> Amount: </span><IndianRupee size={20}/>{item?.orderAmt}</div>
                <div className="text-lg text-black dark:text-white"><span className=" font-semibold dark:text-white"> Status: </span>Pending</div> {/* Displaying order date */}
                
              </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
           
                <div className='px-10 pb-5'>
                  {/* Displaying order details */}
                  <div className="flex gap-3">
                  <p><span className=" font-semibold dark:text-white"> Order Id: </span> {item.orderId}</p>
                  {/* <p><span className=" font-semibold"> Amount: </span> {item.orderAmt}</p> */}
                  <p><span className=" font-semibold dark:text-white"> Payment Id: </span> {item.paymentId}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 dark:text-white">
                    {item.orderItemList.map((orderItem, idx) => (
                    <div className="flex sm:gap-3 items-center bg-gray-300 dark:bg-slate-950 border border-black dark:border-white rounded-lg p-4" key={idx}>
                    <div className="flex sm:gap-5 justify-center items-center p-2">
                    <Image src={orderItem?.product?.data?.attributes?.Image?.data?.attributes?.url} alt='' width={80} height={80} className='bg-contain rounded-xl'/>
                          <div className="flex flex-col sm:flex-row gap-2">
                              <h1 className="text-sm text-black dark:text-white font-semibold">{orderItem?.product?.data?.attributes?.title}</h1>
                              <div className="text-sm text-black dark:text-white justify-end">({orderItem?.quantity})</div>
                              <div className="text-sm font-semibold flex items-center">           
                              {orderItem?.product?.data?.attributes?.discount ? (<span className='flex justify-center'><span className="text-black dark:text-white font-semibold">Price:</span><IndianRupee size={20}/>{orderItem?.product?.data?.attributes?.discount}</span>):(<span className='flex justify-center items-center'><span className="text-black font-semibold">Price:</span><IndianRupee size={20}/>{orderItem?.product?.data?.attributes?.Price}</span>) }
                              </div>
                        </div>
                    </div>
                 </div>
                  ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrders