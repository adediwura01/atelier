import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.projectType) newErrors.projectType = 'Please select a project type'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: '',
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="contact">
      <div className="container">
        <SectionHeading
          label="Enquiry"
          title="Start a Conversation"
          align="left"
        />

        <div className="contact__grid">
          <div className="contact__info">
            <p>
              We would love to hear about your project. Please fill out the
              form and we will get back to you within a few days.
            </p>
            <div className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-label">Email</span>
                <span className="contact__detail-value">studio@atelier09.com</span>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-label">Phone</span>
                <span className="contact__detail-value">+234 81 4922-8175</span>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-label">Address</span>
                <span className="contact__detail-value">
                  14A Victoria Island<br />
                  Lagos, Nigeria
                </span>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap">
            {isSubmitted ? (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3>Thank you</h3>
                <p>
                  Your enquiry has been received. We will be in touch shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label htmlFor="name" className="contact__label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'contact__input--error' : ''}
                  />
                  {errors.name && (
                    <span className="contact__error">{errors.name}</span>
                  )}
                </div>

                <div className="contact__field">
                  <label htmlFor="email" className="contact__label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'contact__input--error' : ''}
                  />
                  {errors.email && (
                    <span className="contact__error">{errors.email}</span>
                  )}
                </div>

                <div className="contact__field">
                  <label htmlFor="projectType" className="contact__label">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={errors.projectType ? 'contact__input--error' : ''}
                  >
                    <option value="">Select a type</option>
                    <option value="architecture">Architecture</option>
                    <option value="interiors">Interiors</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  {errors.projectType && (
                    <span className="contact__error">{errors.projectType}</span>
                  )}
                </div>

                <div className="contact__field">
                  <label htmlFor="budget" className="contact__label">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select a range</option>
                    <option value="under-50k">Under $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k-plus">$500,000+</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message" className="contact__label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'contact__input--error' : ''}
                  ></textarea>
                  {errors.message && (
                    <span className="contact__error">{errors.message}</span>
                  )}
                </div>

                <Button type="submit">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
