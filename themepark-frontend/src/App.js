import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "./38332.jpg"; // Make sure this image is in the src folder

function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    visitDate: "",
    numTickets: 1,
    totalPrice: 0,
    memberAges: [],
    collegeOffer: false,
  });

  // Fetch all bookings
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle member age inputs
  const handleAgeChange = (index, value) => {
    const newAges = [...formData.memberAges];
    newAges[index] = Number(value);
    setFormData({ ...formData, memberAges: newAges });
  };

  // Calculate total price
  const calculatePrice = () => {
    let total = 0;
    formData.memberAges.forEach((age) => {
      if (age < 10) total += 0;
      else if (age >= 10 && age <= 20) total += 500;
      else total += 800;
    });

    if (formData.collegeOffer) {
      total = total * 0.8; // 20% discount
    }

    setFormData({ ...formData, totalPrice: total });
  };

  // Submit booking
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/bookings", formData)
      .then(() => {
        alert("🎟️ Booking Successful!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  // Delete booking
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/bookings/${id}`)
      .then(() => {
        alert("❌ Booking Deleted");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  // Auto update total when ages or offer changes
  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line
  }, [formData.memberAges, formData.collegeOffer]);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-60 w-full min-h-screen p-6 rounded-2xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg text-center">
          🎢 Theme Park Ticket Booking System
        </h1>

        {/* Pricing Info */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg mb-8 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
            🎟️ Ticket Pricing Details
          </h2>
          <ul className="space-y-2 text-base">
            <li>👶 <b>Kids below 10 years:</b> Free Entry</li>
            <li>🧒 <b>Ages 10 - 20 years:</b> ₹500 per ticket</li>
            <li>🧑 <b>Adults (above 20 years):</b> ₹800 per ticket</li>
            <li>🎓 <b>College Offer:</b> 20% discount on total price</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600 text-center">
            *Prices are calculated automatically based on member ages.
          </p>
        </div>

        {/* Booking Form */}
        <form
          className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg mb-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
            Book Your Tickets
          </h2>

          <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <label className="block font-semibold text-gray-700 mb-1">Your Booking Date</label>
          <input
            type="date"
            name="visitDate"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <label className="block font-semibold text-gray-700 mb-1">Number of Members</label>
          <input
            type="number"
            name="numTickets"
            placeholder="Enter number of members"
            min="1"
            onChange={(e) =>
              setFormData({
                ...formData,
                numTickets: Number(e.target.value),
                memberAges: Array(Number(e.target.value)).fill(""),
              })
            }
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-2">
            👨‍👩‍👧 Member Information
          </h3>

          {[...Array(Number(formData.numTickets) || 0)].map((_, i) => (
            <div key={i} className="mb-3">
              <label className="block font-semibold text-gray-700 mb-1">
                Age of Member {i + 1}
              </label>
              <input
                type="number"
                placeholder={`Enter age of member ${i + 1}`}
                onChange={(e) => handleAgeChange(i, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              name="collegeOffer"
              checked={formData.collegeOffer}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Apply College Offer (20% Discount)
            </label>
          </div>

          <div className="text-lg font-semibold text-blue-800 mb-3">
            💰 Total Price: ₹{formData.totalPrice}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Confirm Booking
          </button>
        </form>

        {/* Booking List */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
            All Bookings
          </h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center">No bookings found yet.</p>
          ) : (
            <table className="w-full border text-center">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Visit Date</th>
                  <th className="p-2 border">Members</th>
                  <th className="p-2 border">Ages</th>
                  <th className="p-2 border">Total (₹)</th>
                  <th className="p-2 border">College Offer</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="p-2 border">{b.name}</td>
                    <td className="p-2 border">{b.email}</td>
                    <td className="p-2 border">{b.visitDate}</td>
                    <td className="p-2 border">{b.numTickets}</td>
                    <td className="p-2 border">
                      {b.memberAges ? b.memberAges.join(", ") : "—"}
                    </td>
                    <td className="p-2 border">{b.totalPrice}</td>
                    <td className="p-2 border">{b.collegeOffer ? "Yes" : "No"}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="mt-8 text-white text-sm text-center">
          © 2025 Theme Park Ticket Booking — Designed by Vishan
        </footer>
      </div>
    </div>
  );
}

export default App;
