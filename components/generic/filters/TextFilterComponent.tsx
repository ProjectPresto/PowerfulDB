/* eslint-disable react-hooks/exhaustive-deps */
import type { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

interface Props {
	filterUrl: string;
	placeholder?: string;
}

const TextFilterComponent: NextComponentType<NextPageContext, {}, Props> = ({ filterUrl, placeholder }: Props) => {
	const router = useRouter();
	const [inputValue, setInputValue] = useState<string | undefined>(router.query[filterUrl]?.toString());

	const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
		setInputValue(currentTarget.value);

		const waitStopTyping = setTimeout(() => {
			if (currentTarget.value === '') {
				delete router.query[filterUrl];
			} else {
				router.query[filterUrl] = currentTarget.value;
			}
			router.replace({
				query: router.query
			});
		}, 300);

		return () => clearTimeout(waitStopTyping);
	};

	return (
		<div>
			<input type="text" value={inputValue} onChange={(e) => handleChange(e)} className="w-56 input-style" placeholder={placeholder}/>
		</div>
	);
};

export default TextFilterComponent;
