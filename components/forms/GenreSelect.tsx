import type { NextComponentType, NextPageContext } from 'next';
import { FormikProps } from 'formik';
import { customSelectStyle, Option } from '@components/filters/SelectFilterComponent';
import AsyncSelect from 'react-select/async';
import GenreService from '@services/GenreService';
import { StylesConfig } from 'react-select/dist/declarations/src';


interface Props {
	formik: FormikProps<any>;
}

const GenreSelect: NextComponentType<NextPageContext, {}, Props> = ({ formik }: Props) => {
	const getGenres = (inputValue: string) => new Promise<Option[]>((resolve) => {
		resolve(GenreService.getGenreOptionList(inputValue));
	});

	const selectStyle: StylesConfig = {
		...customSelectStyle,
		container: (provider) => (
			{
				...provider, minWidth: 250, width: '100%', borderRadius: '1.5rem', border: '2px solid #4EFFA6'
			}
		),
		multiValueLabel: (provider) => (
			{
				...provider, padding: 0
			}
		)
	};

	return (
		<AsyncSelect
			instanceId="genre-select"
			cacheOptions
			defaultOptions
			loadOptions={getGenres}
			onChange={(v: unknown) => formik.setFieldValue('genres', v)}
			value={formik.values.genres}
			styles={selectStyle}
			placeholder="Post-Rock, Heavy Metal"
			isMulti
		/>
	);
};

export default GenreSelect;