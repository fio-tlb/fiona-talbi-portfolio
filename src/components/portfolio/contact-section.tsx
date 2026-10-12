import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Download, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";
import { publicPath } from "@/lib/public-path";

export function ContactSection() {
  const { profile, sectionContent, documents } = usePortfolio();
  const content = sectionContent.contact;
  const emailRef = useRef<HTMLAnchorElement>(null);
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
      // The message stays until the next attempt; the address is selected for a manual copy.
      if (emailRef.current) window.getSelection()?.selectAllChildren(emailRef.current);
      setCopyStatus("error");
    }
  };

  // Same visible text in the real button and in the slot reserved before hydration.
  const copyLabels = (
    <span className="copy-labels" aria-hidden="true">
      <span className="copy-idle">{content.copyVisibleLabel}</span>
      <span className="copy-done">
        {content.copiedVisibleLabel}
        <Check size={15} strokeWidth={2.25} />
      </span>
    </span>
  );

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-titre">
      <div className="site-wrap">
        <div className="contact-card" data-reveal>
          <div className="contact-intro">
            <p className="section-eyebrow">{content.label}</p>
            <h2 className="section-title" id="contact-titre">
              {content.title}
            </h2>
            <p className="contact-copy">
              {profile.cvPath ? content.description : content.descriptionWithoutCv}
            </p>
          </div>
          <div className="contact-main">
            <div className="contact-email-row">
              <a className="contact-email" href={"mailto:" + profile.email} ref={emailRef}>
                <Mail className="contact-email-icon" size={20} strokeWidth={1.75} aria-hidden />
                <span className="contact-email-text">{profile.email}</span>
              </a>
              {canCopy ? (
                <button
                  className="copy-button"
                  type="button"
                  onClick={copyEmail}
                  aria-label={content.copyLabel}
                  data-copied={copyStatus === "copied" ? "" : undefined}
                >
                  {copyLabels}
                </button>
              ) : (
                <span className="copy-button copy-slot" aria-hidden="true">
                  {copyLabels}
                </span>
              )}
            </div>
            <p className="contact-status" role="status" aria-live="polite" aria-atomic="true">
              {copyStatus === "copied"
                ? content.copiedLabel
                : copyStatus === "error"
                  ? content.copyErrorLabel
                  : ""}
            </p>
            <ul className="contact-actions" role="list">
              {profile.cvPath && (
                <li>
                  <a
                    className="action action-light"
                    href={publicPath(profile.cvPath)}
                    download={profile.cvPath.split("/").pop()}
                  >
                    <Download size={16} aria-hidden />
                    {content.cvLabel}
                  </a>
                </li>
              )}
              {documents.coverLetter && (
                <li>
                  <a
                    className="action action-light document-action"
                    href={publicPath(documents.coverLetter)}
                    download
                  >
                    <Download size={16} aria-hidden />
                    {content.coverLetterLabel}
                  </a>
                </li>
              )}
              <li>
                <a
                  className="action action-outline-light"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} aria-hidden />
                  {content.linkedinLabel}
                  <ArrowUpRight size={16} aria-hidden />
                  <span className="sr-only">{sectionContent.newTabLabel}</span>
                </a>
              </li>
            </ul>
            <p className="print-only">
              {content.printLinkedinLabel}
              {profile.linkedin}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
