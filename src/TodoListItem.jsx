import React from 'react';

export default function TodoListItem({ item }) {
	console.log(item);
	return (
		<div>
			<li>{item.title}</li>
		</div>
	);
}
