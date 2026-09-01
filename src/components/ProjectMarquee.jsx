import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import './ProjectMarquee.css'

export default function ProjectMarquee({ projects }) {
  const trackRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [trackWidth, setTrackWidth] = useState(0)
  const x = useMotionValue(0)
  const animationRef = useRef(null)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const width = trackRef.current.scrollWidth / 2
        setTrackWidth(width)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [projects])

  const animate = useCallback(
    (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }

      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isPaused && trackWidth > 0) {
        const speed = 0.04
        let currentX = x.get()
        currentX -= delta * speed

        if (Math.abs(currentX) >= trackWidth) {
          currentX += trackWidth
        }

        x.set(currentX)
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [isPaused, trackWidth, x]
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  const handleDragStart = () => {
    lastTimeRef.current = null
  }

  const handleDragEnd = () => {
    lastTimeRef.current = null
  }

  const renderCard = (project, index) => (
    <Link
      to={`/projects/${project.id}`}
      className="project-marquee__card"
      key={`${project.id}-${index}`}
    >
      <div className="project-marquee__image-wrap">
        <div
          className="project-marquee__image"
          style={{ backgroundImage: `url(${project.heroImage})` }}
          role="img"
          aria-label={`${project.title} - ${project.location}`}
        ></div>
      </div>
      <div className="project-marquee__meta">
        <span className="project-marquee__number">{project.number}</span>
        <div className="project-marquee__info">
          <h3 className="project-marquee__title">{project.title}</h3>
          <div className="project-marquee__details">
            <span>{project.location}</span>
            <span>{project.year}</span>
            <span>{project.category}</span>
          </div>
        </div>
      </div>
    </Link>
  )

  return (
    <div
      className="project-marquee"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        lastTimeRef.current = null
        setIsPaused(false)
      }}
    >
      <motion.div
        ref={trackRef}
        className="project-marquee__track"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: -trackWidth,
          right: 0,
        }}
        dragElastic={0.05}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project, i) => renderCard(project, i))}
        {projects.map((project, i) => renderCard(project, i + projects.length))}
      </motion.div>
      <div className="project-marquee__hint">
        <span>Drag to explore</span>
      </div>
    </div>
  )
}
