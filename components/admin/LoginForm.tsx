"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "marvel2025";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setAuthError("Invalid password. Please try again.");
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="glass-dark rounded-3xl p-10 w-full max-w-md border border-border-dark">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display font-bold text-xl">M</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-text-dark">Admin Dashboard</h1>
          <p className="text-muted-dark text-sm mt-1">Marvel Group CMS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
              Password
            </label>
            <input
              type="password"
              className={inputCls}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {authError && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {authError}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
          >
            {isLoading ? "Signing in..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
