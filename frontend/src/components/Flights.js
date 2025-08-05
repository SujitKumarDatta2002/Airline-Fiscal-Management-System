// FILE: src/components/Flights.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Flights = ({ api }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const { data } = await api.get("/flights");
        setFlights(data);
      } catch (err) {
        setError("Could not fetch flights. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [api]);

  if (loading)
    return <div className="text-center p-10">Loading flights...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Available Flights
      </h2>
      <div className="space-y-6">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex-grow mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold text-gray-900 mr-4">
                  {flight.flightNumber}
                </span>
                <span className="text-lg font-semibold text-green-600">
                  ৳{flight.price}
                </span>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">From:</span> {flight.origin}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">To:</span> {flight.destination}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                <span className="font-semibold">Departure:</span>{" "}
                {new Date(flight.departureTime).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Arrival:</span>{" "}
                {new Date(flight.arrivalTime).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to={`/book/${flight._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Book Now
              </Link>
              <Link
                to={`/feedback/${flight._id}`}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Leave Feedback
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Flights;
