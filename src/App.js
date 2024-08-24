import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Asegúrate de que se importe correctamente

function App() {
  const [sqft, setSqft] = useState("");
  const [costs, setCosts] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://mcjscleaning-quote.onrender.com/quote/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sqft: parseInt(sqft),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCosts(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        backgroundColor: "#E3FEFF",
      }}
    >
      <div className="d-flex align-items-center mb-4">
        <img
          src="/logo.png"
          alt="Company Logo"
          style={{ height: "90px", marginRight: "15px" }}
        />
        <h1 className="flex-grow-1 text-center">Cleaning Quote Calculator</h1>
      </div>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="form-group mb-3">
          <label>Square Feet:</label>
          <input
            type="number"
            className="form-control"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Get Quote
        </button>
      </form>
      {Object.keys(costs).length > 0 && (
        <div className="mt-4 p-3 bg-light border rounded">
          <h2>Quotes:</h2>
          <ul>
            {Object.entries(costs).map(([key, value]) => (
              <li key={key}>
                {key}: ${value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
