import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { useContributorContext } from '@context/contributorProvider';
import { useShowLoginContext } from '@context/showLoginProvider';
import { AlbumArticle } from '@models/album';
import { ArtistArticle } from '@models/artist';
import { BandArticle } from '@models/band';
import { TrackArticle } from '@models/track';

interface Props {
	article?: AlbumArticle | ArtistArticle | BandArticle | TrackArticle;
}

const ArticleContainer: NextComponentType<NextPageContext, {}, Props> = ({ article }: Props) => {
	const { contributor } = useContributorContext();
	const { toggleLoginComponent } = useShowLoginContext();
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
						className={`${!isArticleOpen ? 'absolute bottom-0 pt-24' : 'pt-4'} w-full flex items-end text-xl font-bold justify-center`}
						style={{ background: isArticleOpen ? 'none' : 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1B1C22 100%)' }}
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
							<button onClick={() => toggleLoginComponent()} className="hover:underline text-primary-accent">
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
