
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-gray-600 bg-background/80 backdrop-blur-lg mt-20">
            {/* Top border glow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/30 to-transparent"></div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo and Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="flex items-center gap-1 pb-2">
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
                        <p className="text-sm text-gray-300">
                            © {new Date().getFullYear()} moodtraker - All rights reserved
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-x-12 gap-y-2 text-sm">
                        <Link
                            href="/about"
                            className="text-muted-foreground hover:text-pink-500 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/terms"
                            className="text-muted-foreground hover:text-pink-500 transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-muted-foreground hover:text-pink-500 transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/contact"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/blog"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/help"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Help
                        </Link>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded-md bg-background/50">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-mono">SYSTEM OPERATIONAL</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;