
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Feedback = ({ api }) => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (rating === 0) {
      setError("Please provide a rating by clicking a star.");
      return;
    }
    try {
      await api.post("/feedback", { flightId, rating, comment });
      setMessage("Thank you for your feedback!");
      setTimeout(() => navigate("/flights"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to submit feedback.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Leave Feedback</h2>
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-4xl cursor-pointer transition-colors ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-bold mb-2"
          >
            Comments (Optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your experience..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
export default Feedback;
