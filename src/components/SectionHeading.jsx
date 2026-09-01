import './SectionHeading.css'

export default function SectionHeading({ label, title, align = 'left', level = 'h2' }) {
  const HeadingTag = level
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label && (
        <span className="section-heading__label">{label}</span>
      )}
      {title && (
        <HeadingTag className="section-heading__title">{title}</HeadingTag>
      )}
    </div>
  )
}
