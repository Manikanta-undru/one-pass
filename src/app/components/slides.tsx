import React, { useState } from "react";

interface Slide {
  id: number;
  content: JSX.Element;
}

const Slides: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      id: 0,
      content: (
        <>
          <h1 className=" text-7xl font-bold uppercase text-white flex flex-col  gap-2 mb-4">
            <span>Generate</span> <span className="text-primary">Secure</span>{" "}
            <span>Passwords.</span>
          </h1>

          <p className="text-gray-400 font-semibold text-2xl leading-10">
            Stop using unsecure passwords for your online accounts, level up
            with OnePass.
          </p>

          <p className="text-gray-400 font-semibold text-2xl leading-10">
            Get the most secure and difficult-to-crack passwords.
          </p>
        </>
      ),
    },

    {
      id: 1,
      content: (
        <>
          <h1 className=" text-7xl font-bold uppercase text-white flex flex-col  gap-2 mb-4">
            <span>All your</span>{" "}
            <span>
              <span className="text-primary">Password</span> are
            </span>{" "}
            <span>here.</span>
          </h1>

          <p className="text-gray-400 font-semibold text-2xl leading-10">
            {`Store and manage all of your passwords from one place. `}
          </p>

          <p className="text-gray-400 font-semibold text-2xl leading-10">
            {`Don’t remember hundreds of passwords, just remember one.`}
          </p>
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <h1 className=" text-7xl font-bold uppercase text-white flex flex-col  gap-2 mb-4">
            <span>{`Don't Type,`}</span>{" "}
            <span>
              <span className="text-primary">Autofill</span> Your
            </span>{" "}
            <span>Credentials.</span>
          </h1>

          <p className="text-gray-400 font-semibold text-2xl leading-10">
            {`Don’t compromise your passwords by typing them in public. `}
          </p>

          <p className="text-gray-400 font-semibold text-2xl leading-10">
            {`let OnePass autofill those and keep your credentials secure. `}
          </p>
        </>
      ),
    },
  ];

  const handleSlideChange = (slideId: number) => {
    setActiveSlide(slideId);
  };

  return (
    <>
      <div className="flex flex-col gap-2 ">{slides[activeSlide].content}</div>

      <div className="flex gap-4 font-bold text-gray-400 text-sm   items-center px-2 my-10">
        {slides.map((slide) => (
          <a
            key={slide.id}
            className={` ${
              slide.id === activeSlide ? "text-primary text-xl" : ""
            }`}
            onClick={() => handleSlideChange(slide.id)}
          >
            {slide.id + 1}
          </a>
        ))}
      </div>
    </>
  );
};

export default Slides;
