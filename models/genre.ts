export default interface Genre extends SimplifiedGenre {
  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
}

export interface SimplifiedGenre {
  id: number;
  name: string;
  slug: string;
}
