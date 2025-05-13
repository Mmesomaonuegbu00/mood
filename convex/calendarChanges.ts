import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// ✅ Get moods from calendarChanges
export const getRecentChanges = query({
  args: { email: v.string(), startDate: v.string(), endDate: v.string() },
  handler: async ({ db }, { email, startDate, endDate }) => {
    return await db
      .query("calendarChanges")
      .filter(q =>
        q.and(
          q.eq(q.field("email"), email), // ✅ Ensure correct filtering
          q.eq(q.field("changeType"), "mood"),
          q.gte(q.field("date"), startDate),
          q.lte(q.field("date"), endDate)
        )
      )
      .order("desc")
      .take(10);
  },
});
   

// ✅ Insert a new mood, sleep, or social event
export const addCalendarEvent = mutation({
  args: { email: v.string(), date: v.string(), changeType: v.string(), timestamp: v.number(), details: v.optional(v.string()) },
  handler: async ({ db }, { email, date, changeType, timestamp, details }) => {
    console.log("Saving mood:", { email, date, changeType, details });
    return await db.insert("calendarChanges", { email, date, changeType, timestamp, details });
  },

  // handler: async ({ db }, { email, date, changeType, timestamp, details }) => {
  //   return await db.insert("calendarChanges", {
  //     email,
  //     date,  // ✅ Store the date when the mood/event occurred
  //     changeType,
  //     timestamp,
  //     details,
  //   });
  // },
});