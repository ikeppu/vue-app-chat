/**
 * Formats a Date object into a localized time string (HH:MM).
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
};
