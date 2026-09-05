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

const createSkill = (
	skill: string,
	evidence: string,
	focus: () => string,
	isHighlighted?: boolean
): CapabilityItem => ({
	skill,
	evidence,
	get focus() {
		return focus();
	},
	isHighlighted
});

const createCategory = (
	id: string,
	title: () => string,
	items: CapabilityItem[]
): CapabilityCategory => ({
	id,
	get title() {
		return title();
	},
	items
});

export const capabilityCategories: CapabilityCategory[] = [
	createCategory('01', m.skillCategoryLanguages, [
		createSkill(
			'TypeScript',
			'HLLC 2026 (4.4k users), polyTone, 9+ repositories',
			m.skillFocusTypeScript,
			true
		),
		createSkill(
			'Go',
			'HLLC 2026 gateway & real-time chat services (Fiber v3)',
			m.skillFocusGo,
			true
		),
		createSkill(
			'SQL (PostgreSQL / MySQL)',
			'Relational database schemas, query optimization',
			m.skillFocusSql,
			true
		),
		createSkill(
			'Java',
			'OOP architecture, server event handling, backend services',
			m.skillFocusJava
		),
		createSkill('Python', 'Data processing pipelines, automation tooling', m.skillFocusPython),
		createSkill(
			'Bash / Shell',
			'Linux cluster orchestration, container entrypoints',
			m.skillFocusBash
		)
	]),
	createCategory('02', m.skillCategoryFrameworks, [
		createSkill(
			'Svelte 5 / SvelteKit',
			'polyTone, Study-Schedule, GroupPlan, Portfolio',
			m.skillFocusSvelte,
			true
		),
		createSkill(
			'React & Next.js',
			'HLLC 2026 admin dashboard, student web, React Native (Expo)',
			m.skillFocusReact,
			true
		),
		createSkill(
			'Node.js & Express / Web APIs',
			'Web APIs, fullstack toolchains, Bun/Vite tooling',
			m.skillFocusNode,
			true
		),
		createSkill(
			'Tailwind CSS & UI Systems',
			'polyTone, Study-Schedule, GroupPlan, HLLC Admin (Tailwind 4)',
			m.skillFocusTailwind,
			true
		),
		createSkill(
			'Astro & Jamstack',
			'pt-blog content collections, asset optimizer pipeline',
			m.skillFocusAstro
		)
	]),
	createCategory('03', m.skillCategoryDatabases, [
		createSkill('PostgreSQL', 'polyTone relational database schemas', m.skillFocusPostgres, true),
		createSkill(
			'MySQL / MariaDB',
			'Relational data modeling, schema migrations',
			m.skillFocusMysql,
			true
		),
		createSkill(
			'Redis',
			'HLLC 2026 in-memory caching, session state & rate limits',
			m.skillFocusRedis,
			true
		),
		createSkill('MongoDB', 'HLLC 2026 document schemas & persistence', m.skillFocusMongo, true),
		createSkill(
			'Supabase Cloud',
			'polyTone, TAKE ELE real-time data & auth',
			m.skillFocusSupabase,
			true
		),
		createSkill(
			'RESTful API Design & ORMs',
			'HLLC 2026 (Fiber), MFU Badminton Bot (Drizzle ORM)',
			m.skillFocusRest,
			true
		)
	]),
	createCategory('04', m.skillCategoryDevops, [
		createSkill(
			'Docker & Docker Swarm',
			'Portable Hybrid-Arch Swarm Cluster (x86_64 + ARM64)',
			m.skillFocusDocker,
			true
		),
		createSkill(
			'CI/CD & GitHub Actions',
			'Automated test pipelines, Docker image builds & deployments',
			m.skillFocusCicd,
			true
		),
		createSkill(
			'Linux Administration',
			'Debian/Alpine dedicated server homelab cluster',
			m.skillFocusLinux,
			true
		),
		createSkill(
			'Nginx & Reverse Proxy',
			'Automated SSL termination, failover routing stacks',
			m.skillFocusNginx,
			true
		),
		createSkill(
			'Cloudflare & Edge CDN',
			'Cloudflare Workers & Pages (polyTone, Study-Schedule, GroupPlan)',
			m.skillFocusCloudflare
		),
		createSkill(
			'Kubernetes (K8s)',
			'HLLC 2026 Kustomize multi-env manifests & service orchestration',
			m.skillFocusKubernetes
		),
		createSkill(
			'Git & GitHub Workflows',
			'Version control across 15+ public and private repositories',
			m.skillFocusGit,
			true
		)
	])
];
