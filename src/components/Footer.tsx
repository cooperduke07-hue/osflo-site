export function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">
          OS<span>Flo</span>
        </div>
        <div className="footer-sub">AI accounting operations for Australian SMBs. Built by accountants, not just developers.</div>
      </div>
      <div className="footer-links">
        <a href="mailto:hello@osflo.com.au" className="footer-link">
          hello@osflo.com.au
        </a>
        <a
          href="https://linkedin.com/company/osflo"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">OSFlo 2026. All rights reserved.</span>
        <span className="footer-copy">osflo.com.au</span>
      </div>
    </footer>
  )
}
