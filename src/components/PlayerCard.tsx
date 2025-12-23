import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import { getRankFromLP } from '../core/utilities/ranks';
import { SimplifiedPlayer } from '../types/simplified';
import RankIcon from './Rank';

interface PlayerCardProps {
  player: SimplifiedPlayer;
  index: number;
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  const lastSnapshot = player.ratings[0];
  const rankInfo = getRankFromLP(lastSnapshot.rating).rankObject;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-colors">
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            {/* Rank Image Placeholder */}
            <div className="shrink-0">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold"
              >
                <RankIcon rating={player.ratings[0].rating} size='lg' />
              </div>
            </div>
            
            {/* Player Info */}
            <div className="flex-1 min-w-0">
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
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="text-slate-400">
                  Rating: <span className="text-white font-medium">{lastSnapshot.rating}</span>
                </div>
                <div className="text-slate-400">
                  Rank: <span className="text-white font-medium">#{lastSnapshot.rank}</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}