'use client'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

const Journal = () => {
  const { data: session } = useSession() // Get the NextAuth session data
  const userEmail = session?.user?.email // Access email from session

  // ✅ Move hooks to top level (before conditionals)
  const noteRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)
  const [editingCreatedAt, setEditingCreatedAt] = useState<string | null>(null)
  const [editContent, setEditContent] = useState<string>('')

  const createEntry = useMutation(api.journal.createEntry)
  const deleteEntry = useMutation(api.journal.deleteEntry)
  const editEntry = useMutation(api.journal.editEntry)

  // ✅ Always define hooks at the top level
  const entries = useQuery(api.journal.getEntries, { email: userEmail || "" }) // Ensure it always receives a string

  if (!userEmail) {
    return <p>Please log in to view your journal.</p> // ✅ Hooks are already defined before this conditional
  }

  const handleSave = async () => {
    const content = noteRef.current?.innerText || ''
    if (!content.trim()) return
    setSaving(true)
    await createEntry({
      email: userEmail, 
      content,
      createdAt: new Date().toISOString(),
    })
    setSaving(false)
    if (noteRef.current) noteRef.current.innerText = ''
  }

  const handleDelete = async (createdAt: string) => {
    if (createdAt) {
      await deleteEntry({ email: userEmail, createdAt }) 
    }
  }

  const handleEdit = async () => {
    if (editingCreatedAt && editContent.trim()) {
      await editEntry({
        email: userEmail,  
        createdAt: editingCreatedAt,
        newContent: editContent,
      })
      setEditingCreatedAt(null)
      setEditContent('')
    }
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold capitalize pt-6">
        {`Hello, ${userEmail || 'there'}!`}
      </h1>
      <p className='pt-2 text-gray-400'>Don&#39;t forget to write down in your journal today</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 mt-10 gap-10">
        {/* New Note */}
        <div className="lg:col-span-7">
          <div className="bg-gradient-to-br from-black to-pink-300/30 text-white p-6 rounded-xl shadow-xl border border-white/10 font-mono text-base">
            <div
              ref={noteRef}
              contentEditable
              className="h-[400px] outline-none placeholder"
              style={{ whiteSpace: 'pre-wrap' }}
              data-placeholder="Start writing here..."
            ></div>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition"
          >
            {saving ? 'Saving...' : 'Save Note'}
          </button>
        </div>

        {/* Saved Notes */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-white text-xl font-semibold mb-2">Your Notes</h2>
          {entries?.length === 0 && (
            <p className="text-gray-400 italic">No entries yet.</p>
          )}
          {entries?.map((entry) => (
            <div
              key={entry.createdAt} 
              className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 text-white shadow-md"
            >
              {editingCreatedAt === entry.createdAt ? (
                <>
                  <textarea
                    className="w-full p-2 rounded bg-black text-white border border-white/20"
                    rows={4}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleEdit}
                      className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingCreatedAt(null)
                        setEditContent('')
                      }}
                      className="text-gray-400 hover:text-red-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="whitespace-pre-wrap line-clamp-4 break-words">{entry.content}</p>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{new Date(entry.createdAt).toLocaleString()}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCreatedAt(entry.createdAt) 
                          setEditContent(entry.content)
                        }}
                        className="hover:text-yellow-300"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.createdAt)} 
                        className="hover:text-red-400"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Journal