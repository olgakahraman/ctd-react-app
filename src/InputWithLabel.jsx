import { useEffect, useRef } from 'react';

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
				ref={inputRef}
				id="todoTitle"   //{id}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
