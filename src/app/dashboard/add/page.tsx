"use client";

import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import AddModel from "@/app/components/addModel";
import { crypto } from "@/config/crypto";
import { db } from "@/config/firebase";
import { set } from "firebase/database";
import toast from "react-hot-toast";
import { useAuth } from "@/config/auth";

const AddEntryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    email: "",
    password: "",
    confirmPassword: "",
    notes: "",
  });
  const [passphrase, setPassphrase] = useState<string>("");
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const temp = {
        name: formData.name,
        uid: currentUser?.uid,
        website: formData.website,
        email: formData.email,
        password: formData.password,
        notes: formData.notes,
        timestamp: serverTimestamp(),
      };

      setData(temp);

      setShowAddModel(true);
      setFormData({
        name: "",
        website: "",
        email: "",
        password: "",
        confirmPassword: "",
        notes: "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error storing data: ", error);
    }
  };

  return (
    <div className="p-6">
      {showAddModel && (
        <AddModel setShowAddModel={setShowAddModel} formData={data} />
      )}
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase text-gray-400">Add new</h1>
      </header>
      <section className="my-8 flex">
        <form className="w-1/2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-primary font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Title"
            />
            <label className="text-primary font-semibold">Website / App</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Website"
            />
            <label className="text-primary font-semibold mt-2">
              Email/Username
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Email/Username"
            />
            <label className="text-primary font-semibold mt-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Password"
            />
            <label className="text-primary font-semibold mt-2">
              Confirm Password
            </label>
            <input
              type="text"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Confirm Password"
            />
            <label className="text-primary font-semibold mt-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Notes"
            />
            <div className="mt-4 flex items-center ">
              <button
                disabled={loading}
                type="submit"
                className="text-primary mr-4 border-2 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold w-40 hover:text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed "
              >
                Add
              </button>
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddEntryPage;
