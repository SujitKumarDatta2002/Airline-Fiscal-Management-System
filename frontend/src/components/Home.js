// // FILE: src/components/Home.js
// import React from "react";
// import { Link } from "react-router-dom";
// import airlineLogo from "../images/airlineLogo.jpg";
// import airlineL from "../images/airline2.jpg";

// const Home = () => {
//   return (
//     <div className="flex text-center mt-16">
// <div className="w-1/2 bg-white p-12 rounded-lg shadow-xl max-w-2xl mx-auto">
//   <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
//     Welcome to AirlinePro
//   </h1>
//   <p className="text-lg text-gray-600 mb-8">
//     Your seamless travel experience starts here. Find flights, book
//     tickets, and manage your journey with ease.
//   </p>
//   <Link
//     to="/flights"
//     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block"
//   >
//     Explore Flights
//   </Link>
// </div>
//       <div className="w-1/2 bg-white ">
//         <img className="bg-white bg-none" src={airlineLogo} />
//       </div>
//     </div>
//   );
// };
// export default Home;
// frontend/src/components/Home.js
// frontend/src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import airlineBg from "../images/airline-bg.jpg";
import airlineLogo from "../images/airlineLogo.jpg";
import airlineL from "../images/airline2.png";

const Home = () => {
  return (
    // Main container for the hero section
    <div
      className="relative h-[calc(100vh-120px)] min-h-[500px] w-full bg-cover bg-center text-white"
      // Add your image URL here inside the quotes
      // style={{ backgroundImage: `url(&{airlineBg})`, backgroundColor: "#4a4a6a" }}
      style={{ backgroundImage: `url(${airlineBg})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content container */}
      <div className="relative z-10 flex h-full w-full items-center">
        <div className="container mx-auto flex items-center">
          {/* Left side: Text content */}
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

          {/* Right side: Placeholder for the boat image */}
          <div className="hidden md:block w-1/2">
            {/* You can place an <img> tag here for the boat if it's a separate image */}
            <img className="" src={airlineL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
