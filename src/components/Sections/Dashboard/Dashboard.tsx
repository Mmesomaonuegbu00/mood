"use client";

import React, { useEffect, useState, useRef } from "react";

import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import MyCalendar from "@/components/Sections/Dashboard/calender";
import MoodSelector from "@/components/Sections/Dashboard/moodselector";
import PromptInput from "@/components/Sections/Dashboard/Promptinput";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";


const getGreetingMessage = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "🌅 Good morning! Want to share how you're feeling today?";
    } else if (hour < 18) {
        return "🌞 Good afternoon! Need someone to talk to?";
    } else {
        return "🌇 Good evening! Want to reflect on your day with our assistant?";
    }
};
const Dashboard = () => {
    const { data: session } = useSession();
    const email = session?.user?.email || "";

    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [reflection, setReflection] = useState("");
    interface Message {
        timestamp: number;
        _id: string;
        _creationTime: number;
        sentiment?: string;
        email: string;
        userInput: string;
        aiResponse: string;
    }
    
    const [messages, setMessages] = useState<Message[]>([]);

    const saveMood = useMutation(api.moods.saveMood);
    const saveConversation = useMutation(api.conversations.saveConversation);
    const generateAIResponse = useAction(api.ai.generateAIResponse);
    const recentMoodsQuery = useQuery(api.moods.getRecentMoods, { email });
    const conversationHistory = useQuery(api.conversations.getUserConversations, { email });
    const clearConversations = useMutation(api.conversations.clearConversations);
    const logUserAction = useMutation(api.userHistory.logUserAction);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (conversationHistory) {
            const sortedHistory = [...conversationHistory].sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
            setMessages(prev => {
                const filteredPrev = prev.filter(msg => !conversationHistory.some(c => c.timestamp === msg.timestamp));
                return [...filteredPrev, ...sortedHistory.map(msg => ({ ...msg, timestamp: msg.timestamp ?? Date.now() }))];
            });
        }
    }, [conversationHistory]);

    const confirmClearChat = () => setShowConfirmModal(true);

    const handleClearChat = async () => {
        if (!email) return;
        await clearConversations({ email });
        setMessages([]);
        setShowConfirmModal(false);
        await logUserAction({ email, action: "Cleared conversations", timestamp: Date.now() });
    };

    const handleMoodSelection = async (mood: string) => {
        setSelectedMood(mood);
        if (!email) return;

        await saveMood({ email, date: new Date().toISOString().split("T")[0], mood, timestamp: Date.now(), details: "" });
        await logUserAction({ email, action: `Selected mood: ${mood}`, timestamp: Date.now() });
    };

    const handleSubmit = async () => {
        if (!email || !reflection.trim()) return;

        const now = Date.now();
        const date = new Date(now).toISOString().split("T")[0];
        const mood = selectedMood || "Reflective";

        try {
            const userMessage = { _id: `user-${now}`, email, userInput: reflection, aiResponse: "", timestamp: now, _creationTime: now };
            setMessages(prev => [...prev, userMessage]);

            const aiReply = await generateAIResponse({ userInput: reflection });
            const aiMessage = { _id: `ai-${now}`, email, userInput: reflection, aiResponse: aiReply, timestamp: now, _creationTime: now };
            setMessages(prev => [...prev, aiMessage]);

            await saveMood({ email, date, mood, details: reflection || undefined, timestamp: now });
            await saveConversation({ email, userInput: reflection, aiResponse: aiReply, timestamp: now });
            await logUserAction({ email, action: "Submitted reflection", timestamp: now });

        } catch (error) {
            console.error("AI API Error:", error);
        }

        setSelectedMood(null);
        setReflection("");
    };

   

    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="relative ">
            <h1 className="text-2xl md:text-3xl font-bold capitalize pb-10">
                <span className="text-pink-300">Welcome,</span> {session?.user?.name}
            </h1>

            {/* <p className="text-gray-400 pb-6">Email: {user?.emailAddresses[0]?.emailAddress}</p> */}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="flex flex-col w-full xl:col-span-7 gap-6 ">
                    <MyCalendar />
                    <div className="p-1 bg-gradient-to-br from-black to-pink-300/30 border border-gray-700 shadow-lg shadow-yellow-900/10 rounded-xl ">
                        <h2 className="text-xl font-semibold mb-4 px-3 md:px-5 lg:px-8 pt-4">How do you feel today?</h2>
                        <MoodSelector
                            selectedMood={selectedMood}
                            onMoodSelect={handleMoodSelection}
                        />
                    </div>



                    <div className="p-6 bg-white/10 rounded-xl shadow-lg max-h-[500px] overflow-y-auto recent">
                        <h2 className="text-xl font-semibold mb-4">Your Recent Entries</h2>
                        <div className="space-y-3">
                            {recentMoodsQuery?.map((entry) => {
                                const color = {
                                    Happy: "bg-yellow-300",
                                    Neutral: "bg-blue-400",
                                    Sad: "bg-gray-500",
                                    Reflective: "bg-purple-400",
                                }[entry.mood] || "bg-purple-400";

                                const icon = {
                                    Happy: "😊 ",
                                    Neutral: "😐",
                                    Angry: "😡",
                                    Sad: "😔",
                                    Reflective: "📖",
                                    Crying: "😢",
                                    Emotional: " 💙",
                                }[entry.mood];

                                const message = {
                                    Happy: " Happiness is not a destination, it’s a way of life. You had a wonderful day! Enjoy every moment and keep spreading positivity.",
                                    Neutral: "Balance is the key to everything. Keep steady. A steady day—sometimes balance is the best gift. Take a deep breath and recharge.",
                                    Angry: "Holding onto anger is like drinking poison and expecting the other person to die Anger is a powerful emotion, but channeling it into growth, learning, and positive action can be transformative.",
                                    Sad: "It’s okay to not be okay. Tomorrow is another day. Tough days happen, but you're strong enough to get through them. Allow yourself kindness.",
                                    Reflective: " In the pages of reflection, wisdom grows.Your thoughts matter. Journaling today is a step towards greater self-awareness.",
                                    Crying: " Tears cleanse the soul—let them flow when needed. Emotions are powerful. Tears help express what words cannot—it's okay to let them flow.",
                                    Emotional: " Feeling deeply is a gift—embrace your emotions. Deep feelings can be overwhelming, but they show how much you care. Honor them.",
                                }[entry.mood];

                                return (
                                    <div key={entry._id} className="flex items-center gap-4 p-3 bg-opacity-10 rounded-lg shadow-md">
                                        <div className={`p-3 ${color} rounded-full flex items-center justify-center text-xl`}>
                                            {icon}
                                        </div>
                                        <p className="text-sm break-words line-clamp-2">
                                            {entry.details
                                                ? (() => {
                                                    const words = entry.details.trim().split(/\s+/);
                                                    return words.length > 20
                                                        ? words.slice(0, 20).join(" ") + "..."
                                                        : entry.details;
                                                })()
                                                : message}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className="xl:col-span-5 xl:block hidden">
                    <div className="flex justify-end absolute top-0 right-0">
                        <button
                            onClick={confirmClearChat}
                            className="text-pink-300 text-sm  hover:text-red-400 transition"
                        >
                            Clear Chat
                        </button>
                    </div>

                    <div className="sticky top-20 bg-gradient-to-br to-pink-300/10 from-black border border-gray-700 backdrop-blur-xl rounded-xl flex flex-col justify-between max-w-[600px] h-[800px]">
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none mt-[14rem]">
                            <div className="absolute inset-0 bg-black opacity-30 blur-[100px]"></div>
                            <div className="w-[200px] h-[200px] lg:h-[300px] xl:h-[500px] rounded-full bg-blue-300 opacity-5 blur-[180px]"></div>
                        </div>
                        <div ref={chatBoxRef} className="chat-box overflow-y-auto p-6 ">
                            <h2 className="text-xl font-semibold mb-4">Mood Chat</h2>
                            <div className="flex flex-col space-y-2 justify-center pt-28 ">
                                {messages.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-16"
                                    >
                                        <div className="p-4 rounded-lg  text-white max-w-sm">
                                            <p className="text-xl font-medium bg-gradient-to-r from-white via-white to-pink-300 bg-clip-text text-transparent">{getGreetingMessage()}</p>
                                        </div>
                                        <div className="flex gap-2">

                                            <Image
                                                src="/mo1.jpg"
                                                alt="Assistant 1"
                                                width={80}
                                                height={60}
                                                className="rounded-full object-cover shadow-lg"
                                            />
                                            <Image
                                                src="/mo2.jpg"
                                                alt="Assistant 2"
                                                width={80}
                                                height={60}
                                                className="rounded-full  object-cover shadow-lg"
                                            />
                                            <Image
                                                src="/mo3.jpg"
                                                alt="Assistant 3"
                                                width={80}
                                                height={60}
                                                className="rounded-full  object-cover shadow-lg"
                                            />

                                        </div>

                                    </motion.div>
                                )}



                                {[...messages]
                                    .sort((a, b) => (a?.timestamp ?? 0) - (b?.timestamp ?? 0))
                                    .map((msg, index) => (
                                        <div key={`${msg._id}-${msg.timestamp}-${index}`} className="flex flex-col gap-6 pb-44">
                                            {msg.userInput && (
                                                <div className="flex justify-end">
                                                    <div className="p-3 rounded-lg bg-white/10 text-gray-300 max-w-xs w-fit break-words">
                                                        <p>{msg.userInput}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {msg.aiResponse && (
                                                <div className="flex justify-start">
                                                    <div className="p-3 rounded-lg bg-black text-white max-w-xs w-fit break-words">
                                                        <p>{msg.aiResponse}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>

                        </div>

                        <PromptInput reflection={reflection} setReflection={setReflection} onSubmit={handleSubmit} />
                    </div>
                </div>

            </div>
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[90%] max-w-sm space-y-4">
                        <h2 className="text-lg font-semibold">Clear all chat history?</h2>
                        <p className="text-sm text-gray-600">This action cannot be undone.</p>
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearChat}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Yes, clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
