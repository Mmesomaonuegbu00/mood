import { Smile, BarChart2, Heart, AudioWaveform } from 'lucide-react';
import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Log Your Emotions",
      desc: "Easily track how you feel each day and start noticing patterns over time.",
      icon: Smile,
    },
    {
      title: "Get Personalized Insights",
      desc: "Understand what affects your mood most — from habits to daily events.",
      icon: BarChart2,
    },
    {
      title: "Talk To Our Assistance",
      desc: "Understand what affects your mood most — from habits to daily events.",
      icon: AudioWaveform,
    },
    {
      title: "Stay Positive",
      desc: "Receive uplifting prompts, affirmations, and encouragement tailored to your journey.",
      icon: Heart,
    },
  ];

  return (
    <section className="bg-black/25 pt-20 text-white">
      <div className="container mx-auto px-6 text-center space-y-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Take Full Control of{' '}
            <span className="bg-gradient-to-r from-blue-300 via-white to-pink-300 bg-clip-text text-transparent">
              Your Mood
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We give you the tools to understand yourself better. Log your feelings, reflect, and take small steps toward a brighter mindset.
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 pt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" backdrop-blur-md rounded-xl p-6 shadow-lg  transition-all duration-300 hover:bg-white/10 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{feature.desc}</p>
              <div className="flex justify-center">
                <feature.icon
                  className="w-10 h-10 text-pink-500 animate-pulse drop-shadow-[0_0_10px_rgba(236,72,153,0.9)] "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
