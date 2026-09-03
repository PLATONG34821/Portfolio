export interface CapabilityItem {
	skill: string;
	evidence: string;
	focus: string;
	isHighlighted?: boolean;
}

export interface CapabilityCategory {
	id: string;
	title: string;
	items: CapabilityItem[];
}

export const quickScanTools = [
	'TypeScript',
	'SvelteKit',
	'React / Next.js',
	'Node.js',
	'PostgreSQL',
	'MySQL',
	'Redis',
	'MongoDB',
	'Supabase',
	'Docker Swarm',
	'Kubernetes',
	'Linux',
	'CI/CD GitHub Actions',
	'Nginx'
];

export const capabilityCategories: CapabilityCategory[] = [
	{
		id: '01',
		title: 'Languages & Core Runtimes',
		items: [
			{
				skill: 'TypeScript',
				evidence: 'HLLC 2026 (4.4k users), polyTone, 9+ repositories',
				focus: 'Strict compile-time verification, generics, runes state typing',
				isHighlighted: true
			},
			{
				skill: 'SQL (PostgreSQL / MySQL)',
				evidence: 'Relational database schemas, query optimization',
				focus: 'Complex joins, indexing strategies, transactions, constraints',
				isHighlighted: true
			},
			{
				skill: 'Java',
				evidence: 'OOP architecture, server event handling, backend services',
				focus: 'Object-oriented design patterns, concurrency, robust services'
			},
			{
				skill: 'Python',
				evidence: 'Data processing pipelines, automation tooling',
				focus: 'Automation scripting, data transformation, backend utilities'
			},
			{
				skill: 'Bash / Shell',
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
				evidence: 'HLLC 2026 (4.4k concurrent users), polyTone',
				focus: 'Runes state engine, SSR/CSR hydration, dynamic endpoints',
				isHighlighted: true
			},
			{
				skill: 'React & Next.js',
				evidence: 'Modern component architecture, SSR/CSR, ecosystem tooling',
				focus: 'Component lifecycle, hooks, state management, SPA routing',
				isHighlighted: true
			},
			{
				skill: 'Node.js & Express / Web APIs',
				evidence: 'HLLC 2026 backend endpoints, Bun/Vite tooling',
				focus: 'RESTful API handlers, middleware, request validation',
				isHighlighted: true
			},
			{
				skill: 'Tailwind CSS & UI Systems',
				evidence: 'Production web apps, design system architecture',
				focus: 'Responsive utility-first layouts, dark mode, design tokens',
				isHighlighted: true
			},
			{
				skill: 'Astro & Jamstack',
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
				evidence: 'polyTone relational database schemas',
				focus: 'Relational modeling, indexing, foreign keys, transaction safety',
				isHighlighted: true
			},
			{
				skill: 'MySQL / MariaDB',
				evidence: 'Relational data modeling, schema migrations',
				focus: 'ACID transactions, relational joins, query optimization',
				isHighlighted: true
			},
			{
				skill: 'Redis',
				evidence: 'In-memory caching and session state management',
				focus: 'Cache-aside patterns, key-value stores, session handling, rate limits',
				isHighlighted: true
			},
			{
				skill: 'MongoDB',
				evidence: 'NoSQL document storage, JSON data modeling',
				focus: 'Document schemas, aggregation pipelines, flexible data structures'
			},
			{
				skill: 'Supabase Cloud',
				evidence: 'polyTone live user platform',
				focus: 'PostgreSQL BaaS, Auth, Realtime engine, Row Level Security (RLS)',
				isHighlighted: true
			},
			{
				skill: 'RESTful API Design & ORMs',
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
				evidence: 'Portable Hybrid-Arch Swarm Cluster (x86_64 + ARM64)',
				focus: 'Multi-node service composition, overlays, automated restart policies',
				isHighlighted: true
			},
			{
				skill: 'CI/CD & GitHub Actions',
				evidence: 'Automated test pipelines, Docker image builds & deployments',
				focus: 'Continuous integration, branch protection, automated releases',
				isHighlighted: true
			},
			{
				skill: 'Linux Administration',
				evidence: 'Debian/Alpine dedicated server homelab cluster',
				focus: 'Systemd management, SSH hardening, automated backups, shell scripts',
				isHighlighted: true
			},
			{
				skill: 'Nginx & Reverse Proxy',
				evidence: 'Automated SSL termination, failover routing stacks',
				focus: 'TLS certificates, dynamic reverse proxying, load balancing, rate limiting',
				isHighlighted: true
			},
			{
				skill: 'Cloudflare & Edge CDN',
				evidence: 'Cloudflare Pages & DNS production deployments',
				focus: 'Edge caching, DNS management, DDoS mitigation, asset optimization'
			},
			{
				skill: 'Kubernetes (K8s)',
				evidence: 'Container workload orchestration and pod management',
				focus: 'Deployments, services, ingress routing, container scheduling'
			},
			{
				skill: 'Git & GitHub Workflows',
				evidence: 'Version control across 12+ public and private repositories',
				focus: 'Atomic commits, PR reviews, CI verification pipelines',
				isHighlighted: true
			}
		]
	}
];
