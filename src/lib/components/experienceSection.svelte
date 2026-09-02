<script lang="ts">
	interface ProjectLink {
		label: string;
		url: string;
	}

	interface Project {
		title: string;
		description: string;
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
			title: 'HLLC 2026 Platform',
			description:
				'Core developer for Mae Fah Luang University’s How to Live and Learn on Campus 2026 (HLLC 2026) ecosystem, facilitating orientation, live scheduling, and activity management for 4,400+ freshmen students.',
			tags: ['SvelteKit', 'TypeScript', 'iOS / Android', 'Production'],
			githubUrl: 'https://apps.apple.com/th/app/hllc/id6748238190',
			category: 'Campus Web App & Production',
			links: [
				{ label: 'App Store', url: 'https://apps.apple.com/th/app/hllc/id6748238190' },
				{
					label: 'Google Play',
					url: 'https://play.google.com/store/apps/details?id=com.hllc.mfuactivity&hl=en'
				},
				{
					label: 'Instagram Highlights',
					url: 'https://www.instagram.com/mfu_activities/p/Da1msGcCV8-/'
				}
			]
		},
		{
			title: 'TJ-SIF 2022 Innovation',
			description:
				'Student ICT researcher and presenter representing Damrongratsongkroh School at the Thailand-Japan Student ICT Fair 2022 (TJ-SIF 2022).',
			tags: ['ICT Innovation', 'Research', 'Embedded / IoT', 'International Fair'],
			githubUrl: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#p=125',
			category: 'International ICT Fair',
			links: [
				{
					label: 'Report (Page 125)',
					url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137'
				}
			]
		},
		{
			title: 'Study-Schedule',
			description:
				'Interactive study schedule editor and responsive phone/desktop wallpaper generator built for student productivity.',
			tags: ['Svelte', 'TypeScript', 'Web Canvas', 'UI/UX'],
			githubUrl: 'https://github.com/PLATONG34821/Study-Schedule',
			category: 'Web App & Tool'
		},
		{
			title: 'Portable Hybrid Swarm Cluster',
			description:
				'Full project documentation and infrastructure architecture of a portable hybrid-architecture Docker Swarm cluster for edge computing.',
			tags: ['Docker Swarm', 'Homelab', 'Networking', 'DevOps'],
			githubUrl: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster',
			category: 'DevOps & Systems'
		},
		{
			title: 'pt-chord',
			description:
				'Fast and intuitive web application designed for looking up guitar chord fingerings and musical voicings.',
			tags: ['Svelte', 'Music Theory', 'Interactive UI', 'Frontend'],
			githubUrl: 'https://github.com/PLATONG34821/pt-chord',
			category: 'Interactive Web'
		},
		{
			title: 'Project-DSM',
			description:
				'Smart road safety application engineered to monitor driving metrics and keep drivers and passengers safe on journeys.',
			tags: ['JavaScript', 'Road Safety', 'Sensors', 'Fullstack'],
			githubUrl: 'https://github.com/PLATONG34821/Project-DSM',
			category: 'Safety & Web Tech'
		},
		{
			title: 'Damrong Student Council Web',
			description:
				'Official school student council portal and activity management platform developed for Damrongratsongkroh School.',
			tags: ['Svelte', 'School Council', 'Web Portal', 'Frontend'],
			githubUrl: 'https://github.com/PLATONG34821/damrong_pitakphong',
			category: 'School Portal & Web'
		},
		{
			title: 'PT-Story & Server Ecosystem',
			description:
				'Story quest progression and server management plugin suite engineered for high-performance PaperMC Minecraft server infrastructure.',
			tags: ['Java', 'PaperMC', 'Server Architecture', 'Plugins'],
			githubUrl: 'https://github.com/PLATONG34821/PT-Story',
			category: 'Server Engineering'
		}
	];

	const skills = [
		{ name: 'Svelte 5 / SvelteKit', category: 'Frontend & UI Frameworks' },
		{ name: 'TypeScript / JavaScript', category: 'Fullstack Web' },
		{ name: 'Docker / Docker Swarm', category: 'DevOps & Homelab Clusters' },
		{ name: 'Astro / Static Sites', category: 'Modern Web Architecture' },
		{ name: 'Java / PaperMC API', category: 'Game Server Engineering' },
		{ name: 'Python / Scripting', category: 'Automation & Tools' }
	];
</script>

