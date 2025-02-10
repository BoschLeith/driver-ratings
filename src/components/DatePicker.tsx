import { CalendarIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils/cn';

interface DatePickerProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DatePicker = ({ selectedDate, setSelectedDate }: DatePickerProps) => {
  const [date, setDate] = useState<DateTime>();

  useEffect(() => {
    if (selectedDate) {
      setDate(DateTime.fromISO(selectedDate));
    } else {
      setDate(undefined);
    }
  }, [selectedDate]);

  const handleDateSelect = (selected?: Date) => {
    if (selected) {
      const luxonDate = DateTime.fromJSDate(selected);
      setDate(luxonDate);
      setSelectedDate(luxonDate.toISO() || '');
    } else {
      setDate(undefined);
      setSelectedDate('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? (
            date.toFormat('EEE MMM dd yyyy')
          ) : (
            <span>Pick a date</span>
          )}{' '}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? date.toJSDate() : undefined}
          onSelect={handleDateSelect}
          initialFocus
          defaultMonth={date ? date.toJSDate() : undefined}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
