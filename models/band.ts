import Genre from "./genre";

export default interface Band extends SimplifiedBand {
  founding_year: number;
  breakup_year: number;
  genres: Genre[] | null;

  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
}

export interface SimplifiedBand {
  id: number;
  name: string;
  slug: string;
  bg_image: string | null;
  bg_image_url: string | null;
}
