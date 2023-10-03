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
