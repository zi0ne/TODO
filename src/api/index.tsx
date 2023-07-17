import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/zi0ne/TODO_DB/db";

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const addTodo = async (text: string) => {
  const response = await axios.post(`${API_URL}/todos`, { text, done: false });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};

export const toggleTodoDone = async (id: number, done: boolean) => {
  await axios.patch(`${API_URL}/todos/${id}`, { done });
};
