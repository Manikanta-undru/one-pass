"use client";

import Image from "next/image";
import { MdPassword } from "react-icons/md";
import Slides from "./components/slides";
export default function Home() {
  return (
    <main className="flex flex-col   justify-center h-full my-20  px-6 ">
      <div className="">
        <Slides />
      </div>
      <div className=" flex justify-end">
        <button className="text-primary border-2 border-primary p-2 rounded-2xl uppercase font-semibold  w-40 hover:text-white hover:bg-primary">
          Register
        </button>
        <button className="bg-primary text-white border-2 border-primary p-2 rounded-2xl uppercase font-semibold  w-40 ml-10">
          Login
        </button>
      </div>
    </main>
  );
}
