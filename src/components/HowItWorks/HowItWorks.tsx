'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Smile, Pencil, LineChart, Sparkles, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';


const steps = [
    {
        id: 1,
        title: "Choose Your Mood",
        desc: "Select how you're feeling from a wide range of expressive emojis or descriptive mood tags to better understand and acknowledge your emotional state in the moment.",
        icon: <Smile className="w-10 h-10 drop-shadow drop-shadow-glow" />,
        color: "text-pink-300",
        image: "/m6.png",
    },
    {
        id: 2,
        title: "Add a Note",
        desc: "Write a short note about what’s been influencing your mood—whether it's a situation, a conversation, or simply a thought—to give your feelings more context and meaning.",
        icon: <Pencil className="w-10 h-10 drop-shadow drop-shadow-glow" />,
        color: "text-blue-300",
        image: "/m7.png",
    },
    {
        id: 3,
        title: "Track Progress",
        desc: "Visualize your emotional patterns over time with easy-to-read charts and summaries, helping you reflect on changes, spot triggers, and celebrate your growth.",
        icon: <LineChart className="w-10 h-10 drop-shadow drop-shadow-glow" />,
        color: "text-purple-300",
        image: "/tr1.png",
    },
    {
        id: 4,
        title: "Feel Better",
        desc: "Access personalized affirmations, gentle reflections, and uplifting tips designed to guide you toward a calmer, more balanced, and positive state of mind.",
        icon: <Sparkles className="w-10 h-10 drop-shadow drop-shadow-glow" />,
        color: "text-amber-500",
        image: "/m10.png",
    }


];

const generateRandomProperties = () => {
    return Array(30).fill(null).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: `${Math.random() * 0.5 + 0.3}`,
    }));
};

const HowItWorks = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [randomProperties, setRandomProperties] = useState<{ top: string; left: string; opacity: string }[]>([]);

    useEffect(() => {
        setRandomProperties(generateRandomProperties());
    }, []); // Ensures values are consistent after hydration

    return (
        <section className="relative pt-20 bg-black/10 text-white">

            <div className="absolute inset-0 flex justify-center items-center -z-10 pointer-events-none mt-[14rem]">
                {/* Black Blur Background */}
                <div className="absolute inset-0 bg-black opacity-30 blur-[100px]"></div>

                {/* Blue Glow */}
                <div className="w-[600px] h-[500px] rounded-full bg-pink-100 opacity-10 blur-[120px]"></div>
            </div>

            <div className="absolute inset-0 -z-10 pointer-events-none w-[80%] mx-auto">
                {randomProperties.map((props, i) => (
                    <div
                        key={i}
                        className="absolute w-[5px] h-[5px] bg-white rounded-full"
                        style={{
                            top: props.top,
                            left: props.left,
                            opacity: props.opacity,
                            filter: "blur(1px) brightness(1.5)"
                        }}
                    ></div>
                ))}
            </div>

            <div className="container mx-auto px-6 text-center space-y-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        How It <span className="bg-gradient-to-r from-blue-300 via-white to-pink-300 bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Why Track Mood?</p>
                </div>

                {/* Active Step Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mx-auto">
                    <Image src={steps[activeIndex].image} alt="Step illustration" width={500} height={400} className="rounded-xl mt-8" />

                    <div className="flex flex-col items-start">
                        <ul className="flex justify-center gap-3 text-gray-600 text-sm mt-4">
                            {steps.map((step, index) => (
                                <li
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`rounded-full border p-2 h-8 w-8 flex items-center justify-center text-center font-medium cursor-pointer transition-all duration-200 ${activeIndex === index ? 'bg-pink-400 text-white border-none' : 'border-gray-600'
                                        }`}
                                >
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                        <div className='flex flex-col gap-2.5 mt-10'>
                            <div className={` flex text-4xl ${steps[activeIndex].color}`}>
                                <span className="drop-shadow-glow">{steps[activeIndex].icon}</span>
                            </div>
                            <h1 className="text-3xl text-white font-semibold text-left">
                                {steps[activeIndex].title}
                            </h1>
                            <p className="text-gray-400 text-lg text-left max-w-[500px]">
                                {steps[activeIndex].desc}
                            </p>
                        </div>
                        <div className='mt-6'>
                            
                                <button
                                onClick={() => signIn("google")}
                                    className="text-gray-900 py-2 px-8 rounded-md font-bold flex items-center gap-2 shadow-md cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(to right, #bfdbfe, #ffffff, #fbcfe8)',
                                    }}
                                >
                                    Get Started
                                    <ArrowRight />
                                </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;