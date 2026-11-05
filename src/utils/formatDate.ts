// Dates from the API are UTC; show them in the visitor's own timezone.
// `locale` comes from useI18n() ("en-GB", "it-IT").

// A bare "YYYY-MM-DD" is read as UTC midnight: format it in UTC too, or
// visitors west of Greenwich would see the previous day
export const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const formatSessionTime = (
  date: string,
  time: string | undefined,
  locale: string,
) => {
  const start = new Date(time ? `${date}T${time}` : date);
  const day = start.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  if (!time) return day;
  const hour = start.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} · ${hour}`;
};

// Whole years between a birth date and today
export const ageFrom = (dateOfBirth: string) => {
  const born = new Date(dateOfBirth);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  const hadBirthday =
    now.getMonth() > born.getMonth() ||
    (now.getMonth() === born.getMonth() && now.getDate() >= born.getDate());
  return now.getFullYear() - born.getFullYear() - (hadBirthday ? 0 : 1);
};
