import { ReactNode } from 'react';
import SideBar from '@components/sideBar/SideBar';
import FooterContainer from './FooterContainer';
import Login from '@components/login/login';
import { useShowLoginContext } from '@context/showLoginProvider';

interface Props {
	children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
	const { showLogin } = useShowLoginContext();
	return (
		<div className="flex">
			<SideBar/>
			<section
				className="md:pl-56 lg:pl-60 xl:pl-72 w-full
                  min-h-screen flex flex-col justify-between"
			>
				<main className="w-full">{children}</main>
				<FooterContainer/>
				<div className={`${showLogin ? 'block' : 'hidden'}`}>
					<Login/>
				</div>
			</section>
		</div>
	);
};

export default MainLayout;
