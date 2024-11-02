import { CalendarIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";

type DatePickerProps = {
  date: Date;
  increaseDate: () => void;
  decreaseDate: () => void;
  setExactDate: (date: Date | undefined) => void;
};

const DatePicker = ({
  date,
  increaseDate,
  decreaseDate,
  setExactDate,
}: DatePickerProps) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <Button variant="outline" onClick={decreaseDate}>
        {"<"}
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setExactDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button variant="outline" onClick={increaseDate}>
        {">"}
      </Button>
    </div>
  );
};

export default DatePicker;
