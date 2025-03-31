"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      setLoading(false);
      router.push("/profile");
    } catch (error) {
      setLoading(false);
      console.log("Login failed", error);
      toast.error("Login failed");
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='w-11/12 sm:w-96 px-8 py-5 bg-zinc-800 white shadow rounded-md flex flex-col'>
      <h1 className='text-3xl font-bold text-center text-white mb-5'>{loading ? "Processing" : "Login"}</h1>
      <label htmlFor="email">Email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password"/>
      <button onClick={onLogin} className='p-2 bg-blue-500 rounded-lg mb-4 cursor-pointer font-bold'>{buttonDisabled ? "No Login" : "Login"}</button>
      <p>Don&apos;t have an account? <Link href="/signup" className='text-blue-500'>Signup</Link></p>
    </div>
    </div>
  )
}

export default LoginPage