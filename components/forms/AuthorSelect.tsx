import type { NextComponentType, NextPageContext } from 'next';
import { customSelectStyle, Option } from '@components/filters/SelectFilterComponent';
import ArtistService from '@services/ArtistService';
import BandService from '@services/BandService';
import { StylesConfig } from 'react-select/dist/declarations/src';
import AsyncSelect from 'react-select/async';
import { FormikProps } from 'formik';


export interface GroupedOption {
	readonly label: string;
	readonly options: Option[];
}

const getAuthors = async (query: string): Promise<GroupedOption[]> => {
	const { results: artists } = await ArtistService.getArtistList({ size: 24, search: query });
	const { results: bands } = await BandService.getBandList({ size: 24, search: query });
	return [
		{
			label: 'Artists',
			options: artists.map(artist => (
				{
					value: `artist-${artist.id}`, label: artist.name
				}
			))
		}, {
			label: 'Bands',
			options: bands.map(band => (
				{
					value: `band-${band.id}`, label: band.name
				}
			))
		}
	];
};

interface Props {
	formik: FormikProps<any>;
}

const AuthorSelect: NextComponentType<NextPageContext, {}, Props> = ({ formik }: Props) => {
	const getAuthorsOptions = (inputValue: string) => new Promise<GroupedOption[]>((resolve) => {
		resolve(getAuthors(inputValue));
	});

	const selectStyle: StylesConfig = {
		...customSelectStyle,
		container: (provider) => (
			{
				...provider, minWidth: 200, width: '100%', borderRadius: '1.5rem', border: '2px solid #4EFFA6'
			}
		)
	};

	return (
		<AsyncSelect<unknown, boolean, GroupedOption>
			instanceId="author-select"
			cacheOptions
			defaultOptions
			placeholder="Iron Maiden"
			loadOptions={getAuthorsOptions}
			onChange={(v: unknown) => typeof v === 'object' && formik.setFieldValue('author', v)}
			onBlur={formik.handleBlur}
			value={formik.values.author}
			// @ts-ignore ez fix
			styles={selectStyle}
			isSearchable={true}
			name="author"
		/>
	);
};

export default AuthorSelect;