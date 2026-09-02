<script lang="ts">
	interface ProjectLink {
		label: string;
		url: string;
	}

	interface Project {
		id: string;
		title: string;
		description: string;
		role: string;
		year: string;
		highlight?: string;
		status: 'PROD' | 'FEAT' | 'RESEARCH' | 'OSS';
		tags: string[];
		githubUrl: string;
		stars?: number;
		category: string;
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
			category: 'CAMPUS_APP // PRODUCTION',
			year: '2026',
			role: 'Core Developer // Mae Fah Luang University',
			highlight: '4,400+ Active Freshmen Users',
			status: 'PROD',
			description:
				'Architected and developed the official orientation and activity management ecosystem for Mae Fah Luang University (HLLC 2026), handling high-concurrency event check-ins, live scheduling, and campus onboarding.',
			tags: ['SvelteKit', 'TypeScript', 'High Concurrency', 'iOS / Android', 'REST API'],
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
			category: 'RESEARCH // ICT_FAIR',
			year: '2022',
			role: 'ICT Researcher & Presenter // Damrongratsongkroh',
			highlight: 'Thailand-Japan ICT Fair Presentation',
			status: 'RESEARCH',
			description:
				'Selected student researcher representing Damrongratsongkroh School to present ICT innovation and embedded hardware systems at the international Thailand-Japan Student ICT Fair 2022.',
			tags: ['Embedded Systems', 'Hardware / IoT', 'Research Paper', 'Sensors'],
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
			category: 'DEVOPS // INFRASTRUCTURE',
			year: '2024',
			role: 'Homelab & Infrastructure Engineer',
			highlight: 'Multi-Arch x86/ARM Edge Cluster',
			status: 'FEAT',
			description:
				'Complete architectural blueprint and deployment documentation for a portable hybrid-architecture Docker Swarm cluster engineered for resilient edge computing and distributed services.',
			tags: ['Docker Swarm', 'Homelab', 'Networking', 'Reverse Proxy', 'Linux'],
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
			category: 'WEB_APP // PRODUCTIVITY',
			year: '2024',
			role: 'Fullstack Web Developer',
			highlight: 'Dynamic Canvas Wallpaper Engine',
			status: 'OSS',
			description:
				'Interactive study timetable designer and responsive wallpaper generator allowing students to customize schedules and export high-resolution phone and desktop lockscreen backgrounds.',
			tags: ['Svelte', 'TypeScript', 'Web Canvas', 'Responsive UI', 'Tooling'],
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
			category: 'AUDIO // MUSIC_THEORY',
			year: '2024',
			role: 'Frontend Creator',
			highlight: 'Interactive Fretboard Engine',
			status: 'OSS',
			description:
				'Fast and intuitive web application designed for interactive guitar chord fingering lookups, musical voicings, and real-time fretboard diagram generation.',
			tags: ['Svelte', 'Music Theory', 'SVG Rendering', 'Web Audio', 'Frontend'],
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
			category: 'IOT // ROAD_SAFETY',
			year: '2024',
			role: 'IoT & Web Developer',
			highlight: 'Driver Telemetry & Safety Metrics',
			status: 'FEAT',
			description:
				'Smart road safety web application engineered to monitor vehicle metrics, analyze driving behavior in real-time, and ensure passenger security across every journey.',
			tags: ['JavaScript', 'IoT Telemetry', 'Sensors', 'Fullstack', 'Safety'],
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
			category: 'PORTAL // WEB_PLATFORM',
			year: '2023',
			role: 'Lead Web Developer // Student Council',
			highlight: 'Official Council Platform',
			status: 'PROD',
			description:
				'Official web portal and activity platform developed for Damrongratsongkroh School student council, facilitating announcements, election info, and school event coverage.',
			tags: ['Svelte', 'School Portal', 'UI/UX', 'Content Delivery', 'Frontend'],
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
			category: 'GAME_SERVER // SYSTEMS',
			year: '2024',
			role: 'Plugin Architect & Developer',
			highlight: 'PaperMC 1.20.4 High Concurrency',
			status: 'OSS',
			description:
				'Core story quest progression, teleportation routing, and server management plugin suite engineered for high-concurrency PaperMC Minecraft multiplayer infrastructure.',
			tags: ['Java', 'PaperMC API', 'Async Concurrency', 'Server Infrastructure'],
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
					<!-- Card Header Box -->
					<div class="tui-card-topbar">
						<div class="tui-card-id">
							<span class="tui-bracket">[</span>
							<span class="tui-id-num">{project.id}</span>
							<span class="tui-category">{project.category}</span>
							<span class="tui-bracket">]</span>
						</div>
						<div
							class="tui-card-status"
							class:prod={project.status === 'PROD'}
							class:research={project.status === 'RESEARCH'}
							class:feat={project.status === 'FEAT'}
						>
							<span class="tui-status-dot">●</span>
							<span class="tui-status-label">{project.year} • {project.status}</span>
						</div>
					</div>

					<!-- Title Bar -->
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

					<!-- Meta Fields Table -->
					<div class="tui-meta-table">
						<div class="tui-meta-row">
							<span class="tui-meta-key">ROLE</span>
							<span class="tui-meta-sep">:</span>
							<span class="tui-meta-val">{project.role}</span>
						</div>
						{#if project.highlight}
							<div class="tui-meta-row highlight">
								<span class="tui-meta-key">METRIC</span>
								<span class="tui-meta-sep">:</span>
								<span class="tui-meta-val highlight-val">✦ {project.highlight}</span>
							</div>
						{/if}
					</div>

					<!-- TUI Divider -->
					<div class="tui-card-divider">
						<span class="tui-div-line"></span>
					</div>

					<!-- Description -->
					<p class="tui-desc">{project.description}</p>

					<!-- Footer: Tech Tags & Execution Commands -->
					<div class="tui-card-footer">
						<div class="tui-tech-row">
							<span class="tui-tech-label">TECH:</span>
							<div class="tui-tags-list">
								{#each project.tags as tag (tag)}
									<span class="tui-tag">[{tag}]</span>
								{/each}
							</div>
						</div>

						{#if project.links && project.links.length > 0}
							<div class="tui-exec-row">
								<span class="tui-exec-label">EXEC:</span>
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
		max-width: 1140px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 4.5rem;
	}

	/* TUI Project Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1.75rem;
	}

	/* TUI Card Box */
	.tui-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #080a0f;
		border: 1px solid #1e293b;
		border-radius: 6px;
		padding: 1.4rem 1.5rem;
		gap: 0.9rem;
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
		background: #0c1018;
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
		border-bottom: 1px dashed #1e293b;
		padding-bottom: 0.65rem;
	}

	.tui-card-id {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.74rem;
	}

	.tui-bracket {
		color: #475569;
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
		font-size: 0.72rem;
		color: #94a3b8;
	}

	.tui-status-dot {
		font-size: 0.65rem;
		color: #64748b;
	}

	.tui-card-status.prod {
		color: #34d399;
	}

	.tui-card-status.prod .tui-status-dot {
		color: #10b981;
		text-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
	}

	.tui-card-status.research {
		color: #c084fc;
	}

	.tui-card-status.research .tui-status-dot {
		color: #a855f7;
		text-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
	}

	.tui-card-status.feat {
		color: #60a5fa;
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
		font-size: 1.22rem;
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

	/* Meta Fields */
	.tui-meta-table {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.78rem;
		background: #04060a;
		border: 1px solid #141b2a;
		border-radius: 4px;
		padding: 0.55rem 0.75rem;
	}

	.tui-meta-row {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.tui-meta-key {
		color: #64748b;
		font-weight: 600;
		min-width: 58px;
		letter-spacing: 0.05em;
	}

	.tui-meta-sep {
		color: #334155;
	}

	.tui-meta-val {
		color: #cbd5e1;
		line-height: 1.4;
	}

	.tui-meta-row.highlight .tui-meta-key {
		color: #38bdf8;
	}

	.highlight-val {
		color: #38bdf8;
		font-weight: 600;
	}

	/* Description */
	.tui-card-divider {
		height: 1px;
		border-top: 1px dashed #141b2a;
	}

	.tui-desc {
		font-size: 0.88rem;
		line-height: 1.6;
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
		border-top: 1px solid #141b2a;
	}

	.tui-tech-row,
	.tui-exec-row {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.75rem;
	}

	.tui-tech-label,
	.tui-exec-label {
		color: #64748b;
		font-weight: 700;
		min-width: 44px;
		letter-spacing: 0.05em;
		padding-top: 0.15rem;
	}

	.tui-tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tui-tag {
		color: #94a3b8;
		background: #0f1422;
		border: 1px solid #1e293b;
		padding: 0.12rem 0.45rem;
		border-radius: 3px;
		font-size: 0.72rem;
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
		background: #0b1526;
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
		gap: 1.75rem;
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
