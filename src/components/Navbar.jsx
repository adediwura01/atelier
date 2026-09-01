import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          setScrolled(currentScrollY > 50)

          if (currentScrollY < 100) {
            setVisible(true)
          } else if (currentScrollY > lastScrollY.current) {
            setVisible(false)
            setIsOpen(false)
          } else {
            setVisible(true)
          }

          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/studio', label: 'Studio' },
    { path: '/contact', label: 'Contact' },
  ]

  const isHome = location.pathname === '/'

  return (
    <motion.header
      className={`navbar ${scrolled ? 'is-scrolled' : ''} ${isHome ? 'is-home' : ''}`}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          ATELIER '09
        </Link>

        <nav className={`navbar__nav ${isOpen ? 'navbar__nav--open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar__link ${
                location.pathname === item.path ? 'navbar__link--active' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className={`navbar__toggle ${isOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.header>
  )
}
