import React from 'react';

export default function InputWithLabel(props) {
	return (
		<>
			<label htmlFor="todoTitle">{props.title}: </label>
			<input
				type="text"
				id="todoTitle"
				name="title"
				value={props.value}
				onChange={props.onChange}
			/>
		</>
	);
}
