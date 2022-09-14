import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { useState } from "react";

import { useContributorContext } from "../../context/contributorProvider";
import { AlbumArticle } from "../../models/album";
import { ArtistArticle } from "../../models/artist";
import { BandArticle } from "../../models/band";
import { TrackArticle } from "../../models/track";

interface Props {
  article: AlbumArticle | ArtistArticle | BandArticle | TrackArticle;
}

const ArticleContainer: NextComponentType<NextPageContext, {}, Props> = ({ article }: Props) => {
  const { contributor } = useContributorContext();
  const [isArticleOpen, setIsArticleOpen] = useState<boolean>(false);

  return (
    <div className="relative" id="article-container">
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="section-title">Article</h1>

        {
          // TODO: "Edit Article" button
        }
      </div>

      <hr className="section-hr mb-0"></hr>

      {article ? (
        <>
          <article
            className={`mx-auto prose prose-invert lg:prose-xl  w-full text-justify overflow-hidden ${!isArticleOpen && "h-[36rem]"}`}
            id="article"
          >
            <div dangerouslySetInnerHTML={{ __html: article.article_text }}></div>
            {article.source && (
              <p className="italic">
                Source:{" "}
                {article.source_url ? (
                  <Link href={article.source_url} target="_blank">
                    <a>{article.source}</a>
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
            className={`${!isArticleOpen ? "absolute bottom-0 pt-24" : "pt-4"} w-full flex items-end text-xl font-bold justify-center`}
            style={{ background: isArticleOpen ? "none" : "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1B1C22 100%)" }}
            onClick={() => setIsArticleOpen(!isArticleOpen)}
          >
            {isArticleOpen ? "Close article" : "Read more"}
          </button>
        </>
      ) : (
        <div className="article-style text-sm md:text-base text-justify">
          <p>
            There is no article for this album yet.{" "}
            {contributor ? (
              <Link href={"create-article-linkkkkkkkkkkkkkkkk"}>
                <a className="hover:underline text-primary-accent">You can go ahead and create it</a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="hover:underline text-primary-accent">Log in to add it.</a>
              </Link>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleContainer;
