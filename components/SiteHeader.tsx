import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="header">
      <div className="shell header-bar">
        <Link href="/" className="brand">
          <span className="brand-mark">SD</span>
          Signal Dispatch
        </Link>
        <nav className="nav">
          <Link href="/#latest">Latest</Link>
          <Link href="/#coverage">Coverage</Link>
          <Link href="/#newsletter">Editorial</Link>
        </nav>
      </div>
    </header>
  );
}
