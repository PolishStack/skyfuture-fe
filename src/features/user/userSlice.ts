import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  phone: string;
};

type UserState = {
  user: User | null;
  point: number | null;
};

const initialState: UserState = {
  user: { id: "123", name: "Username", phone: "0888888887" },
  point: 540,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setPoint: (state, action: PayloadAction<number>) => {
      state.point = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
