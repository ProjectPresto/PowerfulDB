import Genre from "./genre";
import { Article } from "./generic";

export default interface Band extends SimplifiedBand {
  founding_year: number;
  breakup_year: number;
  genres: Genre[] | null;

  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}

export interface SimplifiedBand {
  id: number;
  name: string;
  slug: string;
  bg_image: string | null;
  bg_image_url: string | null;
}
export interface BandArticle extends Article {
  band: number;
}
