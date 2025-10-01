"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, DoorOpen } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useClientSideNullableAuth } from "@/lib/firebase/clientApp";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useEffect } from "react";
import { initAuthCookies } from "@/lib/firebase/cookies";

export function Navbar() {
  const { user } = useClientSideNullableAuth();

  useEffect(() => {
    initAuthCookies();
  }, []);

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signInWithGoogle();
  };

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
              <Heart className="h-4 w-4 text-pink-300 fill-pink-300 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-gray-900">PookiePlum</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex space-x-4">
            {user ? (
              <>
                <Link href="/app" className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {user.displayName?.charAt(0)?.toUpperCase() ||
                        user.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900">
                    Go to App
                  </span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  type="button"
                >
                  Sign Out <DoorOpen />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm">Try PookiePlum</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignIn}
                  type="button"
                >
                  Sign in with <FcGoogle />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
