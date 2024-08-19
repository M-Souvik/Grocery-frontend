'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import GlobalApi from '@/utils/GlobalApi'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { IndianRupee, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CheckOut = () => {
  const [user, setUser]=useState(null);
  const [jwt, setJwt]=useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [CartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading,setLoading]=useState(true);
  
  const router = useRouter();
  const {toast}=useToast();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const getCartItems = async () => {
    try {
      const cartItemsList_ = await GlobalApi.getCartItems(user.id, jwt);
      console.log(cartItemsList_);
      setTotalCartItem(cartItemsList_?.length);
      setCartItemList(cartItemsList_);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  const onApprove = async (data) => {
    try {
      console.log(data);
  
      if (!data.paymentID) {
        throw new Error("Payment ID is missing");
      }
  
      const payload = {
        data: {
          paymentId: (data.paymentID).toString(),
          totalOrderAmount: totalAmount, // Convert to float if necessary
          OrderedItemList: CartItemList,
          userId: user?.id ? parseInt(user.id) : null, // Ensure this is an integer or handle null case
        },
      };
      console.log(payload);
      const response = await GlobalApi.createOrder(payload, jwt);
  
      console.log(response);
      toast({
        variant: "success",
        title: "Order Placed Successfully",
      });
  
      // Clear cart items after order is placed
      for (const item of CartItemList) {
        await GlobalApi.deleteCartItem(item.id,jwt);
      }
  
      router.replace('/order-confirmation');
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: err.message || "Something went wrong!!!",
      });
    }
  };

  useEffect(() => {
    if(typeof window !== 'undefined'){
      const StoredUser = JSON.parse(sessionStorage.getItem("user"));
      const StoredJwt = sessionStorage.getItem("jwt");
      if (!StoredJwt) {
        router.push('/SignIn');
      } else {
        setUser(StoredUser)
        setJwt(StoredJwt)
        getCartItems();
      }
    }
    
  }, [jwt, router]);

  useEffect(() => {
    if(CartItemList.length>0){
      let total = 0;
      CartItemList.forEach((element) => {
        total = total + element.amount;
      });
      const subtotal = total.toFixed(2);
      setSubTotal(subtotal);
      const FinalTotalAmt = (total + total * 0.09 + 15).toFixed(2)
      setTotalAmount(FinalTotalAmt);
      setLoading(false);
    }
  }, [CartItemList]);

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
    <div className="min-h-screen px-2 sm:px-5 flex flex-col">
      <h1 className="text-3xl font-bold text-green-500 text-center bg-gray-200 dark:bg-green-500 dark:text-black rounded-full">Check Out</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-10 py-18 w-full">
        <div className="cols-span-2 sm:mx-20 my-5">
          <h2 className="font-bold text-xl text-center text-white rounded-xl bg-green-700 dark:text-black">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <div>
              <Input 
                data-name="name"
                placeholder="Name" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <Input 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <div>
              <Input 
                name="phone" 
                placeholder="Phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div>
              <Input 
                name="postalZip" 
                placeholder="Postal Zip" 
                value={zip} 
                onChange={(e) => setZip(e.target.value)} 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 mt-3">
            <Textarea 
              name="billingAddress" 
              placeholder="Billing Address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:mx-10 my-5 border rounded-lg px-7 py-3">
          <h1 className="text-xl font-bold text-white text-center bg-green-700 rounded-xl dark:text-black">Billing</h1>
          <Separator />
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold ">Shipping Charges:</h2>
            <h2 className="text-lg font-semibold flex justify-center items-center"><IndianRupee size={20} />15</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold ">Taxes(9%):</h2>
            <h2 className="text-lg font-semibold flex justify-center items-center"><IndianRupee size={20}/>{(subtotal * 0.09).toFixed(2)}</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Product Amount:</h2>
            <h2 className="text-lg font-semibold flex justify-center items-center"><IndianRupee size={20} />{subtotal}</h2>
          </div>
          <Separator />
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-green-600">Total:</h2>
            <h2 className="text-lg font-extrabold flex justify-center items-center"><IndianRupee size={20} />{totalAmount}</h2>
          </div>
          <PayPalButtons 
            disabled={!(username && email && phone && address && zip)}
            createOrder={(data, actions) => {
              console.log(totalAmount);
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [{
                  amount: {
                    value: totalAmount.toString(),
                    currency: 'USD'
                  }
                }],
                application_context:{
                  return_url: "http://localhost:3001",
                  cancel_url: "http://localhost:3001/checkout"
                }
              });
            }}
            onApprove={onApprove}
          />
        </div>
      </div>
    </div>
  )
}

export default CheckOut;
