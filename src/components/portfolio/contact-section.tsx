import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Linkedin, Mail } from "lucide-react";
import { profile, sectionContent } from "@/data/portfolio";

export function ContactSection() {
  const content = sectionContent.contact;
  const [canCopy, setCanCopy] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    setCanCopy(typeof navigator.clipboard?.writeText === "function");
  }, []);
  useEffect(() => {
    if (copyStatus !== "copied") return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact-section site-wrap">
      <div className="contact-panel" data-reveal>
        <p className="section-eyebrow">
          <span>{content.number}</span>
          {content.label}
        </p>
        <h2>
          {content.title}
          <br />
          <span>{content.accent}</span>
        </h2>
        <p className="contact-copy">{content.description}</p>
        <div className="contact-email-row">
          <a className="contact-email" href={"mailto:" + profile.email}>
            {profile.email}
          </a>
          {canCopy && (
            <button
              className="copy-button"
              type="button"
              onClick={copyEmail}
              aria-label={copyStatus === "copied" ? content.copiedLabel : content.copyLabel}
            >
              {copyStatus === "copied" ? (
                <Check size={15} aria-hidden />
              ) : (
                <Copy size={15} aria-hidden />
              )}
            </button>
          )}
        </div>
        <p className="contact-status" role="status" aria-live="polite" aria-atomic="true">
          {copyStatus === "copied"
            ? content.copiedLabel
            : copyStatus === "error"
              ? content.copyErrorLabel
              : ""}
        </p>
        <div className="contact-actions">
          <a className="action action-primary" href={"mailto:" + profile.email}>
            <Mail size={15} aria-hidden />
            {content.emailLabel}
          </a>
          <a
            className="action action-secondary"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={15} aria-hidden />
            {content.linkedinLabel}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
