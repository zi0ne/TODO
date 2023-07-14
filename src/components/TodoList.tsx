import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { RootState } from '../store';
import { SelectedDate, Todo } from '../calendarReducer';
import { format, startOfDay } from 'date-fns';
import './component.css';

export interface TodoListProps {
  onDeleteTodo: (date: string, id: number) => void;
  onToggleDone: (date: string, id: number) => void;
}

const TodoList: React.FunctionComponent<TodoListProps> = ({ onToggleDone, onDeleteTodo }) => {
  const dispatch = useDispatch();
  const selectDate = useSelector((state: RootState) => state.calendar.selectedDate) as string;

  const [newTodoText, setNewTodoText] = useState('');
  const [date, setDate] = useState<string>(new Date().toString());
  const formattedDate = format(new Date(date), 'yyyy.MM.dd');
  const [todosByDate, setTodosByDate] = useState<Todo[]>([]);

  const currentDate = new Date().setHours(0, 0, 0, 0);
  const formattDate : string = new Date(currentDate).toString();


  // useEffect(() => {
  //   const initialDateKey = startOfDay(new Date()).toString();
  //   const savedTodos = localStorage.getItem(initialDateKey);
  //   if (savedTodos) {
  //     const todos = JSON.parse(savedTodos);
  //     setTodosByDate(todos);
  //   } else {
  //     setTodosByDate([]);
  //   }
  // }, []);

  useEffect(() => {
    const savedTodos = localStorage.getItem(selectDate);
    if (savedTodos) {
      const todos = JSON.parse(savedTodos);
      setTodosByDate(todos);
    } else {
      setTodosByDate([]);
    }
  }, [selectDate]);

  useEffect(() => {
    if (selectDate) {
      setDate(selectDate);
    } else {
      setDate(new Date().toString());
    }
  }, [selectDate]);

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      done: false,
    };

    const updatedTodos = [...todosByDate, newTodo];
    setTodosByDate(updatedTodos);
    setNewTodoText('');
    if (selectDate) {
      localStorage.setItem(selectDate, JSON.stringify(updatedTodos));
    } else {
      localStorage.setItem(formattDate, JSON.stringify(updatedTodos));
    }

  };


  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todosByDate.filter((todo: Todo) => todo.id !== id);
    setTodosByDate(updatedTodos);
    if (selectDate) {
      if (updatedTodos.length === 0) {
        localStorage.removeItem(selectDate);
      } else {
        localStorage.setItem(selectDate, JSON.stringify(updatedTodos));
      }
    } else {
      if (updatedTodos.length === 0) {
        localStorage.removeItem(formattDate);
      } else {
        localStorage.setItem(formattDate, JSON.stringify(updatedTodos));
      }
    }
  
    onDeleteTodo(selectDate, id);
  };

  const handleToggleDone = (id: number) => {
    const updatedTodos = todosByDate.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodosByDate(updatedTodos);
    localStorage.setItem(selectDate, JSON.stringify(updatedTodos));
    onToggleDone(selectDate, id);
  };

  return (
    <div className="construct">
      <div className="header">
        <span className="rowDiv">
          <h2>To Do List</h2>
          <h5>{formattedDate}</h5>
        </span>
        <TodoForm value={newTodoText} onChange={(text) => setNewTodoText(text)} onAdd={handleAddTodo} />
      </div>
      <div className="list">
        {selectDate ? (
        <ul>
              {todosByDate.map((todo: Todo) => (
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.done} onChange={() => handleToggleDone(todo.id)} />
                  <span style={{ marginLeft: '10px' }}>{todo.text}</span>
                  - {todo.done ? 'done ' : 'not done '}
                  <button className="button" onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            ) : (
              <ul>
              {localStorage.getItem(formattDate) !== null &&
              JSON.parse(localStorage.getItem(formattDate)!).map((todo: Todo) => (
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.done} onChange={() => handleToggleDone(todo.id)} />
                  <span style={{ marginLeft: '10px' }}>{todo.text}</span>
                  - {todo.done ? 'done ' : 'not done '}
                  <button className="button" onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
              )}
              
      </div>
    </div>
  );
};

export default TodoList;
