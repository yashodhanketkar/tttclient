export type StatType = {
  _id: string;
  username: string;
  games: number;
  win: number;
  winRate: number;
  loss: number;
  lossRate: number;
  draw: number;
  drawRate: number;
  boards: {
    _id: string;
    isOver: boolean;
    hasWinner: boolean;
    winner: {
      _id: string;
      username: string;
    };
  }[];
};
