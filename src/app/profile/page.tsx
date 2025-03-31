"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const route = useRouter();
    const [data, setData] = useState("");

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data.user._id);
            setData(res.data.user._id);
            toast.success("User fetched successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            route.push("/login");
            toast.success("Logout successful");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
  return (
    <div className='flex flex-col min-h-screen'>
        <div className='flex items-center justify-between pt-10 px-5 md:px-10'>
        <h1 className='text-3xl font-bold'>Next<span className='text-blue-500'>Auth</span></h1>
        <button className='bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md' onClick={logout}>Logout</button>
        </div>
        <div className='flex flex-col gap-5 items-center justify-center min-h-screen'>
        <h1 className='text-4xl md:text-7xl items-center justify-center'>Welcome to Next<span className='text-blue-500'>Auth</span></h1>
        <div className='flex flex-col gap-2 items-center justify-center'>
        <h2 className='text-2xl bg-zinc-800 p-2 rounded-md'>{data === "" ? "OO" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className='bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md' onClick={getUserDetails}>Get User Details</button>
        </div>
        </div>
    </div>
  )
}

export default ProfilePage