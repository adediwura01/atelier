import { motion } from 'framer-motion'
import './PageTransition.css'

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
