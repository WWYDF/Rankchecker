import { Player } from "../../types/clarion";
import { baseAPI, cc_access } from "../constants";

export async function fetchPlayerData(username: string): Promise<Player | null> {
  try {
    const res = await fetch(`${baseAPI}/v2/players/${username}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${cc_access}` }
    });

    const data: Player = await res.json();
    if (!res.ok || !data.id) { throw new Error('API Unreachable or Player not found') };

    return data;
  } catch (error) {
    console.debug(error);
    console.warn(`Player '${username}' returned no data!`);
    return null
  }
}