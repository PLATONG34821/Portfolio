import * as m from '$lib/paraglide/messages';

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
		get title() {
			return m.skillCategoryLanguages();
		},
		items: [
			{
				skill: 'TypeScript',
				evidence: 'HLLC 2026 (4.4k users), polyTone, 9+ repositories',
				get focus() {
					return m.skillFocusTypeScript();
				},
				isHighlighted: true
			},
			{
				skill: 'SQL (PostgreSQL / MySQL)',
				evidence: 'Relational database schemas, query optimization',
				get focus() {
					return m.skillFocusSql();
				},
				isHighlighted: true
			},
			{
				skill: 'Java',
				evidence: 'OOP architecture, server event handling, backend services',
				get focus() {
					return m.skillFocusJava();
				}
			},
			{
				skill: 'Python',
				evidence: 'Data processing pipelines, automation tooling',
				get focus() {
					return m.skillFocusPython();
				}
			},
			{
				skill: 'Bash / Shell',
				evidence: 'Linux cluster orchestration, container entrypoints',
				get focus() {
					return m.skillFocusBash();
				}
			}
		]
	},
	{
		id: '02',
		get title() {
			return m.skillCategoryFrameworks();
		},
		items: [
			{
				skill: 'Svelte 5 / SvelteKit',
				evidence: 'HLLC 2026 (4.4k concurrent users), polyTone',
				get focus() {
					return m.skillFocusSvelte();
				},
				isHighlighted: true
			},
			{
				skill: 'React & Next.js',
				evidence: 'Modern component architecture, SSR/CSR, ecosystem tooling',
				get focus() {
					return m.skillFocusReact();
				},
				isHighlighted: true
			},
			{
				skill: 'Node.js & Express / Web APIs',
				evidence: 'HLLC 2026 backend endpoints, Bun/Vite tooling',
				get focus() {
					return m.skillFocusNode();
				},
				isHighlighted: true
			},
			{
				skill: 'Tailwind CSS & UI Systems',
				evidence: 'Production web apps, design system architecture',
				get focus() {
					return m.skillFocusTailwind();
				},
				isHighlighted: true
			},
			{
				skill: 'Astro & Jamstack',
				evidence: 'pt-blog content collections, asset optimizer pipeline',
				get focus() {
					return m.skillFocusAstro();
				}
			}
		]
	},
	{
		id: '03',
		get title() {
			return m.skillCategoryDatabases();
		},
		items: [
			{
				skill: 'PostgreSQL',
				evidence: 'polyTone relational database schemas',
				get focus() {
					return m.skillFocusPostgres();
				},
				isHighlighted: true
			},
			{
				skill: 'MySQL / MariaDB',
				evidence: 'Relational data modeling, schema migrations',
				get focus() {
					return m.skillFocusMysql();
				},
				isHighlighted: true
			},
			{
				skill: 'Redis',
				evidence: 'In-memory caching and session state management',
				get focus() {
					return m.skillFocusRedis();
				},
				isHighlighted: true
			},
			{
				skill: 'MongoDB',
				evidence: 'NoSQL document storage, JSON data modeling',
				get focus() {
					return m.skillFocusMongo();
				}
			},
			{
				skill: 'Supabase Cloud',
				evidence: 'polyTone live user platform',
				get focus() {
					return m.skillFocusSupabase();
				},
				isHighlighted: true
			},
			{
				skill: 'RESTful API Design & ORMs',
				evidence: 'HLLC 2026 serving 4,400+ simultaneous students',
				get focus() {
					return m.skillFocusRest();
				},
				isHighlighted: true
			}
		]
	},
	{
		id: '04',
		get title() {
			return m.skillCategoryDevops();
		},
		items: [
			{
				skill: 'Docker & Docker Swarm',
				evidence: 'Portable Hybrid-Arch Swarm Cluster (x86_64 + ARM64)',
				get focus() {
					return m.skillFocusDocker();
				},
				isHighlighted: true
			},
			{
				skill: 'CI/CD & GitHub Actions',
				evidence: 'Automated test pipelines, Docker image builds & deployments',
				get focus() {
					return m.skillFocusCicd();
				},
				isHighlighted: true
			},
			{
				skill: 'Linux Administration',
				evidence: 'Debian/Alpine dedicated server homelab cluster',
				get focus() {
					return m.skillFocusLinux();
				},
				isHighlighted: true
			},
			{
				skill: 'Nginx & Reverse Proxy',
				evidence: 'Automated SSL termination, failover routing stacks',
				get focus() {
					return m.skillFocusNginx();
				},
				isHighlighted: true
			},
			{
				skill: 'Cloudflare & Edge CDN',
				evidence: 'Cloudflare Pages & DNS production deployments',
				get focus() {
					return m.skillFocusCloudflare();
				}
			},
			{
				skill: 'Kubernetes (K8s)',
				evidence: 'Container workload orchestration and pod management',
				get focus() {
					return m.skillFocusKubernetes();
				}
			},
			{
				skill: 'Git & GitHub Workflows',
				evidence: 'Version control across 12+ public and private repositories',
				get focus() {
					return m.skillFocusGit();
				},
				isHighlighted: true
			}
		]
	}
];
