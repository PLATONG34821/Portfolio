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
		subtitle: 'Smart IV Stand Hardware & Telemetry',
		category: 'International ICT Fair',
		year: '2022',
		isFeatured: true,
		summary:
			'Selected student research & embedded "IV Stand" smart infusion hardware presented in English at Thailand-Japan Student ICT Fair.',
		metrics: 'Forum: Thailand 🇹🇭 × Japan 🇯🇵 Student ICT Fair • Embedded IoT & Flow Sensors',
		tags: ['Embedded Systems', 'IoT Hardware', 'Research Paper', 'Sensors'],
		githubUrl: '/certs/tjsif_cert.webp',
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
		subtitle:
			'Controlling Silkworm Silk Spinning Uniformity for Silk Sheet Production via Biological Gravitropism',
		category: 'National Contest Finalist',
		year: '2023',
		isFeatured: true,
		summary:
			'Automated frame system engineered to control the uniformity of silkworm silk spinning for silk sheet production by applying biological gravitropic behavioral response. Funded grantee in the 25th National Software Contest (NSC 25 @ CMU).',
		metrics: 'Contest: 25th National Software Contest (NSC 25 Grantee @ CMU)',
		tags: ['Embedded Automation', 'Biological Control', 'NSC 25', 'Hardware IoT'],
		githubUrl: '/certs/nsc25_cert.webp',
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
		subtitle: 'Digital Guitar Amp Preset Platform',
		category: 'Audio Web Platform',
		year: '2024',
		isFeatured: true,
		summary:
			'Community audio platform for discovering and sharing digital guitar amplifier presets and Impulse Responses (IRs).',
		metrics: 'Stack: SvelteKit + Supabase Cloud + Web Audio DSP',
		tags: ['SvelteKit', 'TypeScript', 'Supabase', 'Web Audio', 'Community'],
		githubUrl: 'https://polytone.pages.dev/',
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
		id: '02',
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
		id: '03',
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
		id: '04',
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
		certImage: '/certs/gold_cert.webp'
	},
	{
		id: '02',
		title: 'Web Applications Development (ม.ปลาย)',
		subtitle: '70th National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 70)',
		badge: 'Silver Medal',
		year: '2022',
		certImage: '/certs/silver_cert.webp'
	},
	{
		id: '03',
		title: '25th National Software Contest (NSC 25)',
		subtitle: 'Funded Grant Winner & Finalist for Automated Silkworm Silk Spinning Frame (CMU)',
		badge: 'Grant Winner',
		year: '2023',
		isHighlighted: true,
		certImage: '/certs/nsc25_cert.webp'
	},
	{
		id: '04',
		title: 'Samsung Solve for Tomorrow 2024',
		subtitle: 'Innovation Shortlist & Design Thinking / Entrepreneurship Workshop',
		badge: 'Finalist',
		year: '2024',
		certImage: '/certs/samsung_cert.webp'
	},
	{
		id: '05',
		title: 'BornToDev DevLab 3 Nationwide Contest',
		subtitle: 'Rank #1,152 out of 31,905 developers nationwide (Top 3.6%)',
		badge: 'Top 3.6%',
		year: '2024',
		certImage: '/certs/borntodev_cert.webp'
	},
	{
		id: '06',
		title: 'Thailand-Japan Student ICT Fair (TJ-SIF 2022)',
		subtitle: 'International ICT Innovation Presentation Trophy & Award (เชียงราย)',
		badge: 'Intl Trophy',
		year: '2022',
		isHighlighted: true,
		certImage: '/certs/tjsif_stage.webp'
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
		title: 'Languages & Core Runtimes',
		items: [
			{
				skill: 'TypeScript',
				level: 'Production',
				evidence: 'HLLC 2026 (4.4k users), polyTone, 9+ repositories',
				focus: 'Strict compile-time verification, generics, runes state typing',
				isHighlighted: true
			},
			{
				skill: 'SQL (PostgreSQL / MySQL)',
				level: 'Advanced',
				evidence: 'Relational database schemas, query optimization',
				focus: 'Complex joins, indexing strategies, transactions, constraints',
				isHighlighted: true
			},
			{
				skill: 'Java',
				level: 'Proficient',
				evidence: 'OOP architecture, server event handling, backend services',
				focus: 'Object-oriented design patterns, concurrency, robust services'
			},
			{
				skill: 'Python',
				level: 'Proficient',
				evidence: 'Data processing pipelines, automation tooling',
				focus: 'Automation scripting, data transformation, backend utilities'
			},
			{
				skill: 'Bash / Shell',
				level: 'Proficient',
				evidence: 'Linux cluster orchestration, container entrypoints',
				focus: 'Deployment automation, server management, CLI workflows'
			}
		]
	},
	{
		id: '02',
		title: 'Frameworks & Web Architecture',
		items: [
			{
				skill: 'Svelte 5 / SvelteKit',
				level: 'Production Scale',
				evidence: 'HLLC 2026 (4.4k concurrent users), polyTone',
				focus: 'Runes state engine, SSR/CSR hydration, dynamic endpoints',
				isHighlighted: true
			},
			{
				skill: 'React & Next.js',
				level: 'Proficient',
				evidence: 'Modern component architecture, SSR/CSR, ecosystem tooling',
				focus: 'Component lifecycle, hooks, state management, SPA routing',
				isHighlighted: true
			},
			{
				skill: 'Node.js & Express / Web APIs',
				level: 'Proficient',
				evidence: 'HLLC 2026 backend endpoints, Bun/Vite tooling',
				focus: 'RESTful API handlers, middleware, request validation',
				isHighlighted: true
			},
			{
				skill: 'Tailwind CSS & UI Systems',
				level: 'Advanced',
				evidence: 'Production web apps, design system architecture',
				focus: 'Responsive utility-first layouts, dark mode, design tokens',
				isHighlighted: true
			},
			{
				skill: 'Astro & Jamstack',
				level: 'Proficient',
				evidence: 'pt-blog content collections, asset optimizer pipeline',
				focus: 'Zero-JS static generation, edge distribution, fast delivery'
			}
		]
	},
	{
		id: '03',
		title: 'Databases, APIs & Cloud',
		items: [
			{
				skill: 'PostgreSQL',
				level: 'Production',
				evidence: 'polyTone relational database schemas',
				focus: 'Relational modeling, indexing, foreign keys, transaction safety',
				isHighlighted: true
			},
			{
				skill: 'MySQL / MariaDB',
				level: 'Proficient',
				evidence: 'Relational data modeling, schema migrations',
				focus: 'ACID transactions, relational joins, query optimization',
				isHighlighted: true
			},
			{
				skill: 'Redis',
				level: 'Proficient',
				evidence: 'In-memory caching and session state management',
				focus: 'Cache-aside patterns, key-value stores, session handling, rate limits',
				isHighlighted: true
			},
			{
				skill: 'MongoDB',
				level: 'Proficient',
				evidence: 'NoSQL document storage, JSON data modeling',
				focus: 'Document schemas, aggregation pipelines, flexible data structures'
			},
			{
				skill: 'Supabase Cloud',
				level: 'Production',
				evidence: 'polyTone live user platform',
				focus: 'PostgreSQL BaaS, Auth, Realtime engine, Row Level Security (RLS)',
				isHighlighted: true
			},
			{
				skill: 'RESTful API Design & ORMs',
				level: 'Production Scale',
				evidence: 'HLLC 2026 serving 4,400+ simultaneous students',
				focus: 'High-concurrency endpoints, request validation, ORM mapping (Prisma/Drizzle)',
				isHighlighted: true
			}
		]
	},
	{
		id: '04',
		title: 'DevOps, Cloud & Systems Infrastructure',
		items: [
			{
				skill: 'Docker & Docker Swarm',
				level: 'Production',
				evidence: 'Portable Hybrid-Arch Swarm Cluster (x86_64 + ARM64)',
				focus: 'Multi-node service composition, overlays, automated restart policies',
				isHighlighted: true
			},
			{
				skill: 'CI/CD & GitHub Actions',
				level: 'Production',
				evidence: 'Automated test pipelines, Docker image builds & deployments',
				focus: 'Continuous integration, branch protection, automated releases',
				isHighlighted: true
			},
			{
				skill: 'Linux Administration',
				level: 'Proficient',
				evidence: 'Debian/Alpine dedicated server homelab cluster',
				focus: 'Systemd management, SSH hardening, automated backups, shell scripts',
				isHighlighted: true
			},
			{
				skill: 'Nginx & Reverse Proxy',
				level: 'Proficient',
				evidence: 'Automated SSL termination, failover routing stacks',
				focus: 'TLS certificates, dynamic reverse proxying, load balancing, rate limiting',
				isHighlighted: true
			},
			{
				skill: 'Cloudflare & Edge CDN',
				level: 'Proficient',
				evidence: 'Cloudflare Pages & DNS production deployments',
				focus: 'Edge caching, DNS management, DDoS mitigation, asset optimization'
			},
			{
				skill: 'Kubernetes (K8s)',
				level: 'Working Knowledge',
				evidence: 'Container workload orchestration and pod management',
				focus: 'Deployments, services, ingress routing, container scheduling'
			},
			{
				skill: 'Git & GitHub Workflows',
				level: 'Standard Practice',
				evidence: 'Version control across 12+ public and private repositories',
				focus: 'Atomic commits, PR reviews, CI verification pipelines',
				isHighlighted: true
			}
		]
	}
];
