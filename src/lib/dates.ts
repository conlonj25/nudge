export const dateToShortISO = (d: Date): string => {
  return d.toISOString().slice(0, 10);
};

export const shortISOToDate = (s: string): Date => {
  const [year, month, date] = s
    .split("-")
    .map(Number)
    .filter((num) => !Number.isNaN(num));

  if (year && month && date) {
    return new Date(year, month - 1, date, 12);
  }

  return new Date(1970, 0, 1, 12);
};

export const getListOfDatesInRange = function (startDate: Date, endDate: Date) {
  const arr = [];
  for (
    const dt = new Date(startDate);
    dt <= new Date(endDate);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr.map((v) => v.toISOString().slice(0, 10));
};

export const firstDayOfThisYearNoon = () =>
  new Date(new Date().getFullYear(), 0, 1, 12);
export const lastDayOfThisYearNoon = () =>
  new Date(new Date().getFullYear(), 11, 31, 12);
export const todayNoon = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
};
export const yesterdayNoon = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
};

export const getDayStartingMonday = (d: Date): number => {
  return (6 + d.getDay()) % 7;
};
