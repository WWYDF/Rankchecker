import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Button, Card, CardContent } from '@heroui/react';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { AppContextType } from '../App';
import { version } from '../core/constants';

export function CreditsPage() {
  const { navigate } = useOutletContext<AppContextType>();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-4"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Credits</h1>
          <p className="text-sm text-slate-400">
            Made with ❤️ by the community
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 mb-6">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  Development
                </h3>
                <div className="space-y-2 text-slate-300">
                  <p className='text-white font-medium'>• blals</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  Contributors
                </h3>
                <div className="space-y-2 text-slate-300">
                  <p>• TheHypeWalrus — Testing</p>
                </div>
              </div>

              {/* Technologies Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-orange-400">🛠️</span>
                  Built With
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                    Tauri
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                    React
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                    HeroUI
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                    Framer Motion
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400 text-center">
                  Version {version}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
        <Button
          onPress={() => navigate(-1)}
          className="w-full bg-linear-to-r from-gray-600 to-zinc-700 hover:opacity-90 transition text-white font-semibold flex shadow-xl rounded-xl cursor-pointer"
          size="lg"
        >
          <ArrowLeftIcon size={20} weight="bold" />
          Back
        </Button>
      </div>
    </div>
  );
}
