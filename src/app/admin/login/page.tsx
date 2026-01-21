"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, LogIn, AlertCircle, Info } from "lucide-react";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid authentication code");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-6 mx-auto">
            <Shield className="w-8 h-8 text-fg-primary" />
          </div>

          <h1 className="text-2xl font-bold text-fg-primary text-center mb-2">
            Admin Login
          </h1>
          <p className="text-fg-muted text-center mb-8">
            Enter code from your authenticator app
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="sr-only">
                Authentication Code
              </label>
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                maxLength={6}
                pattern="[0-9]{6}"
                className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-fg-primary text-center text-2xl font-mono tracking-widest placeholder:text-fg-muted/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all"
                required
                autoFocus
                autoComplete="off"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs"
            >
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Using Authenticator App</p>
                <p className="text-blue-300/80">
                  Open Google Authenticator, Authy, or similar app and enter the 6-digit code.
                </p>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || token.length !== 6}
              className="w-full px-4 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border-subtle">
            <p className="text-xs text-fg-muted text-center">
              Need to set up? Visit{" "}
              <a
                href="/api/admin/setup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                /api/admin/setup
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

