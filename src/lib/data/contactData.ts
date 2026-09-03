import * as m from '$lib/paraglide/messages';

export interface ContactChannel {
	id: string;
	title: string;
	href: string;
	display: string;
	details: string;
	isExternal?: boolean;
	linkLabel: string;
}

export interface ContactProfile {
	email: string;
	githubUrl: string;
	lineUrl: string;
	facebookUrl: string;
	summary: string;
}

export const contactProfile: ContactProfile = {
	email: 'platong34821@gmail.com',
	githubUrl: 'https://github.com/PLATONG34821',
	lineUrl: 'https://line.me/ti/p/qTlcksaQyU',
	facebookUrl: 'https://www.facebook.com/thanaphum.34821',
	get summary() {
		return m.contactSummary();
	}
};

export const getContactChannels = (
	email = contactProfile.email,
	githubUrl = contactProfile.githubUrl,
	lineUrl = contactProfile.lineUrl,
	facebookUrl = contactProfile.facebookUrl
): ContactChannel[] => [
	{
		id: 'email',
		get title() {
			return m.contactEmailTitle();
		},
		href: `mailto:${email}`,
		display: email,
		get details() {
			return m.contactEmailDetails();
		},
		isExternal: false,
		get linkLabel() {
			return m.openMail();
		}
	},
	{
		id: 'github',
		get title() {
			return m.contactGitHubTitle();
		},
		href: githubUrl,
		display: 'github.com/PLATONG34821',
		get details() {
			return m.contactGitHubDetails();
		},
		isExternal: true,
		get linkLabel() {
			return m.gitHubProfile();
		}
	},
	{
		id: 'line',
		get title() {
			return m.contactLineTitle();
		},
		href: lineUrl,
		display: 'line.me/ti/p/qTlcksaQyU',
		get details() {
			return m.contactLineDetails();
		},
		isExternal: true,
		get linkLabel() {
			return m.openLine();
		}
	},
	{
		id: 'facebook',
		get title() {
			return m.contactFacebookTitle();
		},
		href: facebookUrl,
		display: 'facebook.com/thanaphum.34821',
		get details() {
			return m.contactFacebookDetails();
		},
		isExternal: true,
		get linkLabel() {
			return m.openFacebook();
		}
	}
];
