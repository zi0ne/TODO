// store.ts 파일
import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import calendarReducer, {CalendarState} from './calendarReducer';


export type RootState = ReturnType<typeof store.getState>; // RootState 타입 정의

export type CustomThunkAPI = {
  dispatch: AppDispatch;
  getState: () => RootState;
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
CustomThunkAPI,
Action<string>
>;

export interface StoreState {
  calendar: CalendarState;
}

export const store = configureStore({
  reducer: {
    calendar: calendarReducer, // 상태관리 리듀서
  },

});
  
