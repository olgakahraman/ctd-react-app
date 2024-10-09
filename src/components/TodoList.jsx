import PropTypes from 'prop-types';
import React from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList({
	todoList,
	onDoneTodo,
	onRemoveTodo,
}) {
	return (
		<>
			<ul id="list">
				{todoList.map(function (item) {
					return (
						<TodoListItem
							item={item}
							key={item.id}
							onDoneTodo={onDoneTodo}
							onRemoveTodo={onRemoveTodo}
						/>
					);
				})}
			</ul>
		</>
	);
}

TodoList.propTypes = {
	todoList: PropTypes.array,
	onDoneTodo: PropTypes.func,
	onRemoveTodo: PropTypes.func,
};
