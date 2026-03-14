import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContextType } from '../App';
import { usernameQuery, rankQuery } from '../core/utilities/upstream';
import { CheckCircleIcon, CircleNotchIcon, WarningCircleIcon } from '@phosphor-icons/react';

type PlayerStatus = 'pending' | 'loading' | 'done' | 'error';

interface PlayerFetchState {
  username: string;
  status: PlayerStatus;
}

export function LoadingPage() {
  const { collectedPlayers, setPlayerData, navigate } = useOutletContext<AppContextType>();
  const [playerStates, setPlayerStates] = useState<PlayerFetchState[]>(
    collectedPlayers.map(u => ({ username: u, status: 'pending' }))
  );

  function updateStatus(username: string, status: PlayerStatus) {
    setPlayerStates(prev =>
      prev.map(p => p.username === username ? { ...p, status } : p)
    );
  }

  useEffect(() => {
    if (collectedPlayers.length === 0) {
      navigate('/monitor');
      return;
    }

    async function fetchAll() {
      const results = await Promise.all(
        collectedPlayers.map(async (username) => {
          updateStatus(username, 'loading');
          try {
            const user = await usernameQuery(username);
            if (!user) throw new Error('Not found');
            const ranked = await rankQuery(user.playerId);
            if (!ranked) throw new Error('No rank data');
            updateStatus(username, 'done');
            return ranked;
          } catch {
            updateStatus(username, 'error');
            return null;
          }
        })
      );

      const valid = results.filter(Boolean) as NonNullable<typeof results[0]>[];
      setPlayerData(valid);

      // Short pause so the user sees everything resolved before navigating
      await new Promise(r => setTimeout(r, 400));
      navigate('/match');
    }

    fetchAll();
  }, []);

  const statusIcon = (status: PlayerStatus) => {
    switch (status) {
      case 'pending': return <span className="w-4 h-4 rounded-full bg-zinc-700 shrink-0" />;
      case 'loading': return <CircleNotchIcon size={16} className="text-violet-400 animate-spin shrink-0" />;
      case 'done': return <CheckCircleIcon size={16} weight="fill" className="text-emerald-400 shrink-0" />;
      case 'error': return <WarningCircleIcon size={16} weight="fill" className="text-red-400 shrink-0" />;
    }
  };

  const doneCount = playerStates.filter(p => p.status === 'done' || p.status === 'error').length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden px-8">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-50 bg-violet-700/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm space-y-6"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white">Fetching Ranks</h2>
          <p className="text-zinc-500 text-sm">
            Looking up {collectedPlayers.length} players...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(doneCount / playerStates.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />
        </div>

        {/* Player list */}
        <div className="space-y-2">
          <AnimatePresence>
            {playerStates.map((p, i) => (
              <motion.div
                key={p.username}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5"
              >
                {statusIcon(p.status)}
                <span className="text-sm font-medium text-zinc-300 flex-1">{p.username}</span>
                {p.status === 'error' && (
                  <span className="text-xs text-red-400">not found</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
