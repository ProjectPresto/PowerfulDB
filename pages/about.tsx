import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@pages/_app';
import MainLayout from '@components/layouts/MainLayout';
import { useShowLoginContext } from '@context/showLoginProvider';
import Link from 'next/link';


const AboutPage: NextPageWithLayout = () => {
	const { toggleLoginComponent } = useShowLoginContext();

	const myLinks = [
		{ name: 'Github', url: 'https://github.com/Akasiek' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/kamil-pomykala/' },
		{ name: 'Twitter', url: 'https://twitter.com/dziwnykamil' },
		{ name: 'E-mail', url: 'mailto:kpomykala2002@gmail.com' },
		{ name: 'Linktr.ee', url: 'https://linktr.ee/kamilpomykala' }
	];

	return (
		<div className="w-full max-w-4xl mx-auto p-4 md:p-10 mt-4 prose dark:prose-invert prose-sm md:prose-base lg:prose-lg 2xl:prose-xl">
			<h1>About Page</h1>
			<p>
				PowerfulDB is a website that aims to provide as much information about music as possible. Website is a
				community-driven database. Every logged-in user can add, create and send edit submission about
				albums, artists and bands. Everyone can see contributions made by specific users on their profile.
				We really appreciate all the contributions.
			</p>
			<h2>F.A.Q.</h2>
			<p>
				<strong>Q. </strong><i>Who can add a new album, artist or band?</i><br/>
				<strong>A. </strong>Only logged-in users can add new albums, artists or bands.
			</p>
			<p>
				<strong>Q. </strong><i>How do I add a new album, artist or band?</i><br/>
				<strong>A. </strong>First, you need to <a onClick={() => toggleLoginComponent()} className="underline cursor-pointer">log in.</a> Then go to the main page of the database
				element you want to add. For example: if you want to add album go <Link href={`/album`}>here</Link> and click on the &quot;Plus&quot; button next to the page title.
			</p>
			<p>
				<strong>Q. </strong><i>How can I check my contributions?</i><br/>
				<strong>A. </strong>Everyone can see other users&apos; contributions. Just go to user profile (you can search for user) and all contributions will be shown on the left side
				of the screen.
			</p>
			<p>
				<strong>Q. </strong><i>Can I add artists that are not consider as Rock or Metal?</i><br/>
				<strong>A. </strong>Yes, you can. When creating PowerfulDB I was thinking only about Rock artists, but I don&apos;t think that&apos;s a good idea. Gate-keeping is stupid.
				Add anything you want!
			</p>
			<p>
				<strong>Q. </strong><i>What is a difference between an artist and a band</i><br/>
				<strong>A. </strong>An artist is a person who is a member of a band or a solo artist. A band is a group of artists. When creating band you don&apos;t have to add all
				members as artists.
			</p>
			<p>
				<strong>Q. </strong><i>How can I edit album/artist/band</i><br/>
				<strong>A. </strong>There are edit buttons at the bottom of all album/artist/band pages. After changing the data and submitting the edit, edit submission is created.
				Admins, who have the rights to edit the data, can approve or reject the submission. After the submission is approved, the data is updated.
			</p>

			<h2>About author</h2>
			<p>
				I&apos;m Kamil and this page was created as a first project in Next.js. I love music, so I try to combine my
				passions and make something great. I hope you&apos;ll enjoy this little website.
			</p>
			<p>
				You can find me here: {myLinks.map((link, index) => (
				<><a href={link.url} target={`_blank`}>{link.name}</a>{index !== myLinks.length - 1 && ' | '}</>
			))}
			</p>
		</div>
	);
};

AboutPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default AboutPage;