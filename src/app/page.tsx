"use client";

import { auth, signInWithGoogle } from "@/config/firebase";

import Image from "next/image";
import { MdPassword } from "react-icons/md";
import Slides from "./components/slides";
import { redirect } from "next/navigation";
import { useAuth } from "@/config/auth";
import { useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      redirect("/dashboard");
    }
  }, [currentUser]);
  const loginWithGoogle = async () => {
    const res = await signInWithGoogle();
    console.log(res);
  };

  return (
    <main className="flex flex-col   justify-center h-full my-20  px-6 ">
      <div className="">
        <Slides />
      </div>
      <div className=" flex justify-end">
        <button className="text-primary border-2 border-primary p-2 rounded-2xl uppercase font-semibold  w-40 hover:text-white hover:bg-primary">
          Register
        </button>
        <button
          onClick={loginWithGoogle}
          className="bg-primary text-white border-2 border-primary p-2 rounded-2xl uppercase font-semibold  w-40 ml-10"
        >
          Login
        </button>
      </div>
    </main>
  );
}
