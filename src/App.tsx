import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { Todo } from './calendarReducer';
import Calendar from './components/calendar';
import './App.css'
// json-server --watch db.json --port 3000

//Todo 상태관리
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(()=>{
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos){
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  //number 타입 id를 인자로 받아 바뀐 done값을 업데이트하여 상태에 반영
  const handleTodoToggle = (date: string, id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  
  const handleDeleteTodo = (date: string, id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  })
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1);


  return (
    <div className='full'>
      <Calendar year={currentYear} month={currentMonth}/>
      <TodoList onToggleDone={handleTodoToggle} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

