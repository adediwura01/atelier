import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectMeta from '../components/ProjectMeta'
import Button from '../components/Button'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { id } = useParams()
  const projectIndex = projects.findIndex((p) => p.id === id)
  const project = projects[projectIndex]

  if (!project) {
    return (
      <div className="project-detail container">
        <p>Project not found.</p>
        <Link to="/projects">Back to projects</Link>
      </div>
    )
  }

  const prevProject = projects[projectIndex - 1]
  const nextProject = projects[projectIndex + 1]

  return (
    <div className="project-detail">
      <div className="project-detail__hero">
        <div
          className="project-detail__hero-image"
          style={{ backgroundImage: `url(${project.heroImage})` }}
          role="img"
          aria-label={`${project.title} - ${project.location}`}
        ></div>
        <div className="project-detail__hero-content container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="project-detail__number">{project.number}</span>
            <h1 className="project-detail__title">{project.title}</h1>
            <ProjectMeta project={project} />
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="project-detail__main">
          <div className="project-detail__description">
            <h2 className="project-detail__section-title">About the Project</h2>
            <p>{project.description}</p>
          </div>

          <div className="project-detail__stats">
            <h2 className="project-detail__section-title">Project Information</h2>
            <div className="project-detail__stats-grid">
              <div className="project-detail__stat">
                <span className="project-detail__stat-label">Area</span>
                <span className="project-detail__stat-value">{project.stats.area}</span>
              </div>
              <div className="project-detail__stat">
                <span className="project-detail__stat-label">Completed</span>
                <span className="project-detail__stat-value">{project.stats.completed}</span>
              </div>
              <div className="project-detail__stat">
                <span className="project-detail__stat-label">Status</span>
                <span className="project-detail__stat-value">{project.stats.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="project-detail__gallery">
          <h2 className="project-detail__section-title">Gallery</h2>
          <div className="project-detail__gallery-grid">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                className="project-detail__gallery-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="project-detail__gallery-image"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="project-detail__navigation">
          {prevProject && (
            <Link to={`/projects/${prevProject.id}`} className="project-detail__nav-link">
              <span className="project-detail__nav-label">Previous Project</span>
              <span className="project-detail__nav-title">{prevProject.title}</span>
            </Link>
          )}
          {nextProject && (
            <Link to={`/projects/${nextProject.id}`} className="project-detail__nav-link">
              <span className="project-detail__nav-label">Next Project</span>
              <span className="project-detail__nav-title">{nextProject.title}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
