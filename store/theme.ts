import { atom } from "jotai";

export type Theme = "light" | "dark" | "system";

export const themeAtom = atom<Theme>("system");
export const isDarkModeAtom = atom((get) => {
  const theme = get(themeAtom);
  if (theme === "system") {
    // In a real app, you'd check system preference
    return false;
  }
  return theme === "dark";
});
