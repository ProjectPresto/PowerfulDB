import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';

import logo from '@public/images/logo.svg';
import heroBg from '@public/images/hero_bg.jpg';

const HomeHero: NextComponentType<NextPageContext, {}> = () => {
	return (
		<div className="flex relative items-center justify-center w-full h-[450px] lg:h-[550px] bg-cover overflow-hidden">
			<div className="h-full w-full absolute inset-0 z-0 flex items-center justify-center">
				<Image src={heroBg} alt="Hero background image" className="object-cover object-center h-full w-full"/>
			</div>
			<div className="z-10 flex items-center justify-center flex-col gap-3">
				<div className="px-4 h-10 md:h-14 lg:h-20 xl:h-24 flex justify-center">
					<Image src={logo} height={250} alt="App logo"/>
				</div>
				<p className="font-serif text-primary-light px-4 text-sm md:text-lg lg:text-xl">Powerful Database of Music Information</p>
			</div>
		</div>
	);
};

export default HomeHero;
