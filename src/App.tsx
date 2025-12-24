import { useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { RankedQuery } from './types/odyssey';
import { UsernameInputPage } from './pages/InputUsers';
import { MatchPage } from './pages/Match';
import { rankQuery, usernameQuery } from './core/utilities/upstream';
import { exit } from '@tauri-apps/plugin-process';

function App() {
  const [currentView, setCurrentView] = useState<'input' | 'loading' | 'match'>('input');
  const [playerData, setPlayerData] = useState<RankedQuery[]>([]);

  const handleUsernameSubmit = async (usernames: string[]) => {
    setCurrentView('loading');

    try {
      const userObjects = await Promise.all(
        usernames.map(username => usernameQuery(username))
      );

      const userRatings = await Promise.all(
        userObjects.map(user => rankQuery(user?.playerId))
      )

      const cleaned = userRatings.filter((item): item is RankedQuery => item !== null);

      if (!userRatings) { await exit(12) };

      setPlayerData(cleaned);
      setCurrentView('match');
    } catch (error) {
      console.error('Failed to fetch player data:', error);
      // Handle error - maybe show an error page or go back to input
      setCurrentView('input');
    }
  };

  return (
    <HeroUIProvider>
      <div className="min-h-screen">
        {currentView === 'input' && (
          <UsernameInputPage onSubmit={handleUsernameSubmit} />
        )}
        
        {currentView === 'loading' && (
          <MatchPage players={[]} isLoading={true} setState={setCurrentView} />
        )}
        
        {currentView === 'match' && (
          <MatchPage players={playerData} isLoading={false} setState={setCurrentView} />
        )}
      </div>
    </HeroUIProvider>
  );
}

export default App;