import { useState } from 'react';
export default function AddTodoForm(props) {
	const [todoTitle, setTodoTitle] = useState('');

	function handleTitleChange(event) {
		let newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	}
	function handleAddTodo(event) {
		event.preventDefault();
		props.onAddTodo(todoTitle);
		event.target.reset();
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
