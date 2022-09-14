import { SimplifiedArtist } from "./artist";
import { SimplifiedBand } from "./band";
import { Article } from "./generic";

export interface FeaturedAuthor extends SimplifiedFeaturedAuthor {
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}

export interface SimplifiedFeaturedAuthor {
  id: number;
  track: number;
  artist?: SimplifiedArtist;
  band?: SimplifiedBand;
}

export default interface Track extends SimplifiedTrack {
  featured_authors: FeaturedAuthor[];
  album: number;

  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}

export interface SimplifiedTrack {
  id: number;
  title: string;
  slug: string;
  position: number;
  disc?: number;
  duration?: string;
  featured_authors: SimplifiedFeaturedAuthor[];
}

export interface TrackArticle extends Article {
  track: number;
}
