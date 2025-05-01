import { atom } from "jotai";

export interface User {
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
});
