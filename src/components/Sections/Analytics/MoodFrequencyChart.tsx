'use client'


import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useSession } from 'next-auth/react'

// Mood Emojis Mapping
const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  calm: '😌',
  excited: '🤩',
  reflective: '📝',
}

// Motivational quotes mapped to moods
const moodQuotes: Record<string, string> = {
  happy: "Happiness is not something ready-made. It comes from your actions.",
  sad: "Tough times never last, but tough people do.",
  angry: "Holding onto anger is like grasping a hot coal with the intent of throwing it at someone else—you get burned.",
  calm: "Breathe in the calm, breathe out the stress.",
  excited: "Excitement is the spark that ignites action!",
  reflective: "Self-reflection is the key to personal growth.",
}

export default function AnalyticsPage() {
 const { data: session } = useSession();
  const user = session?.user || null;
  const moodData = useQuery(api.moods.getRecentMoods, user?.email? { email: user.email } : 'skip') || []

  // Mood frequency map
  const moodCounts: Record<string, number> = {}
  const wordCount: Record<string, number> = {}
  let longestStreak = 0
  let currentStreak = 0
  let lastEntryDate: string | null = null

  for (const entry of moodData) {
    // Count each mood occurrence
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1

    // Word cloud from reflection
    const words: string[] = entry.details?.toLowerCase().match(/\b\w{4,}\b/g) || []
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })

    // Mood streak tracking
    const entryDate = new Date(entry.date).toISOString().split('T')[0] // Get YYYY-MM-DD
    if (lastEntryDate) {
      const prevDate: Date = new Date(lastEntryDate)
      prevDate.setDate(prevDate.getDate() + 1)

      if (prevDate.toISOString().split('T')[0] === entryDate) {
        currentStreak++
      } else {
        longestStreak = Math.max(longestStreak, currentStreak)
        currentStreak = 1
      }
    } else {
      currentStreak = 1
    }
    lastEntryDate = entryDate
  }

  longestStreak = Math.max(longestStreak, currentStreak)

  // Top 10 most common words
  const topWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <div className="space-y-8 lg:px-4 py-6 mx-auto">
      <div className='grid grid-cols-1 lg:grid-cols-12 w-full gap-20'>



        <div className='flex flex-col lg:col-span-5 gap-6'>
          <div className="bg-gradient-to-br to-black from-pink-300/30  p-4 rounded-xl text-white shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4">Mood Frequency</h2>
            {Object.keys(moodCounts).length === 0 ? (
              <p className="text-gray-400">No data yet.</p>
            ) : (
              <ul className="space-y-2">
                {Object.entries(moodCounts).map(([mood, count]) => (
                  <li key={mood} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                    <span className="text-lg">{moodEmojis[mood]} {mood}</span>
                    <span className="text-sm text-gray-300">{count} entries</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mood Streak Tracking */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl text-white shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4">Mood Streaks</h2>
            <p className="text-lg text-pink-500">
              🔥 Longest journaling streak: {longestStreak} days
            </p>
            <p className="text-sm text-gray-400">Consistency builds self-awareness!</p>
          </div>

        </div>

        <div className='flex flex-col gap-6 lg:col-span-7 w-full'>
          {/* Reflection Word Cloud */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl text-white shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4">Reflection Highlights</h2>
            {topWords.length === 0 ? (
              <p className="text-gray-400">No journal entries yet.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {topWords.map(([word, count]) => (
                  <span key={word} className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
                    {word} × {count}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Motivational Quotes Based on Mood */}
          <div className="bg-gradient-to-br from-black to-pink-300/30  p-4 rounded-xl text-white shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4">Personalized Motivation</h2>
            {Object.entries(moodQuotes).map(([mood, quote]) => (
              <div key={mood} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-2xl">{moodEmojis[mood]}</span>
                <div>
                  <p className="text-sm font-bold capitalize">{mood}</p>
                  <p className="text-gray-400 text-sm italic">&quot;{quote}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}