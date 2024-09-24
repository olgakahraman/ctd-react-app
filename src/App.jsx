import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TodoContainer from './components/TodoContainer';

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

	const postTodo = async (newTodo) => {
		try {
			const airtableData = {
				records: [
					{
						fields: {
							title: `${newTodo}`,
						},
					},
				],
			};

			const response = await fetch(
				`https://api.airtable.com/v0/${
					import.meta.env.VITE_AIRTABLE_BASE_ID
				}/Default`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${
							import.meta.env.VITE_AIRTABLE_API_TOKEN
						}`,
					},
					body: JSON.stringify(airtableData),
				}
			);
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

	function addTodo(newTodo) {
		postTodo(newTodo.title);
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

	useEffect(() => {
		fetchData();
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
		deleteTodo(id);
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<TodoContainer
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
