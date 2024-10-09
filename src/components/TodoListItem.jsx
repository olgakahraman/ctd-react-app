import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';

export default function TodoListItem({
	item,
	onDoneTodo,
	onRemoveTodo,
}) {
	return (
		<li className={styles.ListItem}>
			{item.title}
			<div className={styles.btns}>
				<button
					className={`${styles.btn} ${
						item.isDone ? styles.done : ''
					}`}
					onClick={() => onDoneTodo(item.id)}
					title="Done"
				>
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
	);
}

TodoListItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		isDone: PropTypes.bool,
	}),
	onDoneTodo: PropTypes.func,
	onRemoveTodo: PropTypes.func.isRequired,
};
