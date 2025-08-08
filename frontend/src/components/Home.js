
import React from "react";
import { Link } from "react-router-dom";
import airlineBg from "../images/airline-bg.jpg";
import airlineLogo from "../images/airlineLogo.jpg";
import airlineL from "../images/airline2.png";

const Home = () => {
  return (

    <div
      className="relative h-[calc(100vh-120px)] min-h-[500px] w-full bg-cover bg-center text-white"

      // style={{ backgroundImage: `url(&{airlineBg})`, backgroundColor: "#4a4a6a" }}
      style={{ backgroundImage: `url(${airlineBg})` }}
    >

      <div className="absolute inset-0 bg-black/40"></div>


      <div className="relative z-10 flex h-full w-full items-center">
        <div className="container mx-auto flex items-center">

          <div className="w-1/2 bg-white p-12 rounded-lg shadow-xl max-w-2xl mx-auto ">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              Welcome to AirlinePro
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your seamless travel experience starts here. Find flights, book
              tickets, and manage your journey with ease.
            </p>
            <Link
              to="/flights"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block"
            >
              Book Now
            </Link>
          </div>


          <div className="hidden md:block w-1/2">

            <img className="" src={airlineL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
