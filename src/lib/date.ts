export const dayLTE = (d1: Date, d2: Date) => {
  const isLTE = d1.getTime() <= d2.getTime();
  const isSameDay =
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  return isLTE || isSameDay;
};

export const dayGTE = (d1: Date, d2: Date) => {
  const isGTE = d1.getTime() >= d2.getTime();
  const isSameDay =
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  return isGTE || isSameDay;
};
