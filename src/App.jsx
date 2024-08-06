import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

import './App.css';

function App() {
	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo]);
	}

	useEffect(() => {
		const p1 = new Promise((resolve, reject) => {
			setTimeout(() =>
				resolve({ data: { todoList: [] } }, 2000).then(
					(result) => {
						setTodoList(result);
						setIsLoading(false);
					}
				)
			);
		});
	});

	const [todoList, setTodoList] = useState(
		JSON.parse(localStorage.getItem('savedTodoList')) || []
	);

	const [isLoading, setIsLoading] = "true";


	useEffect(() => {
		if(!isLoading)
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
			if(isLoading){
				(<p>Loading...</p>)
			}else{
					<TodoList
				todoList={todoList}
				onRemoveTodo={removeTodo}
			/>
			}
			
		
		</>
	);
}

export default App;
