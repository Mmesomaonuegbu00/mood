import { PencilIcon, SmileIcon, HeartIcon, StarIcon } from 'lucide-react';
import React from 'react';

const CallToAction = () => {
    return (
        <section className="relative bg-black/15 py-20 text-white overflow-hidden text-center flex flex-col items-center">
            {/* Soft Blur Glow */}
            {/* <div className="absolute inset-0 flex justify-center items-center -z-10 pointer-events-none">
                <div className="w-[700px] h-[700px] rounded-full bg-blue-400/20 blur-[100px]"></div>
            </div> */}

            <div className="container mx-auto px-6 relative z-10 space-y-8 flex flex-col items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Start Your <span className='bg-gradient-to-r from-blue-300 via-white to-pink-300 bg-clip-text text-transparent'>Mood Journal</span> Today
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Take a moment to reflect. Logging your emotions daily helps you understand yourself better and build a positive mindset.
                    </p>
                </div>

                {/* Prompt Section with Vertical Line */}
                <div className="flex items-center gap-4 lg:gap-10">
                    {/* Vertical Line */}
                    <div className="w-[2px] h-[300px] bg-gray-500"></div>

                    {/* Prompts + Icons */}
                    <div className="flex flex-col gap-6">
                        {[
                            { text: "What made you smile today?", icon: SmileIcon, color: "bg-purple-400" },
                            { text: "One thing you're grateful for?", icon: HeartIcon, color: "bg-blue-400" },
                            { text: "What emotion will you focus on tomorrow?", icon: StarIcon, color: "bg-pink-400" },
                            { text: "Start Journaling", icon: PencilIcon, color: "bg-green-400" }

                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2  lg:gap-6 text-left p-1.5 lg:p-4 bg-opacity-10 backdrop-blur-md rounded-lg shadow-md hover:bg-opacity-20 transition duration-300">
                                {/* Icon inside a colored rounded background */}
                                <div className={`p-2.5 rounded-full flex items-center justify-center ${item.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}>
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

               
               
            </div>
        </section>
    );
};

export default CallToAction;