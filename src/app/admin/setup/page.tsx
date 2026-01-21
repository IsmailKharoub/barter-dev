"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Copy, CheckCircle, AlertCircle, Smartphone } from "lucide-react";
import Image from "next/image";

interface SetupData {
  secret: string;
  qrCode: string;
  instructions: string[];
}

export default function AdminSetupPage() {
  const [setupData, setSetupData] = useState<SetupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSetup();
  }, []);

  const fetchSetup = async () => {
    try {
      const response = await fetch("/api/admin/setup");
      const data = await response.json();

      if (data.success) {
        setSetupData(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to load setup page");
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    if (setupData?.secret) {
      navigator.clipboard.writeText(setupData.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-fg-muted">Loading setup...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6 mx-auto">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-fg-primary mb-4">Setup Not Available</h1>
            <p className="text-fg-muted mb-6">{error}</p>
            <a
              href="/admin/login"
              className="inline-block px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all"
            >
              Go to Login
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6 mx-auto">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>

          <h1 className="text-3xl font-bold text-fg-primary text-center mb-2">
            Admin Authentication Setup
          </h1>
          <p className="text-fg-muted text-center mb-8">
            Set up two-factor authentication for your admin panel
          </p>

          <div className="space-y-8">
            {/* Step 1: Install App */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-bg-tertiary rounded-xl p-6 border border-border-subtle"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl font-semibold text-fg-primary">
                  Install Authenticator App
                </h2>
              </div>
              <p className="text-fg-secondary mb-4">
                Download one of these authenticator apps on your phone:
              </p>
              <div className="flex flex-wrap gap-3">
                {["Google Authenticator", "Authy", "Microsoft Authenticator", "1Password"].map(
                  (app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 bg-bg-secondary rounded-lg text-sm text-fg-primary border border-border-subtle flex items-center gap-2"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      {app}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Step 2: Scan QR Code */}
            {setupData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-bg-tertiary rounded-xl p-6 border border-border-subtle"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl font-semibold text-fg-primary">Scan QR Code</h2>
                </div>
                <p className="text-fg-secondary mb-6">
                  Open your authenticator app and scan this QR code:
                </p>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-2xl">
                    <Image
                      src={setupData.qrCode}
                      alt="QR Code"
                      width={200}
                      height={200}
                      className="w-48 h-48"
                    />
                  </div>
                </div>
                <p className="text-xs text-fg-muted text-center mb-4">
                  Can't scan? Enter the secret manually:
                </p>
                <div className="flex items-center gap-2 p-3 bg-bg-secondary rounded-lg border border-border-subtle">
                  <code className="flex-1 text-sm font-mono text-fg-primary text-center">
                    {setupData.secret}
                  </code>
                  <button
                    onClick={copySecret}
                    className="px-3 py-1.5 bg-bg-tertiary hover:bg-bg-tertiary/80 rounded-lg transition-all flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-fg-muted" />
                        <span className="text-xs text-fg-muted">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Configure Environment */}
            {setupData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-bg-tertiary rounded-xl p-6 border border-border-subtle"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl font-semibold text-fg-primary">
                    Configure Environment
                  </h2>
                </div>
                <p className="text-fg-secondary mb-4">
                  Add this to your <code className="text-fg-primary">.env.local</code> file:
                </p>
                <div className="bg-bg-secondary rounded-lg p-4 border border-border-subtle">
                  <pre className="text-sm font-mono text-fg-primary overflow-x-auto">
                    ADMIN_TOTP_SECRET={setupData.secret}
                  </pre>
                </div>
              </motion.div>
            )}

            {/* Step 4: Restart & Login */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-bg-tertiary rounded-xl p-6 border border-border-subtle"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
                  4
                </div>
                <h2 className="text-xl font-semibold text-fg-primary">Restart & Login</h2>
              </div>
              <ol className="space-y-2 text-fg-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-fg-muted mt-1">•</span>
                  <span>Save your .env.local file</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fg-muted mt-1">•</span>
                  <span>Restart your development server</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fg-muted mt-1">•</span>
                  <span>Go to the login page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fg-muted mt-1">•</span>
                  <span>Enter the 6-digit code from your authenticator app</span>
                </li>
              </ol>
            </motion.div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <a
                href="/admin/login"
                className="px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Go to Login
              </a>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                Important Security Notes
              </h3>
              <ul className="text-xs text-yellow-300/80 space-y-1">
                <li>• Keep your secret key secure - never share it publicly</li>
                <li>• Back up your secret key in a secure password manager</li>
                <li>• This page will not be accessible once TOTP is configured</li>
                <li>• If you lose access, you'll need to regenerate the secret</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

