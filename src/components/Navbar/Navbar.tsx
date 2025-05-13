/* eslint-disable @next/next/no-img-element */
'use client'
import { HomeIcon, DumbbellIcon, LogIn, MenuIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

interface NavbarProps {
  openNav: () => void;
}

const Navbar = ({ openNav }: NavbarProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isSignedIn = !!session?.user;

  useEffect(() => {
    if (isSignedIn) {
      router.push('/profile');
    }
  }, [isSignedIn, router]);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-b-gray-600 py-3'>
      <div className='container mx-auto flex items-center justify-between px-2'>
        <Link href="/" className="flex items-center gap-1">
          <div className="w-[40px] animate-glow">
            <img
              src="/tr1.png"
              alt="image"
              className="drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]"
            />
          </div>
          <span className="text-2xl font-bold font-mono">
            Mood<span className="text-pink-300">Tracker</span>
          </span>
        </Link>

        <nav className="lg:flex hidden items-center gap-5 cursor-pointer">
          <Link href="/" className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors">
            <HomeIcon size={16} />
            <span>Home</span>
          </Link>

          <Link href="/generate-program" className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors">
            <DumbbellIcon size={16} />
            <span>About us</span>
          </Link>

          <Link href="/profile" className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors">
            <UserIcon size={16} />
            <span>Profile</span>
          </Link>

          {isSignedIn ? (
            <>
              <button className="ml-2 border border-pink-300 py-1.5 px-6 text-pink-300 hover:text-white hover:bg-pink-300 font-bold text-center rounded-lg cursor-pointer">
                <Link href="/generate-program">Get Started</Link>
              </button>

              <div className="flex items-center gap-2 ml-4">
                {session?.user?.image && (
                  <img
                    src={session.user.image}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-pink-300"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm text-pink-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-gray-200 py-1.5 px-4 rounded-[4px] font-bold text-center hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              Sign In
              <LogIn size={16} />
            </button>
          )}
        </nav>

        <MenuIcon className='w-8 h-8 cursor-pointer text-white lg:hidden font-extrabold' onClick={openNav} />
      </div>
    </header>
  )
}

export default Navbar
