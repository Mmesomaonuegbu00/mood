"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { format, startOfWeek, addDays } from "date-fns";
import {  useSession } from 'next-auth/react'

const moodEmojiMap: Record<string, string> = {
  Happy: "😊",
  Neutral: "😐",
  Sad: "😔",
  Angry: "😡",
  Crying: "😢",
  Reflective: "📖",
  Emotional: "💙",
};

const moodColorMap: Record<string, string> = {
  Happy: "bg-yellow-300",
  Neutral: "bg-blue-400",
  Sad: "bg-gray-500",
  Reflective: "bg-purple-400",
  Angry: "bg-red-400",
  Crying: "bg-blue-200",
  Emotional: "bg-pink-300",
};

const MyCalendar = () => {
  const { data: session } = useSession();
  const user = session?.user || null;
  const moods = useQuery(api.moods.getRecentMoods, {
    email: user?.email|| "",
  });

  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  return (
    <div className="bg-gradient-to-br from-pink-300/30 to-black border border-gray-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">This Week&#39;s Mood</h2>
      <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-7 gap-3 mx-auto">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const moodEntry = moods?.find((m) => m.date === dateStr);
          const mood = moodEntry?.mood;
          const emoji = moodEmojiMap[mood ?? ""] || "";
          const color = moodColorMap[mood ?? ""] || "bg-gray-700/50";

          return (
            <div
              key={dateStr}
              className={`flex flex-col items-center px-1 py-1 w-[5.5rem] h-[7rem] md:py-3 text-center rounded-lg ${color} text-white mx-auto`}
            >
              <span className="text-sm font-medium">
                {format(day, "EEE")}
              </span>
              <span className="lg:text-xs">{format(day, "MMM d")}</span>
              <div className="text-2xl mt-1">{emoji}</div>
              <span className="text-xs mt-1">{mood ?? "No mood"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCalendar;