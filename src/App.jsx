import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TodoContainer from './components/TodoContainer';

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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

	const doneTodo = async (id) => {
		console.log(id, todoList);
		const updatedTodoList = todoList.map((todo) =>
			todo.id === id
				? { ...todo, isDone: !todo.isDone }
				: todo
		);

		setTodoList(updatedTodoList); // Update state immediately
		await patchTodo(
			id,
			updatedTodoList.find((todo) => todo.id === id).isDone
		); // Call patchTodo with the correct status
	};

	const patchTodo = async (id, isDone) => {
		try {
			const airtableData = {
				fields: {
					isDone: isDone,
				},
			};
			const url = `https://api.airtable.com/v0/${
				import.meta.env.VITE_AIRTABLE_BASE_ID
			}/Default/${id}`;

			const response = await fetch(url, {
				method: 'PATCH',
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
		const inputValue =
			document.querySelector('#todoTitle').value;
		if (!inputValue) {
			alert('Please type something');
		} else {
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
		}/${
			import.meta.env.VITE_TABLE_NAME
		}?name=value&view=Grid%20view`; //?name=value&view=Grid%20view`

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				const message = `Error has ocurred: ${response.status}`;
				throw new Error(message);
			}
			const data = await response.json();

			const todos = data.records
				.map((todo) => {
					return {
						id: todo.id,
						title: todo.fields.title,
						isDone: todo.fields.isDone,
					};
				})

				//ABC order
				.sort((objectA, objectB) => {
					const TitleA = objectA.title.toUpperCase();
					const TitleB = objectB.title.toUpperCase();
					if (TitleA < TitleB) {
						return -1;
					} else if (TitleA > TitleB) {
						return 1;
					} else {
						return 0;
					}
				});

			//reversing order

			// .sort((objectA, objectB) => {
			// 	const TitleA = objectA.title.toUpperCase();
			// 	const TitleB = objectB.title.toUpperCase();
			// 	if (TitleA < TitleB) {
			// 		return 1;
			// 	} else if (TitleA > TitleB) {
			// 		return -1;
			// 	} else {
			// 		return 0;
			// 	}
			// });
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
	}, [todoList, isLoading]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<TodoContainer
						todoList={todoList}
						addTodo={addTodo}
						isLoading={isLoading}
						doneTodo={doneTodo}
						removeTodo={removeTodo}
					/>
				}
			/>

			<Route path="/new" element={<h1>New Todo List</h1>} />
		</Routes>
	);
}

export default App;
