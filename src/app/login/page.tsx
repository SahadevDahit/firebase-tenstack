"use client";
import React, { useState } from "react";
import SignIn from "@/app/login/signIn";
import SignUp from "@/app/login/signUp";
import { Navbar } from "@/components/index";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const loginToggle = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };

  return (
    <>
      <Navbar />
      <main className="flex w-full min-h-screen items-center justify-center text-stone-200 p-5 bg-black">
        <div className="w-full md:w-2/3 lg:w-1/3 border border-solid border-white px-12 py-5 rounded shadow-md shadow-white">
          {isSignIn ? (
            <SignIn toggleSignIn={loginToggle} />
          ) : (
            <SignUp toggleSignIn={loginToggle} />
          )}
        </div>
      </main>
    </>
  );
}
