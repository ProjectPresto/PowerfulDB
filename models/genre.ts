export default interface Genre extends SimplifiedGenre {
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
