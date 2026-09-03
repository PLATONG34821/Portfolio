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

const createContactChannel = (
	id: string,
	href: string,
	display: string,
	title: () => string,
	details: () => string,
	linkLabel: () => string,
	isExternal = true
): ContactChannel => ({
	id,
	href,
	display,
	get title() {
		return title();
	},
	get details() {
		return details();
	},
	get linkLabel() {
		return linkLabel();
	},
	isExternal
});

export const getContactChannels = (
	email = contactProfile.email,
	githubUrl = contactProfile.githubUrl,
	lineUrl = contactProfile.lineUrl,
	facebookUrl = contactProfile.facebookUrl
): ContactChannel[] => [
	createContactChannel(
		'email',
		`mailto:${email}`,
		email,
		m.contactEmailTitle,
		m.contactEmailDetails,
		m.openMail,
		false
	),
	createContactChannel(
		'github',
		githubUrl,
		'github.com/PLATONG34821',
		m.contactGitHubTitle,
		m.contactGitHubDetails,
		m.gitHubProfile
	),
	createContactChannel(
		'line',
		lineUrl,
		'line.me/ti/p/qTlcksaQyU',
		m.contactLineTitle,
		m.contactLineDetails,
		m.openLine
	),
	createContactChannel(
		'facebook',
		facebookUrl,
		'facebook.com/thanaphum.34821',
		m.contactFacebookTitle,
		m.contactFacebookDetails,
		m.openFacebook
	)
];
