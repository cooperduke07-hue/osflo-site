export function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        OS<span>flo</span>
      </a>
      <a href="#audit" className="btn btn--primary btn--sm">
        Get the Free Audit
      </a>
    </nav>
  )
}

