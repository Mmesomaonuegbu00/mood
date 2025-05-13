import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 🔄 User history (tracks logins, updates, etc.)
  userHistory: defineTable({
    email: v.string(),  // ✅ Changed from userId to email
    action: v.string(),
    timestamp: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_email_timestamp", ["email", "timestamp"]),

  // 😊 Mood tracking
  moods: defineTable({
    email: v.string(),  // ✅ Changed from userId to email
    date: v.string(),
    mood: v.string(),
    timestamp: v.number(),
    details: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_email_date", ["email", "date"]),

  // 💬 AI conversations
  conversations: defineTable({
    email: v.string(),  // ✅ Changed from userId to email
    userInput: v.string(),
    aiResponse: v.string(),
    timestamp: v.optional(v.float64()),
    sentiment: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_email_timestamp", ["email", "timestamp"]),

  // 📅 Calendar changes
  calendarChanges: defineTable({
    email: v.string(),  // ✅ Changed from userId to email
    date: v.string(),
    changeType: v.string(),
    timestamp: v.number(),
    details: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_email_date", ["email", "date"]),

  // 📓 Journal entries
  journalEntries: defineTable({
    email: v.string(),  // ✅ Changed from userId to email
    content: v.string(),
    createdAt: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_email_createdAt", ["email", "createdAt"]),
});