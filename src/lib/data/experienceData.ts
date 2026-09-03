import * as m from '$lib/paraglide/messages';

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

export const coreProjects: Project[] = [
	{
		id: '01',
		get title() {
			return m.projectHllcTitle();
		},
		get summary() {
			return m.projectHllcSummary();
		},
		get metrics() {
			return m.projectHllcMetrics();
		},
		certImage: '/certs/hllcHomepage.webp',
		get links() {
			return [
				{
					label: m.projectHllcLinkPreview(),
					url: '/certs/hllcHomepage.webp',
					isCertModal: true,
					certImage: '/certs/hllcHomepage.webp'
				},
				{ label: 'App Store', url: 'https://apps.apple.com/th/app/hllc/id6748238190' },
				{
					label: 'Google Play',
					url: 'https://play.google.com/store/apps/details?id=com.hllc.mfuactivity&hl=en'
				},
				{ label: 'Instagram', url: 'https://www.instagram.com/mfu_activities/p/Da1msGcCV8-/' }
			];
		}
	},
	{
		id: '02',
		get title() {
			return m.projectTjsifTitle();
		},
		get summary() {
			return m.projectTjsifSummary();
		},
		get metrics() {
			return m.projectTjsifMetrics();
		},
		certImage: '/certs/tjsif_booth.webp',
		get links() {
			return [
				{
					label: m.projectTjsifLinkCert(),
					url: '/certs/tjsif_cert.webp',
					isCertModal: true,
					certImage: '/certs/tjsif_cert.webp'
				},
				{
					label: m.projectTjsifLinkTrophy(),
					url: '/certs/tjsif_stage.webp',
					isCertModal: true,
					certImage: '/certs/tjsif_stage.webp'
				},
				{
					label: m.projectTjsifLinkBooth(),
					url: '/certs/tjsif_booth.webp',
					isCertModal: true,
					certImage: '/certs/tjsif_booth.webp'
				},
				{
					label: m.projectTjsifLinkReport(),
					url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137'
				}
			];
		}
	},
	{
		id: '03',
		get title() {
			return m.projectNsc25Title();
		},
		get summary() {
			return m.projectNsc25Summary();
		},
		get metrics() {
			return m.projectNsc25Metrics();
		},
		certImage: '/certs/nsc25_booth.webp',
		get links() {
			return [
				{
					label: m.projectNsc25LinkCert(),
					url: '/certs/nsc25_cert.webp',
					isCertModal: true,
					certImage: '/certs/nsc25_cert.webp'
				},
				{
					label: m.projectNsc25LinkPhoto(),
					url: '/certs/nsc25_booth.webp',
					isCertModal: true,
					certImage: '/certs/nsc25_booth.webp'
				}
			];
		}
	},
	{
		id: '04',
		get title() {
			return m.projectPolytoneTitle();
		},
		get summary() {
			return m.projectPolytoneSummary();
		},
		get metrics() {
			return m.projectPolytoneMetrics();
		},
		certImage: '/certs/polyTonePreview.webp',
		get links() {
			return [
				{
					label: m.projectPolytoneLinkPreview(),
					url: '/certs/polyTonePreview.webp',
					isCertModal: true,
					certImage: '/certs/polyTonePreview.webp'
				},
				{ label: m.projectPolytoneLinkLive(), url: 'https://polytone.pages.dev/' }
			];
		}
	}
];

export const ossProjects: Project[] = [
	{
		id: '01',
		get title() {
			return m.ossStudyScheduleTitle();
		},
		get summary() {
			return m.ossStudyScheduleSummary();
		},
		get metrics() {
			return m.ossStudyScheduleMetrics();
		},
		get links() {
			return [
				{ label: m.ossStudyScheduleLinkLive(), url: 'https://schedule-wallpapers.pages.dev/' },
				{
					label: m.ossStudyScheduleLinkRepo(),
					url: 'https://github.com/PLATONG34821/Study-Schedule'
				}
			];
		}
	},
	{
		id: '02',
		get title() {
			return m.ossSwarmClusterTitle();
		},
		get summary() {
			return m.ossSwarmClusterSummary();
		},
		get metrics() {
			return m.ossSwarmClusterMetrics();
		},
		get links() {
			return [
				{
					label: m.ossSwarmClusterLinkRepo(),
					url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster'
				}
			];
		}
	},
	{
		id: '03',
		get title() {
			return m.ossProjectDsmTitle();
		},
		get summary() {
			return m.ossProjectDsmSummary();
		},
		get metrics() {
			return m.ossProjectDsmMetrics();
		},
		get links() {
			return [
				{ label: m.ossProjectDsmLinkLive(), url: 'https://project-dsm.pages.dev/' },
				{ label: m.ossProjectDsmLinkRepo(), url: 'https://github.com/PLATONG34821/Project-DSM' }
			];
		}
	},
	{
		id: '04',
		get title() {
			return m.ossGroupPlanTitle();
		},
		get summary() {
			return m.ossGroupPlanSummary();
		},
		get metrics() {
			return m.ossGroupPlanMetrics();
		},
		get links() {
			return [
				{
					label: m.ossGroupPlanLinkRepo(),
					url: 'https://github.com/PLATONG34821/GroupPlan'
				}
			];
		}
	}
];

export const awards: Award[] = [
	{
		id: '01',
		get title() {
			return m.award1Title();
		},
		get subtitle() {
			return m.award1Subtitle();
		},
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/gold_cert.webp'
	},
	{
		id: '02',
		get title() {
			return m.award2Title();
		},
		get subtitle() {
			return m.award2Subtitle();
		},
		year: '2022',
		certImage: '/certs/silver_cert.webp'
	},
	{
		id: '03',
		get title() {
			return m.award3Title();
		},
		get subtitle() {
			return m.award3Subtitle();
		},
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/nsc25_cert.webp'
	},
	{
		id: '04',
		get title() {
			return m.award4Title();
		},
		get subtitle() {
			return m.award4Subtitle();
		},
		year: '2024',
		certImage: '/certs/samsung_cert.webp'
	},
	{
		id: '05',
		get title() {
			return m.award5Title();
		},
		get subtitle() {
			return m.award5Subtitle();
		},
		year: '2024',
		certImage: '/certs/borntodev_cert.webp'
	},
	{
		id: '06',
		get title() {
			return m.award6Title();
		},
		get subtitle() {
			return m.award6Subtitle();
		},
		year: '2022',
		isHighlighted: true,
		certImage: '/certs/tjsif_stage.webp'
	}
];

export * from './skillsData';
