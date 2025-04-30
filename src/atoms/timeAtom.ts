import { atom } from "recoil";

interface TimeState {
  city: string;
  time: string;
  date: string;
}

export const timeState = atom<TimeState>({
  key: "timeState",
  default: {
    city: "Athens",
    time: "09:03",
    date: "Thursday, 31 Aug",
  },
});
