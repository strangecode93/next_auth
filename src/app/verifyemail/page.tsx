/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
    // const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
            console.log(response.data);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    }
    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        verifyUserEmail();

        // const {query} = router;
        // const urlTokenTwo = query.token;
    },[]);

    useEffect(() => {
        setError(false);
        if(token.length > 0) {
            verifyUserEmail();
        }
    },[token])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 rounded-sm font-semibold m-2 text-white">
            {token ? `${token}` : "No token"}
        </h2>
        {
            verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <p>Now you can login to your account</p>
                    <Link href={"/login"}>Login</Link>
                </div>
            )
        }
        {
            error && (
                <div>
                    <h2 className="text-2xl text-red-500">Error</h2>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmailPage;