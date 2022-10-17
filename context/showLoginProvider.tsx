import type { NextComponentType, NextPageContext } from 'next';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface ShowLoginContextType {
	showLogin: boolean;
	setShowLogin: Dispatch<SetStateAction<boolean>> | null;
	toggleLoginComponent: (show?: boolean) => void;
}

const ShowLoginContextDefaultValues: ShowLoginContextType = {
	showLogin: false, setShowLogin: null, toggleLoginComponent: () => {}
};

const ShowLoginContext = createContext<ShowLoginContextType>(ShowLoginContextDefaultValues);
ShowLoginContext.displayName = 'ShowLoginContext';

export const useShowLoginContext = () => {
	return useContext(ShowLoginContext);
};

interface Props {
	children: ReactNode;
}

export const ShowLoginProvider: NextComponentType<NextPageContext, {}, Props> = ({ children }: Props) => {
	const [showLogin, setShowLogin] = useState<boolean>(false);

	const toggleLoginComponent = (show?: boolean) => {
		setShowLogin(show ?? !showLogin);
	};

	const value = {
		showLogin, setShowLogin, toggleLoginComponent
	};

	return (
		<>
			<ShowLoginContext.Provider value={value}>{children}</ShowLoginContext.Provider>
		</>
	);
};
