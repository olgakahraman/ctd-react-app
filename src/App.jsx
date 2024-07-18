import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

import './App.css';

function useSemiPersistentState() {
	const [todoList, setTodoList] = useState(
		JSON.parse(localStorage.getItem('savedTodoList')) || []
	);

	useEffect(() => {
		localStorage.setItem(
			'savedTodoList',
			JSON.stringify(todoList),
			[todoList]
		);
	});
	return [todoList, setTodoList];
}

function App() {
	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo]);
	}

	const [todoList, setTodoList] = useSemiPersistentState();

	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			<TodoList todoList={todoList} />
		</>
	);
}

export default App;
