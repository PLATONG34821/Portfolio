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
	summary:
		'Available for full-stack engineering, performance systems, and collaborative software architecture.'
};

export const getContactChannels = (
	email = contactProfile.email,
	githubUrl = contactProfile.githubUrl
): ContactChannel[] => [
	{
		title: 'EMAIL ADDRESS',
		href: `mailto:${email}`,
		display: email,
		details: 'Direct inbox for technical roles, inquiries & collaboration',
		isExternal: false
	},
	{
		title: 'GITHUB PROFILE',
		href: githubUrl,
		display: 'github.com/PLATONG34821',
		details: 'Open source repositories, system infrastructure & active codebases',
		isExternal: true
	}
];
