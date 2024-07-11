import React from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList({ todoList }) {
	return (
		<div>
			<ul>
				{todoList.map(function (item) {
					return <TodoListItem item={item} key={item.id} />;
				})}
			</ul>
		</div>
	);
}
