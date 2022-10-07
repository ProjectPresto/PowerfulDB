export default interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface SimplifiedContributor {
  id: number;
  username: string;
  about_text?: string;
  profile_picture?: string;
  profile_picture_url?: string;
  user: number;
}

export interface Contributor extends SimplifiedContributor {
  contributions: {
    counts: {
      createdAlbums: number;
      createdTracks: number;
      createdArtists: number;
      createdBands: number;
      createdGenres: number;
      createdBandMembers: number;
      total: number;
      points: number;
    };
    data: [ContributedAlbum, ContributedTracks, ContributedArtist, ContributedBand, ContributedGenres, ContributedBandMember] | [];
  };
}

interface ContributedData {
  id: number;
  created_at: string;
}

export interface ContributedAlbum extends ContributedData {
  type: "Album";
  title: string;
  slug: string;
  release_type: "LP" | "Single" | "Compilation" | "EP" | "Live" | "Remix" | "Soundtrack" | "Other";
  artist__name?: string;
  artist__slug?: string;
  band__name?: string;
  band__slug?: string;
}

export interface ContributedTracks extends ContributedData {
  type: "Track";
  tracks_count: number;
  album__title: string;
  album__slug: string;
}

export interface ContributedArtist extends ContributedData {
  type: "Artist";
  name: string;
  slug: string;
}

export interface ContributedBand extends ContributedData {
  type: "Band";
  name: string;
  slug: string;
}

export interface ContributedGenres extends ContributedData {
  type: "Genre";
  album_genres__title: string;
  album_genres__slug: string;
  genres_count: number;
}

export interface ContributedBandMember extends ContributedData {
  type: "BandMember";
  artist__name?: string;
  artist__slug?: string;
  name?: string;
  band__name: string;
  band__slug: string;
}
