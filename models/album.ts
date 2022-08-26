import Artist, { SimplifiedArtist } from "./artist";
import Band, { SimplifiedBand } from "./band";
import Genre from "./genre";
import { SimplifiedTrack } from "./track";

export default interface Album extends SimplifiedAlbum {
  artist: null | Artist;
  band: null | Band;
  tracks: SimplifiedTrack;

  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
}

export interface SimplifiedAlbum {
  id: number;
  title: string;
  slug: string;
  release_date: string | null;
  release_type: "LP" | "Single" | "Compilation" | "EP" | "Live" | "Remix" | "Soundtrack" | "Other";
  art_cover: string | null;
  art_cover_url: string | null;
  artist: null | SimplifiedArtist;
  band: null | SimplifiedBand;
  genres: null | Genre[];
}
