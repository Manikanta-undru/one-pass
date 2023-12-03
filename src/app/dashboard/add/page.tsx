import React from "react";

const AddEntryPage: React.FC = () => {
  return (
    <div className=" p-6 ">
      <header className=" flex justify-between items-center">
        <h1 className=" text-xl font-bold uppercase text-gray-400">Add new</h1>
      </header>
      <section className="my-8 flex ">
        <form className=" w-1/2">
          <div className="flex flex-col gap-2">
            <label className="text-primary font-semibold">Website / App</label>
            <input
              className="bg-gray-900  rounded-lg w-full text-gray-400 font-semibold py-3 px-5"
              placeholder="Website"
            />
            <label className="text-primary font-semibold mt-2">
              Email/Username
            </label>
            <input
              className="bg-gray-900 rounded-lg w-full text-gray-400  font-semibold py-3 px-5"
              placeholder="Email/Username"
            />
            <label className="text-primary font-semibold mt-2">Password</label>
            <input
              className="bg-gray-900 rounded-lg w-full text-gray-400  font-semibold py-3 px-5"
              placeholder="Password"
              type="password"
            />
            <label className="text-primary font-semibold mt-2">
              Confirm Password
            </label>
            <input
              className="bg-gray-900 rounded-lg w-full text-gray-400  font-semibold py-3 px-5"
              placeholder="Confirm Password"
            />
            <label className="text-primary font-semibold mt-2">Notes</label>
            <textarea
              className="bg-gray-900 rounded-lg w-full text-gray-400  font-semibold py-3 px-5"
              placeholder="Notes"
            />
            <button className="text-primary border-2 mt-4 flex items-center justify-center border-primary p-2 rounded-2xl uppercase font-semibold  w-40 hover:text-white hover:bg-primary">
              Add
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddEntryPage;
