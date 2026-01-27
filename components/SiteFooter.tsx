import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-title">Signal Dispatch</div>
          <p>
            A modern business magazine template powered by Next.js and Sanity.
            Publish with confidence, scale with clarity.
          </p>
        </div>
        <div>
          <div className="footer-title">Sections</div>
          <div className="footer-links">
            <Link href="/news">Business</Link>
            <Link href="/news">Markets</Link>
            <Link href="/news">Startups</Link>
            <Link href="/news">Economy</Link>
            <Link href="/news">Culture</Link>
          </div>
        </div>
        <div>
          <div className="footer-title">Contact</div>
          <div className="footer-note">
            <span>newsroom@signaldispatch.com</span>
            <span>Brooklyn, NY</span>
            <span>+1 (555) 012-1122</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
