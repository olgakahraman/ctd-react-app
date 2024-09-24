import AddTodoForm from './AddTodoForm';
import styles from './Home.module.css';
import TodoList from './TodoList';

export default function Home({
	todoList,
	isLoading,
	addTodo,

	removeTodo,
}) {
	return (
		<>
		<div className={styles.container}>
			<h1 className={styles.header}>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList
					todoList={todoList}
					
					onRemoveTodo={removeTodo}
				/>
			)}
		</div>
		<footer>
				
					This project was coded by Olga Dietiuk Kahraman
				and it is{' '}
					<a
						href="https://github.com/olgakahraman/ctd-react-app"
						target="_blank"
						title="GitHub"
						rel="noopener noreferrer"
					>
						open-sourced on GitHub
					</a>
			
			</footer>
</>

	);
}
