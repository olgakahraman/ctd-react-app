import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

import './App.css';

function App() {
	const [todoList, setTodoList] = useState([]);

	const [isLoading, setIsLoading] = useState('true');

	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo]);
	}

	useEffect(() => {
		const p1 = new Promise((resolve, reject) => {
			setTimeout(
				() =>
					resolve({
						data: {
							todoList:
								JSON.parse(
									localStorage.getItem('savedTodoList')
								) || [],
						},
					}),
				2000
			);
		}).then((result) => {
			console.log(result);
			setTodoList(result.data.todoList);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		if (!isLoading)
			localStorage.setItem(
				'savedTodoList',
				JSON.stringify(todoList)
			);
	}, [todoList]);

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
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList
					todoList={todoList}
					onRemoveTodo={removeTodo}
				/>
			)}
		</>
	);
}

export default App;
