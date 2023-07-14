import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// todo 기록
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// 날짜 선택
export interface CalendarState {
  selectedDate: string | null;
  todos: Record<string, Todo[]>;
}

// 액션 전 초기값
export const initialState: CalendarState = {
  selectedDate: null,
  todos: {},
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // 날짜 선택 액션
    SelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { SelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
