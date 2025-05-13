/* eslint-disable @next/next/no-img-element */
'use client'
export const dynamic = 'force-dynamic'
import React, { useState, useEffect, Suspense } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
    X,
    Home,
    BookOpen,
    BarChart,
    Lightbulb,
    Settings,
    BellIcon,
    MenuIcon,
    Mic,

} from 'lucide-react'

import Journal from '@/components/Sections/JournalComponent/Journal'
import Affirmations from '@/components/Sections/Affirmations/Affirmations'
import Analytics from '@/components/Sections/Analytics/Analytics'
import Setting from '@/components/Sections/Settings/Setting'
import Dashboard from '@/components/Sections/Dashboard/Dashboard'
import ErrorBoundary from '@/components/ErrorBoundary'


const navLinks = [
    { genre: "dashboard", text: "Dashboard", icon: <Home />, color: "hover:text-blue-300" },
    { genre: "journal", text: "Mood Journal", icon: <BookOpen />, color: "hover:text-pink-300" },
    { genre: "analytics", text: "Analytics", icon: <BarChart />, color: "hover:text-purple-300" },
    { genre: "affirmations", text: "Affirmations", icon: <Lightbulb />, color: "hover:text-yellow-300" },
    { genre: "settings", text: "Settings", icon: <Settings />, color: "hover:text-gray-300" },
]

const generateRandomProperties = (): { top: string; left: string; opacity: string }[] => {
    return Array.from({ length: 30 }, () => ({
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
        opacity: (Math.random() * 0.5 + 0.3).toFixed(2), // Limits opacity to 2 decimal places
    }));
};


const ProfileDashboard = () => {
    const { data: session } = useSession();

    const searchParams = useSearchParams()
    const router = useRouter()
    const genre = searchParams.get('genre') || 'dashboard'
    const [active, setActive] = useState(0)
    const [showProfile, setShowProfile] = useState(false)
    const [randomProperties, setRandomProperties] = useState<{ top: string; left: string; opacity: string }[]>([]);
    const [currentDate, setCurrentDate] = useState("");
    const [hasNotifications] = useState(true);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)

    // Mock notification state
    const closeSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen)
    }


    useEffect(() => {
        if (!genre) {
            router.replace('/profile?genre=dashboard')
        }
    }, [genre, router])




    useEffect(() => {
        setRandomProperties(generateRandomProperties());
    }, []);

    useEffect(() => {
        const index = navLinks.findIndex(link => link.genre === genre)
        setActive(index === -1 ? 0 : index)
    }, [genre])

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        }));
    }, []);

    useEffect(() => {
        document.body.style.overflow = isSideNavOpen ? 'hidden' : 'auto';
    }, [isSideNavOpen]);

    if (!genre) return null

    return (

        <div className='relative'>
            <div className="flex justify-between bg-black py-4 border-b border-white/10 px-2 lg:px-6 shadow-lg">
                <div className='flex gap-2'>
                    <MenuIcon className='w-8 h-8 cursor-pointer  text-white  lg:hidden font-extrabold' onClick={closeSideNav} />
                    <Link href="/" className="flex items-center gap-1">
                        <div className="w-[40px] animate-glow">

                            <img
                                src="/tr1.png"
                                alt="logo"
                                className="drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]"
                            />
                        </div>
                        <span className="text-2xl font-bold font-mono">
                            Mood<span className="text-pink-300">Tracker</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    {/* Date Display */}
                    <p className="text-white text-sm md:block hidden">{currentDate}</p>

                    {/* Notification Bell with Red Dot */}
                    <div className="relative">
                        <BellIcon className="w-6 h-6 text-white cursor-pointer" />
                        {hasNotifications && (
                            <span className="absolute top-0 right-0 bg-pink-500 w-3 h-3 rounded-full"></span>
                        )}
                    </div>

                    {/* User Button */}
                    {session?.user?.image && (
                        <img
                            src={session.user.image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full border border-pink-300"
                        />
                    )}
                </div>
            </div>

            {/* Layout */}
            <div className='grid lg:grid-cols-12 h-full min-h-screen bg-[#030203] w-full'>
                {/* Sidebar */}
                <div className='lg:flex flex-col hidden col-span-2 bg-[#16131a]/20 backdrop-blur-lg pt-6 px-6 border-r border-white/10 shadow-lg h-full'>
                    <ul className="space-y-8 text-gray-300 pt-8 overflow-auto flex-1 pr-2">
                        {navLinks.map((link, index) => (
                            <li key={index} className={`cursor-pointer ${active === index ? 'font-bold bg-pink-300/10 rounded-lg p-2 text-pink-300' : ''}`}>
                                <button
                                    onClick={() => {
                                        setActive(index)
                                        router.push(`?genre=${link.genre}`)
                                    }}
                                    className={`${link.color} transition duration-300 flex items-center gap-2`}
                                >
                                    <span className='text-sm'>{link.icon}</span>
                                    {link.text}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Bottom Section */}
                    <div className="sticky bottom-10 left-0">
                        <div className='text-gray-300 bg-pink-300/10 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.01)] border border-white/10 p-6 rounded-xl'>
                            <ul className='space-y-4'>
                                <li>
                                    <button onClick={() => setShowProfile(true)} className="hover:text-green-300 transition duration-300">
                                        👤 View Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-sm text-pink-400 hover:underline"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                {isSideNavOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
                        <div className="col-span-2 bg-[#16131a]/20 backdrop-blur-lg pt-6 px-6 border-r border-white/10  w-3/4 h-full p-6 space-y-6">
                            <button onClick={() => setIsSideNavOpen(false)} className="text-white">
                                <X />
                            </button>
                            <ul className="space-y-8 text-gray-300 pt-8 overflow-auto flex-1 pr-2">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => {
                                                setActive(index)
                                                router.push(`?genre=${link.genre}`)
                                                closeSideNav()
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            {link.icon}
                                            {link.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>


                            <ul className='space-y-4'>
                                <li>
                                    <button onClick={() => setShowProfile(true)} className="hover:text-green-300 transition duration-300">
                                        👤 View Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-sm text-pink-400 hover:underline"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}


                {/* Main Section */}
                <main className="px-6 flex flex-col lg:col-span-10 pt-6 relative">
                    <div className="absolute inset-0 pointer-events-none w-[80%] mx-auto">
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


                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none mt-[14rem]">
                        <div className="absolute inset-0 bg-black opacity-30 blur-[100px]"></div>
                        <div className="w-[1000px] h-[400px] lg:h-[300px] xl:h-[500px] rounded-full bg-blue-950 opacity-10 blur-[120px]"></div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ErrorBoundary>
                            {genre === 'dashboard' && <Dashboard />}
                            {genre === 'journal' && <Journal />}
                            {genre === 'analytics' && <Analytics />}
                            {genre === 'affirmations' && <Affirmations />}
                            {genre === 'settings' && <Setting />}
                        </ErrorBoundary>
                    </Suspense>
                </main>
            </div>
            <Mic className='sticky left-[86%] bottom-16 font-bold text-white p-2 bg-pink-400 rounded-full w-10 h-10 xl:hidden' />
            {/* User Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
                    <button
                        onClick={() => setShowProfile(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    {session?.user?.image && (
                        <img
                            src={session.user.image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full border border-pink-300"
                        />
                    )}
                </div>
            )}
        </div>

    )
}

export default ProfileDashboard
