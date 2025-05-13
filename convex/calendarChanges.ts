import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// ✅ Get moods from calendarChanges
export const getRecentChanges = query({
  args: { 
    email: v.string(),  // changed from userId
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async ({ db }, { email, startDate, endDate }) => {
    return await db
      .query("calendarChanges")
      .filter(q =>
        q.and(
          q.eq(q.field("email"), email),  // changed from userId to email
          q.eq(q.field("changeType"), "mood"),  // ✅ Only fetch mood changes
          q.gte(q.field("date"), startDate),
          q.lte(q.field("date"), endDate)
        )
      )
      .order("desc")  // ✅ Correct ordering
      .take(10);  
  },
});

// ✅ Insert a new mood, sleep, or social event
export const addCalendarEvent = mutation({
  args: {
    email: v.string(),  
    date: v.string(),  // ✅ Ensure this is passed
    changeType: v.string(),   
    timestamp: v.number(),      
    details: v.optional(v.string()),
  },
  handler: async ({ db }, { email, date, changeType, timestamp, details }) => {
    return await db.insert("calendarChanges", {
      email,
      date,  // ✅ Store the date when the mood/event occurred
      changeType,
      timestamp,
      details,
    });
  },
});