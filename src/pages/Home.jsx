import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectMarquee from '../components/ProjectMarquee'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { projects } from '../data/projects'
import './Home.css'

export default function Home() {
  const featuredProjects = projects.slice(0, 4)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40])

  return (
    <div className="home">
      <section className="hero" ref={heroRef}>
        <div
          className="hero__image"
          style={{ backgroundImage: 'url(/images/hero-bg1.jpg)' }}
          role="img"
          aria-label="Atelier '09 architecture studio hero image"
        ></div>
        <div className="hero__overlay"></div>
        <div className="container">
          <motion.div
            className="hero__content"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              ATELIER '09
            </motion.h1>
            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              CONTEMPORARY ARCHITECTURE<br />
              AND INTERIOR DESIGN
            </motion.p>
            <motion.p
              className="hero__statement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              We create spaces with a focus on form, material and permanence.
              Each project is an exploration of how architecture can shape
              human experience through precision and restraint.
            </motion.p>
          </motion.div>
        </div>
        <div className="hero__scroll-indicator">
          <span>Scroll</span>
        </div>
      </section>

      <section className="section featured">
        <div className="container">
          <SectionHeading
            label="Selected Work"
            title="Featured Projects"
            align="left"
          />
          <ProjectMarquee projects={featuredProjects} />
          <div className="featured__cta">
            <Button to="/projects">View All Projects</Button>
          </div>
        </div>
      </section>

      <section className="section studio-intro">
        <div className="container">
          <div className="studio-intro__grid">
            <div className="studio-intro__left">
              <SectionHeading
                label="About"
                title="Atelier '09"
                align="left"
              />
            </div>
            <div className="studio-intro__right">
              <p>
                Founded in 2009, Atelier '09 is a contemporary architecture
                and interior design studio based in Lagos, Nigeria. We work
                across residential, commercial and cultural projects,
                bringing a rigorous approach to each commission.
              </p>
              <p>
                Our practice is rooted in the belief that architecture should
                be both beautiful and functional, that materials should be
                honest, and that spaces should be designed to last.
              </p>
              <div className="studio-intro__stats">
                <div className="studio-intro__stat">
                  <span className="studio-intro__stat-number">15+</span>
                  <span className="studio-intro__stat-label">Years of Practice</span>
                </div>
                <div className="studio-intro__stat">
                  <span className="studio-intro__stat-number">40+</span>
                  <span className="studio-intro__stat-label">Completed Projects</span>
                </div>
                <div className="studio-intro__stat">
                  <span className="studio-intro__stat-number">12</span>
                  <span className="studio-intro__stat-label">Design Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section philosophy">
        <div className="container">
          <SectionHeading
            label="Our Approach"
            title="Selected Work"
            align="center"
          />
          <div className="philosophy__grid">
            {[
              {
                title: 'FORM',
                description: 'We pursue architectural form through rigorous investigation. Each project begins with a deep understanding of context, program and site, allowing geometry to emerge naturally from constraints.',
              },
              {
                title: 'MATERIAL',
                description: 'Material honesty guides our selection. Concrete, timber, steel and glass are used with precision, allowing their inherent qualities to define the character of each space.',
              },
              {
                title: 'SPACE',
                description: 'Space is not merely a byproduct of form but a primary design element. We craft sequences of enclosure, light and view to create experiences that resonate.',
              },
              {
                title: 'LIGHT',
                description: 'Light shapes how we perceive architecture. We design buildings that choreograph natural light throughout the day, creating spaces that feel alive and responsive to their environment.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="philosophy__item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <h3 className="philosophy__title">{item.title}</h3>
                <p className="philosophy__description">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="container">
          <div className="cta__inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="cta__title">Have a project in mind?</h2>
              <p className="cta__text">
                We would like to hear about your project.
              </p>
              <Button to="/contact">Start a Conversation</Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
