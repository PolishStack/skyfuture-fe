type User = {
  id: number;
  phone: string;
  point: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  role: "user" | "admin";
  password?: string;
};

type UserState = {
  user: User | null;
};

export type { User, UserState };
