import Genre from "./genre";

export default interface Artist extends SimplifiedArtist {
  full_name: string | null;
  birth_date: string | null;
  death_date: string | null;
  genres: Genre[] | null;

  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
}

export interface SimplifiedArtist {
  id: number;
  name: string;
  slug: string;
  bg_image: string | null;
  bg_image_url: string | null;
}
