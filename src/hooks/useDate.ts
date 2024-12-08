import { useState } from "react";
import { dateToShortISO, todayNoon } from "~/lib/dates";

const useDate = () => {
  const [date, setDate] = useState(todayNoon());
  const calendarDate = dateToShortISO(date);

  const increaseDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const decreaseDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const setExactDate = (date: Date | undefined) => {
    if (date) {
      date.setHours(12);
      setDate(date);
    }
  };

  return { date, calendarDate, increaseDate, decreaseDate, setExactDate };
};

export default useDate;
