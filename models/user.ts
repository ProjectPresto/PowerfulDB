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
    data: [ContributedAlbum, ContributedTrack, ContributedArtist, ContributedBand, ContributedGenre, ContributedBandMember];
  };
}

export interface ContributedData {
  created_at: string;
}

export interface ContributedAlbum extends ContributedData {
  type: "Album";
  title: string;
  slug: string;
  artist__name?: string;
  artist__slug?: string;
  band__name?: string;
  band__slug?: string;
}

export interface ContributedTrack extends ContributedData {
  type: "Track";
  title: string;
  slug: string;
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

export interface ContributedGenre extends ContributedData {
  type: "Genre";
  name: string;
  slug: string;
}

export interface ContributedBandMember extends ContributedData {
  type: "BandMember";
  artist__name?: string;
  artist__slug?: string;
  name?: string;
  band__name: string;
  band__slug: string;
}
