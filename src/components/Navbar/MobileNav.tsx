/* eslint-disable @next/next/no-img-element */
'use client';
import { DumbbellIcon, HomeIcon, LogIn, UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface MobileNavProps {
  openNav: boolean;
  closeNav: () => void;
}

const MobileNav = ({ openNav, closeNav }: MobileNavProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isSignedIn = !!session?.user;

  // Redirect if signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/profile');
    }
  }, [isSignedIn, router]);

  // Lock body scroll
  useEffect(() => {
    if (openNav) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [openNav]);

  return (
    <div>
      {openNav && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/50">
          <div className="bg-black/10 backdrop-blur-md border border-white/20 h-screen w-[70%] sm:w-[50%] max-w-xs">
            <nav className="grid px-8 gap-5 text-white pt-[4rem]">
              <X className='w-8 h-6 mb-16' onClick={closeNav} />

              <Link href="/" onClick={closeNav} className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors">
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>

              <Link href="/generate-program" onClick={closeNav} className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors">
                <DumbbellIcon size={16} />
                <span>Generate</span>
              </Link>

              <Link href="/profile" onClick={closeNav} className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors">
                <UserIcon size={16} />
                <span>Profile</span>
              </Link>

             
              {isSignedIn ? (
                <div className="flex items-center gap-2">
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
              ) : (
                <button
                  onClick={() => signIn()}
                  className="text-gray-200 py-1.5 rounded-[4px] font-bold text-center hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  Sign In
                  <LogIn size={16} />
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
