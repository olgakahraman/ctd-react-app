import { useState } from 'react';
export default function AddTodoForm({ onAddTodo }) {
	const [todoTitle, setTodoTitle] = useState('');

	function handleTitleChange(event) {
		let newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	}
	function handleAddTodo(event) {
		event.preventDefault();
		onAddTodo({ title: todoTitle, id: Date.now() });
		setTodoTitle("");
	}
	return (
		<div>
			<form onSubmit={handleAddTodo}>
				<label htmlFor="todoTitle">Title</label>
				<input
					type="text"
					id="todoTitle"
					name="title"
					value={todoTitle}
					onChange={handleTitleChange}
				/>
				<button className="submit-btn">Add</button>
			</form>
		</div>
	);
}
