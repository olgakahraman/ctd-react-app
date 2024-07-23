import React from 'react';

export default function InputWithLabel({
	id,
	value,
	onChange,
	children,
}) {
	return (
		<>
			<label htmlFor="todoTitle">{children} </label>
			<input id={id} value={value} onChange={onChange} />
		</>
	);
}
