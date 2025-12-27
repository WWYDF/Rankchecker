import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Input, Button, Card, CardContent } from '@heroui/react';
import { PlusIcon, XIcon, ArrowRightIcon, UsersThreeIcon } from '@phosphor-icons/react';
import { AppContextType } from '../App';
import { rankQuery, usernameQuery } from '../core/utilities/upstream';
import { RankedQuery } from '../types/odyssey';

export function UsernameInputPage() {
  const { setPlayerData, navigate } = useOutletContext<AppContextType>();
  const [usernames, setUsernames] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [error, setError] = useState('');

  const handleAddUsername = () => {
    if (!currentInput) {
      setError('Please enter a username');
      return;
    }

    if (usernames.includes(currentInput)) {
      setError('Username already added');
      return;
    }

    if (usernames.length >= 3) {
      setError('Maximum 3 usernames allowed');
      return;
    }

    const newUsernames = [...usernames, currentInput];
    setUsernames(newUsernames);
    setCurrentInput('');
    setError('');

    // Auto-submit when 3 usernames are added
    if (newUsernames.length === 3) {
      setTimeout(async () => {
        try {
          const userObjects = await Promise.all(
            newUsernames.map(username => usernameQuery(username))
          );

          const userRatings = await Promise.all(
            userObjects.map(user => rankQuery(user?.playerId))
          );

          const cleaned = userRatings.filter((item): item is RankedQuery => item !== null);

          setPlayerData(cleaned);
          navigate('/match');
        } catch (error) {
          console.error('Failed to fetch player data:', error);
          setError('Failed to fetch. Please make sure your game is open.');
        }
      }, 500);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddUsername();
    }
  };

  const handleRemoveUsername = (index: number) => {
    setUsernames(usernames.filter((_, i) => i !== index));
    setError('');
  };

  const handleContinue = async () => {
    if (usernames.length === 0) {
      setError('Please add at least one username');
      return;
    }

    try {
      const userObjects = await Promise.all(
        usernames.map(username => usernameQuery(username))
      );

      const userRatings = await Promise.all(
        userObjects.map(user => rankQuery(user?.playerId))
      );

      const cleaned = userRatings.filter((item): item is RankedQuery => item !== null);

      setPlayerData(cleaned);
      navigate('/match');
    } catch (error) {
      console.error('Failed to fetch player data:', error);
      setError('Failed to fetch. Please make sure your game is open.');
    }
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
            className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-green-500 to-lime-600 rounded-full flex items-center justify-center"
          >
            <UsersThreeIcon size={50} weight='duotone' color='white'/>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Quick Rank Lookup</h1>
          <p className="text-slate-400">Enter 1-3 enemy usernames to check their ranks instantly</p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700">
          <CardContent className="p-6">
            {/* Input Section */}
            <div className="mb-6">
              <div className="flex gap-2 mb-2 justify-center items-center">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter username..."
                  disabled={!canAddMore}
                  fullWidth
                  className="text-white bg-slate-700/50 border-slate-600 hover:bg-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
                />
                <Button
                  isIconOnly
                  onPress={handleAddUsername}
                  isDisabled={!canAddMore}
                  className="bg-linear-to-r from-green-500 to-lime-600 text-white flex aspect-square rounded-xl hover:opacity-90 transition cursor-pointer"
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
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{username}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveUsername(index)}
                      className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title='Remove Player'
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
              onPress={handleContinue}
              isDisabled={usernames.length === 0}
              className="w-full bg-linear-to-r from-emerald-500 to-green-600 hover:opacity-90 transition text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex shadow-xl rounded-xl cursor-pointer"
              size="lg"
            >
              Continue
              <ArrowRightIcon size={20} weight="bold" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}