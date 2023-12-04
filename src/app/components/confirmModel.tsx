import { useAuth } from "@/config/auth";
import { db, getExistingUserData } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { crypto } from "@/config/crypto";

interface PassPhraseModelProps {
  setShowConfirmModel: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedPassphrase: React.Dispatch<React.SetStateAction<string>>;
}

const ConfirmModel: React.FC<PassPhraseModelProps> = ({
  setShowConfirmModel,
  setCheckedPassphrase,
}) => {
  const { currentUser } = useAuth();
  const [passphrase, setPassphrase] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (passphrase.length < 8) {
        alert("Passphrase should be at least 8 characters long");
        setLoading(false);
        return;
      }
      const query = await getExistingUserData(currentUser?.uid);

      if (!query) {
        toast.error("Please set your passphrase first");
        setLoading(false);
        return;
      }
      const data = query.data() || null;

      const isPassphraseCorrect = await crypto.checkPassphrase(
        passphrase,
        data?.passphrase
      );

      if (!isPassphraseCorrect) {
        toast.error("Incorrect passphrase");
        setLoading(false);
        return;
      }
      setCheckedPassphrase(passphrase)
      setLoading(false)
      setShowConfirmModel(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000bf] backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-2 p-8">
          <label className="text-primary font-semibold">
            Confirm your passphrase
          </label>
          <input
            onChange={(e) => setPassphrase(e.target.value)}
            type="text"
            name="passphrase"
            className="bg-gray-900 rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
            placeholder="passphrase"
          />
          <div className=" flex ml-auto gap-4 items-center">
            {loading && (
              <div className="flex items-center justify-center mt-4">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary"></div>
              </div>
            )}
            <button
              disabled={loading}
              onClick={handleSubmit}
              type="button"
              className="text-primary  border-2 text-xs mt-4 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold  w-20 hover:text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Confirm
            </button>
            <button
              disabled={loading}
              onClick={() => setShowConfirmModel(false)}
              type="button"
              className="bg-primary  border-2 text-xs mt-4 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold  w-20 hover:text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModel;
