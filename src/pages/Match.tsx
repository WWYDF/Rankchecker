import { motion } from 'framer-motion';
import { SimplifiedPlayer } from '../types/simplified';
import { PlayerCard } from '../components/PlayerCard';
import { ShieldIcon, SwordIcon } from '@phosphor-icons/react';

// Mock data for now
const mockPlayers: SimplifiedPlayer[] = [
  { playerId: 'sdasddsasdadsdsadsa', username: 'Player1', ratings: [{ rating: 3001, rank: 1 }] },
  { playerId: 'sdasddsasdadsdsadsa2', username: 'Player2', ratings: [{ rating: 2950, rank: 58 }] },
  { playerId: 'sdasddsasdadsdsadsa3', username: 'Player3', ratings: [{ rating: 2830, rank: 253 }] },
  { playerId: 'sdasddsasdadsdsadsa4', username: 'Player4', ratings: [{ rating: 2500, rank: 790 }] },
  { playerId: 'sdasddsasdadsdsadsa5', username: 'Player5', ratings: [{ rating: 2150, rank: 1130 }] },
  { playerId: 'sdasddsasdadsdsadsa6', username: 'Player6', ratings: [{ rating: 1900, rank: 2248 }] },
];

export function MatchPage() {
  const team1 = mockPlayers.slice(0, 3);
  const team2 = mockPlayers.slice(3, 6);
  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-4"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Match Information</h1>
          <p className="text-slate-400">Player rankings and statistics</p>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Team 1 */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                <ShieldIcon weight='duotone' />
                Your Team
              </h2>
            </motion.div>
            
            <div className="space-y-3">
              {team1.map((player, index) => (
                <PlayerCard key={player.username} player={player} index={index} />
              ))}
            </div>
          </div>

          {/* Team 2 */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                <SwordIcon weight='duotone' />
                Enemy Team
              </h2>
            </motion.div>
            
            <div className="space-y-3">
              {team2.map((player, index) => (
                <PlayerCard key={player.username} player={player} index={index + 3} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bottom-0 left-0 right-0 py-4"
        >
          <div className="flex items-center justify-center gap-6 text-sm">
            <a 
              href="https://repos.blals.com/Rankchecker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:underline hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            
            <span className="text-slate-400 cursor-pointer hover:underline hover:text-white">
              (update checker l8r)
            </span>
            
            <a 
              href="#" 
              className="text-slate-400 hover:underline hover:text-white transition-colors"
            >
              Credits
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}