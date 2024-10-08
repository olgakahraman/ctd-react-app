import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './AddTodoForm.module.css';
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
			<form
				className={styles.form}
				onSubmit={handleAddTodo}
			>
				<InputWithLabel
					value={todoTitle}
					onChange={handleTitleChange}
				></InputWithLabel>
				{/* <button className={styles.btn}>Add</button> */}
			</form>
		</div>
	);
}

AddTodoForm.propTypes = {
	onAddTodo: PropTypes.func,
};
