// just for dev sakes cos i dont have everything working yet :)

export type SimplifiedPlayer = {
  playerId: string,
  username: string,
  ratings: {
    rating: number,
    rank: number
  }[],
}