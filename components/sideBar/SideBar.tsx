import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import SearchInput from './search/SearchInput';
import logo from '@public/images/logo.svg';
import defaultPic from '@public/images/default_profile_pic_dark.svg';
import { useContributorContext } from '@context/contributorProvider';
import { useShowLoginContext } from '@context/showLoginProvider';

const SideBar: NextComponentType<NextPageContext, {}> = () => {
	const { contributor, logout } = useContributorContext();
	const { toggleLoginComponent } = useShowLoginContext();

	type sideBarOptions = {
		label: string; icon: string; url: string; auth?: boolean;
	};

	const primaryOptions: sideBarOptions[] = [
		{ label: 'Home Page', icon: 'home', url: '/' },
		{ label: 'Albums', icon: 'album', url: '/album' },
		{ label: 'Bands', icon: 'groups', url: '/band' },
		{ label: 'Artists', icon: 'mic_external_on', url: '/artist' },
		{ label: 'Genres', icon: 'collections_bookmark', url: '/genre' },
		{ label: 'Users', icon: 'account_circle', url: '/user' }
	];

	const secondaryOptions: sideBarOptions[] = [
		{ label: 'User settings', icon: 'settings', url: '/user/settings', auth: true }, { label: 'About', icon: 'info', url: '/about' }
	];

	const displayOption = (label: string, icon: string, url: string, auth?: boolean): ReactElement | null => {
		if (auth && !contributor) return null;
		return (
			<div key={label}>
				<Link href={url}>
					<a className="flex items-center gap-4 text-primary-light hover:text-primary-accent transition-colors">
						<span className="material-symbols-rounded !text-2xl xl:!text-3xl">{icon}</span>
						<div className="text-base xl:text-lg">{label}</div>
					</a>
				</Link>
			</div>
		);
	};

	return (
		<aside className="z-50 fixed h-screen md:w-56 lg:w-60 xl:w-72 bg-primary-dark">
			<div
				className="h-full pt-2 md:pt-4 sm:px-8 px-12 md:px-4 lg:px-5 gap-6 md:gap-4 xl:gap-6
        flex flex-col md:items-start items-center md:justify-start justify-center font-serif font-bold relative pb-14"
			>
				<div className="w-full md:flex items-center justify-center hidden">
					<Link href="/">
						<a>
							<Image src={logo} alt="Logo"/>
						</a>
					</Link>
				</div>

				<div className="flex flex-col gap-6 md:gap-4 xl:gap-6 overflow-hidden h-full rounded-t-2xl">
					<SearchInput/>

					<div className="grid w-full gap-3 md:gap-2 xl:gap-3">
						{primaryOptions.map(({ label, icon, url, auth }) => displayOption(label, icon, url, auth))}
						<hr className="border-t-2 border-t-gray-600"/>
						{secondaryOptions.map(({ label, icon, url, auth }) => displayOption(label, icon, url, auth))}
					</div>
				</div>

				<div className="w-full max-w-sm md:absolute inset-x-0 bottom-0 bg-primary-accent text-secondary-dark px-3 md:px-4 py-3">
					{!contributor ? (
						<div onClick={() => toggleLoginComponent(true)} className="cursor-pointer">
							<a className="flex items-center justify-start gap-3 md:gap-4">
								<p className="material-symbols-outlined !text-xl md:!text-2xl">login</p>
								<p className="font-bold md:text-lg">Log in</p>
							</a>
						</div>
					) : (
						<div className="flex justify-between">
							<div className="flex items-center gap-4 truncate">
								<Link href={`/user/${contributor.user}`}>
									<a>
										<div className="block h-6 lg:h-8 aspect-square">
											<Image
												src={contributor.profile_picture ?? defaultPic}
												alt="User profile picture"
												height="32px"
												width="32px"
												layout="responsive"
												className="object-cover object-center rounded-full"
											/>
										</div>
									</a>
								</Link>
								<div className="truncate pr-6">
									<Link href={`/user/${contributor.user}`}>
										<a className="block font-bold truncate lg:text-xl">{contributor.username}</a>
									</Link>
								</div>
							</div>
							<div>
								<button type="button" onClick={logout}>
									<a className="material-symbols-outlined text-secondary-dark font-normal !text-lg lg:!text-2xl">logout</a>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
