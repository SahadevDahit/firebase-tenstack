"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/config";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "@/components/index";

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        router.push("/login");
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow w-full h-screen font-bold space-y-8 bg-black flex justify-center">
        <div className=" px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm  text-white border border-solid border-white px-12 py-5 rounded shadow-md shadow-white">
            <form className="space-y-6" action="#" method="POST">
              <h2 className="text-center">My Profile</h2>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={user?.email}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email Verified
                </label>
                <div className="mt-2">
                  <input
                    id="emailVerified"
                    name="emailVerified"
                    type="text"
                    autoComplete="emailVerified"
                    value={user?.emailVerified ? "true" : "false"}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
