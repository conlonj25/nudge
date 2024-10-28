import { useState } from "react";

const useDate = () => {
	const [date, setDate] = useState(new Date());

	const calendarDate = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .split(" ")[0];

	const increaseDate = () => {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + 1);
		setDate(newDate);
	}

	const decreaseDate = () => {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() - 1);
		setDate(newDate);
	}

	const setExactDate = (date: Date | undefined) => {
		if (date) {
			setDate(date);
		}
	}

	return { date, calendarDate, increaseDate, decreaseDate, setExactDate };
}

export default useDate;
