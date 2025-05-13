"use client";

import React from "react";

interface PromptInputProps {
    reflection: string;
    setReflection: (value: string) => void;
    onSubmit: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ reflection, setReflection, onSubmit }) => {
    return (
        
            <div className="relative pb-16 w-full   p-4 shadow-lg   bg-black">
                <textarea
                    className="w-full p-3 rounded-lg bg-pink-300/10 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.01)] text-white"
                    placeholder="Write about your day..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                ></textarea>
                <div>
                    <button
                        onClick={onSubmit}
                        className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-300 to-pink-300 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        
    );
};

export default PromptInput;
