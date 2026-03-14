import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { AppContextType } from '../App';
import { AppButton } from '../components/ui/Button';
import { getLogPath, seekToEnd } from '../core/utilities/logMonitor';
import { PlayIcon } from '@phosphor-icons/react';
import { openUrl } from '@tauri-apps/plugin-opener';
import { version } from '../core/constants';

export function GetStartedPage() {
  const { navigate } = useOutletContext<AppContextType>();

  async function handleStart() {
    const logPath = await getLogPath();
    await seekToEnd(logPath);
    navigate('/monitor');
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-violet-700/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center gap-10 text-center w-64"
        >
          <div className="">
            <h1 className="text-5xl font-black tracking-tight text-white mb-1">
              Rank<span className="text-violet-400">Checker</span>
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Automatically detects and fetches your opponents ranks before the game starts.
            </p>
          </div>

          <div className="w-full space-y-3">
            <AppButton onClick={handleStart} size="lg" fullWidth icon={<PlayIcon size={18} weight="fill" />}>
              Start Monitoring Log
            </AppButton>
            <p className="text-zinc-600 text-xs">
              Make sure Omega Strikers is running first.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer — pinned to bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex items-center justify-between px-6 py-4 border-t border-zinc-900 text-xs text-zinc-600"
      >
        <button
          onClick={() => openUrl('https://github.com/WWYDF/Rankchecker')}
          className="hover:text-zinc-400 transition-colors cursor-pointer"
        >
          v{version}
        </button>
      </motion.div>
    </div>
  );
}
