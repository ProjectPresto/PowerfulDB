export default interface Genre extends SimplifiedGenre {
  album_count: number;
  artist_count: number;
  band_count: number;

  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}

export interface SimplifiedGenre {
  id: number;
  name: string;
  slug: string;
}
