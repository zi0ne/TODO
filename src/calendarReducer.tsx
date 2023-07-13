import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarState {
  selectedDate: String | null; // Date 타입 대신에 문자열(string)로 변경
}

const initialState: CalendarState = {
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    SelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload; // Date 객체를 문자열로 변환
    },
  },
});


export const { SelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
