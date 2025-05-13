import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect unauthenticated users to login
  },
  callbacks: {
    authorized: ({ token }) => {
      // If no token (not logged in), redirect away from protected routes
      if (!token) return false;
      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Remove "/profile" since it's restricted already
};