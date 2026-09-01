import { motion } from 'framer-motion'
import './ImageReveal.css'

export default function ImageReveal({ src, alt, className }) {
  return (
    <div className={`image-reveal ${className || ''}`}>
      <motion.div
        className="image-reveal__inner"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <img src={src} alt={alt} loading="lazy" />
      </motion.div>
    </div>
  )
}
