import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Card, CardBody } from '@heroui/react';
import { PlusIcon, XIcon, ArrowRightIcon } from '@phosphor-icons/react';

interface UsernameInputPageProps {
  onSubmit: (usernames: string[]) => void;
}

export function UsernameInputPage({ onSubmit }: UsernameInputPageProps) {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [error, setError] = useState('');

  const handleAddUsername = () => {
    if (!currentInput.trim()) {
      setError('Please enter a username');
      return;
    }

    if (usernames.includes(currentInput.trim())) {
      setError('Username already added');
      return;
    }

    if (usernames.length >= 3) {
      setError('Maximum 3 usernames allowed');
      return;
    }

    const newUsernames = [...usernames, currentInput.trim()];
    setUsernames(newUsernames);
    setCurrentInput('');
    setError('');

    // Auto-submit when 3 usernames are added
    if (newUsernames.length === 3) {
      setTimeout(() => onSubmit(newUsernames), 500);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddUsername();
    }
  };

  const handleRemoveUsername = (index: number) => {
    setUsernames(usernames.filter((_, i) => i !== index));
    setError('');
  };

  const handleContinue = () => {
    if (usernames.length === 0) {
      setError('Please add at least one username');
      return;
    }
    onSubmit(usernames);
  };

  const canAddMore = usernames.length < 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Lookup Players</h1>
          <p className="text-slate-400">Enter 1-3 enemy usernames to check their ranks</p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700">
          <CardBody className="p-6">
            {/* Input Section */}
            <div className="mb-6">
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter username..."
                  disabled={!canAddMore}
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-slate-700/50 border-slate-600 hover:bg-slate-700",
                  }}
                  size="lg"
                />
                <Button
                  isIconOnly
                  onClick={handleAddUsername}
                  disabled={!canAddMore}
                  className="bg-linear-to-r from-blue-500 to-purple-600 text-white"
                  size="lg"
                >
                  <PlusIcon size={20} weight="bold" />
                </Button>
              </div>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Username List */}
            <div className="space-y-2 mb-6 min-h-30">
              <AnimatePresence mode="popLayout">
                {usernames.map((username, index) => (
                  <motion.div
                    key={username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{username}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveUsername(index)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <XIcon size={20} weight="bold" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {usernames.length === 0 && (
                <div className="flex items-center justify-center h-30 text-slate-500">
                  No usernames added yet
                </div>
              )}
            </div>

            {/* Counter */}
            <div className="text-center mb-4">
              <p className="text-slate-400 text-sm">
                {usernames.length}/3 usernames added
                {usernames.length === 3 && ' - Auto-submitting...'}
              </p>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={usernames.length === 0}
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
              endContent={<ArrowRightIcon size={20} weight="bold" />}
            >
              Continue
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}