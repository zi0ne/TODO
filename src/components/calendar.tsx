import { useState } from "react";
import { format, startOfMonth, addMonths, subMonths, startOfWeek, addDays, isSameMonth } from "date-fns";
import "./calendar.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux'
import { SelectedDate } from '../calendarReducer'

//props 타입 지정
interface CalendarProps {
  year: number;
  month: number;
}

// 현 날짜로 currentMonth 상태 설정, 월의 첫 날짜와 주의 첫 날짜 할당
const Calendar = ({ year, month }: CalendarProps) => {
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const firstDayOfMonth = startOfMonth(currentMonth);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth);

  // 캘린더 테이블에 맞게 42개의 날짜(숫자)를 배열로 저장
  const daysInMonth:Date[] = [];
  for (let i = 0; i < 42; i++) {
    const date = addDays(firstDayOfWeek, i);
    daysInMonth.push(date);
  }
 
  // 다음달 버튼 addMonths 사용
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };
  
  // 이전달 버튼 subMonts 사용 
  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };
  

  // const handleNextMonth = () => {
  //   const nextMonth = addMonths(currentMonth, 1);
  //   setCurrentMonth(nextMonth);
  // };

  // const handlePrevMonth = () => {
  //   const prevMonth = subMonths(currentMonth, 1);
  //   setCurrentMonth(prevMonth);
  // };

  // 요일 배열로 저장
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 클릭된 날짜 저장
  // const electDate = (date: Date) => {
  //   const Dispatch = useDispatch()
  //   Dispatch(SelectedDate(date));
  // };
  const dispatch = useDispatch();

  const selectDate = (date: Date) => {
    dispatch(SelectedDate(date.toString()));
  };


  // 로컬에 todo 목록이 저장된 키만 가져오기
  const keysWithValues = Object.keys(localStorage).filter((key) => {
    return key !== 'todos' && key !== null;
  });
  
  console.log(keysWithValues);
  
  

  return (
    <div className="calendar-wrap">
      <div className="calendar-header">
        <Button variant="outline-success" onClick={handlePrevMonth}>Prev</Button>{' '}
        <h3>{format(currentMonth, "MMMM yyyy")}</h3>
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
                    className={`${
                      isSameMonth(date, firstDayOfMonth) ? "current-month" : "not-current-month"
                    } ${keysWithValues.includes(date.toString()) ? "yes-todos" : "no-todos"}`}
                    onClick={() => selectDate(date)}
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
