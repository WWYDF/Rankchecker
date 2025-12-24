import { RankedQuery, UserQuery } from "../../types/odyssey";
import { OdyAPI } from "../constants";
import { fetchAuth } from "./auth";

type RankedJSON ={
  players: RankedQuery[]
}

export async function usernameQuery(username: string): Promise<UserQuery | null> {
  const identity = await fetchAuth();
  if (!identity) return null;
  
  try {
    const res = await fetch(`${OdyAPI}/v1/players?usernameQuery=${username}`, {
      method: 'GET',
      headers: {
        'X-Authorization': `Bearer ${identity.accessTokens.jwt}`,
        'X-Refresh-Token': `${identity.accessTokens.refreshToken}`
      }
    });

    const data: UserQuery = await res.json();
    if (!res.ok || !data.playerId) { throw new Error('API Unreachable or Player not found') };

    return data;
  } catch (error) {
    console.debug(error);
    console.warn(`Player '${username}' returned no data!`);
    return null
  }
}

export async function rankQuery(playerId: string | undefined): Promise<RankedQuery | null> {
  const identity = await fetchAuth();
  if (!identity) return null;
  if (!playerId) return null;
  
  try {
    const res = await fetch(`${OdyAPI}/ranked/leaderboard/search/${playerId}?entriesBefore=0&entriesAfter=0`, {
      method: 'GET',
      headers: {
        'X-Authorization': `Bearer ${identity.accessTokens.jwt}`,
        'X-Refresh-Token': `${identity.accessTokens.refreshToken}`
      }
    });

    const data: RankedJSON = await res.json();
    if (!res.ok || data.players.length == 0 || !data.players[0] ) { throw new Error('API Unreachable or Player not found') };

    return data.players[0];
  } catch (error) {
    console.debug(error);
    console.warn(`Player '${playerId}' returned no data!`);
    return null
  }
}