import { useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { MatchPage } from './pages/Match';
import { WaitingPage } from './pages/Waiting';

function App() {
  // This will be driven by the monitor hook later
  const [inMatch, setInMatch] = useState(false);

  return (
    <HeroUIProvider>
      <div className="min-h-screen">
        {inMatch ? <MatchPage /> : <WaitingPage />}
      </div>
      
      {/* toggle for dev, remove in prod lol */}
      <button
        onClick={() => setInMatch(!inMatch)}
        className="fixed top-4 right-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm z-50 hover:bg-purple-700 transition"
      >
        Toggle View
      </button>
    </HeroUIProvider>
  );
}

export default App;