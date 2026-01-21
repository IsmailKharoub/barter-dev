"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Globe,
  Clock,
  Briefcase,
  Package,
  MessageSquare,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  Save,
  FileText,
  Calendar,
  User,
  Link2,
  Trash2,
  Send,
  X,
  ChevronDown,
} from "lucide-react";

interface Application {
  _id: string;
  name: string;
  email: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  tradeType: string;
  tradeDescription: string;
  website?: string;
  additionalInfo?: string;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  notes?: Array<{ text: string; createdAt: string }>;
  emails?: Array<{ subject: string; template?: string; sentAt: string }>;
}

type EmailTemplate = "accepted" | "rejected" | "more-info" | "follow-up" | "custom";

const emailTemplates: { value: EmailTemplate; label: string }[] = [
  { value: "custom", label: "Custom Email" },
  { value: "accepted", label: "Acceptance" },
  { value: "rejected", label: "Rejection" },
  { value: "more-info", label: "Request More Info" },
  { value: "follow-up", label: "Follow Up" },
];

const statusOptions = [
  { value: "pending", label: "Pending", icon: Clock, color: "yellow" },
  { value: "reviewing", label: "Reviewing", icon: Eye, color: "blue" },
  { value: "accepted", label: "Accepted", icon: CheckCircle, color: "green" },
  { value: "rejected", label: "Rejected", icon: XCircle, color: "red" },
];

