import { atom } from "jotai";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
export const isLoadingAuthAtom = atom(false);

// Auth actions
export const loginAtom = atom(null, (get, set, user: User) => {
  set(userAtom, user);
  set(isLoadingAuthAtom, false);
});

export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
});
