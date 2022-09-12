import { Article } from "./generic";

export default interface Track extends SimplifiedTrack {
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
  position: number | null;
  duration: string | null;
}

export interface TrackArticle extends Article {
  track: number;
}
