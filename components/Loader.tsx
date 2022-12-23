import { NextComponentType, NextPageContext } from 'next';
import SyncLoader from 'react-spinners/SyncLoader';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
	isLoading: boolean;
}

const Loader: NextComponentType<NextPageContext, {}, Props> = ({ isLoading }: Props) => {
	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					key="loader"
					className="fixed inset-0 md:pl-56 lg:pl-60 xl:pl-72 bg-[#00000066] z-50 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1 }}
				>
					<SyncLoader
						loading={true}
						color="#4EFFA6"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loader;