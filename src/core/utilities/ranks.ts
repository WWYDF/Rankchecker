export type Rank = 
  | 'Rookie' 
  | 'Bronze' 
  | 'Mid Bronze' 
  | 'High Bronze' 
  | 'Silver' 
  | 'Mid Silver' 
  | 'High Silver' 
  | 'Gold' 
  | 'Mid Gold' 
  | 'High Gold' 
  | 'Platinum' 
  | 'Mid Platinum' 
  | 'High Platinum' 
  | 'Diamond' 
  | 'Mid Diamond' 
  | 'High Diamond' 
  | 'Challenger'
  | 'Mid Challenger'
  | 'High Challenger'
  | 'Omega'
  | 'Pro League'

export type RankObject = { 
  name: Rank
  image: string
  color: string
  threshold: number
}

export function getRankFromLP(lp: number) {
  
  let rankIndex = 0
  
  for (let i = 1; i < ranks.length; i++) {
    if (lp >= ranks[i].threshold) {
      rankIndex = i
    } else {
      break // break the loop when the threshold is higher than the input value
    }
  }

  const rankObject = ranks[rankIndex] as RankObject
  const prevRankObject = rankIndex > 0 ? ranks[rankIndex - 1] as RankObject : null
  const nextRankObject = rankIndex < ranks.length - 1 ? ranks[rankIndex + 1] as RankObject : null

  return { rankObject, prevRankObject, nextRankObject }
}


const ranks = [
  {
    threshold: 0,
    name: 'Inactive/Unranked',
    image: '/i/rank/Unranked-Blobbo.png',
    color: '#ECDCD0'
  },
  {
    threshold: 800,
    name: 'Rookie',
    image: '/i/rank/Rookie_Low.webp',
    color: '#ECDCD0'
  },
  {
    threshold: 900,
    name: 'Mid Rookie',
    image: '/i/rank/Rookie_Mid.webp',
    color: '#ECDCD0'
  },
  {
    threshold: 1000,
    name: 'High Rookie',
    image: '/i/rank/Rookie_High.webp',
    color: '#ECDCD0'
  },
  {
    threshold: 1100,
    name: 'Bronze',
    image: '/i/rank/Bronze_Low.webp',
    color: '#C88C59'
  },
  {
    threshold: 1200,
    name: 'Mid Bronze',
    image: '/i/rank/Bronze_Mid.webp',
    color: '#C88C59'
  },
  {
    threshold: 1300,
    name: 'High Bronze',
    image: '/i/rank/Bronze_High.webp',
    color: '#C88C59'
  },
  {
    threshold: 1400,
    name: 'Silver',
    image: '/i/rank/Silver_Low.webp',
    color: '#9F9F9F'
  },
  {
    threshold: 1500,
    name: 'Mid Silver',
    image: '/i/rank/Silver_Mid.webp',
    color: '#9F9F9F'
  },
  {
    threshold: 1600,
    name: 'High Silver',
    image: '/i/rank/Silver_High.webp',
    color: '#9F9F9F'
  },
  {
    threshold: 1700,
    name: 'Gold',
    image: '/i/rank/Gold_Low.webp',
    color: '#F1E385'
  },
  {
    threshold: 1800,
    name: 'Mid Gold',
    image: '/i/rank/Gold_Mid.webp',
    color: '#F1E385'
  },
  {
    threshold: 1900,
    name: 'High Gold',
    image: '/i/rank/Gold_High.webp',
    color: '#F1E385'
  },
  {
    threshold: 2000,
    name: 'Platinum',
    image: '/i/rank/Platinum_Low.webp',
    color: '#2DE0A5'
  },
  {
    threshold: 2100,
    name: 'Mid Platinum',
    image: '/i/rank/Platinum_Mid.webp',
    color: '#2DE0A5'
  },
  {
    threshold: 2200,
    name: 'High Platinum',
    image: '/i/rank/Platinum_High.webp',
    color: '#2DE0A5'
  },
  {
    threshold: 2300,
    name: 'Diamond',
    image: '/i/rank/Diamond_Low.webp',
    color: '#51B4FD'
  },
  {
    threshold: 2400,
    name: 'Mid Diamond',
    image: '/i/rank/Diamond_Mid.webp',
    color: '#51B4FD'
  },
  {
    threshold: 2500,
    name: 'High Diamond',
    image: '/i/rank/Diamond_High.webp',
    color: '#51B4FD'
  },
  {
    threshold: 2600,
    name: 'Challenger',
    image: '/i/rank/Master_Low.webp',
    color: '#9952EE'
  },
  {
    threshold: 2700,
    name: 'Mid Challenger',
    image: '/i/rank/Master_Mid.webp',
    color: '#9952EE'
  },
  {
    threshold: 2800,
    name: 'High Challenger',
    image: '/i/rank/Master_High.webp',
    color: '#9952EE'
  },
  {
    threshold: 2900,
    name: 'Omega',
    image: '/i/rank/Promethean.webp',
    color: '#E1137A'
  },
  {
    threshold: 3000,
    name: 'Pro League',
    image: '/i/rank/ProLeague.webp',
    color: '#ffd1fa'
  }
]