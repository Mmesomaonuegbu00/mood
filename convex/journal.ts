import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// CREATE ENTRY
export const createEntry = mutation({
  args: {
    email: v.string(),  // ✅ Using email instead of entryId
    content: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('journalEntries', {
      email: args.email,
      content: args.content,
      createdAt: args.createdAt,
    });
  },
});

// GET ENTRIES BY EMAIL
export const getEntries = query({
  args: {
    email: v.string(),  // ✅ Fetch by email
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('journalEntries')
      .withIndex("by_email", (q) => q.eq("email", args.email)) // ✅ Using indexed filter
      .order('desc')
      .collect();
  },
});

// DELETE ENTRY
export const deleteEntry = mutation({
  args: {
    email: v.string(),  // ✅ Changed from entryId to email
    createdAt: v.string(), // ✅ Used timestamp to find entry
  },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("journalEntries")
      .withIndex("by_email_createdAt", (q) => q.eq("email", args.email).eq("createdAt", args.createdAt))
      .first();

    if (entry) {
      await ctx.db.delete(entry._id);  // ✅ Delete by Convex document ID
    }
  },
});

// EDIT ENTRY
export const editEntry = mutation({
  args: {
    email: v.string(),  // ✅ Identify user by email
    createdAt: v.string(), // ✅ Identify entry using timestamp
    newContent: v.string(),
  },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("journalEntries")
      .withIndex("by_email_createdAt", (q) => q.eq("email", args.email).eq("createdAt", args.createdAt))
      .first();

    if (entry) {
      await ctx.db.patch(entry._id, { content: args.newContent });  // ✅ Patch instead of update
    }
  },
});