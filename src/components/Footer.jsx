import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <Link to="/" className="footer__logo">
            ATELIER '09
          </Link>
          <p className="footer__tagline">
            Contemporary Architecture<br />and Interior Design
          </p>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <div className="footer__nav">
            <Link to="/projects" className="footer__link">Projects</Link>
            <Link to="/studio" className="footer__link">Studio</Link>
            <Link to="/contact" className="footer__link">Contact</Link>
          </div>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Atelier '09. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
