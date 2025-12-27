import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RankedQuery } from './types/odyssey';

export interface AppContextType {
  playerData: RankedQuery[];
  setPlayerData: (data: RankedQuery[]) => void;
  navigate: ReturnType<typeof useNavigate>;
}

function App() {
  console.log('App component mounted');
  const [playerData, setPlayerData] = useState<RankedQuery[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  console.log('Current route:', location.pathname);

  return (
    <div className="min-h-screen">
      <Outlet context={{ playerData, setPlayerData, navigate }} />
    </div>
  );
}

export default App;
