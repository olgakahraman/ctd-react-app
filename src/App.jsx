import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState('true');

	const deleteTodo = async (id) => {
		const response = await fetch(
			`https://api.airtable.com/v0/${
				import.meta.env.VITE_AIRTABLE_BASE_ID
			}/Default/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						import.meta.env.VITE_AIRTABLE_API_TOKEN
					}`,
				},
			}
		);
		const data = await response.json();
		return data;
	};

	const removeTodo = (id) => {
		console.log(id, todoList);
		const newList = todoList.filter(
			(todoItem) => id !== todoItem.id
		);
		setTodoList(newList);
		deleteTodo(id);
	};

	const postTodo = async (title) => {
		try {
			const airtableData = {
				records: [
					{
						fields: {
							title: `${title}`,
						},
					},
				],
			};
			const url = `https://api.airtable.com/v0/${
				import.meta.env.VITE_AIRTABLE_BASE_ID
			}/Default`;

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						import.meta.env.VITE_AIRTABLE_API_TOKEN
					}`,
				},
				body: JSON.stringify(airtableData),
			});
			if (!response.ok) {
				const message = `Error has ocurred: ${response.status}`;
				throw new Error(message);
			}
			const dataResponse = await response.json();
			return dataResponse;
		} catch (error) {
			console.log(error.message);
		}
	};

	async function addTodo(newTodo) {
		console.log('newTodo before ===> ', newTodo);
		const dataResponse = await postTodo(newTodo.title);
		console.log('dataResponse ===> ', dataResponse);
		console.log(
			'dataResponse.records[0].id ===> ',
			dataResponse.records[0].id
		);
		// const todoObject
		const todoId = dataResponse.records[0].id;
		console.log('todoId ===> ', todoId);
		newTodo.id = todoId;
		console.log('newTodo after ===> ', newTodo);
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

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				const message = `Error has ocurred: ${response.status}`;
				throw new Error(message);
			}
			const data = await response.json();

			const todos = data.records.map((todo) => {
				return {
					id: todo.id,
					title: todo.fields.title,
				};
			});
			setTodoList(todos);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	}

	// fetch data
	useEffect(() => {
		fetchData();
	}, []);

	// save todo list in localStorage
	useEffect(() => {
		if (!isLoading)
			localStorage.setItem(
				'savedTodoList',
				JSON.stringify(todoList)
			);
	}, [todoList]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Home
						todoList={todoList}
						addTodo={addTodo}
						isLoading={isLoading}
						removeTodo={removeTodo}
					/>
				}
			/>

			<Route path="/new" element={<h1>New Todo List</h1>} />
		</Routes>
	);
}

export default App;
