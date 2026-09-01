import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/projects/${project.id}`} className="project-card">
        <div className="project-card__image-wrap">
          <div
            className="project-card__image"
            style={{ backgroundImage: `url(${project.heroImage})` }}
            role="img"
            aria-label={`${project.title} - ${project.location}`}
          ></div>
          <div className="project-card__overlay"></div>
        </div>
        <div className="project-card__meta">
          <span className="project-card__number">{project.number}</span>
          <div className="project-card__info">
            <h3 className="project-card__title">{project.title}</h3>
            <div className="project-card__details">
              <span>{project.location}</span>
              <span>{project.year}</span>
              <span>{project.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
