import { useState } from "react";
import { format, startOfMonth, addMonths, subMonths, startOfWeek, addDays, isSameMonth } from "date-fns";
import "./calendar.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CalendarProps {
  year: number;
  month: number;
}

const Calendar = ({ year, month }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(year, month));
  const firstDayOfMonth = startOfMonth(currentMonth);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth);

  const daysInMonth:Date[] = [];
  for (let i = 0; i < 42; i++) {
    const date = addDays(firstDayOfWeek, i);
    daysInMonth.push(date);
  }

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    setCurrentMonth(prevMonth);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-wrap">
      <div className="calendar-header">
        <Button variant="outline-success" onClick={handlePrevMonth}>Prev</Button>{' '}
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <Button variant="outline-success" onClick={handleNextMonth}>Next</Button>{' '}
      </div>
      <table>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5].map((weekIndex) => (
            <tr key={weekIndex}>
              {weekdays.map((weekday) => {
                const dateIndex = weekIndex * 7 + weekdays.indexOf(weekday);
                const date = daysInMonth[dateIndex];
                return (
                  <td
                    key={weekday}
                    className={isSameMonth(date, firstDayOfMonth) ? "current-month" : "not-current-month"}
                  >
                    {format(date, "d")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
