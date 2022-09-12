import Genre from "./genre";
import { Article } from "./generic";

export default interface Artist extends SimplifiedArtist {
  full_name: string | null;
  birth_date: string | null;
  death_date: string | null;
  genres: Genre[] | null;

  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}

export interface SimplifiedArtist {
  id: number;
  name: string;
  slug: string;
  bg_image: string | null;
  bg_image_url: string | null;
}
export interface ArtistArticle extends Article {
  artist: number;
}
