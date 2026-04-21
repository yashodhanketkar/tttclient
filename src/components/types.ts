export type BoardType = {
  _id: string;
  startedBy: {
    _id: string;
    username: string;
  };
  numberOfPlayers: number;
  key: string;
  grid: string[];
  currentMark: string;
  isGameOver: boolean;
  isDraw: boolean;
  hasWinner: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  against: {
    _id: string;
    username: string;
  };
  winner: {
    _id: string;
    username: string;
  };
};

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
    isGameOver: boolean;
    hasWinner: boolean;
    winner: {
      _id: string;
      username: string;
    };
  }[];
};
