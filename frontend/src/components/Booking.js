
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Booking = ({ api }) => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const { data } = await api.get(`/flights/${flightId}`);
        setFlight(data);
      } catch (err) {
        setError("Could not fetch flight details.");
      }
    };
    fetchFlight();
  }, [flightId, api]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!selectedSeat) {
      setError("Please select a seat.");
      return;
    }
    try {
      await api.post("/bookings", { flightId, seatNumber: selectedSeat });
      setMessage("Booking successful! You will be redirected shortly.");
      setTimeout(() => navigate("/flights"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Booking failed. The seat might be taken or you are not logged in."
      );
    }
  };

  if (!flight) return <div className="text-center p-10">Loading...</div>;

  const SeatGrid = () => {
    let seats = [];
    for (let i = 1; i <= flight.totalSeats; i++) {
      const isBooked = flight.bookedSeats.includes(i);
      const isSelected = i === parseInt(selectedSeat);
      seats.push(
        <button
          key={i}
          type="button"
          disabled={isBooked}
          onClick={() => !isBooked && setSelectedSeat(i)}
          className={`w-10 h-10 rounded-md text-sm flex items-center justify-center border transition-colors
                        ${
                          isBooked
                            ? "bg-red-300 text-red-700 cursor-not-allowed"
                            : ""
                        }
                        ${
                          !isBooked && isSelected
                            ? "bg-blue-600 text-white border-blue-700"
                            : ""
                        }
                        ${
                          !isBooked && !isSelected
                            ? "bg-green-200 hover:bg-green-300 border-green-300"
                            : ""
                        }
                    `}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="grid grid-cols-6 gap-2 mt-4 p-4 bg-gray-50 rounded-lg">
        {seats}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-2">
        Book a Seat on {flight.flightNumber}
      </h2>
      <p className="mb-4 text-gray-600">
        {flight.origin} to {flight.destination}
      </p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {message}
        </div>
      )}
      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Select a Seat:
          </label>
          <SeatGrid />
        </div>
        <p className="text-center my-4 font-semibold text-lg">
          Selected Seat:{" "}
          <span className="text-blue-600">{selectedSeat || "None"}</span>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          disabled={!selectedSeat}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};
export default Booking;
