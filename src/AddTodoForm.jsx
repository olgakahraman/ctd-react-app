import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

export default function AddTodoForm({ onAddTodo }) {
	const [todoTitle, setTodoTitle] = useState('');

	function handleTitleChange(event) {
		let newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	}

	const postTodo = async (newTodo) => {
		console.log('newTodo', newTodo);
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

	function handleAddTodo(event) {
		event.preventDefault();
		onAddTodo({ title: todoTitle, id: Date.now() });
		postTodo(todoTitle);
		setTodoTitle('');
	}

	return (
		<div>
			<form onSubmit={handleAddTodo}>
				<InputWithLabel
					value={todoTitle}
					onChange={handleTitleChange}
				>
					<strong>Title:</strong>
				</InputWithLabel>
				<button className="submit-btn">Add</button>
			</form>
		</div>
	);
}
