import Artist, { SimplifiedArtist } from "./artist";
import Band, { SimplifiedBand } from "./band";
import { Article } from "./generic";
import Genre from "./genre";
import { SimplifiedTrack } from "./track";

export default interface Album extends SimplifiedAlbum {
  artist?: Artist;
  band?: Band;
  full_duration?: string;
  tracks: SimplifiedTrack[];

  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}

export interface SimplifiedAlbum {
  id: number;
  title: string;
  slug: string;
  release_date?: string;
  release_type: "LP" | "Single" | "Compilation" | "EP" | "Live" | "Remix" | "Soundtrack" | "Other";
  art_cover?: string;
  art_cover_url?: string;
  artist?: SimplifiedArtist;
  band?: SimplifiedBand;
  genres?: Genre[];
}

export interface AlbumArticle extends Article {
  album: number;
}
