export default interface Track extends SimplifiedTrack {
  album: number;

  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
}

export interface SimplifiedTrack {
  id: number;
  title: string;
  slug: string;
  position: number | null;
  duration: string | null;
}
