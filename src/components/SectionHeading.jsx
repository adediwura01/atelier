import './SectionHeading.css'

export default function SectionHeading({ label, title, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label && (
        <span className="section-heading__label">{label}</span>
      )}
      {title && (
        <h2 className="section-heading__title">{title}</h2>
      )}
    </div>
  )
}
