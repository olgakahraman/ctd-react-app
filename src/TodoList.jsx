import React from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList({
	todoList,
	onRemoveTodo,
}) {
	return (
		<>
			<ul>
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
