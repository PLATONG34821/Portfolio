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
		title: 'HLLC 2026 Platform',
		summary:
			'High-concurrency orientation and live activity management platform engineered for Mae Fah Luang University.',
		metrics: 'Scale: 4,400+ Active Users • Stack: SvelteKit, TypeScript, iOS, Android',
		certImage: '/certs/hllcHomepage.webp',
		links: [
			{
				label: 'App UI Preview',
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
		]
	},
	{
		id: '02',
		title: 'TJ-SIF 2022 Innovation',
		summary:
			'Selected student research & embedded "IV Stand" smart infusion hardware presented in English at Thailand-Japan Student ICT Fair.',
		metrics: 'Forum: Thailand 🇹🇭 × Japan 🇯🇵 Student ICT Fair • Embedded IoT & Flow Sensors',
		certImage: '/certs/tjsif_booth.webp',
		links: [
			{
				label: 'Certificate',
				url: '/certs/tjsif_cert.webp',
				isCertModal: true,
				certImage: '/certs/tjsif_cert.webp'
			},
			{
				label: 'Stage Trophy',
				url: '/certs/tjsif_stage.webp',
				isCertModal: true,
				certImage: '/certs/tjsif_stage.webp'
			},
			{
				label: 'Live Booth',
				url: '/certs/tjsif_booth.webp',
				isCertModal: true,
				certImage: '/certs/tjsif_booth.webp'
			},
			{
				label: 'Report (p.125)',
				url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137'
			}
		]
	},
	{
		id: '03',
		title:
			'NSC 25 — Automated Silkworm Silk Spinning Frame for Uniform Sheet Production via Gravitropic Response',
		summary:
			'Automated frame system engineered to control the uniformity of silkworm silk spinning for silk sheet production by applying biological gravitropic behavioral response. Funded grantee in the 25th National Software Contest (NSC 25 @ CMU).',
		metrics: 'Contest: 25th National Software Contest (NSC 25 Grantee @ CMU)',
		certImage: '/certs/nsc25_booth.webp',
		links: [
			{
				label: 'NSC 25 Certificate',
				url: '/certs/nsc25_cert.webp',
				isCertModal: true,
				certImage: '/certs/nsc25_cert.webp'
			},
			{
				label: 'Exhibition Photo',
				url: '/certs/nsc25_booth.webp',
				isCertModal: true,
				certImage: '/certs/nsc25_booth.webp'
			}
		]
	},
	{
		id: '04',
		title: 'polyTone',
		summary:
			'Community audio platform for discovering and sharing digital guitar amplifier presets and Impulse Responses (IRs).',
		metrics: 'Stack: SvelteKit + Supabase Cloud + Web Audio DSP',
		certImage: '/certs/polyTonePreview.webp',
		links: [
			{
				label: 'UI Preview',
				url: '/certs/polyTonePreview.webp',
				isCertModal: true,
				certImage: '/certs/polyTonePreview.webp'
			},
			{ label: 'Live App', url: 'https://polytone.pages.dev/' }
		]
	}
];

export const ossProjects: Project[] = [
	{
		id: '01',
		title: 'Study-Schedule',
		summary:
			'Interactive study timetable designer with high-resolution 4K wallpaper rendering engine.',
		metrics: 'Stack: HTML5 Canvas 2D + Svelte State Management',
		links: [
			{ label: 'Live App', url: 'https://schedule-wallpapers.pages.dev/' },
			{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/Study-Schedule' }
		]
	},
	{
		id: '02',
		title: 'Portable Hybrid Swarm Cluster',
		summary:
			'Resilient multi-node hybrid x86/ARM Docker Swarm edge cluster with automated failover & proxy routing.',
		metrics: 'Nodes: Hybrid Multi-Arch (x86_64 + ARM64) • Reverse Proxy Routing',
		links: [
			{
				label: 'GitHub Repo',
				url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster'
			}
		]
	},
	{
		id: '03',
		title: 'Project-DSM',
		summary:
			'Vehicle telemetry & driver behavior analytics application engineered for smart passenger safety.',
		metrics: 'Sensors: GPS Real-Time Telemetry + Accelerometer Tracking',
		links: [
			{ label: 'Live App', url: 'https://project-dsm.pages.dev/' },
			{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/Project-DSM' }
		]
	},
	{
		id: '04',
		title: 'GroupPlan',
		summary:
			'Modern team schedule coordination and collaborative group planning web application built with Svelte.',
		metrics: 'Stack: Svelte 5 Runes + TypeScript State Engine',
		links: [{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/GroupPlan' }]
	}
];

export const awards: Award[] = [
	{
		id: '01',
		title: 'Web Applications Development (ม.ปลาย)',
		subtitle: '71st National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 71)',
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/gold_cert.webp'
	},
	{
		id: '02',
		title: 'Web Applications Development (ม.ปลาย)',
		subtitle: '70th National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 70)',
		year: '2022',
		certImage: '/certs/silver_cert.webp'
	},
	{
		id: '03',
		title: '25th National Software Contest (NSC 25)',
		subtitle: 'Funded Grant Winner & Finalist for Automated Silkworm Silk Spinning Frame (CMU)',
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/nsc25_cert.webp'
	},
	{
		id: '04',
		title: 'Samsung Solve for Tomorrow 2024',
		subtitle: 'Innovation Shortlist & Design Thinking / Entrepreneurship Workshop',
		year: '2024',
		certImage: '/certs/samsung_cert.webp'
	},
	{
		id: '05',
		title: 'BornToDev DevLab 3 Nationwide Contest',
		subtitle: 'Rank #1,152 out of 31,905 developers nationwide (Top 3.6%)',
		year: '2024',
		certImage: '/certs/borntodev_cert.webp'
	},
	{
		id: '06',
		title: 'Thailand-Japan Student ICT Fair (TJ-SIF 2022)',
		subtitle: 'International ICT Innovation Presentation Trophy & Award (เชียงราย)',
		year: '2022',
		isHighlighted: true,
		certImage: '/certs/tjsif_stage.webp'
	}
];

export * from './skillsData';
