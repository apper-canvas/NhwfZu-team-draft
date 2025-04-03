import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 bg-primary rounded-lg rotate-6"></div>
              <div className="absolute inset-0 bg-accent rounded-lg -rotate-6"></div>
              <div className="absolute inset-0 bg-white dark:bg-surface-800 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">TD</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-surface-800 dark:text-white">TeamDraft</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Home</a>
            <a href="#contests" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Contests</a>
            <a href="#my-teams" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">My Teams</a>
            <a href="#leaderboard" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Leaderboard</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className="md:hidden p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button className="hidden md:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
                <a href="/" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Home</a>
                <a href="#contests" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Contests</a>
                <a href="#my-teams" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">My Teams</a>
                <a href="#leaderboard" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Leaderboard</a>
                <button className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="relative w-8 h-8 mr-2">
                  <div className="absolute inset-0 bg-primary rounded-lg rotate-6"></div>
                  <div className="absolute inset-0 bg-accent rounded-lg -rotate-6"></div>
                  <div className="absolute inset-0 bg-white dark:bg-surface-800 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">TD</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-surface-800 dark:text-white">TeamDraft</span>
              </div>
              <p className="text-sm text-surface-500 mt-2">Create virtual teams. Compete. Win.</p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="font-semibold text-surface-800 dark:text-white mb-2">Company</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="text-sm text-surface-500 hover:text-primary dark:hover:text-primary-light">About Us</a></li>
                  <li><a href="#" className="text-sm text-surface-500 hover:text-primary dark:hover:text-primary-light">Careers</a></li>
                  <li><a href="#" className="text-sm text-surface-500 hover:text-primary dark:hover:text-primary-light">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-surface-800 dark:text-white mb-2">Support</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="text-sm text-surface-500 hover:text-primary dark:hover:text-primary-light">Help Center</a></li>
                  <li><a href="#" className="text-sm text-surface-500 hover:text-primary dark:hover:text-primary-light">Terms of Service</a></li>
                  <li><a href="#" className="text-sm text-surface-500 hover:text-primary dark:hover:text-primary-light">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-surface-200 dark:border-surface-700 text-center text-sm text-surface-500">
            <p>© 2023 TeamDraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App