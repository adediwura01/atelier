import './ProjectMeta.css'

export default function ProjectMeta({ project }) {
  return (
    <div className="project-meta">
      <div className="project-meta__item">
        <span className="project-meta__label">Location</span>
        <span className="project-meta__value">{project.location}</span>
      </div>
      <div className="project-meta__item">
        <span className="project-meta__label">Year</span>
        <span className="project-meta__value">{project.year}</span>
      </div>
      <div className="project-meta__item">
        <span className="project-meta__label">Category</span>
        <span className="project-meta__value">{project.category}</span>
      </div>
    </div>
  )
}
