import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="shell" style={{ padding: "64px 0" }}>
        <div className="page-hero">
          <span className="story-tag">About</span>
          <h1 className="article-title">A newsroom built for clarity.</h1>
          <p className="feature-excerpt">
            Signal Dispatch is designed for editorial teams that move fast and
            publish with confidence. Sanity handles the workflow while Next.js
            delivers a premium reading experience.
          </p>
        </div>
        <div className="prose">
          <h2>Our mission</h2>
          <p>
            We focus on clear reporting, grounded analysis, and a publishing flow
            that keeps teams aligned. The system is built so your client owns the
            content pipeline while the site remains secure and fast.
          </p>
          <h2>How it works</h2>
          <p>
            Editors and writers publish in Sanity, assign categories, and schedule
            releases. The website pulls the latest content and renders it
            instantly across every page.
          </p>
          <h2>What teams love</h2>
          <p>
            Flexible schemas, editorial oversight, and a layout that feels like a
            premium magazine without custom engineering every month.
          </p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: "16px" }}>
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
