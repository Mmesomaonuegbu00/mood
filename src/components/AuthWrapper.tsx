'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import { ReactNode } from "react";


export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const logAction = useMutation(api.userHistory.logUserAction);

  useEffect(() => {
    if (session?.user?.email) { // ✅ Changed from userId to email
      logAction({
        email: session.user.email, // ✅ Using email instead of userId
        action: "User logged in",
        timestamp: Date.now(),
      });
    }
  }, [session?.user?.email, logAction]); // ✅ Runs once when email or logAction changes

  // console.log(logAction)
  // console.log(session?.user)
  return <>{children}</>;
}