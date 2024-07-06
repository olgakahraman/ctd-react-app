import { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

import './App.css';

function App() {

	
	const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
	return (
		<div>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={setNewTodo} />
			<p>{newTodo}</p>
			<TodoList todoList = {todoList} />
		</div>
	);
}
export default App;