<!-- Fixed top gradient curtain that progressively masks cards top-first as they scroll up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- Projects Grid -->
		<div class="projects-grid">
			{#each projects as project (project.title)}
				<div class="project-card">
					<div class="card-header">
						<span class="project-category">{project.category}</span>
						{#if project.stars}
							<span class="project-stars">★ {project.stars}</span>
						{/if}
					</div>

					<h3 class="project-title">
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a
							href={project.githubUrl}
							target="_blank"
							rel="external noreferrer"
							class="title-link"
						>
							{project.title}
							<span class="card-arrow">↗</span>
						</a>
					</h3>
					<p class="project-desc">{project.description}</p>

					<div class="project-footer">
						<div class="tags-list">
							{#each project.tags as tag (tag)}
								<span class="tag-pill">{tag}</span>
							{/each}
						</div>

						{#if project.links && project.links.length > 0}
							<div class="project-links-group">
								{#each project.links as link (link.url)}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a href={link.url} target="_blank" rel="external noreferrer" class="link-pill">
										{link.label} ↗
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Skills & Tech Overview -->
		<div class="skills-wrapper" id="skills">
			<div class="skills-header">
				<span class="section-label">02 // CAPABILITIES</span>
			</div>

			<div class="skills-grid">
				{#each skills as skill (skill.name)}
					<div class="skill-card">
						<span class="skill-name">{skill.name}</span>
						<span class="skill-category">{skill.category}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Footer Contact -->
		<div class="portfolio-footer">
			<div class="footer-left">
				<span class="footer-name">THANAPHUM</span>
				<span class="footer-copy">© {new Date().getFullYear()} — Open Source Portfolio</span>
			</div>
			<div class="footer-links">
				<a
					href="https://github.com/PLATONG34821"
					target="_blank"
					rel="external noreferrer"
					class="footer-link">GitHub ↗</a
				>
			</div>
		</div>
	</div>
</section>

<style>
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
		color: #ededed;
		padding: 7rem 1.5rem 22rem;
		z-index: 10;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.experience-section.is-revealed {
		opacity: 1;
		pointer-events: auto;
	}

	.content-container {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	.section-label {
		font-family: ui-monospace, 'SF Mono', Menlo, monospace;
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		color: #64748b;
		text-transform: uppercase;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #09090b;
		border: 1px solid #1e293b;
		border-radius: 8px;
		padding: 1.75rem;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.project-card:hover {
		border-color: #475569;
		background: #10141e;
		transform: translateY(-2px);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.project-category {
		font-family: ui-monospace, monospace;
		font-size: 0.72rem;
		color: #64748b;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.project-stars {
		font-family: ui-monospace, monospace;
		font-size: 0.78rem;
		color: #fbbf24;
		font-weight: 600;
	}

	.project-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #f8fafc;
		margin-bottom: 0.75rem;
		letter-spacing: -0.01em;
	}

	.title-link {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		transition: color 0.2s ease;
	}

	.title-link:hover {
		color: #38bdf8;
	}

	.project-desc {
		font-size: 0.92rem;
		line-height: 1.55;
		color: #94a3b8;
		margin-bottom: 1.5rem;
		flex-grow: 1;
	}

	.project-footer {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding-top: 1rem;
		border-top: 1px solid #18181b;
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag-pill {
		font-family: ui-monospace, monospace;
		font-size: 0.7rem;
		background: #18181b;
		color: #cbd5e1;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		border: 1px solid #27272a;
	}

	.project-links-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.link-pill {
		font-family: ui-monospace, monospace;
		font-size: 0.72rem;
		background: rgba(56, 189, 248, 0.08);
		color: #38bdf8;
		border: 1px solid rgba(56, 189, 248, 0.25);
		padding: 0.22rem 0.55rem;
		border-radius: 4px;
		text-decoration: none;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	.link-pill:hover {
		background: rgba(56, 189, 248, 0.2);
		color: #7dd3fc;
		border-color: rgba(56, 189, 248, 0.5);
	}

	.card-arrow {
		font-size: 1.1rem;
		color: #64748b;
		transition:
			color 0.2s ease,
			transform 0.2s ease;
	}

	.title-link:hover .card-arrow {
		color: #38bdf8;
		transform: translate(2px, -2px);
	}

	.skills-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-top: 2rem;
	}

	.skills-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
	}

	.skill-card {
		background: #09090b;
		border: 1px solid #1e293b;
		border-radius: 6px;
		padding: 1.2rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.skill-name {
		font-weight: 600;
		font-size: 0.98rem;
		color: #f1f5f9;
	}

	.skill-category {
		font-family: ui-monospace, monospace;
		font-size: 0.72rem;
		color: #64748b;
	}

	.portfolio-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 3rem;
		border-top: 1px solid #1e293b;
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.footer-name {
		font-family: ui-monospace, monospace;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #ffffff;
	}

	.footer-copy {
		font-size: 0.8rem;
		color: #64748b;
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
	}

	.footer-link {
		font-family: ui-monospace, monospace;
		font-size: 0.85rem;
		color: #94a3b8;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: #ffffff;
	}
</style>