export default function ApplicationDetail({ applicationId }: { applicationId: string }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const router = useRouter();

  // Email composer state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>("custom");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  // Load template content when template changes
  useEffect(() => {
    if (emailTemplate !== "custom" && showEmailModal && application) {
      loadEmailTemplate(emailTemplate);
    }
  }, [emailTemplate, showEmailModal]);

  const loadEmailTemplate = async (template: EmailTemplate) => {
    setLoadingTemplate(true);
    try {
      const response = await fetch(
        `/api/admin/send-email?applicationId=${applicationId}&template=${template}`
      );
      const data = await response.json();
      if (data.success) {
        setEmailSubject(data.template.subject);
        setEmailBody(data.template.body);
      }
    } catch (error) {
      console.error("Error loading template:", error);
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) return;

    setSendingEmail(true);
    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          template: emailTemplate,
          subject: emailSubject,
          body: emailBody,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Refresh application to show new email in history
        await fetchApplication();
        setShowEmailModal(false);
        setEmailTemplate("custom");
        setEmailSubject("");
        setEmailBody("");
      } else {
        alert("Failed to send email: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };

  const openEmailModal = () => {
    setEmailTemplate("custom");
    setEmailSubject("");
    setEmailBody("");
    setShowEmailModal(true);
  };

  // Lock body scroll when email modal is open
  useEffect(() => {
    if (showEmailModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEmailModal]);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`);
      const data = await response.json();

      if (data.success) {
        setApplication(data.application);
        setSelectedStatus(data.application.status);
      } else if (response.status === 401) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!application) return;

    setSaving(true);
    try {
      const payload: { status?: string; note?: string } = {};
      
      if (selectedStatus !== application.status) {
        payload.status = selectedStatus;
      }
      
      if (newNote.trim()) {
        payload.note = newNote.trim();
      }

      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setApplication(data.application);
        setNewNote("");
        setSelectedStatus(data.application.status);
      }
    } catch (error) {
      console.error("Error updating application:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!application) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-fg-muted">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-fg-primary mb-2">Application Not Found</h2>
          <p className="text-fg-muted mb-6">The application you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const hasChanges = selectedStatus !== application.status || newNote.trim().length > 0;

  return (
    <div className="min-h-screen bg-bg-primary pb-12">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-secondary/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 text-fg-muted hover:text-fg-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={openEmailModal}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Send Email</span>
              </button>
              {hasChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleUpdate}
                  disabled={saving}
                  className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </motion.button>
              )}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-bg-tertiary border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !deleting && setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mb-4 mx-auto">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-fg-primary text-center mb-2">
                Delete Application?
              </h2>
              <p className="text-fg-muted text-center mb-6">
                This will permanently delete the application from{" "}
                <span className="text-fg-primary font-medium">{application?.name}</span>.
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-bg-tertiary border border-border-subtle rounded-lg text-fg-primary hover:border-white/30 disabled:opacity-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Composer Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !sendingEmail && setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-secondary border border-border-subtle rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
                <div>
                  <h2 className="text-xl font-bold text-fg-primary">Send Email</h2>
                  <p className="text-sm text-fg-muted">
                    To: {application?.email}
                  </p>
                </div>
                <button
                  onClick={() => setShowEmailModal(false)}
                  disabled={sendingEmail}
                  className="p-2 text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4">
                {/* Template Selector */}
                <div>
                  <label className="block text-sm font-medium text-fg-primary mb-2">
                    Template
                  </label>
                  <div className="relative">
                    <select
                      value={emailTemplate}
                      onChange={(e) => setEmailTemplate(e.target.value as EmailTemplate)}
                      disabled={loadingTemplate || sendingEmail}
                      className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-fg-primary appearance-none focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all disabled:opacity-50"
                    >
                      {emailTemplates.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted pointer-events-none" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-fg-primary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    disabled={loadingTemplate || sendingEmail}
                    placeholder="Email subject..."
                    className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-fg-primary placeholder:text-fg-muted/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-fg-primary mb-2">
                    Message
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    disabled={loadingTemplate || sendingEmail}
                    placeholder="Write your message..."
                    rows={12}
                    className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-xl text-fg-primary placeholder:text-fg-muted/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all resize-none font-mono text-sm leading-relaxed disabled:opacity-50"
                  />
                </div>

                {loadingTemplate && (
                  <p className="text-sm text-fg-muted flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Loading template...
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-subtle bg-bg-tertiary/50">
                <button
                  onClick={() => setShowEmailModal(false)}
                  disabled={sendingEmail}
                  className="px-4 py-2 bg-bg-tertiary border border-border-subtle rounded-lg text-fg-primary hover:border-white/30 disabled:opacity-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={sendingEmail || !emailSubject.trim() || !emailBody.trim()}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {sendingEmail ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950/20 border-t-stone-950 rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-fg-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Applicant Information
              </h2>
              <div className="space-y-4">
                <InfoRow label="Name" value={application.name} icon={User} />
                <InfoRow label="Email" value={application.email} icon={Mail} />
                {application.website && (
                  <InfoRow 
                    label="Website" 
                    value={application.website} 
                    icon={Link2}
                    link={application.website}
                  />
                )}
                <InfoRow
                  label="Applied"
                  value={new Date(application.createdAt).toLocaleString()}
                  icon={Calendar}
                />
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-fg-primary mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                What They Need
              </h2>
              <div className="space-y-4">
                <InfoRow
                  label="Project Type"
                  value={formatLabel(application.projectType)}
                  icon={FileText}
                />
                <InfoRow
                  label="Timeline"
                  value={formatLabel(application.timeline)}
                  icon={Clock}
                />
                <div>
                  <label className="flex items-center gap-2 text-xs text-fg-muted uppercase tracking-wider mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Description
                  </label>
                  <p className="text-fg-primary bg-bg-tertiary rounded-xl p-4 leading-relaxed">
                    {application.projectDescription}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trade Offer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-fg-primary mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                What They Offer
              </h2>
              <div className="space-y-4">
                <InfoRow
                  label="Trade Type"
                  value={formatLabel(application.tradeType)}
                  icon={Package}
                />
                <div>
                  <label className="flex items-center gap-2 text-xs text-fg-muted uppercase tracking-wider mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Description
                  </label>
                  <p className="text-fg-primary bg-bg-tertiary rounded-xl p-4 leading-relaxed">
                    {application.tradeDescription}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            {application.additionalInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-fg-primary mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Additional Information
                </h2>
                <p className="text-fg-primary bg-bg-tertiary rounded-xl p-4 leading-relaxed">
                  {application.additionalInfo}
                </p>
              </motion.div>
            )}

            {/* Technical Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
            >
              <h2 className="text-sm font-medium text-fg-muted uppercase tracking-wider mb-4">
                Technical Details
              </h2>
              <div className="space-y-2 text-xs text-fg-muted font-mono">
                <p>IP: {application.ipAddress}</p>
                <p>User Agent: {application.userAgent}</p>
                {application.referrer && <p>Referrer: {application.referrer}</p>}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Management */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-lg font-bold text-fg-primary mb-4">Status</h3>
              <div className="space-y-3">
                {statusOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedStatus === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedStatus(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isSelected
                          ? `bg-${option.color}-400/10 border-2 border-${option.color}-400/50 text-${option.color}-400`
                          : "bg-bg-tertiary border-2 border-transparent text-fg-secondary hover:text-fg-primary hover:bg-bg-tertiary/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle">
                <label className="block text-sm font-medium text-fg-primary mb-2">
                  Add Note
                </label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add internal note..."
                  rows={3}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-subtle rounded-lg text-fg-primary placeholder:text-fg-muted/50 text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all resize-none"
                />
              </div>
            </motion.div>

            {/* Notes History */}
            {application.notes && application.notes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-fg-primary mb-4">Notes</h3>
                <div className="space-y-3">
                  {application.notes.map((note, index) => (
                    <div
                      key={index}
                      className="bg-bg-tertiary rounded-lg p-3 border border-border-subtle"
                    >
                      <p className="text-sm text-fg-primary mb-2">{note.text}</p>
                      <p className="text-xs text-fg-muted">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Email History */}
            {application.emails && application.emails.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-bg-secondary border border-border-subtle rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-fg-primary mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email History
                </h3>
                <div className="space-y-3">
                  {application.emails.map((email, index) => (
                    <div
                      key={index}
                      className="bg-bg-tertiary rounded-lg p-3 border border-border-subtle"
                    >
                      <p className="text-sm text-fg-primary font-medium mb-1 truncate">
                        {email.subject}
                      </p>
                      {email.template && email.template !== "custom" && (
                        <p className="text-xs text-amber-400 mb-1">
                          Template: {email.template}
                        </p>
                      )}
                      <p className="text-xs text-fg-muted">
                        {new Date(email.sentAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
  link,
}: {
  label: string;
  value: string;
  icon: any;
  link?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-tertiary flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-fg-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-fg-muted uppercase tracking-wider mb-1">{label}</p>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 truncate block underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-fg-primary">{value}</p>
        )}
      </div>
    </div>
  );
}

function formatLabel(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

