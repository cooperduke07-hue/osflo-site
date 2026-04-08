export function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">
          OS<span>Flo</span>
        </div>
        <div className="footer-sub">Automated client systems for service businesses.</div>
      </div>
      <div className="footer-links">
        <a href="mailto:cooper@osflo.com.au" className="footer-link">
          cooper@osflo.com.au
        </a>
        <a
          href="https://instagram.com/osfloai"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Instagram
        </a>
        <a href="https://tiktok.com/@osfloai" target="_blank" rel="noopener noreferrer" className="footer-link">
          TikTok
        </a>
        <a href="#audit" className="footer-link">
          Get the Free Audit
        </a>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} OSFlo. All rights reserved.</span>
        <span className="footer-copy">ABN — osflo.com.au</span>
      </div>
    </footer>
  )
}

