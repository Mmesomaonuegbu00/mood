
'use client'
import ProfileDashboard from '@/components/Sections/Dashboard/ProfleWrapper'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'

const Home = () => {

   const { data: session, status } = useSession();
    const router = useRouter();


  useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null;

  // ✅ Check if `id` exists

  return (
    <Suspense>
        <ProfileDashboard/>
    </Suspense>
  )
}

export default Home
