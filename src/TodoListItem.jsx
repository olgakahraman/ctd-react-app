import React from 'react';
import styles from './TodoListItem.module.css';

export default function TodoListItem({
	item,
	onRemoveTodo,
}) {
	return (
		<>
			<li className={styles.ListItem}>
				{item.title}
				<div className={styles.btns}>
					<button className={styles.btn} title="Done">
						<i className="fa-solid fa-check"></i>
					</button>
					<button
						className={styles.btn}
						onClick={() => onRemoveTodo(item.id)}
						title="Remove"
					>
						<i className="fa-solid fa-trash-can"></i>
					</button>
				</div>
			</li>
		</>
	);
}
