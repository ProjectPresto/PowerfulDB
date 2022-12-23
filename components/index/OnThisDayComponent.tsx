import type { NextComponentType, NextPageContext } from 'next';

import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import AlbumService from '@services/AlbumService';
import ArtistService from '@services/ArtistService';
import Album from '@models/album';
import Artist from '@models/artist';
import OnThisDayCard from './OnThisDayCard';

const OnThisDayComponent: NextComponentType<NextPageContext, {}> = () => {
	const [onThisDayData, setOnThisDayData] = useState<{
		albumAnniversaries: Album[];
		artistBirthdays: Artist[];
		artistDeathAnniversaries: Artist[];
	} | null>();

	const getOnThisDayData = useCallback(async () => {
		const currentMonth = moment().month() + 1;
		const currentDay = moment().date();

		const { results: albumAnniversaries } = await AlbumService.getAlbumList({
			release_date__day: currentDay,
			release_date__month: currentMonth
		});

		const { results: artistBirthdays } = await ArtistService.getArtistList({
			birth_date__day: currentDay,
			birth_date__month: currentMonth
		});

		const { results: artistDeathAnniversaries } = await ArtistService.getArtistList({
			death_date__day: currentDay,
			death_date__month: currentMonth
		});
		setOnThisDayData({ albumAnniversaries, artistBirthdays, artistDeathAnniversaries });
	}, []);

	useEffect(() => {
		getOnThisDayData();
	}, [getOnThisDayData]);

	const checkIfAnyEvents = () => {
		return !(
			onThisDayData?.albumAnniversaries.length === 0 &&
			onThisDayData?.artistBirthdays.length === 0 &&
			onThisDayData?.artistDeathAnniversaries.length === 0
		);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
			{onThisDayData?.albumAnniversaries.map((album) => (
				<OnThisDayCard key={album.id} album={album} type={'albumAnniversary'}/>
			))}
			{onThisDayData?.artistBirthdays.map((artist) => (
				<OnThisDayCard key={artist.id} artist={artist} type={'artistBirthday'}/>
			))}
			{onThisDayData?.artistDeathAnniversaries.map((artist) => (
				<OnThisDayCard key={artist.id} artist={artist} type={'artistDeathAnniversary'}/>
			))}
			{!checkIfAnyEvents() && <p className="text-lg">No anniversaries today</p>}
		</div>
	);
};

export default OnThisDayComponent;
