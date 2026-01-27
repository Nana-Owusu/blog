import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function ContactPage() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="shell" style={{ padding: "64px 0" }}>
        <div className="page-hero">
          <span className="story-tag">Contact</span>
          <h1 className="article-title">Reach the editorial desk.</h1>
          <p className="feature-excerpt">
            Send story tips, partnership requests, or press inquiries. We respond
            quickly for breaking news collaborations.
          </p>
        </div>
        <div className="story-grid">
          {[
            { title: "Email", value: "newsroom@signaldispatch.com" },
            { title: "Phone", value: "+1 (555) 012-1122" },
            { title: "Office", value: "212 Dispatch Lane, Suite 4B, Brooklyn" },
            { title: "Social", value: "@signaldispatch" },
          ].map((item) => (
            <div key={item.title} className="story-card">
              <div className="story-card-body">
                <span className="story-tag">{item.title}</span>
                <h3 className="story-title">{item.value}</h3>
              </div>
            </div>
          ))}
        </div>
        <Link href="/" className="btn btn-outline" style={{ marginTop: "24px" }}>
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
