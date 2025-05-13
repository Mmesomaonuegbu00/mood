import { action } from "./_generated/server";
import { v } from "convex/values";


export const generateAIResponse = action({
  args: { userInput: v.string() },
  handler: async (ctx, args) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY!;
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: {
          text: args.userInput
        }
      }),
    });

    const json = await response.json();
    return json.candidates?.[0]?.output || "Thanks for sharing — you're doing great.";
  },
});
