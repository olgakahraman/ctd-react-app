import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import styles from './InputWithLabel.module.css';

export default function InputWithLabel({
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
			What&apos;s up?
			<div className="inputContainer">
				<input
					className={styles.input}
					ref={inputRef}
					id="todoTitle"
					value={value}
					onChange={onChange}
					placeholder="New task"
				/>
				<button className={styles.btn} title="Add task">
					Add
				</button>
			</div>
		</>
	);
}

InputWithLabel.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	children: PropTypes.object,
};
