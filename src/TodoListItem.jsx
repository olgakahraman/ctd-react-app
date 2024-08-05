import React from 'react';

export default function TodoListItem({
	item,
	onRemoveTodo,
}) {
	return (
		<>
			<li>
				{item.title}
				<button onClick={() => onRemoveTodo(item.id)}>
					Remove
				</button>
			</li>
		</>
	);
}
