<script lang="ts">
	interface ProjectLink {
		label: string;
		url: string;
	}

	interface ProjectMetric {
		label: string;
		value: string;
		icon?: string;
	}

	interface Project {
		id: string;
		title: string;
		summary: string;
		typeGlyph: string;
		category: string;
		year: string;
		metrics: ProjectMetric[];
		status: 'PROD' | 'FEAT' | 'RESEARCH' | 'OSS';
		statusLabel: string;
		tags: string[];
		githubUrl: string;
		links?: ProjectLink[];
	}

	interface Props {
		scrollProgress?: number;
	}

	let { scrollProgress = 0 }: Props = $props();

	// Pure in-place fade in once EXP finishes assembling (scrollProgress >= 0.6)
	let isRevealed = $derived(scrollProgress >= 0.6);

	const projects: Project[] = [
		{
			id: '01',
			title: 'HLLC 2026 Platform',
			typeGlyph: '📱',
			category: 'CAMPUS // PRODUCTION',
			year: '2026',
			status: 'PROD',
			statusLabel: 'LIVE_PROD',
			summary:
				'High-concurrency freshmen orientation & event ecosystem engineered for Mae Fah Luang University.',
			metrics: [
				{ label: 'SCALE', value: '4.4k+ Users', icon: '⚡' },
				{ label: 'STACK', value: 'iOS • Web • Android', icon: '🌐' }
			],
			tags: ['SvelteKit', 'TypeScript', 'High Concurrency', 'REST API'],
			githubUrl: 'https://apps.apple.com/th/app/hllc/id6748238190',
			links: [
				{ label: 'App Store', url: 'https://apps.apple.com/th/app/hllc/id6748238190' },
				{
					label: 'Google Play',
					url: 'https://play.google.com/store/apps/details?id=com.hllc.mfuactivity&hl=en'
				},
				{
					label: 'Instagram',
					url: 'https://www.instagram.com/mfu_activities/p/Da1msGcCV8-/'
				}
			]
		},
		{
			id: '02',
			title: 'TJ-SIF 2022 Innovation',
			typeGlyph: '🔬',
			category: 'RESEARCH // INTL_FAIR',
			year: '2022',
			status: 'RESEARCH',
			statusLabel: 'PEER_REVIEW',
			summary:
				'Selected student research & embedded ICT hardware exhibition presented at Thailand-Japan ICT Fair.',
			metrics: [
				{ label: 'FORUM', value: 'Thailand × Japan', icon: '🏛' },
				{ label: 'DOMAIN', value: 'IoT & Sensors', icon: '⚙' }
			],
			tags: ['Embedded Systems', 'IoT Hardware', 'Research Paper', 'Sensors'],
			githubUrl: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#p=125',
			links: [
				{
					label: 'Report (Page 125)',
					url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137'
				}
			]
		},
		{
			id: '03',
			title: 'Portable Hybrid Swarm Cluster',
			typeGlyph: '🖥',
			category: 'DEVOPS // CLUSTER',
			year: '2024',
			status: 'FEAT',
			statusLabel: 'ARCHITECTURE',
			summary:
				'Resilient multi-node hybrid x86/ARM Docker Swarm edge cluster with automated failover & proxying.',
			metrics: [
				{ label: 'NODES', value: 'x86_64 + ARM64', icon: '◈' },
				{ label: 'TARGET', value: 'Edge Homelab', icon: '🔒' }
			],
			tags: ['Docker Swarm', 'Homelab', 'Reverse Proxy', 'Linux'],
			githubUrl: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster',
			links: [
				{
					label: 'GitHub Documentation',
					url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster'
				}
			]
		},
		{
			id: '04',
			title: 'Study-Schedule',
			typeGlyph: '🎨',
			category: 'TOOLING // WEB',
			year: '2024',
			status: 'OSS',
			statusLabel: 'RELEASED',
			summary:
				'Interactive schedule timetable designer with high-resolution 4K wallpaper rendering engine.',
			metrics: [
				{ label: 'EXPORT', value: 'Phone & Desktop 4K', icon: '🖼' },
				{ label: 'ENGINE', value: 'HTML5 Canvas', icon: '⚡' }
			],
			tags: ['Svelte', 'TypeScript', 'Web Canvas', 'Responsive UI'],
			githubUrl: 'https://github.com/PLATONG34821/Study-Schedule',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/Study-Schedule'
				}
			]
		},
		{
			id: '05',
			title: 'pt-chord',
			typeGlyph: '🎸',
			category: 'AUDIO // MUSIC',
			year: '2024',
			status: 'OSS',
			statusLabel: 'RELEASED',
			summary:
				'Real-time guitar chord voicing visualizer with music theory transposition and dynamic SVG fretboards.',
			metrics: [
				{ label: 'VOICING', value: 'Real-time Theory', icon: '♩' },
				{ label: 'RENDER', value: 'Reactive SVG', icon: '⚡' }
			],
			tags: ['Svelte', 'Music Theory', 'SVG Engine', 'Web Audio'],
			githubUrl: 'https://github.com/PLATONG34821/pt-chord',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/pt-chord'
				}
			]
		},
		{
			id: '06',
			title: 'Project-DSM',
			typeGlyph: '🚗',
			category: 'IOT // TELEMETRY',
			year: '2024',
			status: 'FEAT',
			statusLabel: 'TELEMETRY',
			summary:
				'Vehicle telemetry & driver behavior analytics application engineered for smart passenger safety.',
			metrics: [
				{ label: 'SENSORS', value: 'Real-time GPS', icon: '📡' },
				{ label: 'PURPOSE', value: 'Road Safety', icon: '🛡' }
			],
			tags: ['JavaScript', 'IoT Telemetry', 'Sensors', 'Fullstack'],
			githubUrl: 'https://github.com/PLATONG34821/Project-DSM',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/Project-DSM'
				}
			]
		},
		{
			id: '07',
			title: 'Damrong Student Council Web',
			typeGlyph: '🏛',
			category: 'PORTAL // WEB',
			year: '2023',
			status: 'PROD',
			statusLabel: 'OFFICIAL',
			summary:
				'Official web portal and activity system developed for Damrongratsongkroh School student council.',
			metrics: [
				{ label: 'ORG', value: 'Damrong School', icon: '🏫' },
				{ label: 'ROLE', value: 'Lead Webmaster', icon: '👨‍💻' }
			],
			tags: ['Svelte', 'School Portal', 'UI/UX', 'Frontend'],
			githubUrl: 'https://github.com/PLATONG34821/damrong_pitakphong',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/damrong_pitakphong'
				}
			]
		},
		{
			id: '08',
			title: 'PT-Story & Server Ecosystem',
			typeGlyph: '🎮',
			category: 'SYSTEMS // SERVER',
			year: '2024',
			status: 'OSS',
			statusLabel: 'PRODUCTION',
			summary:
				'High-concurrency Minecraft server quest, warp, and automated security plugin suite for community play.',
			metrics: [
				{ label: 'RUNTIME', value: 'PaperMC 1.20.4', icon: '☕' },
				{ label: 'PIPELINE', value: 'Async Concurrency', icon: '⚡' }
			],
			tags: ['Java', 'PaperMC API', 'Async Concurrency', 'Multiplayer'],
			githubUrl: 'https://github.com/PLATONG34821/PT-Story',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/PT-Story'
				}
			]
		}
	];

	const skills = [
		{ name: 'Svelte 5 / SvelteKit', category: 'Frontend & UI Frameworks', status: 'SYS_OK' },
		{ name: 'TypeScript / JavaScript', category: 'Fullstack Web Architecture', status: 'SYS_OK' },
		{ name: 'Docker / Docker Swarm', category: 'DevOps & Homelab Clusters', status: 'SYS_OK' },
		{ name: 'Astro / Static Sites', category: 'Modern Web Architecture', status: 'SYS_OK' },
		{ name: 'Java / PaperMC API', category: 'Game Server Engineering', status: 'SYS_OK' },
		{ name: 'Python / Scripting', category: 'Automation & Hardware Tools', status: 'SYS_OK' }
	];
