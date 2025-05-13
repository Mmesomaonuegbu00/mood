"use client";

import React from "react";

const moodData = {
  Happy: { emoji: "😄", bg: "bg-yellow-300" },
  Neutral: { emoji: "😐", bg: "bg-gray-300" },
  Sad: { emoji: "😢", bg: "bg-blue-300" },
  Angry: { emoji: "😠", bg: "bg-red-400" },
  Crying: { emoji: "😭", bg: "bg-indigo-300" },
  Emotional: { emoji: "🥹", bg: "bg-pink-200" },
  Reflective: { emoji: "🤔", bg: "bg-purple-300" },
};

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodSelect,
}) => {
  return (
    <div className="grid grid-cols-4  md:grid-cols-7  md:pb-3 lg:px-6 lg:pb-6 flex-wrap justify-between">
      {Object.entries(moodData).map(([mood, { emoji, }]) => {
        const isSelected = selectedMood === mood;
        return (
          <div
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`cursor-pointer rounded-xl p-2 justify-center font-bold  ${isSelected ? " " : "hover:scale-105"
              } transition`}
          >
            <span className="text-4xl md:text-6xl lg:text-7xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] brightness-125">
              {emoji}
            </span>


          </div>
        );
      })}
    </div>
  );
};

export default MoodSelector;
