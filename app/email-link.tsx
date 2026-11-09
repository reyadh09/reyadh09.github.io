"use client";

export default function EmailLink() {
  function openEmail() {
    // Obfuscation deters basic HTML scraping; it is not encryption.
    const recipient = window.atob("c2Vvbmdob0B1b3MuYWMua3I=");
    window.location.assign(`mailto:${recipient}`);
  }

  return (
    <button type="button" className="email-link" onClick={openEmail} title="Open your email app">
      <span className="profile-link-label">Email</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    </button>
  );
}
