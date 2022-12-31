import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { toggleLoginModal } from '@store/helpers';
import { useAppDispatch } from '@helpers/hooks';
import { useContributorContext } from '@context/contributorProvider';
import { AlbumArticle } from '@models/album';
import { ArtistArticle } from '@models/artist';
import { BandArticle } from '@models/band';
import { TrackArticle } from '@models/track';

interface Props {
	article?: AlbumArticle | ArtistArticle | BandArticle | TrackArticle;
}

const ArticleContainer: NextComponentType<NextPageContext, {}, Props> = ({ article }: Props) => {
	const { contributor } = useContributorContext();
	const dispatch = useAppDispatch();
	const [isArticleOpen, setIsArticleOpen] = useState<boolean>(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: (
				document.getElementById('article-container')?.offsetTop || 0
			) - 60
		});
	};

	return (
		<div className="relative" id="article-container">
			<div className="flex items-center gap-2 md:gap-4">
				<h1 className="section-title">Article</h1>

				{// TODO: "Edit Article" button
				}
			</div>

			<hr className="section-hr mb-0"></hr>

			{article ? (
				<>
					<article
						className={`mx-auto prose prose-invert lg:prose-xl  w-full text-justify overflow-hidden ${!isArticleOpen && 'h-[36rem]'}`}
						id="article"
					>
						<div dangerouslySetInnerHTML={{ __html: article.article_text }}></div>
						{article.source && (
							<p className="italic">
								Source:{' '}
								{article.source_url ? (
									<Link href={article.source_url} target="_blank">
										{article.source}
									</Link>
								) : (
									article.source
								)}
							</p>
						)}
					</article>
					<button
						type="button"
						id="read-more"
						className={`${!isArticleOpen ? 'absolute bottom-0 pt-24' : 'pt-4'} w-full flex items-end text-xl font-bold justify-center hover:text-primary-accent transition-colors`}
						style={{
							background: isArticleOpen ? 'none' :
								'linear-gradient(180deg, hsla(231, 11%, 12%, 0) 0%, hsla(231, 11%, 12%, 0.013) 8.1%, hsla(231, 11%, 12%, 0.049) 15.5%, hsla(231, 11%, 12%, 0.104) 22.5%, hsla(231, 11%, 12%, 0.175) 29%, hsla(231, 11%, 12%, 0.259) 35.3%, hsla(231, 11%, 12%, 0.352) 41.2%, hsla(231, 11%, 12%, 0.45) 47.1%, hsla(231, 11%, 12%, 0.55) 52.9%, hsla(231, 11%, 12%, 0.648) 58.8%, hsla(231, 11%, 12%, 0.741) 64.7%, hsla(231, 11%, 12%, 0.825) 71%, hsla(231, 11%, 12%, 0.896) 77.5%, hsla(231, 11%, 12%, 0.951) 84.5%, hsla(231, 11%, 12%, 0.987) 91.9%, hsl(231, 11%, 12%) 100%)'
						}}
						onClick={() => {
							setIsArticleOpen(!isArticleOpen);
							if (isArticleOpen) scrollToTop();
						}}
					>
						{isArticleOpen ? 'Close article' : 'Read more'}
					</button>
				</>
			) : (
				<div className="article-style text-sm md:text-base text-justify mt-6">
					<p>
						There is no article for this album yet.{' '}
						{contributor ? (
							<Link href={'create-article-linkkkkkkkkkkkkkkkk'} className="hover:underline text-primary-accent">
								You can go ahead and create it
							</Link>
						) : (
							<button onClick={() => dispatch(toggleLoginModal(true))} className="hover:underline text-primary-accent">
								Log in to add it.
							</button>
						)}
					</p>
				</div>
			)}
		</div>
	);
};

export default ArticleContainer;
