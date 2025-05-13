import React, { useState } from "react";

const affirmations = [
  "You are capable and strong.",
  "Every day, you grow and improve.",
  "Your energy is radiant and positive.",
  "You are worthy of success and happiness.",
  "Challenges make you stronger.",
  "Your potential is limitless.",
  "You radiate confidence and positivity.",
  "You are loved and appreciated."
];

const Affirmations = () => {
  const [affirmation, setAffirmation] = useState(affirmations[0]);

  const generateAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🌟 Daily Affirmation 🌟</h2>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{affirmation}</p>
      <button onClick={generateAffirmation} style={{ marginTop: "10px", padding: "10px 20px", fontSize: "1rem" }}>
        Get a New Affirmation
      </button>
    </div>
  );
};

export default Affirmations;