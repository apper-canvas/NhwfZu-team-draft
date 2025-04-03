import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Users, Calendar, TrendingUp, ChevronRight, Star, Clock } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [selectedSport, setSelectedSport] = useState('cricket')
  
  const sports = [
    { id: 'cricket', name: 'Cricket', icon: '🏏', matches: 12 },
    { id: 'football', name: 'Football', icon: '⚽', matches: 8 },
    { id: 'basketball', name: 'Basketball', icon: '🏀', matches: 6 },
    { id: 'baseball', name: 'Baseball', icon: '⚾', matches: 4 }
  ]
  
  const upcomingMatches = {
    cricket: [
      { id: 1, teams: 'IND vs AUS', time: 'Today, 7:00 PM', prize: '₹10 Crores', entryFee: '₹49' },
      { id: 2, teams: 'ENG vs NZ', time: 'Tomorrow, 3:30 PM', prize: '₹5 Crores', entryFee: '₹99' },
      { id: 3, teams: 'SA vs PAK', time: 'Wed, 6:00 PM', prize: '₹2 Crores', entryFee: '₹199' }
    ],
    football: [
      { id: 4, teams: 'MUN vs LIV', time: 'Today, 9:30 PM', prize: '₹8 Crores', entryFee: '₹149' },
      { id: 5, teams: 'BAR vs RMA', time: 'Tomorrow, 1:00 AM', prize: '₹7 Crores', entryFee: '₹249' }
    ],
    basketball: [
      { id: 6, teams: 'LAL vs BOS', time: 'Today, 8:00 AM', prize: '₹3 Crores', entryFee: '₹99' },
      { id: 7, teams: 'GSW vs BKN', time: 'Tomorrow, 7:30 AM', prize: '₹2 Crores', entryFee: '₹49' }
    ],
    baseball: [
      { id: 8, teams: 'NYY vs BOS', time: 'Today, 5:30 AM', prize: '₹1 Crore', entryFee: '₹29' },
      { id: 9, teams: 'LAD vs SFG', time: 'Tomorrow, 6:00 AM', prize: '₹1.5 Crores', entryFee: '₹59' }
    ]
  }
  
  const stats = [
    { label: 'Active Users', value: '2.5M+', icon: <Users className="w-5 h-5 text-primary" /> },
    { label: 'Contests Daily', value: '1000+', icon: <Trophy className="w-5 h-5 text-primary" /> },
    { label: 'Sports Covered', value: '8+', icon: <Calendar className="w-5 h-5 text-primary" /> },
    { label: 'Prize Pool', value: '₹50Cr+', icon: <TrendingUp className="w-5 h-5 text-primary" /> }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Create Your <span className="text-gradient">Dream Team</span>, <br />
                Win <span className="text-gradient">Real Rewards</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-surface-600 dark:text-surface-300 mb-8"
              >
                Select real players, create virtual teams, and compete based on actual performance. Join millions of fans in the ultimate fantasy sports experience.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="btn-primary">Get Started</button>
                <button className="btn-outline">How It Works</button>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
                <div className="card-neu p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Top Performers</h3>
                    <span className="badge-primary">LIVE</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Virat Kohli', team: 'IND', points: 186, position: 'Batsman' },
                      { name: 'Joe Root', team: 'ENG', points: 172, position: 'Batsman' },
                      { name: 'Jasprit Bumrah', team: 'IND', points: 165, position: 'Bowler' }
                    ].map((player, index) => (
                      <div key={index} className="flex items-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                          {player.name.charAt(0)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <span className="font-semibold">{player.name}</span>
                            <span className="font-bold text-primary">{player.points} pts</span>
                          </div>
                          <div className="flex justify-between text-xs text-surface-500">
                            <span>{player.team} • {player.position}</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-accent mr-1" />
                              <span>Selected by 87%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-sm flex items-center justify-center text-primary hover:text-primary-dark dark:hover:text-primary-light">
                    View All Players <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-surface-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sports Selection Section */}
      <section className="py-12 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Choose Your Sport</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Select from a variety of sports and join contests with real-time scoring based on actual player performance.
            </p>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide pb-4 mb-8 gap-4">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`flex-shrink-0 flex flex-col items-center p-4 rounded-xl transition-all ${
                  selectedSport === sport.id 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <span className="text-2xl mb-2">{sport.icon}</span>
                <span className="font-medium">{sport.name}</span>
                <span className="text-xs mt-1 opacity-80">{sport.matches} matches</span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches[selectedSport].map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card group hover:shadow-lg dark:hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{match.teams}</h3>
                    <span className="badge-accent flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {match.time}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-xs text-surface-500 mb-1">Prize Pool</p>
                      <p className="font-bold text-lg text-gradient">{match.prize}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-surface-500 mb-1">Entry</p>
                      <p className="font-semibold">{match.entryFee}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 btn-primary">Create Team</button>
                    <button className="px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section className="py-16 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Build Your Dream Team</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Select players within your budget, choose a captain and vice-captain, and compete for rewards.
            </p>
          </div>
          
          <MainFeature />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join millions of fantasy sports enthusiasts and start creating your winning teams today.
          </p>
          <button className="px-8 py-3 bg-white text-primary hover:bg-surface-100 rounded-lg font-bold transition-colors">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home