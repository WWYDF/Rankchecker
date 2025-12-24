import { useState } from 'react';
import { motion } from 'framer-motion';
import { RankedQuery } from '../types/odyssey';
import { PlayerCard } from '../components/PlayerCard';
import { SwordIcon } from '@phosphor-icons/react';
import { CreditsModal } from '../components/Credits';
import { Spinner } from '@heroui/react';

interface MatchPageProps {
  players: RankedQuery[];
  isLoading?: boolean;
}

export function MatchPage({ players, isLoading = false }: MatchPageProps) {
  const [isCreditsOpen, setCreditsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <Spinner size="lg" color="primary" />
        <p className="text-white mt-4 text-lg">Loading player data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-4"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Player Information</h1>
          <p className="text-slate-400">Enemy team rankings and statistics</p>
        </motion.div>

        {/* Enemy Team */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
              <SwordIcon weight='duotone' size={24} />
              Enemy Team
            </h2>
          </motion.div>
          
          <div className="space-y-3">
            {players.map((player, index) => (
              <PlayerCard key={player.playerId} player={player} index={index} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="py-4"
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
            
            <button
              onClick={() => setCreditsOpen(true)}
              className="text-slate-400 hover:underline hover:text-white transition-colors cursor-pointer"
            >
              Credits
            </button>
          </div>
        </motion.footer>

        <CreditsModal
          isOpen={isCreditsOpen}
          onClose={() => setCreditsOpen(false)}
        />
      </div>
    </div>
  );
}