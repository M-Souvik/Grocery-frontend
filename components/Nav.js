'use client'

import { useState,useEffect,useContext } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup, 
} from '@headlessui/react'
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { ArrowBigRight, HomeIcon, IndianRupee, Search } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { RiOrderPlayFill } from 'react-icons/ri'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useRouter } from 'next/navigation'
import GlobalApi from '@/utils/GlobalApi'
import { UpdateCartContext } from '@/context/UpdateCartContext'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartCard from './CartCard'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from './ui/use-toast'

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [totalCartItem, setTotalCartItem]=useState(0);
  const [CartItemList, setCartItemList]=useState([]);
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext)
  const [total, setTotal] = useState(0);
  const {toast}=useToast();
  const { setTheme } = useTheme();
  const router=useRouter();

  const user=JSON.parse(sessionStorage.getItem("user"));
  const jwt=sessionStorage.getItem("jwt");
  const isLogin=sessionStorage.getItem("jwt") ? true:false;

  const handleLogOut=()=>{
   sessionStorage.clear();
    router.push('/SignIn');
  }

  const getCartItems=async()=>{
    const cartItemsList_=await GlobalApi.getCartItems(user.id,jwt);
    console.log(cartItemsList_);
    setTotalCartItem(cartItemsList_?.length);
    setCartItemList(cartItemsList_)
  }

  const onDeleteItem=(id)=>{
    GlobalApi.deleteCartItem(id,jwt).then(response=>{
      toast({
        variant:"success",
        title:"Item Removed"
      })
      getCartItems();
    })


  }
useEffect(() => {
getCartItems();
}, [updateCart])

useEffect(() => {
let total=0;
CartItemList.forEach((element)=>{
  total=total+element.amount
});
setTotal(total)
}, [CartItemList])

  return (
    <header className="bg-transparent sticky top-0 z-50 backdrop-blur-md">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 flex justify-center items-center gap-2">
            <span className="sr-only">Your Company</span>
           <Image src="/grocery-icon.jpg" alt="logo" width={50} height={50}/>
           <Link href={"/"} className='text-lg font-bold hidden lg:block'>GrocerBuys</Link>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Services
          </Link>
          <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
            About
          </Link>
          <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Contact Us
          </Link>
          
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
          <div className=" flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <div className="bg-gray-200 p-2 rounded-full flex items-center justify-center">
            <Search className="cursor-pointer hover:scale-110 transition-all duration-300" width={30} color='black'/>
          </div>
          
            {!isLogin ? (
                <Link href="/SignIn">
                <Button className="bg-green-400 text-white ">Sign In <ArrowBigRight size={20} color='white'/></Button>
                </Link>
            ):(
              <div className="bg-green-200 p-2 rounded-full self-center">
              <DropdownMenu>
                          <DropdownMenuTrigger asChild><UserCircleIcon className="cursor-pointer hover:scale-110 transition-all duration-300" width={30} color='black'/></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href="/" className='flex items-center gap-2'>Home <HomeIcon size={20} color='grey'/></Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/my-order" className='flex items-center gap-2'>My Orders <RiOrderPlayFill size={20} color='grey'/></Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-slate-600"  onClick={handleLogOut}>Logout <ArrowBigRight size={20} color='grey'/></DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
            )}
           
          
          <div className="relative bg-pink-200 p-2 rounded-full">
            <span className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-sm px-1">{totalCartItem}</span>
           
            <Sheet>
              <SheetTrigger asChild>
                <ShoppingBagIcon className="cursor-pointer hover:scale-110 transition-all duration-300" width={30} color='black' />
              </SheetTrigger>
              <SheetContent className="custom-scrollbar">
                <SheetHeader>
                  <SheetTitle className="text-xl text-green-600">Add To Cart</SheetTitle>
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[39rem]">
                  
                    {CartItemList?.map((item, index) => {
                      return (
                          <CartCard item={item}  key={index} onDeleteItem={onDeleteItem}/>
                      )
                    })}
                  </div>
                    
                </SheetHeader>
                <SheetClose className='hover:border-none w-full'>
                    <div className="flex justify-between">
                      <h1 className="text-lg text-green-600">Total Amount:</h1>
                      <h1 className="text-lg font-semibold flex justify-center items-center"><IndianRupee size={20}/>{total}</h1>
                    </div>
                    <Button className="w-full active:translate-y-1 bg-green-600 hover:bg-green-500 transition"><span className='flex gap-2' onClick={()=>(jwt ? router.push('/checkout'):router.push('/SignIn'))}><MdOutlineShoppingCartCheckout size={20}/>CheckOut</span></Button>
              </SheetClose>
              </SheetContent>
            </Sheet>

          </div>
          
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link  href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image src="/grocery-icon.jpg" alt="logo" width={50} height={50}/>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
               
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Services
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div>
              <div className="py-6">
                    <div className="flex flex-1 gap-3">
                    <div className="bg-gray-200 p-2 rounded-full flex items-center justify-center">
                        <Search className="cursor-pointer hover:scale-110 transition-all duration-300" width={30} color='black'/>
                    </div>
                    <div className="bg-green-200 p-2 rounded-full">
                        <UserCircleIcon className="cursor-pointer hover:scale-110 transition-all duration-300" width={30} color='black'/>
                       </div>
                    <div className="bg-pink-200 p-2 rounded-full">
                      <div className="relative">
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-1">0</span>
                        <ShoppingBagIcon className="cursor-pointer hover:scale-110 transition-all duration-300" width={30} color='black'/>
                      </div>
                    </div>
                    </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}