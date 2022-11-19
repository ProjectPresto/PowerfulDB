import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactElement } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';

import { NextPageWithLayout } from '@pages/_app';
import { CreateAlbum, typeOptions } from '@models/album';
import { customSelectStyle } from '@components/generic/filters/SelectFilterComponent';
import MainLayout from '@components/layouts/MainLayout';
import AuthorSelect from '@components/forms/AuthorSelect';
import GenreSelect from '@components/forms/GenreSelect';
import { toast } from 'react-toastify';
import AlbumService from '@services/AlbumService';

interface formValues {
	title: string,
	author?: { value: string, label: string },
	release_date: string,
	release_type: { value: string, label: string },
	genres: { value: string, label: string }[],
	art_cover?: string,
	art_cover_url?: string;
}

const AlbumCreate: NextPageWithLayout = () => {
	const router = useRouter();
	// const [errors, setErrors] = useState();

	const initialValues: formValues = {
		title: '', author: undefined, release_date: '', release_type: { value: 'LP', label: 'LP' }, genres: [], art_cover: undefined
	};

	const formik = useFormik({
		initialValues, // validationSchema => {}
		onSubmit: async ({ title, release_date, release_type, art_cover, author, genres }) => {
			const album: CreateAlbum = {
				title, release_date, release_type: release_type.value, art_cover, genres: []
			};

			const authorArr = author?.value.split('-');
			if (authorArr && authorArr[0] === 'artist') {
				album['artist'] = parseInt(authorArr[1]);
			} else if (authorArr) {
				album['band'] = parseInt(authorArr[1]);
			}

			genres.forEach(genre => {
				album.genres.push(parseInt(genre.value));
			});
			try {
				const data = await toast.promise(AlbumService.postAlbum(album, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}), {
					pending: 'Adding album', success: 'Album added ✅', error: 'Error when adding album ❌'
				});
				await router.push(`/album/${data.slug}`);
			} catch (err) {
				console.log(err);
			}
		}

	});

	return (
		<>
			<Head>
				<title>Create album | PowerfulDB</title>
			</Head>
			<div className="py-10 lg:py-14 px-6 md:px-10 lg:px-20 w-full flex flex-col justify-center items-center">
				<form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
					<h1 className="form-title mb-4 mb:mb-6">Add an album</h1>

					<div className="space-y-6 md:space-y-10 max-w-lg xl:max-w-3xl text-sm sm:text-base md:text-lg">
						<div>
							<label htmlFor="title" className="required-star">Title</label>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="The Number of the Beast"
								value={formik.values.title}
								onChange={formik.handleChange}
								className="input-style"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="author-select" className="required-star">Author</label>
							<AuthorSelect formik={formik}/>
						</div>

						<div className="flex gap-8">
							<div className="flex-1 ">
								<label htmlFor="release_date" className="required-star">Release date</label>
								<input
									type="date"
									name="release_date"
									id="release_date"
									value={formik.values.release_date}
									onChange={formik.handleChange}
									className="input-style"
								/>
							</div>

							<div className="space-y-2 flex-1">
								<label htmlFor="release_date" className="required-star">Release type</label>
								<Select
									instanceId="release-type-select"
									options={typeOptions}
									onChange={(v: unknown) => typeof v === 'object' && formik.setFieldValue('release_type', v)}
									value={formik.values.release_type}
									styles={customSelectStyle}
									className="w-full"
								/>
							</div>
						</div>

						<div className="flex flex-col items-start gap-y-2">
							<p>Genres</p>
							<GenreSelect formik={formik}/>
						</div>

						<div className="flex flex-col gap-y-2 overflow-visible">
							<label htmlFor="art_cover">Art cover</label>
							<input
								type="file"
								name="art_cover"
								id="art_cover"
								onChange={({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
									currentTarget.files && formik.setFieldValue('art_cover', currentTarget.files[0]);
								}}
								className="text-gray-400 file:border-solid file:btn-style file:text-primary-light file:mr-3"
							/>
						</div>
						<div className="flex justify-end">
							<button type="submit" className="btn-style">Create</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default AlbumCreate;

AlbumCreate.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
