import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';

export function WaitingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700">
          <CardBody className="p-12 text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
            </motion.div>
            
            <h1 className="text-2xl font-bold text-white mb-3">
              Waiting for Game
            </h1>
            
            <p className="text-slate-400 text-lg">
              Open game, and queue to continue
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}