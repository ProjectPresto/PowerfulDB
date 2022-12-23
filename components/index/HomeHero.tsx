import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

import logo from '@public/images/logo.svg';
import heroBg from '@public/images/hero_bg.jpg';

const HomeHero: NextComponentType<NextPageContext, {}> = () => {
	return (
		<div className="w-full overflow-hidden">
			<div className="flex relative items-center justify-center w-full h-[450px] lg:h-[550px] bg-cover overflow-hidden flex lg:hidden">
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

			<div className="flex relative items-center w-full h-[650px] lg:h-[800px] bg-cover lg:flex hidden max-w-[90rem] mx-auto">
				<motion.div initial={{ x: '-150%' }} animate={{ x: 0 }} transition={{ type: 'spring', duration: 1.5, delay: 0.5 }}
				            className="aspect-square absolute left-24 lg:left-16 xl:left-36 2xl:left-48">
					<Image src={heroBg} alt="Hero background image"
					       className="rounded-full aspect-square object-cover object-center hover:scale-105
				       w-full h-96 lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem] transition-all shadow-[0_0_50px_#5E2BFF40] hover:shadow-[0_0_65px_#5E2BFFB3]"/>
				</motion.div>

				<div className="absolute right-[5%] lg:right-[10%] 2xl:right-[15%] z-10">
					<motion.div initial={{ x: '150%' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 25, delay: 1 }}>
						<Image src={logo} height={250} alt="App logo" className="h-10 md:h-12 lg:h-20 xl:h-24 2xl:h-28 w-full"/>
					</motion.div>
					<motion.div initial={{ x: '150%' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 25, delay: 1.25 }}>
						<p className="font-serif text-primary-light text-sm md:text-lg lg:text-xl">Powerful Database of Music Information</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default HomeHero;
