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

	async function fetchData() {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${
					import.meta.env.VITE_AIRTABLE_API_TOKEN
				}`,
			},
		};
		const url = `https://api.airtable.com/v0/${
			import.meta.env.VITE_AIRTABLE_BASE_ID
		}/${import.meta.env.VITE_TABLE_NAME}`;
		console.log('url ===> ', url);
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				const message = `Error has ocurred: ${response.status}`;
				throw new Error(message);
			}
			const data = await response.json();
			// console.log('data ===> ', data);

			const todos = data.records.map((todo) => {
				// const newTodo = {
				// 	id: todo.id,
				// 	title: todo.fields.title,
				// };
				// console.log();

				// return newTodo;
				return {
					id: todo.id,
					title: todo.fields.title,
				};
			});
			console.log('todos ===> ', todos);

			setTodoList(todos);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		fetchData();
		// const p1 = new Promise((resolve, reject) => {
		// 	setTimeout(
		// 		() =>
		// 			resolve({
		// 				data: {
		// 					todoList:
		// 						JSON.parse(
		// 							localStorage.getItem('savedTodoList')
		// 						) || [],
		// 				},
		// 			}),
		// 		2000
		// 	);
		// }).then((result) => {
		// 	console.log(result);
		// 	setTodoList(result.data.todoList);
		// 	setIsLoading(false);
		// });
	}, []);

	// const postTodo =  async(newTodo) => {
	// 	try {
	// 		const airtableData = {
	// 			fields: {
	// 				title: newTodo,
	// 			},
	// 		};
	// 		const response = await fetch(
	// 			`https://api.airtable.com/v0/${
	// 				import.meta.env.VITE_AIRTABLE_BASE_ID
	// 			}/Default`,
	// 			{
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: `Bearer ${
	// 						import.meta.env.VITE_AIRTABLE_API_TOKEN
	// 					}`,
	// 				},
	// 				body: JSON.stringify(airtableData),
	// 			}
	// 		);
	// 		if (!response.ok) {
	// 			const message = `Error has ocurred: ${response.status}`;
	// 			throw new Error(message);
	// 		}
	// 		const dataResponse = await response.json();
	// 		return dataResponse;
			
	// 	} catch (error) {
	// 		console.log(error.message);
			
	// 	}
	// }
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
