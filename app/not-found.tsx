import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="shell" style={{ padding: "80px 0" }}>
        <div className="empty-state">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>
            Story not found
          </h1>
          <p style={{ marginTop: "12px" }}>
            The story you are looking for is missing or unpublished.
          </p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: "20px" }}>
            Return to newsroom
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
