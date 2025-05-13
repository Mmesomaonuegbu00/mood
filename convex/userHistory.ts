import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const logUserAction = mutation({
  args: { email: v.string(), action: v.string(), timestamp: v.number() }, // ✅ Changed from userId to email
  handler: async (ctx, { email, action, timestamp }) => {
    await ctx.db.insert("userHistory", { email, action, timestamp }); // ✅ Store by email
  },
});