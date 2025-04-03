import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-gradient">404</span>
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound