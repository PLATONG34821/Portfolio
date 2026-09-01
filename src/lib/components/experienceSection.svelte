<script lang="ts">
	interface Project {
		title: string;
		description: string;
		tags: string[];
		githubUrl: string;
		stars?: number;
		category: string;
	}

	const projects: Project[] = [
		{
			title: 'The Hive Scoreboard',
			description:
				'Custom scoreboard UI and texture pack for The Hive Minecraft server, enhancing in-game readability and HUD aesthetics.',
			tags: ['Minecraft Bedrock', 'UI Design', 'Texture Pack'],
			githubUrl: 'https://github.com/PLATONG98/The-Hive-Scoreboard',
			stars: 17,
			category: 'Game UI & Modifications'
		},
		{
			title: 'CubeCraft Scoreboard',
			description:
				'High-clarity scoreboard interface and texture modification tailored for CubeCraft Games server community.',
			tags: ['Minecraft Bedrock', 'HUD Pack', 'Community'],
			githubUrl: 'https://github.com/PLATONG98/CubeCraft-Scoreboard',
			stars: 4,
			category: 'Game UI & Modifications'
		},
		{
			title: 'QR & Color Tracking Robot',
			description:
				'Autonomous robotics project using Raspberry Pi, OpenCV computer vision, motor controllers, and camera feeds to track color targets and QR identifiers.',
			tags: ['Python', 'OpenCV', 'Raspberry Pi', 'Robotics'],
			githubUrl: 'https://github.com/PLATONG98/QR-Color-Following',
			category: 'Hardware & Computer Vision'
		},
		{
			title: 'Discord Music Bot (Wokkibot)',
			description:
				'Feature-rich audio streaming Discord bot supporting Spotify, YouTube, and SoundCloud playback with web dashboard controls.',
			tags: ['JavaScript', 'Discord.js', 'Web Audio', 'Go'],
			githubUrl: 'https://github.com/PLATONG98/Discord-MusicBot',
			category: 'Backend & Bot Architecture'
		},
		{
			title: 'Bedrock Emotes Library',
			description:
				'Packet-level exploration and comprehensive collection of Bedrock Edition emote UUIDs analyzed via gophertunnel.',
			tags: ['Protocol Analysis', 'Go', 'Gophertunnel'],
			githubUrl: 'https://github.com/PLATONG98/bedrock-emotes',
			category: 'Reverse Engineering & Protocol'
		},
		{
			title: 'FixTime PocketMine Plugin',
			description:
				'Timezone management and server synchronization plugin for high-concurrency PocketMine-MP Minecraft servers.',
			tags: ['PHP', 'PocketMine-MP', 'Server Plugin'],
			githubUrl: 'https://github.com/PLATONG98/FixTime',
			stars: 1,
			category: 'Server Engineering'
		}
	];

	const skills = [
		{ name: 'TypeScript / JavaScript', category: 'Frontend & Fullstack' },
		{ name: 'Svelte 5 / SvelteKit', category: 'Frontend' },
		{ name: 'Python / OpenCV', category: 'Computer Vision & Scripting' },
		{ name: 'Go / Protocol Engineering', category: 'Systems & Tools' },
		{ name: 'PHP / PocketMine', category: 'Backend & Plugins' },
		{ name: 'Raspberry Pi / Embedded', category: 'Hardware' }
	];
</script>

<!-- Fixed top gradient curtain that progressively masks cards top-first as they scroll up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" id="experience">
	<div class="content-container">
		<!-- Projects Grid -->
		<div class="projects-grid">
			{#each projects as project (project.title)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={project.githubUrl} target="_blank" rel="external noreferrer" class="project-card">
					<div class="card-header">
						<span class="project-category">{project.category}</span>
						{#if project.stars}
							<span class="project-stars">★ {project.stars}</span>
						{/if}
					</div>

					<h3 class="project-title">{project.title}</h3>
					<p class="project-desc">{project.description}</p>

					<div class="project-footer">
						<div class="tags-list">
							{#each project.tags as tag (tag)}
								<span class="tag-pill">{tag}</span>
							{/each}
						</div>
						<span class="card-arrow">↗</span>
					</div>
				</a>
			{/each}
		</div>

		<!-- Skills & Tech Overview -->
		<div class="skills-wrapper">
			<div class="skills-header">
				<span class="section-label">02 // CAPABILITIES</span>
				<h2 class="section-title">Technical Skills</h2>
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
					href="https://github.com/PLATONG98"
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
		padding: 2.5rem 1.5rem 6rem;
		z-index: 10;
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

	.section-title {
		font-size: clamp(1.8rem, 3.5vw, 2.8rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: #ffffff;
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
		text-decoration: none;
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

	.project-desc {
		font-size: 0.92rem;
		line-height: 1.55;
		color: #94a3b8;
		margin-bottom: 1.5rem;
		flex-grow: 1;
	}

	.project-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
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

	.card-arrow {
		font-size: 1.1rem;
		color: #64748b;
		transition:
			color 0.2s ease,
			transform 0.2s ease;
	}

	.project-card:hover .card-arrow {
		color: #ffffff;
		transform: translate(2px, -2px);
	}

	.skills-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
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