</script>

<!-- Fixed top gradient curtain that progressively masks cards top-first as they scroll up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- Projects TUI Grid -->
		<div class="projects-grid">
			{#each projects as project (project.id)}
				<div class="tui-card">
					<!-- Card Header: ID + Category & Status LED -->
					<div class="tui-card-topbar">
						<div class="tui-card-id">
							<span class="tui-glyph">{project.typeGlyph}</span>
							<span class="tui-id-num">#{project.id}</span>
							<span class="tui-category">{project.category}</span>
						</div>
						<div
							class="tui-card-status"
							class:prod={project.status === 'PROD'}
							class:research={project.status === 'RESEARCH'}
							class:feat={project.status === 'FEAT'}
						>
							<span class="tui-status-dot">●</span>
							<span class="tui-status-label">{project.year} • {project.statusLabel}</span>
						</div>
					</div>

					<!-- Title -->
					<div class="tui-title-row">
						<h3 class="tui-project-title">
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a
								href={project.githubUrl}
								target="_blank"
								rel="external noreferrer"
								class="tui-title-link"
							>
								{project.title}
								<span class="tui-arrow">↗</span>
							</a>
						</h3>
					</div>

					<!-- Visual Telemetry / Metric Readout Boxes -->
					<div class="tui-metric-grid">
						{#each project.metrics as metric (metric.label)}
							<div class="tui-metric-box">
								<span class="tui-m-label">{metric.icon || '◈'} {metric.label}</span>
								<span class="tui-m-val">{metric.value}</span>
							</div>
						{/each}
					</div>

					<!-- Concise Summary Pitch -->
					<p class="tui-desc">{project.summary}</p>

					<!-- Footer: Tech Stack Chips & Action Command Buttons -->
					<div class="tui-card-footer">
						<div class="tui-tags-list">
							{#each project.tags as tag (tag)}
								<span class="tui-tag">
									<span class="tui-tag-dot">·</span>{tag}
								</span>
							{/each}
						</div>

						{#if project.links && project.links.length > 0}
							<div class="tui-links-list">
								{#each project.links as link (link.url)}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a href={link.url} target="_blank" rel="external noreferrer" class="tui-btn">
										<span class="tui-btn-prefix">&gt;</span>
										<span class="tui-btn-text">{link.label}</span>
										<span class="tui-btn-arrow">↗</span>
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Capabilities / Skills TUI Matrix -->
		<div class="skills-wrapper" id="skills">
			<div class="skills-grid">
				{#each skills as skill (skill.name)}
					<div class="tui-skill-box">
						<div class="tui-skill-top">
							<span class="tui-skill-prefix">&gt;</span>
							<span class="tui-skill-name">{skill.name}</span>
							<span class="tui-skill-status">[{skill.status}]</span>
						</div>
						<div class="tui-skill-meta">
							<span class="tui-skill-cat">{skill.category}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- TUI Session Status Footer -->
		<div class="portfolio-footer">
			<div class="tui-footer-box">
				<div class="tui-footer-line">
					<span class="tui-f-item">[ SESSION: THANAPHUM@PORTFOLIO ]</span>
					<span class="tui-f-item">[ YEAR: {new Date().getFullYear()} ]</span>
					<span class="tui-f-item">[ ARCH: SVELTE 5 ]</span>
				</div>
				<div class="tui-footer-links">
					<a
						href="https://github.com/PLATONG34821"
						target="_blank"
						rel="external noreferrer"
						class="tui-footer-btn"
					>
						[&gt; GITHUB.COM/PLATONG34821 ↗]
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Global Monospace & TUI Base */
	.top-fade-curtain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 220px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 180px,
			rgba(0, 0, 0, 0.85) 200px,
			rgba(0, 0, 0, 0.35) 220px,
			transparent 220px
		);
		pointer-events: none;
		z-index: 40;
	}

	.experience-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #000000;
		color: #e2e8f0;
		padding: 7rem 1.5rem 24rem;
		z-index: 10;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.experience-section.is-revealed {
		opacity: 1;
		pointer-events: auto;
	}

	.content-container {
		max-width: 1160px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	/* TUI Project Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1.5rem;
	}

	/* TUI Card Box */
	.tui-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #090b10;
		border: 1px solid #1a2333;
		border-radius: 6px;
		padding: 1.35rem 1.45rem;
		gap: 0.85rem;
		position: relative;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}

	.tui-card:hover {
		border-color: #38bdf8;
		background: #0d121c;
		transform: translateY(-2px);
		box-shadow:
			0 8px 24px -8px rgba(56, 189, 248, 0.2),
			inset 0 0 0 1px rgba(56, 189, 248, 0.15);
	}

	/* Top Bar in Card */
	.tui-card-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 1px dashed #1a2333;
		padding-bottom: 0.65rem;
	}

	.tui-card-id {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.74rem;
	}

	.tui-glyph {
		font-size: 0.9rem;
	}

	.tui-id-num {
		color: #38bdf8;
		font-weight: 700;
	}

	.tui-category {
		color: #94a3b8;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	.tui-card-status {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.7rem;
		color: #94a3b8;
		background: rgba(255, 255, 255, 0.03);
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.tui-status-dot {
		font-size: 0.65rem;
		color: #64748b;
	}

	.tui-card-status.prod {
		color: #34d399;
		border-color: rgba(16, 185, 129, 0.25);
		background: rgba(16, 185, 129, 0.08);
	}

	.tui-card-status.prod .tui-status-dot {
		color: #10b981;
		text-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
	}

	.tui-card-status.research {
		color: #c084fc;
		border-color: rgba(168, 85, 247, 0.25);
		background: rgba(168, 85, 247, 0.08);
	}

	.tui-card-status.research .tui-status-dot {
		color: #a855f7;
		text-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
	}

	.tui-card-status.feat {
		color: #60a5fa;
		border-color: rgba(59, 130, 246, 0.25);
		background: rgba(59, 130, 246, 0.08);
	}

	.tui-card-status.feat .tui-status-dot {
		color: #3b82f6;
		text-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
	}

	/* Title */
	.tui-title-row {
		margin-top: 0.1rem;
	}

	.tui-project-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
		letter-spacing: -0.01em;
	}

	.tui-title-link {
		color: #ffffff;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		transition: color 0.2s ease;
	}

	.tui-title-link:hover {
		color: #38bdf8;
	}

	.tui-arrow {
		font-size: 1.05rem;
		color: #64748b;
		transition:
			color 0.2s ease,
			transform 0.2s ease;
	}

	.tui-title-link:hover .tui-arrow {
		color: #38bdf8;
		transform: translate(2px, -2px);
	}

	/* Visual Telemetry Metric Grid */
	.tui-metric-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.tui-metric-box {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		background: #05070a;
		border: 1px solid #141c2b;
		border-radius: 4px;
		padding: 0.45rem 0.65rem;
	}

	.tui-m-label {
		font-size: 0.68rem;
		color: #64748b;
		letter-spacing: 0.06em;
		font-weight: 600;
	}

	.tui-m-val {
		font-size: 0.82rem;
		color: #e2e8f0;
		font-weight: 600;
	}

	/* Description */
	.tui-desc {
		font-size: 0.87rem;
		line-height: 1.55;
		color: #94a3b8;
		margin: 0;
		flex-grow: 1;
	}

	/* Footer: Tech & Exec */
	.tui-card-footer {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.85rem;
		border-top: 1px solid #141c2b;
	}

	.tui-tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tui-tag {
		color: #94a3b8;
		background: #0d121c;
		border: 1px solid #1a2333;
		padding: 0.15rem 0.45rem;
		border-radius: 3px;
		font-size: 0.72rem;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	.tui-tag-dot {
		color: #38bdf8;
		font-weight: 700;
	}

	.tui-links-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.tui-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: #091424;
		border: 1px solid #1e3a5f;
		color: #38bdf8;
		padding: 0.22rem 0.6rem;
		border-radius: 3px;
		text-decoration: none;
		font-size: 0.74rem;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.tui-btn:hover {
		background: #1e3a5f;
		color: #ffffff;
		border-color: #38bdf8;
	}

	.tui-btn-prefix {
		color: #22c55e;
	}

	.tui-btn-arrow {
		font-size: 0.85rem;
	}

	/* Capabilities / Skills Section */
	.skills-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 1rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.tui-skill-box {
		background: #080a0f;
		border: 1px solid #1e293b;
		border-radius: 4px;
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		transition: border-color 0.2s ease;
	}

	.tui-skill-box:hover {
		border-color: #38bdf8;
		background: #0c1018;
	}

	.tui-skill-top {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tui-skill-prefix {
		color: #22c55e;
		font-weight: 700;
	}

	.tui-skill-name {
		font-weight: 700;
		font-size: 0.98rem;
		color: #ffffff;
		flex-grow: 1;
	}

	.tui-skill-status {
		font-size: 0.72rem;
		color: #34d399;
		font-weight: 600;
	}

	.tui-skill-meta {
		padding-left: 1.1rem;
		font-size: 0.75rem;
		color: #64748b;
	}

	/* Footer */
	.portfolio-footer {
		padding-top: 2rem;
	}

	.tui-footer-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		background: #07090e;
		border: 1px solid #1e293b;
		border-radius: 6px;
		padding: 1.1rem 1.5rem;
		font-size: 0.8rem;
	}

	.tui-footer-line {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		color: #64748b;
	}

	.tui-footer-btn {
		color: #38bdf8;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.tui-footer-btn:hover {
		color: #ffffff;
	}
</style>
