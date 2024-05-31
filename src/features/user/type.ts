type User = {
  id: number;
  phone: string;
  point: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  role: "user" | "admin";
};

type UserState = {
  user: User | null;
};

export type { User, UserState };
