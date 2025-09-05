export type RankObject = {
  threshold: number;
  name: string;
  image: string;
  color: string;
};

const rankRelation: RankObject[] = [
  { threshold: 0, name: "Inactive/Unranked", image: "i/rank/Unranked.webp", color: "#ECDCD0" },
  { threshold: 800, name: "Rookie", image: "i/rank/Rookie_Low.webp", color: "#ECDCD0" },
  { threshold: 900, name: "Mid Rookie", image: "i/rank/Rookie_Mid.webp", color: "#ECDCD0" },
  { threshold: 1000, name: "High Rookie", image: "i/rank/Rookie_High.webp", color: "#ECDCD0" },
  { threshold: 1100, name: "Bronze", image: "i/rank/Bronze_Low.webp", color: "#C88C59" },
  { threshold: 1200, name: "Mid Bronze", image: "i/rank/Bronze_Mid.webp", color: "#C88C59" },
  { threshold: 1300, name: "High Bronze", image: "i/rank/Bronze_High.webp", color: "#C88C59" },
  { threshold: 1400, name: "Silver", image: "i/rank/Silver_Low.webp", color: "#9F9F9F" },
  { threshold: 1500, name: "Mid Silver", image: "i/rank/Silver_Mid.webp", color: "#9F9F9F" },
  { threshold: 1600, name: "High Silver", image: "i/rank/Silver_High.webp", color: "#9F9F9F" },
  { threshold: 1700, name: "Gold", image: "i/rank/Gold_Low.webp", color: "#F1E385" },
  { threshold: 1800, name: "Mid Gold", image: "i/rank/Gold_Mid.webp", color: "#F1E385" },
  { threshold: 1900, name: "High Gold", image: "i/rank/Gold_High.webp", color: "#F1E385" },
  { threshold: 2000, name: "Platinum", image: "i/rank/Platinum_Low.webp", color: "#2DE0A5" },
  { threshold: 2100, name: "Mid Platinum", image: "i/rank/Platinum_Mid.webp", color: "#2DE0A5" },
  { threshold: 2200, name: "High Platinum", image: "i/rank/Platinum_High.webp", color: "#2DE0A5" },
  { threshold: 2300, name: "Diamond", image: "i/rank/Diamond_Low.webp", color: "#51B4FD" },
  { threshold: 2400, name: "Mid Diamond", image: "i/rank/Diamond_Mid.webp", color: "#51B4FD" },
  { threshold: 2500, name: "High Diamond", image: "i/rank/Diamond_High.webp", color: "#51B4FD" },
  { threshold: 2600, name: "Challenger", image: "i/rank/Master_Low.webp", color: "#9952EE" },
  { threshold: 2700, name: "Mid Challenger", image: "i/rank/Master_Mid.webp", color: "#9952EE" },
  { threshold: 2800, name: "High Challenger", image: "i/rank/Master_High.webp", color: "#9952EE" },
  { threshold: 2900, name: "Omega", image: "i/rank/Omega.webp", color: "#E1137A" },
  { threshold: 3000, name: "Pro League", image: "i/rank/Pro_League.webp", color: "#ffd1fa" },
];

export default rankRelation;

export function getRankFromLP(lp: number) {
  let rankIndex = 0;

  for (let i = 1; i < rankRelation.length; i++) {
    if (lp >= rankRelation[i].threshold) {
      rankIndex = i;
    } else {
      break;
    }
  }

  const rankObject = rankRelation[rankIndex];
  const prevRankObject = rankIndex > 0 ? rankRelation[rankIndex - 1] : null;
  const nextRankObject = rankIndex < rankRelation.length - 1 ? rankRelation[rankIndex + 1] : null;

  return { rankObject, prevRankObject, nextRankObject };
}
