import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

export default function TodoList({
	todoList,
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
	onRemoveTodo: PropTypes.func,
}