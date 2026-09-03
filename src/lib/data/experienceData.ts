import * as m from '$lib/paraglide/messages';

const certModules = import.meta.glob<{ default: string }>(
	'../assets/certs/*.webp',
	{ eager: true, query: { enhanced: true } }
);
function cert(name: string): string {
	return certModules[`../assets/certs/${name}`]?.default ?? '';
}

export interface ProjectLink {
	label: string;
	url: string;
	isCertModal?: boolean;
	certImage?: string;
}

export interface Project {
	id: string;
	title: string;
	summary: string;
	metrics: string;
	certImage?: string;
	links?: ProjectLink[];
}

export interface Award {
	id: string;
	title: string;
	subtitle: string;
	year: string;
	isHighlighted?: boolean;
	certImage?: string;
}

const createProject = (
	id: string,
	title: () => string,
	summary: () => string,
	metrics: () => string,
	options: { certImage?: string; links?: () => ProjectLink[] } = {}
): Project => ({
	id,
	get title() {
		return title();
	},
	get summary() {
		return summary();
	},
	get metrics() {
		return metrics();
	},
	certImage: options.certImage,
	get links() {
		return options.links ? options.links() : undefined;
	}
});

const createAward = (
	id: string,
	year: string,
	title: () => string,
	subtitle: () => string,
	options: { certImage?: string; isHighlighted?: boolean } = {}
): Award => ({
	id,
	year,
	get title() {
		return title();
	},
	get subtitle() {
		return subtitle();
	},
	...options
});

export const coreProjects: Project[] = [
	createProject('01', m.projectHllcTitle, m.projectHllcSummary, m.projectHllcMetrics, {
		certImage: cert('hllcHomepage.webp'),
		links: () => [
			{
				label: m.projectHllcLinkPreview(),
				url: '/certs/hllcHomepage.webp',
				isCertModal: true,
				certImage: cert('hllcHomepage.webp')
			},
			{ label: 'App Store', url: 'https://apps.apple.com/th/app/hllc/id6748238190' },
			{
				label: 'Google Play',
				url: 'https://play.google.com/store/apps/details?id=com.hllc.mfuactivity&hl=en'
			},
			{ label: 'Instagram', url: 'https://www.instagram.com/mfu_activities/p/Da1msGcCV8-/' }
		]
	}),
	createProject('02', m.projectTjsifTitle, m.projectTjsifSummary, m.projectTjsifMetrics, {
		certImage: cert('tjsif_booth.webp'),
		links: () => [
			{
				label: m.projectTjsifLinkCert(),
				url: '/certs/tjsif_cert.webp',
				isCertModal: true,
				certImage: cert('tjsif_cert.webp')
			},
			{
				label: m.projectTjsifLinkTrophy(),
				url: '/certs/tjsif_stage.webp',
				isCertModal: true,
				certImage: cert('tjsif_stage.webp')
			},
			{
				label: m.projectTjsifLinkBooth(),
				url: '/certs/tjsif_booth.webp',
				isCertModal: true,
				certImage: cert('tjsif_booth.webp')
			},
			{
				label: m.projectTjsifLinkReport(),
				url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137'
			}
		]
	}),
	createProject('03', m.projectNsc25Title, m.projectNsc25Summary, m.projectNsc25Metrics, {
		certImage: cert('nsc25_booth.webp'),
		links: () => [
			{
				label: m.projectNsc25LinkCert(),
				url: '/certs/nsc25_cert.webp',
				isCertModal: true,
				certImage: cert('nsc25_cert.webp')
			},
			{
				label: m.projectNsc25LinkPhoto(),
				url: '/certs/nsc25_booth.webp',
				isCertModal: true,
				certImage: cert('nsc25_booth.webp')
			}
		]
	}),
	createProject('04', m.projectPolytoneTitle, m.projectPolytoneSummary, m.projectPolytoneMetrics, {
		certImage: cert('polyTonePreview.webp'),
		links: () => [
			{
				label: m.projectPolytoneLinkPreview(),
				url: '/certs/polyTonePreview.webp',
				isCertModal: true,
				certImage: cert('polyTonePreview.webp')
			},
			{ label: m.projectPolytoneLinkLive(), url: 'https://polytone.pages.dev/' }
		]
	})
];

export const ossProjects: Project[] = [
	createProject(
		'01',
		m.ossStudyScheduleTitle,
		m.ossStudyScheduleSummary,
		m.ossStudyScheduleMetrics,
		{
			links: () => [
				{ label: m.ossStudyScheduleLinkLive(), url: 'https://schedule-wallpapers.pages.dev/' },
				{
					label: m.ossStudyScheduleLinkRepo(),
					url: 'https://github.com/PLATONG34821/Study-Schedule'
				}
			]
		}
	),
	createProject('02', m.ossSwarmClusterTitle, m.ossSwarmClusterSummary, m.ossSwarmClusterMetrics, {
		links: () => [
			{
				label: m.ossSwarmClusterLinkRepo(),
				url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster'
			}
		]
	}),
	createProject('03', m.ossProjectDsmTitle, m.ossProjectDsmSummary, m.ossProjectDsmMetrics, {
		links: () => [
			{ label: m.ossProjectDsmLinkLive(), url: 'https://project-dsm.pages.dev/' },
			{ label: m.ossProjectDsmLinkRepo(), url: 'https://github.com/PLATONG34821/Project-DSM' }
		]
	}),
	createProject('04', m.ossGroupPlanTitle, m.ossGroupPlanSummary, m.ossGroupPlanMetrics, {
		links: () => [
			{
				label: m.ossGroupPlanLinkRepo(),
				url: 'https://github.com/PLATONG34821/GroupPlan'
			}
		]
	})
];

export const awards: Award[] = [
	createAward('01', '2024', m.award4Title, m.award4Subtitle, {
		certImage: cert('samsung_cert.webp')
	}),
	createAward('02', '2024', m.award5Title, m.award5Subtitle, {
		certImage: cert('borntodev_cert.webp')
	}),
	createAward('03', '2023', m.award1Title, m.award1Subtitle, {
		isHighlighted: true,
		certImage: cert('gold_cert.webp')
	}),
	createAward('04', '2023', m.award3Title, m.award3Subtitle, {
		isHighlighted: true,
		certImage: cert('nsc25_cert.webp')
	}),
	createAward('05', '2022', m.award6Title, m.award6Subtitle, {
		isHighlighted: true,
		certImage: cert('tjsif_stage.webp')
	}),
	createAward('06', '2022', m.award2Title, m.award2Subtitle, {
		certImage: cert('silver_cert.webp')
	})
];

