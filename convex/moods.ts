import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a new mood entry
export const saveMood = mutation({
  args: {
    email: v.string(),
    date: v.string(),
    mood: v.string(),
    timestamp: v.optional(v.number()),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = args.timestamp ?? Date.now();
    return await ctx.db.insert("moods", { ...args, timestamp: now });
  },
});

// Get the 10 most recent moods
export const getRecentMoods = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("moods")
      .withIndex("by_email", (q) => q.eq("email", email))
      .order("desc")
      .take(10);
  },
});

// Get mood frequencies for a user
export const getMoodFrequencies = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const moods = await ctx.db
      .query("moods")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();

    const counts: Record<string, number> = {};
    for (const mood of moods) {
      counts[mood.mood] = (counts[mood.mood] || 0) + 1;
    }

    return Object.entries(counts).map(([mood, count]) => ({ mood, count }));
  },
});
