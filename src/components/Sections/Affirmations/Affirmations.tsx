// components/Affirmations.tsx
"use client";

import React, { useState, useEffect } from "react";

const fetchAffirmation = async (
  setAffirmation: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const response = await fetch("/api/affirmation");
    const data = await response.json();
    setAffirmation(data.affirmation);
  } catch (error) {
    console.error("Failed to fetch affirmation:", error);
    setAffirmation("You are strong and capable. Keep going!");
  } finally {
    setLoading(false);
  }
};

const Affirmations = () => {
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAffirmation(setAffirmation, setLoading);
  }, []);

  return (
    <div className="text-center px-3 lg:px-6">
      <h2>🌟 Daily Affirmation 🌟</h2>

      <div className="bg-gradient-to-br from-black to-pink-300/30 text-white p-6 rounded-md shadow-xl border border-white/10 font-mono text-2xl mt-20 h-[200px] flex justify-center mx-auto items-center text-center">
        <p>
          &quot;
          {loading ? "Loading..." : affirmation}
          &quot; 
        </p>
      </div>
      <button
                  className=" bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition  outline-none"
        onClick={() => fetchAffirmation(setAffirmation, setLoading)}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Get a New Affirmation
      </button>
    </div>
  );
};

export default Affirmations;
