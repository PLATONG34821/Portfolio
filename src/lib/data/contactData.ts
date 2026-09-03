import * as m from '$lib/paraglide/messages';

export interface ContactChannel {
	title: string;
	href: string;
	display: string;
	details: string;
	isExternal?: boolean;
}

export interface ContactProfile {
	email: string;
	githubUrl: string;
	summary: string;
}

export const contactProfile: ContactProfile = {
	email: 'platong34821@gmail.com',
	githubUrl: 'https://github.com/PLATONG34821',
	get summary() {
		return m.contactSummary();
	}
};

export const getContactChannels = (
	email = contactProfile.email,
	githubUrl = contactProfile.githubUrl
): ContactChannel[] => [
	{
		get title() {
			return m.contactEmailTitle();
		},
		href: `mailto:${email}`,
		display: email,
		get details() {
			return m.contactEmailDetails();
		},
		isExternal: false
	},
	{
		get title() {
			return m.contactGitHubTitle();
		},
		href: githubUrl,
		display: 'github.com/PLATONG34821',
		get details() {
			return m.contactGitHubDetails();
		},
		isExternal: true
	}
];
