"use client";
import { setCookie, deleteCookie } from "cookies-next";
import { onIdTokenChanged } from "./auth";

// Set up automatic cookie management for Firebase auth
export function initAuthCookies() {
  onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      setCookie("__session", token, {
        maxAge: 60 * 60 * 24 * 5, // 5 days
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    } else {
      deleteCookie("__session");
    }
  });
}

export function clearAuthCookies() {
  deleteCookie("__session");
}
