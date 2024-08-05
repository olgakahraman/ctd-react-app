import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

import './App.css';



function App() {
	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo]);
	}

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
	
	

	const removeTodo = (id) => {
		console.log(id, todoList);
		const newList = todoList.filter(
			(todoItem) => id !== todoItem.id
		);
		setTodoList(newList);
	};

	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			<TodoList
				todoList={todoList}
				onRemoveTodo={removeTodo}
			/>
		</>
	);
}

export default App;
