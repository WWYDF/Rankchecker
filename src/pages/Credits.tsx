// Removing this for now.

import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { AppButton } from '../components/ui/Button';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { AppContextType } from '../App';
import { version } from '../core/constants';

const TECH = ['Tauri', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'];

export function CreditsPage() {
  const { navigate } = useOutletContext<AppContextType>();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-700/8 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center px-6 py-5 border-b border-zinc-900">
        <AppButton variant="ghost" size="sm" onClick={() => navigate(-1)} icon={<ArrowLeftIcon size={14} />}>
          Back
        </AppButton>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-white">Credits</h1>
            <p className="text-zinc-600 text-sm">Made with love for the community</p>
          </div>

          {/* Credits sections */}
          <div className="space-y-5">
            <Section title="Development">
              <Credit name="blals" />
            </Section>

            <Section title="Contributors">
              <Credit name="TheHypeWalrus" role="Testing" />
            </Section>

            <Section title="Built With">
              <div className="flex flex-wrap gap-2">
                {TECH.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          <p className="text-center text-zinc-700 text-xs">Version {version}</p>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">{children}</div>
    </div>
  );
}

function Credit({ name, role }: { name: string; role?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-zinc-200">{name}</span>
      {role && <span className="text-xs text-zinc-500">{role}</span>}
    </div>
  );
}
