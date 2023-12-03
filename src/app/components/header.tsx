import React, { useEffect } from "react";

import Image from "next/image";
import { MdPassword } from "react-icons/md";
import { logOut } from "../../config/firebase";
import { redirect } from "next/navigation";
import { useAuth } from "@/config/auth";

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const logOutUser = async () => {
    await logOut();
    redirect("/");
  };

  return (
    <header className=" flex justify-between p-4 px-6 fixed left-0 right-0 ">
      <div className=" flex  items-center text-lg gap-1 text-primary font-bold uppercase">
        <MdPassword className="text-3xl" />
        <h1>
          One <span className=" text-white">Pass</span>
        </h1>
      </div>
      <div className="flex  items-center">
        {currentUser && (
          <button
            onClick={logOutUser}
            className="text-primary rounded-2xl uppercase font-bold text-xs  mr-4  "
          >
            Sign Out
          </button>
        )}
        <img
          src={currentUser?.photoURL || "/vercel.svg"}
          className="rounded-full w-8 h-8"
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
