"use client"
import GlobalApi from '@/utils/GlobalApi';
import React, { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { LoaderCircle } from 'lucide-react';
const SignIn = () => {
    const router=useRouter();
    const { toast } = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState();
    const onSignIn=()=>{
        setLoader(true);
        GlobalApi.signIn(username, password).then((response) => {
            console.log("response", response.data.user);
            console.log("response", response.data.jwt);
            sessionStorage.setItem("user",JSON.stringify(response.data.user));
            sessionStorage.setItem("jwt",response.data.jwt);
             router.push('/')
             toast({
                variant: "success",
                 title: "Login Successfully",
               })
               setLoader(false);
         }).catch((err)=>{
             console.log(err);
             toast({
                 variant: "destructive",
                 title: err?.response?.data?.error?.message
               })
            setLoader(false)
         })
    }
    useEffect(() => {
            const jwt=sessionStorage.getItem("jwt")
            if (jwt) {
               router.push('/');
            }
           })
    
    return (
        <>
       <div className="flex w-full max-w-sm sm:mx-auto overflow-hidden border-2 bg-white rounded-lg shadow-xl dark:bg-gray-800 lg:max-w-4xl sm:m-16">
    <div className="hidden bg-cover bg-center lg:block lg:w-1/2" style={{backgroundImage: `url(/assets/SignIn.jpeg)`}}></div>

    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
            <img className="w-auto h-40 sm:h-24" src="/grocery-icon.jpg" alt=""/>
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
         Sign In to get full access
        </p>
        <div>
        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingUsername">Username</label>
            <Input id="LoggingUsername" name="username" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="mt-4">
            <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                <Link href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</Link>
            </div>

            <input id="loggingPassword" name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="mt-6">
          
            <Button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" onClick={onSignIn}>
                {loader ? <LoaderCircle className='animate-spin'/>:'Sign In'}
            </Button>
        </div>
        </div>
        <p className="mt-6 text-sm text-center text-gray-400">No account yet? <Link href="/create-account" className="text-blue-500 focus:outline-none focus:underline hover:underline">Create one!</Link>.</p>
    </div>
</div>
</>
    )
}

export default SignIn;