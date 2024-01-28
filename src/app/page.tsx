"use client";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/config";
import { useRouter } from "next/navigation";
import { EmployeeForm, EmmployeeTable, Navbar } from "@/components/index";
import { Button } from "@/components/index";
export default function Home() {
  const [id, setId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        router.push("/login");
      }
    });
  }, []);
  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
        console.log("sucessfully logout");
      })
      .catch((error) => {
        console.log("error logging out");
      });
  };
  return (
    <>
      <Navbar />
      <main className=" w-full min-h-screen  text-stone-200 p-5 bg-black">
        <Button className="flex flex-column" onClick={() => logout()}>
          Sign Out
        </Button>
        <div className="flex flex-row sm:flex-col md:flex-row  items-center justify-around">
          <EmployeeForm id={id} />
          <EmmployeeTable setId={setId} />
        </div>
      </main>
    </>
  );
}
