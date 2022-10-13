import { ContributedAlbum, ContributedArtist, ContributedBand, ContributedBandMember, ContributedGenres, ContributedTracks } from '@models/user';
import type { NextComponentType, NextPageContext } from 'next';
import CreatedAlbum from './contributionTypes/createdAlbum';
import CreatedArtist from './contributionTypes/createdArtist';
import CreatedBand from './contributionTypes/createdBand';
import CreatedBandMember from './contributionTypes/createdBandMember';
import CreatedGenres from './contributionTypes/createdGenres';
import CreatedTracks from './contributionTypes/createdTracks';

interface Props {
	username: string;
	contribution: ContributedAlbum | ContributedTracks | ContributedArtist | ContributedBand | ContributedGenres | ContributedBandMember;
}

const RenderContribution: NextComponentType<NextPageContext, {}, Props> = ({ username, contribution }: Props) => {
	switch (contribution.type) {
		case 'Album':
			return <CreatedAlbum username={username} album={contribution}/>;
		case 'Track':
			return <CreatedTracks username={username} tracks={contribution}/>;
		case 'Artist':
			return <CreatedArtist username={username} artist={contribution}/>;
		case 'Band':
			return <CreatedBand username={username} band={contribution}/>;
		case 'Genre':
			return <CreatedGenres username={username} genres={contribution}/>;
		case 'BandMember':
			return <CreatedBandMember username={username} bandMember={contribution}/>;
		default:
			return null;
	}
};

export default RenderContribution;
