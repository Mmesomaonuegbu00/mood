import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a new conversation
export const saveConversation = mutation({
  args: {
    email: v.string(),
    userInput: v.string(),
    aiResponse: v.string(),
    timestamp: v.optional(v.number()),
    sentiment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = args.timestamp ?? Date.now();
    return await ctx.db.insert("conversations", {
      ...args,
      timestamp: now,
    });
  },
});

// Fetch recent conversations (latest 20)
export const getUserConversations = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .order("desc")
      .take(20);
  },
});

// Clear all conversations for a user
export const clearConversations = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const userConvos = await ctx.db
      .query("conversations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    const deletions = userConvos.map((entry) => ctx.db.delete(entry._id));
    await Promise.all(deletions);
  },
});
