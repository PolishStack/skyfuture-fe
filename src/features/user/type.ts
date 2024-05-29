type User = {
  id: number;
  phone: string;
  point: number;
  role: "user" | "admin";
};

type UserState = {
  user: User | null;
};

export type { User, UserState };
