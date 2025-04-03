import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown, ChevronUp, Star, AlertCircle, Check, X } from 'lucide-react'

const MainFeature = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [positionFilter, setPositionFilter] = useState('all')
  const [teamFilter, setTeamFilter] = useState('all')
  const [sortBy, setSortBy] = useState('points')
  const [captain, setCaptain] = useState(null)
  const [viceCaptain, setViceCaptain] = useState(null)
  const [budget, setBudget] = useState(100)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('error')
  
  // Sample player data
  const allPlayers = [
    { id: 1, name: 'Virat Kohli', team: 'IND', position: 'Batsman', points: 186, cost: 12, image: 'https://source.unsplash.com/random/100x100/?cricket,player,1' },
    { id: 2, name: 'Joe Root', team: 'ENG', position: 'Batsman', points: 172, cost: 11, image: 'https://source.unsplash.com/random/100x100/?cricket,player,2' },
    { id: 3, name: 'Jasprit Bumrah', team: 'IND', position: 'Bowler', points: 165, cost: 10.5, image: 'https://source.unsplash.com/random/100x100/?cricket,player,3' },
    { id: 4, name: 'Kane Williamson', team: 'NZ', position: 'Batsman', points: 158, cost: 10, image: 'https://source.unsplash.com/random/100x100/?cricket,player,4' },
    { id: 5, name: 'Ben Stokes', team: 'ENG', position: 'All-Rounder', points: 152, cost: 9.5, image: 'https://source.unsplash.com/random/100x100/?cricket,player,5' },
    { id: 6, name: 'Rashid Khan', team: 'AFG', position: 'Bowler', points: 148, cost: 9, image: 'https://source.unsplash.com/random/100x100/?cricket,player,6' },
    { id: 7, name: 'Babar Azam', team: 'PAK', position: 'Batsman', points: 145, cost: 9, image: 'https://source.unsplash.com/random/100x100/?cricket,player,7' },
    { id: 8, name: 'Pat Cummins', team: 'AUS', position: 'Bowler', points: 142, cost: 8.5, image: 'https://source.unsplash.com/random/100x100/?cricket,player,8' },
    { id: 9, name: 'Rohit Sharma', team: 'IND', position: 'Batsman', points: 138, cost: 8.5, image: 'https://source.unsplash.com/random/100x100/?cricket,player,9' },
    { id: 10, name: 'Shakib Al Hasan', team: 'BAN', position: 'All-Rounder', points: 135, cost: 8, image: 'https://source.unsplash.com/random/100x100/?cricket,player,10' },
    { id: 11, name: 'Jos Buttler', team: 'ENG', position: 'Wicket-Keeper', points: 132, cost: 8, image: 'https://source.unsplash.com/random/100x100/?cricket,player,11' },
    { id: 12, name: 'Trent Boult', team: 'NZ', position: 'Bowler', points: 128, cost: 7.5, image: 'https://source.unsplash.com/random/100x100/?cricket,player,12' },
    { id: 13, name: 'Quinton de Kock', team: 'SA', position: 'Wicket-Keeper', points: 125, cost: 7.5, image: 'https://source.unsplash.com/random/100x100/?cricket,player,13' },
    { id: 14, name: 'Mitchell Starc', team: 'AUS', position: 'Bowler', points: 122, cost: 7, image: 'https://source.unsplash.com/random/100x100/?cricket,player,14' },
    { id: 15, name: 'KL Rahul', team: 'IND', position: 'Batsman', points: 118, cost: 7, image: 'https://source.unsplash.com/random/100x100/?cricket,player,15' }
  ]
  
  // Filter and sort players
  const filteredPlayers = allPlayers
    .filter(player => !selectedPlayers.some(p => p.id === player.id))
    .filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(player => positionFilter === 'all' || player.position === positionFilter)
    .filter(player => teamFilter === 'all' || player.team === teamFilter)
    .sort((a, b) => {
      if (sortBy === 'points') return b.points - a.points
      if (sortBy === 'cost') return b.cost - a.cost
      return 0
    })
  
  // Team positions
  const positions = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']
  const teams = ['IND', 'ENG', 'AUS', 'NZ', 'PAK', 'SA', 'AFG', 'BAN']
  
  // Calculate remaining budget
  const usedBudget = selectedPlayers.reduce((total, player) => total + player.cost, 0)
  const remainingBudget = budget - usedBudget
  
  // Handle player selection
  const selectPlayer = (player) => {
    if (selectedPlayers.length >= 11) {
      showAlertMessage('You can only select up to 11 players', 'error')
      return
    }
    
    if (player.cost > remainingBudget) {
      showAlertMessage('Not enough budget to select this player', 'error')
      return
    }
    
    // Count positions to enforce team balance
    const positionCounts = selectedPlayers.reduce((counts, p) => {
      counts[p.position] = (counts[p.position] || 0) + 1
      return counts
    }, {})
    
    if (player.position === 'Batsman' && (positionCounts['Batsman'] || 0) >= 5) {
      showAlertMessage('Maximum 5 batsmen allowed', 'error')
      return
    }
    
    if (player.position === 'Bowler' && (positionCounts['Bowler'] || 0) >= 5) {
      showAlertMessage('Maximum 5 bowlers allowed', 'error')
      return
    }
    
    if (player.position === 'All-Rounder' && (positionCounts['All-Rounder'] || 0) >= 3) {
      showAlertMessage('Maximum 3 all-rounders allowed', 'error')
      return
    }
    
    if (player.position === 'Wicket-Keeper' && (positionCounts['Wicket-Keeper'] || 0) >= 2) {
      showAlertMessage('Maximum 2 wicket-keepers allowed', 'error')
      return
    }
    
    setSelectedPlayers([...selectedPlayers, player])
  }
  
  // Handle player removal
  const removePlayer = (playerId) => {
    const updatedPlayers = selectedPlayers.filter(player => player.id !== playerId)
    setSelectedPlayers(updatedPlayers)
    
    // Update captain and vice-captain if needed
    if (captain === playerId) setCaptain(null)
    if (viceCaptain === playerId) setViceCaptain(null)
  }
  
  // Set captain
  const selectCaptain = (playerId) => {
    if (viceCaptain === playerId) {
      setViceCaptain(captain)
    }
    setCaptain(playerId)
  }
  
  // Set vice-captain
  const selectViceCaptain = (playerId) => {
    if (captain === playerId) {
      setCaptain(viceCaptain)
    }
    setViceCaptain(playerId)
  }
  
  // Show alert message
  const showAlertMessage = (message, type = 'error') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }
  
  // Save team
  const saveTeam = () => {
    if (selectedPlayers.length < 11) {
      showAlertMessage('Please select 11 players', 'error')
      return
    }
    
    if (captain === null) {
      showAlertMessage('Please select a captain', 'error')
      return
    }
    
    if (viceCaptain === null) {
      showAlertMessage('Please select a vice-captain', 'error')
      return
    }
    
    // Here you would typically save the team to your backend
    showAlertMessage('Team saved successfully!', 'success')
  }
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Alert Message */}
      <AnimatePresence>
        {showAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              alertType === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white flex items-center`}
          >
            {alertType === 'error' ? (
              <AlertCircle className="w-5 h-5 mr-2" />
            ) : (
              <Check className="w-5 h-5 mr-2" />
            )}
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Player Selection Panel */}
      <div className="lg:w-1/2 card p-6">
        <h3 className="text-xl font-bold mb-4">Select Players</h3>
        
        {/* Search and Filter */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center justify-between w-full p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
          >
            <div className="flex items-center">
              <Filter size={18} className="mr-2 text-surface-500" />
              <span>Filters & Sorting</span>
            </div>
            {filterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg mt-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <select
                      value={positionFilter}
                      onChange={(e) => setPositionFilter(e.target.value)}
                      className="input-field"
                    >
                      <option value="all">All Positions</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Team</label>
                    <select
                      value={teamFilter}
                      onChange={(e) => setTeamFilter(e.target.value)}
                      className="input-field"
                    >
                      <option value="all">All Teams</option>
                      {teams.map((team) => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy('points')}
                        className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                          sortBy === 'points'
                            ? 'bg-primary text-white'
                            : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                        }`}
                      >
                        Points
                      </button>
                      <button
                        onClick={() => setSortBy('cost')}
                        className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                          sortBy === 'cost'
                            ? 'bg-primary text-white'
                            : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                        }`}
                      >
                        Cost
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Available Players */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{player.name}</span>
                    <span className="font-bold text-primary">{player.points} pts</span>
                  </div>
                  <div className="flex justify-between text-xs text-surface-500">
                    <span>{player.team} • {player.position}</span>
                    <span>₹{player.cost}Cr</span>
                  </div>
                </div>
                
                <button
                  onClick={() => selectPlayer(player)}
                  className="ml-3 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                >
                  <Check size={16} />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-surface-500">
              <p>No players found matching your filters</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Team Preview Panel */}
      <div className="lg:w-1/2 card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Your Team</h3>
          <div className="flex items-center">
            <div className="text-right mr-4">
              <p className="text-xs text-surface-500">Remaining Budget</p>
              <p className={`font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ₹{remainingBudget.toFixed(1)}Cr
              </p>
            </div>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700">
              {selectedPlayers.length}/11
            </div>
          </div>
        </div>
        
        {/* Budget Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${(usedBudget / budget) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Selected Players */}
        {selectedPlayers.length > 0 ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
            {selectedPlayers.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg relative group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                  {captain === player.id && (
                    <div className="absolute inset-0 bg-primary/70 flex items-center justify-center text-white font-bold">
                      C
                    </div>
                  )}
                  {viceCaptain === player.id && (
                    <div className="absolute inset-0 bg-secondary/70 flex items-center justify-center text-white font-bold">
                      VC
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{player.name}</span>
                    <span className="font-bold text-primary">{player.points} pts</span>
                  </div>
                  <div className="flex justify-between text-xs text-surface-500">
                    <span>{player.team} • {player.position}</span>
                    <span>₹{player.cost}Cr</span>
                  </div>
                </div>
                
                <div className="flex items-center ml-3 space-x-2">
                  <button
                    onClick={() => selectCaptain(player.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      captain === player.id
                        ? 'bg-primary text-white'
                        : 'bg-surface-200 dark:bg-surface-600 hover:bg-primary/20 text-surface-500'
                    }`}
                    title="Set as Captain (2x points)"
                  >
                    <span className="text-xs font-bold">C</span>
                  </button>
                  
                  <button
                    onClick={() => selectViceCaptain(player.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      viceCaptain === player.id
                        ? 'bg-secondary text-white'
                        : 'bg-surface-200 dark:bg-surface-600 hover:bg-secondary/20 text-surface-500'
                    }`}
                    title="Set as Vice Captain (1.5x points)"
                  >
                    <span className="text-xs font-bold">VC</span>
                  </button>
                  
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full transition-colors"
                    title="Remove player"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
              <Users size={24} className="text-surface-400" />
            </div>
            <h4 className="font-medium mb-2">No Players Selected</h4>
            <p className="text-sm text-surface-500 max-w-xs mx-auto">
              Select players from the list to build your fantasy team
            </p>
          </div>
        )}
        
        {/* Team Stats */}
        {selectedPlayers.length > 0 && (
          <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center">
                <p className="text-xs text-surface-500 mb-1">Batsmen</p>
                <p className="font-bold">{selectedPlayers.filter(p => p.position === 'Batsman').length}/5</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-surface-500 mb-1">Bowlers</p>
                <p className="font-bold">{selectedPlayers.filter(p => p.position === 'Bowler').length}/5</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-surface-500 mb-1">All-Rounders</p>
                <p className="font-bold">{selectedPlayers.filter(p => p.position === 'All-Rounder').length}/3</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-surface-500 mb-1">Wicket-Keepers</p>
                <p className="font-bold">{selectedPlayers.filter(p => p.position === 'Wicket-Keeper').length}/2</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Save Team Button */}
        <button
          onClick={saveTeam}
          disabled={selectedPlayers.length < 11 || captain === null || viceCaptain === null}
          className={`w-full mt-6 py-3 rounded-lg font-bold transition-colors ${
            selectedPlayers.length === 11 && captain !== null && viceCaptain !== null
              ? 'bg-primary hover:bg-primary-dark text-white'
              : 'bg-surface-200 dark:bg-surface-700 text-surface-500 cursor-not-allowed'
          }`}
        >
          Save Team
        </button>
      </div>
    </div>
  )
}

export default MainFeature