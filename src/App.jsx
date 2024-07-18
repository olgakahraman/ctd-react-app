import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

import './App.css';

function App() {
	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo]);
	}

	const [todoList, setTodoList] = useState(
		JSON.parse(localStorage.getItem('todoList')) || []
	);

	useEffect(() => {
		localStorage.setItem(
			'savedTodoList',
			JSON.stringify(todoList),
			[todoList]
		);
	});

	return (
		<div>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />

			<TodoList todoList={todoList} />
		</div>
	);
}

export default App;
