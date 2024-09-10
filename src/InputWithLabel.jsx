import { useEffect, useRef } from 'react';
import styles from './InputWithLabel.module.css';

export default function InputWithLabel({
	id,
	value,
	onChange,
	children,
}) {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	});

	return (
		<>
			<label htmlFor="todoTitle">{children} </label>

			<input
				className={styles.input}
				ref={inputRef}
				id="todoTitle"
				value={value}
				onChange={onChange}
				placeholder="New task"
			/>
		</>
	);
}
