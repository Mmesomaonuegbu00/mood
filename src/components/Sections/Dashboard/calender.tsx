"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { format, startOfWeek, addDays } from "date-fns";
import { useSession } from 'next-auth/react'


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
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  const end = addDays(start, 6); // Sunday 

  const moods = useQuery(api.calendarChanges.getRecentChanges, {
    email: user?.email || "",
    startDate: format(start, "yyyy-MM-dd"),
    endDate: format(end, "yyyy-MM-dd"),
  });


  return (
    <div className="bg-gradient-to-br from-pink-300/30 to-black border border-gray-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">This Week&#39;s Mood</h2>
      <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-7 gap-4">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const moodEntry = moods?.find((m) => m.date === dateStr && m.changeType === "mood"); // ✅ Filter only moods
          const mood = moodEntry?.details; // ✅ Use `details` field instead of `mood`
          const emoji = moodEmojiMap[mood ?? ""] || "";
          const color = moodColorMap[mood ?? ""] || "bg-gray-700/50";


          return (
            <div
              key={dateStr}
              className={`flex flex-col items-center px-3 py-1 w-[6rem] h-[7rem] md:py-3 text-center rounded-lg ${color} text-white`}
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