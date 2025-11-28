import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate= useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email="+email)
    
  };
  return (
    <div className="hero-bg relative">
      <header className="max-w-8xl flex gap-4 md:gap-10 justify-between items-center p-4 px-20 pb-10 ">
        <img
          src="/netflix-logo.png"
          alt="logo"
          className="w-32 md:w-52"
        />
        <Link
          to={"/login"}
          className="bg-red-600 px-4 py-2 text-white font-semibold text-md border-none rounded-md hover:bg-red-800 hover:underline"
        >
          Sign In
        </Link>
      </header>
      {/* hero section */}
      <div className="flex flex-col justify-center items-center text-center text-white  py-40 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows and more...
        </h1>
        <p className="text-xl mb-4 ">Watch anywhere. Cancel anytime .</p>
        <p className="text-lg mb-4 font-semibold">
          Ready to Watch ? Enter your email to create or restart your
          membership.
        </p>
        <form
          className="flex flex-col md:flex-row gap-5 w=4/5"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className=" bg-black/90 border-none border-gray-400 rounded-md px-8 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="text-white font-semibold text-xl lg:text-2xl bg-red-600 border-none rounded-md px-4 py-2 lg:px-8 flex flex-1   justify-center items-center">
            Get Started
            <MoveRight className="size-8 md:size-10 px-1" />
          </button>
        </form>
      </div>
      <div className="bg-gray-600 h-2 w-full " aria-hidden="true" />
      {/* 1st section */}
      <section className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {" "}
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs , Playstation, Xbox, Chormecast, Apple TV ,
              Blu-ray Players and more .
            </p>
          </div>
          <div className="flex-1 relative">
            <img
              src="/tv.png"
              alt="TV image"
              className="mt-4 relative z-20"
            />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <div className="bg-gray-600 h-2 w-full " aria-hidden="true" />{" "}
      {/*separator */}
      {/* 2nd section */}
      <section className="py-10 bg-black text-white">
        <div className="max-w-6xl flex items-center justify-center mx-auto flex-col-reverse md:flex-row px-4 md:px-2">
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="stranger Things"
                className="mt-4 relative"
              />
              <div
                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-16 md:h-24 
                    border-teal-500 rounded-md p-2"
              >
                <img
                  src="/stranger-things-sm.png"
                  alt="str-things-small"
                  className="h-full"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-md lg:text-lg font-bold">
                    Stranger Things
                  </span>
                  <span className="text-sm text-green-700 font-bold">
                    downloading....
                  </span>
                </div>
                <img
                  src="/download-icon.gif"
                  alt="download"
                  className="h-8 md:h-12"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save ypur favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </section>
      <div className="bg-gray-600 h-2 w-full " aria-hidden="true" />{" "}
      {/*separator */}
      {/* 3rd section */}
      <section className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {" "}
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop. and TV .
            </p>
          </div>
          <div className="flex-1 relative">
            <img
              src="/device-pile.png"
              alt="Device image"
              className="mt-4 relative z-20"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 max-w-[63%] z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <div className="bg-gray-600 h-2 w-full " aria-hidden="true" />{" "}
      {/*separator */}
      {/* section 4 */}
      <section className="py-10 bg-black text-white">
        <div className="max-w-6xl flex items-center justify-center mx-auto flex-col-reverse md:flex-row px-4 md:px-2">
          <div className="flex-1 relative">
            <img src="/kids.png" alt="kids Image" className="mt-4 " />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a sapce made just for them-free with your membership
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthScreen;
