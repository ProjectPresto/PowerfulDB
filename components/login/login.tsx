import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '@helpers/hooks';
import { toggleLoginModal } from '@store/helpers';
import { useContributorContext } from '@context/contributorProvider';

const Login: NextComponentType<NextPageContext, {}> = () => {
	const [error, setError] = useState('');
	const { login } = useContributorContext();
	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: {
			username: '', password: ''
		}, validationSchema: Yup.object({
			username: Yup.string().required().max(150), password: Yup.string().required().max(128).min(5)
		}), onSubmit: async ({ username, password }) => {
			const isLoggedIn = await login(username, password, setError);
			if (isLoggedIn) {
				dispatch(toggleLoginModal(false));
			}
		}
	});

	return (
		<div
			className="flex justify-center items-center h-screen w-screen bg-secondary-dark/50 backdrop-blur-sm fixed inset-0 z-[60]"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					dispatch(toggleLoginModal(false));
				}
			}}
		>
			<div className="px-6 md:px-10 lg:px-14 py-6 md:py-10 bg-primary-dark rounded-3xl max-w-lg m-4">
				<h1 className="font-bold text-2xl md:text-3xl mb-4">Login</h1>

				<p className="text-sm md:text-base">Please fill out the following fields to login:</p>

				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-3 sm:gap-4 md:gap-6
                    mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg"
				>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							className="input-style"
							required
							value={formik.values.username}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
						{formik.touched.username && formik.errors.username && <p className="text-red-500">{formik.errors.username}</p>}
					</div>

					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							className="input-style"
							required
							value={formik.values.password}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
						{formik.touched.password && formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
					</div>

					<div className="text-gray-400 flex flex-col gap-1 text-xs sm:text-sm md:text-base">
						<p className="text-primary-light">
							If you don&apos;t have an account{' '}
							<Link href="/signup" className="text-primary-accent hover:underline">
								create it here
							</Link>
						</p>
					</div>

					{error !== '' && <p className="text-base text-red-500">{error}</p>}

					<div className="flex justify-end">
						<button type="submit" className="btn-style">
							Login
						</button>
					</div>
				</form>

				<button
					className="material-symbols-outlined absolute top-12 md:top-8 mx-auto md:mx-0 left-0 md:left-auto right-0 md:right-16 md:!text-3xl
                      bg-primary-accent rounded-full w-10 md:w-12 text-primary-dark !aspect-square"
					onClick={() => dispatch(toggleLoginModal(false))}
				>
					close
				</button>
			</div>
		</div>
	);
};

export default Login;
