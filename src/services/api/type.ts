type TransactionStatusType = "success" | "pending" | "failed";
type TransactionMethodType = "deposit" | "withdraw" | "reward" | "win" | "lose" | "game-pending";

type TransactionType = {
  id: number | string;
  userId: number;
  amount: number;
  description: string;
  status: TransactionStatusType;
  paid?: boolean;
  method: TransactionMethodType;
  roomId?: { Int32: number; Valid: boolean };
  createdAt: string;
  updatedAt: string;
  label?: string
};

type GamePendingType = {
  id: number;
  userId: number;
  side: boolean;
  label: string;
  amount: number;
  round: number;
  roomId: number;
  createdAt: string;
  updatedAt: string;
};

export type {
  TransactionType,
  TransactionStatusType,
  TransactionMethodType,
  GamePendingType,
};
