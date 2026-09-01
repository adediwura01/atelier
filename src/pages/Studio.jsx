import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import ImageReveal from '../components/ImageReveal'
import './Studio.css'

export default function Studio() {
  const philosophyItems = [
    {
      title: 'FORM',
      image: '/images/form.png',
      description:
        'We pursue architectural form through rigorous investigation. Each project begins with a deep understanding of context, program and site, allowing geometry to emerge naturally from constraints.',
    },
    {
      title: 'MATERIAL',
      image: '/images/material.png',
      description:
        'Material honesty guides our selection. Concrete, timber, steel and glass are used with precision, allowing their inherent qualities to define the character of each space.',
    },
    {
      title: 'SPACE',
      image: '/images/space.png',
      description:
        'Space is not merely a byproduct of form but a primary design element. We craft sequences of enclosure, light and view to create experiences that resonate.',
    },
    {
      title: 'LIGHT',
      image: '/images/light.png',
      description:
        'Light shapes how we perceive architecture. We design buildings that choreograph natural light throughout the day, creating spaces that feel alive and responsive to their environment.',
    },
  ]

  return (
    <div className="studio">
      <div className="studio__hero">
        <div className="container">
          <SectionHeading
            label="Studio"
            title="Atelier '09"
            align="left"
          />
          <div className="studio__hero-text">
            <p>
              Atelier '09 is a contemporary architecture and interior design studio
              founded on the principle that great architecture emerges from a deep
              understanding of place, material and human experience.
            </p>
            <p>
              Based in Lagos, Nigeria, we work across a range of scales and
              typologies, from private residences to cultural institutions. Every
              project is approached with the same commitment to precision,
              restraint and timeless design.
            </p>
          </div>
        </div>
      </div>

      <section className="studio__philosophy">
        <div className="container">
          <SectionHeading
            label="Philosophy"
            title="How We Work"
            align="center"
          />
          <div className="studio__philosophy-grid">
            {philosophyItems.map((item, index) => (
              <div key={item.title} className="studio__philosophy-item">
                <ImageReveal src={item.image} alt={item.title} />
                <div className="studio__philosophy-content">
                  <h3 className="studio__philosophy-title">{item.title}</h3>
                  <p className="studio__philosophy-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="studio__info">
        <div className="container">
          <div className="studio__info-grid">
            <div className="studio__info-block">
              <h3 className="studio__info-label">Practice</h3>
              <p>
                Atelier '09 was established in 2009 with a focus on contemporary
                architecture that responds to its context. Our work spans
                residential, commercial and cultural projects across Nigeria
                and beyond.
              </p>
            </div>
            <div className="studio__info-block">
              <h3 className="studio__info-label">Expertise</h3>
              <ul className="studio__info-list">
                <li>Architecture</li>
                <li>Interior Design</li>
                <li>Masterplanning</li>
                <li>Furniture Design</li>
              </ul>
            </div>
            <div className="studio__info-block">
              <h3 className="studio__info-label">Recognition</h3>
              <ul className="studio__info-list">
                <li>Architectural Digest Award, 2023</li>
                <li>Nigerian Institute of Architects Prize, 2022</li>
                <li>Wallpaper* Design Award, 2021</li>
                <li>Dezeen Awards Shortlist, 2020</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="studio__cta">
        <div className="container">
          <div className="studio__cta-inner">
            <h2>Work with us</h2>
            <p>
              We are always open to discussing new projects and collaboration
              opportunities.
            </p>
            <Button to="/contact">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
