type User = {
  id: number;
  phone: string;
  point: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  canUpdatePassword: boolean;
  canUpdateBankName: boolean;
  canUpdateAccountNumber: boolean;
  canUpdateAccountHolder: boolean;
  role: "user" | "admin";
  password?: string;
};

type UserState = {
  user: User | null;
};

export type { User, UserState };
