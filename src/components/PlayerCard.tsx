import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import { RankedQuery } from '../types/odyssey';
import { getRankFromLP } from '../core/utilities/ranks';
import RankIcon from './Rank';
import { ShieldIcon, SwordIcon } from '@phosphor-icons/react';
import { openUrl } from '@tauri-apps/plugin-opener';

interface PlayerCardProps {
  player: RankedQuery;
  index: number;
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  const nearbyRanks = getRankFromLP(player.rating);
  const rankInfo = nearbyRanks.rankObject;
  const winRate = player.games > 0 
    ? ((player.wins / player.games) * 100).toFixed(1)
    : '0.0';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-colors">
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold"
              >
                <RankIcon rating={player.rating} size='lg' />
              </div>
            </div>
            
            {/* Player Info */}
            <button
              onClick={async () => await openUrl(`https://clarioncorp.net/pilot/${player.username}`)}
              className="flex-1 min-w-0 text-left cursor-pointer"
              >
              <h3 className="text-lg font-semibold text-white truncate mb-1">
                {player.username}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{ 
                    color: rankInfo.color,
                    backgroundColor: `${rankInfo.color}20`
                  }}
                >
                  {rankInfo.name}
                </span>
                <span className="text-xs text-slate-400" title={`${player.topRole} Main`} >
                  {player.topRole == 'Forward' ? <SwordIcon size={20} weight='duotone' /> : <ShieldIcon size={20} weight='duotone' />}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="text-slate-400">
                  Rating: <span className="text-white font-medium">{player.rating}</span>
                </div>
                <div className="text-slate-400">
                  Rank: <span className="text-white font-medium">#{player.rank.toLocaleString()}</span>
                </div>
                <div className="text-slate-400">
                  WR: <span className="text-white font-medium">{winRate}%</span>
                </div>
                <div className="text-slate-400">
                  Games: <span className="text-white font-medium">{player.games}</span>
                </div>
              </div>
            </button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}