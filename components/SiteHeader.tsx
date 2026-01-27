import Link from "next/link";

export function SiteHeader() {
  return (
    <header>
      <div className="topbar">
        <div className="shell topbar-inner">
          <span>Breaking: Build your newsroom with Sanity-powered publishing.</span>
          <div className="topbar-links">
            <Link href="/contact">Subscribe</Link>
            <Link href="/contact">Advertise</Link>
            <Link href="/contact">Log in</Link>
          </div>
        </div>
      </div>

      <div className="shell header">
        <div className="masthead">
          <Link href="/" className="brand">
            <span className="brand-mark">SD</span>
            <span>
              Signal Dispatch
              <em>Business Magazine</em>
            </span>
          </Link>
          <div className="search-bar">
            <span>Search</span>
            <input
              type="search"
              placeholder="Markets, policy, startups..."
              aria-label="Search"
            />
          </div>
          <Link href="/contact" className="btn btn-primary">
            Subscribe
          </Link>
        </div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/news">News</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
