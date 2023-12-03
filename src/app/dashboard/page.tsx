import { MdAdd, MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";

import Link from "next/link";
import PrivateRoute from "../components/privateRoute";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <PrivateRoute>
      <div className=" p-6 ">
        <header className=" flex justify-between items-center">
          <h1 className=" text-xl font-bold uppercase text-gray-400">
            Dashboard
          </h1>
          <Link
            href={"/dashboard/add"}
            className="text-primary border-2 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold  w-40 hover:text-white hover:bg-primary"
          >
            <MdAdd />
            Add New
          </Link>
        </header>
        <section className="my-8 flex gap-6">
          <div className=" bg-gray-900 rounded-md w-1/3 text-gray-400 p-5">
            <h2 className="font-bold text-5xl text-primary">5</h2>
            <p className="font-semibold text-xl mt-2">Passwords Stored</p>
          </div>
          <div className=" bg-gray-900 rounded-md w-1/3 text-gray-400 p-5">
            <h2 className="font-bold text-5xl text-primary">0</h2>
            <p className="font-semibold text-xl mt-2">Passwords Compromised </p>
          </div>
        </section>
        <section>
          <h3 className=" text-lg font-semibold uppercase text-primary">
            Entries
          </h3>
          <div className="flex gap-6 ">
            <div className=" bg-gray-900 rounded-md w-1/3 text-gray-400 p-5 my-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-xl">Facebook</p>
                <div className="flex gap-2">
                  <button className="text-primary bg-gray-800 w-8 h-8 flex justify-center items-center px-2 py-1 rounded-md">
                    <MdEdit />
                  </button>
                  <button className=" text-primary bg-gray-800 px-2 py-1 rounded-md">
                    <MdDelete />
                  </button>
                </div>
              </div>
              <div className="font-semibold text-sm flex flex-col my-4 gap-2">
                <div>
                  <p className=" text-primary">Email/Username</p>
                  <p className="text-gray-400  mt-1 flex items-center gap-2">
                    Manikantaksi <MdRemoveRedEye />
                  </p>
                </div>
                <div>
                  <p className=" text-primary">Password</p>
                  <p className="text-gray-400  mt-1 flex items-center gap-2">
                    *********** <MdRemoveRedEye />
                  </p>
                </div>

                <div>
                  <p className=" text-primary">Website</p>
                  <p className="text-gray-400  mt-1 flex items-center gap-2">
                    www.facebook.com
                  </p>
                </div>
                <div>
                  <p className=" text-primary">Notes</p>
                  <p className="text-gray-400  mt-1 flex items-center gap-2">
                    This is my facebook account,This is my facebook account,This
                    is my facebook account,This is my facebook account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
