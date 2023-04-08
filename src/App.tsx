import React, { useState } from 'react';
import TodoList, { Todo } from './components/TodoList';

//Todo 상태관리
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

 


  // 문자열 타입 text를 인자로 받아 newTo 객체로 만들어 setTodos를 사용하여 todo에 추가
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      text: text,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  //number 타입 id를 인자로 받아 바뀐 done값을 업데이트하여 상태에 반영
  const handleTodoToggle = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoList todos={todos} onToggleDone={handleTodoToggle} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

