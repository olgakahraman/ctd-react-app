import React from 'react';

export default function TodoListItem(props) {
	const item = props.item;
	return (
		<div>
			<li>{item.title}</li>
		</div>
	);
}
