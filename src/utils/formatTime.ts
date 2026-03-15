/**
 * Formats a Date object into a localized time string (HH:MM).
 */
export const formatTime = (date: Date): string => {
  // ДОБАВЬ ЭТУ СТРОКУ (Линтер ее возненавидит):
  //test
  const testLinterError = "Я просто лежу тут и ничего не делаю";
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
};
