import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, getExistingUserData } from "@/config/firebase";

import { crypto } from "@/config/crypto";
import toast from "react-hot-toast";
import { useAuth } from "@/config/auth";

interface PassPhraseModelProps {
  setShowPassPhraseModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const PassPhraseModel: React.FC<PassPhraseModelProps> = ({
  setShowPassPhraseModel,
}) => {
  const { currentUser } = useAuth();
  const [passphrase, setPassphrase] = useState<string>("");

  const handleSubmit = async () => {
    try {
      if (passphrase.length < 8) {
        alert("Passphrase should be at least 8 characters long");
        return;
      }
      const hashedPassphrase = await crypto.hashPassphrase(passphrase);

      const query = await getExistingUserData(currentUser?.uid);

      if (!query) {
        const setDoc = await addDoc(collection(db, "users"), {
          uid: currentUser?.uid,
          passphrase: hashedPassphrase,
        });

        return;
      } else {
        const data = query.data() || null;
        const isPassphraseCorrect = await crypto.checkPassphrase(
          passphrase,
          data?.passphrase
        );
        const confirm = window.confirm(
          "Passphrase already set! Are you sure you want to update your passphrase?"
        );
        if (!confirm) {
          return;
        }
        await updateDoc(doc(db, "users", query.id), {
          passphrase: hashedPassphrase,
        });

        toast.success("Passphrase updated successfully");
        setPassphrase("");
        setShowPassPhraseModel(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000bf] backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-2 p-8">
          <label className="text-primary font-semibold">Passphrase</label>
          <input
            onChange={(e) => setPassphrase(e.target.value)}
            type="text"
            name="passphrase"
            className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
            placeholder="passphrase"
          />
          <div className=" flex ml-auto gap-4">
            <button
              onClick={handleSubmit}
              type="button"
              className="text-primary  border-2 text-xs mt-4 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold  w-20 hover:text-white hover:bg-primary"
            >
              Add
            </button>
            <button
              onClick={() => setShowPassPhraseModel(false)}
              type="button"
              className="bg-primary  border-2 text-xs mt-4 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold  w-20 hover:text-white hover:bg-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassPhraseModel;
