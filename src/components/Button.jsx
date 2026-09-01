import { Link } from 'react-router-dom'
import './Button.css'

export default function Button({ to, href, children, variant = 'primary', onClick, type = 'button' }) {
  const className = `button button--${variant}`

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return <button type={type} className={className} onClick={onClick}>{children}</button>
}
