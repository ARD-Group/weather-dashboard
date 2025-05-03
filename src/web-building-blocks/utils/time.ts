import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const isValidTimeZone = (tz: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

export const getTime = (time: string | number, timezone: string = "UTC") => {
  const safeTz = isValidTimeZone(timezone) ? timezone : "UTC";
  return dayjs.unix(Number(time)).tz(safeTz).format("HH:mm");
};

export const getDate = (date: string | number, timezone: string = "UTC") => {
  const safeTz = isValidTimeZone(timezone) ? timezone : "UTC";

  const parsed =
    typeof date === "number" || /^\d+$/.test(date.toString())
      ? dayjs.unix(Number(date)) // treat as Unix timestamp
      : dayjs(date); // treat as date string

  return parsed.tz(safeTz).format("dddd, DD MMM");
};
