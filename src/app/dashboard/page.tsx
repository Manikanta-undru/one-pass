"use client";

import {
  MdAdd,
  MdCopyAll,
  MdDelete,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import React, { useEffect, useRef } from "react";

import ConfirmModel from "../components/confirmModel";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import PrivateRoute from "../components/privateRoute";
import { crypto } from "@/config/crypto";
import { getAllEntries } from "@/config/firebase";
import { useAuth } from "@/config/auth";

const Dashboard: React.FC = () => {
  const iRef = useRef<number | null>(null);
  const entryRef = useRef<DocumentData | null>(null);
  const { currentUser } = useAuth();
  const [showConfirmModel, setShowConfirmModel] =
    React.useState<boolean>(false);
  const [entries, setEntries] = React.useState<DocumentData[]>([]);
  const [checkedPassphrase, setCheckedPassphrase] = React.useState<string>("");
  const [decodedData, setDecodedData] = React.useState<any>({
    id: 0,
    email: "",
    password: "",
  });

  useEffect(() => {
    const getAll = async () => {
      const res = await getAllEntries(currentUser?.uid);
      setEntries(res);
    };
    getAll();
  }, []);

  useEffect(() => {
    const decodeEntryData = async () => {
      try {
        if (
          checkedPassphrase !== "" &&
          iRef.current !== null &&
          entryRef.current !== null
        ) {
          const decodedEmail = await crypto.decrypt(
            checkedPassphrase,
            entryRef.current?.data().email
          );
          const decodedPassword = await crypto.decrypt(
            checkedPassphrase,
            entryRef.current?.data().password
          );

          setDecodedData({
            id: iRef.current,
            email: decodedEmail,
            password: decodedPassword,
          });
          setShowConfirmModel(false);
          setCheckedPassphrase("");
        }
      } catch (error) {
        setCheckedPassphrase("");
        console.log(error);
      }
    };
    decodeEntryData();
  }, [checkedPassphrase]);

  const handleEyeClick = (i: number, entry: DocumentData) => {
    iRef.current = i;
    entryRef.current = entry;
    setShowConfirmModel(true);
  };

  return (
    <PrivateRoute>
      <div className=" p-6 ">
        {showConfirmModel && (
          <ConfirmModel
            setCheckedPassphrase={setCheckedPassphrase}
            setShowConfirmModel={setShowConfirmModel}
          />
        )}
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
            <h2 className="font-bold text-5xl text-primary">
              {entries?.length}
            </h2>
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
          <div className="flex gap-6 flex-wrap ">
            {!entries.length ? (
              <div>
                <p className="text-gray-400 py-4 font-semibold text-xl">
                  No entries found
                </p>
              </div>
            ) : (
              entries.map((entry, i) => (
                <div className=" bg-gray-900 rounded-md w-[30%] text-gray-400 p-5 my-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl">
                      {entry?.data().name}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleEyeClick(i, entry)}
                        className="text-primary bg-gray-800 w-8 h-8 flex justify-center items-center px-2 py-1 rounded-md"
                      >
                        <MdRemoveRedEye />
                      </button>

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
                      <p className=" text-primary">Email / Username</p>
                      <div className="flex items-center bg-gray-800 rounded-md w-fit mt-2 ">
                        <input
                          type={
                            decodedData.email && decodedData.id === i
                              ? "text"
                              : "password"
                          }
                          className="text-gray-400  flex items-center gap-2 bg-transparent  px-2 py-2 border-0 focus-within:border-0 focus-within:outline-none "
                          value={
                            decodedData.email && decodedData.id === i
                              ? decodedData.email
                              : entry?.data().email
                          }
                        />
                        <div className=" bg-gray-800 flex  h-full rounded-e-md ">
                          <button className="text-primary h-10 w-10 flex justify-center items-center px-2 py-1 hover:bg-gray-900 ">
                            <MdCopyAll className="h-full" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className=" text-primary">Password</p>
                      <div className="flex items-center bg-gray-800 rounded-md w-fit mt-2 ">
                        <input
                          className="text-gray-400  flex items-center gap-2 bg-transparent  px-2 py-2 border-0 focus-within:border-0 focus-within:outline-none "
                          value={
                            decodedData.password && decodedData.id === i
                              ? decodedData.password
                              : entry?.data().password
                          }
                          type={
                            decodedData.password && decodedData.id === i
                              ? "text"
                              : "password"
                          }
                        />
                        <div className=" bg-gray-800 flex   h-full rounded-e-md ">
                          <button className="text-primary h-10 w-10 flex justify-center items-center px-2 py-1 hover:bg-gray-900 ">
                            <MdCopyAll />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className=" text-primary">Website</p>
                      <p className="text-gray-400  mt-1 flex items-center gap-2">
                        {entry?.data().website || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className=" text-primary">Notes</p>
                      <p className="text-gray-400  mt-1 flex items-center gap-2">
                        {entry?.data().notes}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
