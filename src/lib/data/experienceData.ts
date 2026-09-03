export interface ProjectLink {
	label: string;
	url: string;
	isCertModal?: boolean;
	certImage?: string;
}

export interface Project {
	id: string;
	title: string;
	subtitle: string;
	summary: string;
	category: string;
	year: string;
	metrics: string;
	isFeatured?: boolean;
	tags: string[];
	githubUrl: string;
	certImage?: string;
	links?: ProjectLink[];
}

export interface Award {
	id: string;
	title: string;
	subtitle: string;
	badge: string;
	year: string;
	isHighlighted?: boolean;
	certImage?: string;
}

export interface Certification {
	name: string;
	issuer: string;
	code: string;
}

export interface CapabilityItem {
	skill: string;
	level: string;
	evidence: string;
	focus: string;
	isHighlighted?: boolean;
}

export interface CapabilityCategory {
	id: string;
	title: string;
	items: CapabilityItem[];
}

export const coreProjects: Project[] = [
	{
		id: '01',
		title: 'HLLC 2026 Platform',
		subtitle: 'Freshmen Orientation & Activity Ecosystem',
		category: 'Campus Production',
		year: '2026',
		isFeatured: true,
		summary:
			'High-concurrency orientation and live activity management platform engineered for Mae Fah Luang University.',
		metrics: 'Scale: 4,400+ Active Users • Stack: SvelteKit, TypeScript, iOS, Android',
		tags: ['SvelteKit', 'TypeScript', 'High Concurrency', 'REST API'],
		githubUrl: 'https://apps.apple.com/th/app/hllc/id6748238190',
		links: [
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
		subtitle: 'Smart IV Stand Hardware & Telemetry',
		category: 'International ICT Fair',
		year: '2022',
		isFeatured: true,
		summary:
			'Selected student research & embedded "IV Stand" smart infusion hardware presented in English at Thailand-Japan Student ICT Fair.',
		metrics: 'Forum: Thailand 🇹🇭 × Japan 🇯🇵 Student ICT Fair • Embedded IoT & Flow Sensors',
		tags: ['Embedded Systems', 'IoT Hardware', 'Research Paper', 'Sensors'],
		githubUrl: '/certs/tjsif_cert.jpg',
		certImage: '/certs/tjsif_booth.jpg',
		links: [
			{
				label: 'Certificate',
				url: '/certs/tjsif_cert.jpg',
				isCertModal: true,
				certImage: '/certs/tjsif_cert.jpg'
			},
			{
				label: 'Stage Trophy',
				url: '/certs/tjsif_stage.png',
				isCertModal: true,
				certImage: '/certs/tjsif_stage.png'
			},
			{
				label: 'Live Booth',
				url: '/certs/tjsif_booth.jpg',
				isCertModal: true,
				certImage: '/certs/tjsif_booth.jpg'
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
		subtitle:
			'Controlling Silkworm Silk Spinning Uniformity for Silk Sheet Production via Biological Gravitropism',
		category: 'National Contest Finalist',
		year: '2023',
		isFeatured: true,
		summary:
			'Automated frame system engineered to control the uniformity of silkworm silk spinning for silk sheet production by applying biological gravitropic behavioral response. Funded grantee in the 25th National Software Contest (NSC 25 @ CMU).',
		metrics: 'Contest: 25th National Software Contest (NSC 25 Grantee @ CMU)',
		tags: ['Embedded Automation', 'Biological Control', 'NSC 25', 'Hardware IoT'],
		githubUrl: '/certs/nsc25_cert.jpg',
		certImage: '/certs/nsc25_booth.png',
		links: [
			{
				label: 'NSC 25 Certificate',
				url: '/certs/nsc25_cert.jpg',
				isCertModal: true,
				certImage: '/certs/nsc25_cert.jpg'
			},
			{
				label: 'Exhibition Photo',
				url: '/certs/nsc25_booth.png',
				isCertModal: true,
				certImage: '/certs/nsc25_booth.png'
			}
		]
	},
	{
		id: '04',
		title: 'polyTone',
		subtitle: 'Digital Guitar Amp Preset Platform',
		category: 'Audio Web Platform',
		year: '2024',
		isFeatured: true,
		summary:
			'Community audio platform for discovering and sharing digital guitar amplifier presets and Impulse Responses (IRs).',
		metrics: 'Stack: SvelteKit + Supabase Cloud + Web Audio DSP',
		tags: ['SvelteKit', 'TypeScript', 'Supabase', 'Web Audio', 'Community'],
		githubUrl: 'https://polytone.pages.dev/',
		links: [{ label: 'Live App', url: 'https://polytone.pages.dev/' }]
	}
];

export const ossProjects: Project[] = [
	{
		id: '05',
		title: 'Study-Schedule',
		subtitle: '4K Wallpaper Canvas Renderer',
		category: 'Tooling & Canvas',
		year: '2024',
		summary:
			'Interactive study timetable designer with high-resolution 4K wallpaper rendering engine.',
		metrics: 'Stack: HTML5 Canvas 2D + Svelte State Management',
		tags: ['Svelte', 'TypeScript', 'Web Canvas', 'Responsive UI'],
		githubUrl: 'https://github.com/PLATONG34821/Study-Schedule',
		links: [
			{ label: 'Live App', url: 'https://schedule-wallpapers.pages.dev/' },
			{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/Study-Schedule' }
		]
	},
	{
		id: '06',
		title: 'Portable Hybrid Swarm Cluster',
		subtitle: 'Multi-Arch Docker Swarm Homelab',
		category: 'DevOps & Cluster',
		year: '2024',
		summary:
			'Resilient multi-node hybrid x86/ARM Docker Swarm edge cluster with automated failover & proxy routing.',
		metrics: 'Nodes: Hybrid Multi-Arch (x86_64 + ARM64) • Reverse Proxy Routing',
		tags: ['Docker Swarm', 'Homelab', 'Reverse Proxy', 'Linux'],
		githubUrl: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster',
		links: [
			{
				label: 'GitHub Repo',
				url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster'
			}
		]
	},
	{
		id: '07',
		title: 'Project-DSM',
		subtitle: 'Vehicle Telemetry & Road Safety',
		category: 'IoT & Telemetry',
		year: '2024',
		summary:
			'Vehicle telemetry & driver behavior analytics application engineered for smart passenger safety.',
		metrics: 'Sensors: GPS Real-Time Telemetry + Accelerometer Tracking',
		tags: ['JavaScript', 'IoT Telemetry', 'Sensors', 'Fullstack'],
		githubUrl: 'https://github.com/PLATONG34821/Project-DSM',
		links: [
			{ label: 'Live App', url: 'https://project-dsm.pages.dev/' },
			{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/Project-DSM' }
		]
	},
	{
		id: '08',
		title: 'GroupPlan',
		subtitle: 'Schedule Sync & Team Planner',
		category: 'Web Application',
		year: '2024',
		summary:
			'Modern team schedule coordination and collaborative group planning web application built with Svelte.',
		metrics: 'Stack: Svelte 5 Runes + TypeScript State Engine',
		tags: ['Svelte', 'TypeScript', 'State Management', 'Team Tooling'],
		githubUrl: 'https://github.com/PLATONG34821/GroupPlan',
		links: [{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/GroupPlan' }]
	}
];

export const awards: Award[] = [
	{
		id: '01',
		title: 'Web Applications Development (ม.ปลาย)',
		subtitle: '71st National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 71)',
		badge: 'Gold Medal',
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/gold_cert.png'
	},
	{
		id: '02',
		title: 'Web Applications Development (ม.ปลาย)',
		subtitle: '70th National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 70)',
		badge: 'Silver Medal',
		year: '2022',
		certImage: '/certs/silver_cert.jpg'
	},
	{
		id: '03',
		title: '25th National Software Contest (NSC 25)',
		subtitle: 'Funded Grant Winner & Finalist for Automated Silkworm Silk Spinning Frame (CMU)',
		badge: 'Grant Winner',
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/nsc25_cert.jpg'
	},
	{
		id: '04',
		title: 'Samsung Solve for Tomorrow 2024',
		subtitle: 'Innovation Shortlist & Design Thinking / Entrepreneurship Workshop',
		badge: 'Finalist',
		year: '2024',
		certImage: '/certs/samsung_cert.jpg'
	},
	{
		id: '05',
		title: 'BornToDev DevLab 3 Nationwide Contest',
		subtitle: 'Rank #1,152 out of 31,905 developers nationwide (Top 3.6%)',
		badge: 'Top 3.6%',
		year: '2024',
		certImage: '/certs/borntodev_cert.png'
	},
	{
		id: '06',
		title: 'Thailand-Japan Student ICT Fair (TJ-SIF 2022)',
		subtitle: 'International ICT Innovation Presentation Trophy & Award (เชียงราย)',
		badge: 'Intl Trophy',
		year: '2022',
		isHighlighted: true,
		certImage: '/certs/tjsif_stage.png'
	}
];

export const certifications: Certification[] = [
	{
		name: 'Software Engineering Fundamentals',
		issuer: 'Mae Fah Luang University',
		code: 'MFU-SE'
	},
	{
		name: 'Computer Programming: Core Syntax',
		issuer: 'Mae Fah Luang University',
		code: 'MFU-PROG'
	},
	{
		name: 'Object-Oriented Design & OOP',
		issuer: 'Mae Fah Luang University',
		code: 'MFU-OOP'
	},
	{
		name: 'Internet of Things (IoT) Fundamentals',
		issuer: 'ThaiMOOC • Hat Yai Univ',
		code: 'MOOC-IOT'
	},
	{
		name: 'Python for Data Science',
		issuer: 'ThaiMOOC • RMUTT',
		code: 'MOOC-PY'
	},
	{
		name: 'R Programming for Data Analytics',
		issuer: 'ThaiMOOC • SKRU',
		code: 'MOOC-R'
	}
];

export const capabilityCategories: CapabilityCategory[] = [
	{
		id: '01',
		title: 'Frontend & UI Architecture',
		items: [
			{
				skill: 'Svelte 5 / SvelteKit',
				level: 'Advanced (Production)',
				evidence: 'HLLC 2026 (4.4k users), polyTone, Study-Schedule, GroupPlan, pt-chord',
				focus: 'Runes state engine, server SSR/CSR hydration, dynamic routing & endpoints',
				isHighlighted: true
			},
			{
				skill: 'TypeScript & JavaScript',
				level: 'Advanced',
				evidence: 'Strict type safety across 9 repositories, Canvas 2D pipelines, Project-DSM',
				focus: 'Strict compile-time verification, browser DOM manipulation, modular architecture',
				isHighlighted: true
			},
			{
				skill: 'HTML5 Canvas 2D & DSP Audio',
				level: 'Proficient',
				evidence: 'Study-Schedule (4K wallpaper renderer), polyTone (Guitar IR DSP engine)',
				focus: 'Offscreen pixel rendering, Web Audio nodes, Impulse Response convolution'
			},
			{
				skill: 'Astro & Jamstack Web',
				level: 'Proficient',
				evidence: 'pt-blog (Content collections, Markdown compile pipeline, asset optimizer)',
				focus: 'Zero-JS static site generation, fast edge delivery, content collections'
			},
			{
				skill: 'Web App Competition Mastery',
				level: 'Gold Medalist',
				evidence: 'Gold Medal (71st) & Silver Medal (70th) National Student Arts & Crafts',
				focus: 'Rapid frontend prototyping, UI design systems, real-time client state',
				isHighlighted: true
			}
		]
	},
	{
		id: '02',
		title: 'Backend, Cloud & Data Infrastructure',
		items: [
			{
				skill: 'High-Concurrency System Design',
				level: 'Production Scale',
				evidence: 'HLLC 2026 API architecture serving 4,400+ simultaneous orientation students',
				focus: 'Traffic spike mitigation, session state synchronization, mobile/web endpoints',
				isHighlighted: true
			},
			{
				skill: 'Supabase Cloud & PostgreSQL',
				level: 'Proficient',
				evidence: 'polyTone (Relational schema, realtime subscriptions, cloud storage buckets)',
				focus: 'Relational table design, row-level security policies, object storage'
			},
			{
				skill: 'Java & Game Server Plugins',
				level: 'Proficient',
				evidence: 'PT-Story, PT-Spawn, PT-Warp (Paper 1.20.4 OOP architecture & event loop)',
				focus: 'Object-oriented event listeners, multi-player state, server packet handlers'
			},
			{
				skill: 'Python & R Data Analytics',
				level: 'Certified',
				evidence: 'ThaiMOOC Python for Data Science (RMUTT) & R Data Analysis (SKRU)',
				focus: 'Data transformation, statistical summary matrices, tabular processing'
			},
			{
				skill: 'Software Engineering Principles',
				level: 'Certified (MFU)',
				evidence: 'MFU-SE, MFU-PROG, MFU-OOP Academic Specializations (Mae Fah Luang Univ)',
				focus: 'Design patterns, software lifecycle, encapsulation, robust code design',
				isHighlighted: true
			}
		]
	},
	{
		id: '03',
		title: 'DevOps, Clustering & Edge Systems',
		items: [
			{
				skill: 'Docker & Docker Swarm',
				level: 'Proficient',
				evidence: 'Portable-Hybrid-Arch-Docker-Swarm-Cluster (Multi-node swarm orchestration)',
				focus: 'Service stack composition, container overlays, automated restart policies',
				isHighlighted: true
			},
			{
				skill: 'Heterogeneous Multi-Arch (x86/ARM)',
				level: 'Proficient',
				evidence: 'Hybrid cluster combining x86_64 servers & ARM64 edge nodes (Pi/Rockchip)',
				focus: 'Cross-platform container images, resource balancing, edge node telemetry'
			},
			{
				skill: 'Reverse Proxy & High Availability',
				level: 'Proficient',
				evidence: 'Automated SSL termination, failover routing, zero-downtime stacks',
				focus: 'TLS certificates, dynamic reverse proxying, traffic routing'
			},
			{
				skill: 'Linux Administration & Scripting',
				level: 'Proficient',
				evidence: 'Debian/Alpine homelab setups, Bash automation, CMDEdge Windows CLI',
				focus: 'Systemd management, shell scripting, environment configuration'
			}
		]
	},
	{
		id: '04',
		title: 'Embedded IoT & Hardware Automation',
		items: [
			{
				skill: 'Biological Gravitropism Control',
				level: 'National Grant Winner',
				evidence: 'NSC 25 Funded Grantee — Automated silkworm reeling with motor drivers',
				focus: 'Sensory feedback loops, stepper motor driver tuning, automated biological reeling',
				isHighlighted: true
			},
			{
				skill: 'Smart Medical Hardware & Sensors',
				level: 'Intl Trophy Award',
				evidence: 'TJ-SIF 2022 — IV Stand embedded telemetry presented to Thailand-Japan forum',
				focus: 'Infusion drop rate sensors, microcontroller telemetry, English oral presentation',
				isHighlighted: true
			},
			{
				skill: 'Vehicle Telemetry & Road Safety',
				level: 'Proficient',
				evidence: 'Project-DSM — GPS real-time positioning & accelerometer driver safety tracking',
				focus: 'GPS NMEA stream parsing, G-force threshold analysis, safety metrics'
			},
			{
				skill: 'IoT Sensor Foundations',
				level: 'Certified',
				evidence: 'ThaiMOOC Internet of Things Fundamentals (Prince of Songkla Univ)',
				focus: 'Analog/digital signal acquisition, wireless protocols, IoT architectures'
			}
		]
	},
	{
		id: '05',
		title: 'Competitive Problem Solving & Leadership',
		items: [
			{
				skill: 'Competitive Algorithms & Coding',
				level: 'Top 3.6% Nationwide',
				evidence: 'BornToDev DevLab 3 Nationwide Contest (Rank #1,152 out of 31,905 developers)',
				focus: 'Data structures, algorithm complexity, rapid debugging under constraints',
				isHighlighted: true
			},
			{
				skill: 'Product Design & Design Thinking',
				level: 'Finalist',
				evidence: 'Samsung Solve for Tomorrow 2024 shortlisted innovation & workshop',
				focus: 'User empathy modeling, iterative prototyping, pitch presentation'
			},
			{
				skill: 'Civic Software & Leadership',
				level: 'Civic Project',
				evidence: 'damrong_pitakphong civic portal & student governance systems',
				focus: 'Digital services for student governance, cross-functional team coordination',
				isHighlighted: true
			}
		]
	}
];
