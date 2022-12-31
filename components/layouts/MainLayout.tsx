import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import FooterContainer from './FooterContainer';
import { State } from '@store/configureStore';
import SideBar from '@components/sideBar/SideBar';
import Login from '@components/login/login';

interface Props {
	children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
	const isLoginModalOpen = useSelector((state: State) => state.helpers.isLoginModalOpen);

	return (
		<div className="flex lora.className">
			<SideBar/>
			<section
				className="md:pl-56 lg:pl-60 xl:pl-72 w-full
                  min-h-screen flex flex-col justify-between"
			>
				<main className="w-full">{children}</main>
				<FooterContainer/>
				<div className={`${isLoginModalOpen ? 'block' : 'hidden'}`}>
					<Login/>
				</div>
			</section>
		</div>
	);
};

export default MainLayout;
