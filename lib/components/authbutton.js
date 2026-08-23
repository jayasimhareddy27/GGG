"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";

export const AuthButton = ({ isMobile = false, onMobileAction }) => {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);

  // Loading skeleton state
  if (status === "loading") {
    return <div className="h-9 w-28 bg-brand-border/30 animate-pulse rounded-full" />;
  }

  // Mobile View Rendering
  if (isMobile) {
    return (
      <div className="pt-2 border-t border-brand-border/40">
        {session?.user ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-3 px-3 py-2">
              <span className="text-sm font-semibold text-brand-primary">
                {session.user.name}
              </span>
            </div>
            <button
              onClick={() => {
                if (onMobileAction) onMobileAction();
                signOut({ callbackUrl: "/" });
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 font-medium hover:bg-brand-accent/20 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              if (onMobileAction) onMobileAction();
              signIn("google");
            }}
            className="btn-brand-primary w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-base shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887c-.58 2.319-2.72 4.057-5.523 4.057-3.328 0-6.025-2.697-6.025-6.025s2.697-6.025 6.025-6.025c1.49 0 2.85.55 3.9 1.45l2.42-2.42C18.42 3.01 15.5 2 12.24 2 6.706 2 2.22 6.486 2.22 12s4.486 10 10.02 10c5.78 0 9.6-4.06 9.6-9.77 0-.67-.07-1.32-.19-1.945H12.24z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        )}
      </div>
    );
  }

  // Desktop View Rendering
  return session?.user ? (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center space-x-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-full hover:bg-brand-accent/40 transition shadow-sm"
      >

        <span className="text-sm font-semibold text-brand-primary">
          {session.user.name || "My Account"}
        </span>
      </button>

      {/* User Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-surface border border-brand-border rounded-xl shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-brand-border/40">
            <p className="text-xs text-brand-muted">Signed in as</p>
            <p className="text-sm font-medium truncate text-brand-primary">
              {session.user.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-brand-accent/20 transition-colors font-medium"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="btn-brand-primary flex items-center space-x-2 px-4 py-2 rounded-full text-sm shadow-sm transition hover:scale-105"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.24 10.285V13.4h6.887c-.58 2.319-2.72 4.057-5.523 4.057-3.328 0-6.025-2.697-6.025-6.025s2.697-6.025 6.025-6.025c1.49 0 2.85.55 3.9 1.45l2.42-2.42C18.42 3.01 15.5 2 12.24 2 6.706 2 2.22 6.486 2.22 12s4.486 10 10.02 10c5.78 0 9.6-4.06 9.6-9.77 0-.67-.07-1.32-.19-1.945H12.24z" />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};