import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

export default function AddTodoForm({ onAddTodo }) {
	const [todoTitle, setTodoTitle] = useState('');

	function handleTitleChange(event) {
		let newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	}
	function handleAddTodo(event) {
		event.preventDefault();
		onAddTodo({ title: todoTitle, id: Date.now() });
		setTodoTitle('');
	}
	return (
		<div>
			<form onSubmit={handleAddTodo}>
				<InputWithLabel
					title="Title"
					value={todoTitle}
					onChange={handleTitleChange}
				></InputWithLabel>
				<button className="submit-btn">Add</button>
			</form>
		</div>
	);
}
