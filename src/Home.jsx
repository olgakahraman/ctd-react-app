import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

export default function Home({
	todoList,
	isLoading,
	addTodo,
	removeTodo,
}) {
	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList
					todoList={todoList}
					onRemoveTodo={removeTodo}
				/>
			)}
		</>
	);
}
