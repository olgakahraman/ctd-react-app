import React from 'react';
import TodoListItem from './TodoListItem';



export default function TodoList(props) {
	return (
		<div>
			<ul>
				{props.todoList.map(function (item) {
					return <TodoListItem item={item} key={item.id} />;
				})}
			</ul>
		</div>
	);
}
