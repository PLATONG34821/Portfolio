<script lang="ts">
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import TuiModal from '$lib/components/tui/tuiModal.svelte';
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import ProjectEntry from './projectEntry.svelte';
	import AwardEntry from './awardEntry.svelte';
	import { coreProjects, ossProjects, awards } from '$lib/data/experienceData';

	// Modal State for viewing high-res certificates and exhibition photos
	let activeCertModal: { title: string; image: string } | null = $state(null);

	function openCert(title: string, image: string) {
		activeCertModal = { title, image };
	}

	function closeCert() {
		activeCertModal = null;
	}
</script>

<!-- Fixed top gradient curtain that progressively masks text as it scrolls up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" id="experience">
	<div class="content-container">
		<!-- SECTION 01: SELECTED PROJECTS & RECOGNITION (GOLD THEME) -->
		<div class="section-block" id="projects">
			<!-- Section Header: Tag at Top Right -->
			<SectionHeader
				tag="SECTION 01"
				title="EXPERIENCE & AWARDS"
				prefixColor="#785e2f"
				titleColor="#fbbf24"
				subColor="#71717a"
			/>

			<!-- TOP ROW: Symmetrical 2-Column Grid (Selected Projects & Awards) -->
			<div class="experience-symmetric-grid">
				<!-- COL 1: Selected Projects -->
				<TuiBox
					title="Selected Projects"
					titleColor="amber"
					borderColor="#382f1d"
					cornerColor="#785e2f"
					class="grid-box"
					bodyClass="grid-box-body"
				>
					<div class="projects-list">
						{#each coreProjects as project (project.id)}
							<ProjectEntry {project} onOpenCert={openCert} />
						{/each}
					</div>
				</TuiBox>

				<!-- COL 2: Awards & Honors -->
				<TuiBox
					title="Awards & Honors"
					titleColor="amber"
					borderColor="#382f1d"
					cornerColor="#785e2f"
					id="awards"
					class="grid-box"
					bodyClass="grid-box-body"
				>
					<div class="awards-subgrid">
						{#each awards as award (award.id)}
							<AwardEntry {award} onOpenCert={openCert} />
						{/each}
					</div>
				</TuiBox>
			</div>

			<!-- BOTTOM ROW: Open Source & Systems (Full Frame) -->
			<TuiBox
				title="Open Source & Systems"
				titleColor="amber"
				borderColor="#382f1d"
				cornerColor="#785e2f"
				class="full-frame-box"
				bodyClass="oss-full-body"
			>
				<div class="oss-subgrid">
					{#each ossProjects as project (project.id)}
						<ProjectEntry {project} onOpenCert={openCert} />
					{/each}
				</div>
			</TuiBox>
		</div>
	</div>
</section>

<!-- Sleek Pure TUI Modal / Lightbox -->
{#if activeCertModal}
	<TuiModal
		title={activeCertModal.title}
		image={activeCertModal.image}
		titleColor="amber"
		borderColor="#785e2f"
		cornerColor="#fbbf24"
		onClose={closeCert}
	/>
{/if}

<style>
	/* Global Monospace & TUI Environment */
	.top-fade-curtain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 320px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 32%,
			rgba(0, 0, 0, 0.95) 45%,
			rgba(0, 0, 0, 0.86) 56%,
			rgba(0, 0, 0, 0.72) 66%,
			rgba(0, 0, 0, 0.54) 76%,
			rgba(0, 0, 0, 0.36) 85%,
			rgba(0, 0, 0, 0.2) 92%,
			rgba(0, 0, 0, 0.08) 97%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
		user-select: none;
		-webkit-user-select: none;
		z-index: 40;
		transform: translateZ(0);
	}

	@media (max-width: 768px) {
		.top-fade-curtain {
			height: 200px;
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 1) 0%,
				rgba(0, 0, 0, 1) 30%,
				rgba(0, 0, 0, 0.95) 43%,
				rgba(0, 0, 0, 0.86) 54%,
				rgba(0, 0, 0, 0.72) 65%,
				rgba(0, 0, 0, 0.54) 75%,
				rgba(0, 0, 0, 0.36) 84%,
				rgba(0, 0, 0, 0.2) 92%,
				rgba(0, 0, 0, 0.08) 97%,
				rgba(0, 0, 0, 0) 100%
			);
		}
	}

	.experience-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #000000;
		color: #e5e7eb;
		padding: 21rem 1.5rem 3rem;
		z-index: 10;
		pointer-events: auto;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 960px) {
		.experience-section {
			padding: 16rem 1.25rem 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.experience-section {
			padding: 12rem 0.75rem 2rem;
		}
	}

	.content-container {
		max-width: 1180px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (max-width: 640px) {
		.content-container {
			gap: 1.25rem;
		}
	}

	.section-block {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	/* Symmetrical 2-Column Desktop Grid for Projects and Awards */
	.experience-symmetric-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.75rem;
		align-items: stretch;
	}

	@media (max-width: 960px) {
		.experience-symmetric-grid {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
	}

	:global(.grid-box) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	:global(.grid-box-body) {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: 100%;
	}

	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		height: 100%;
	}

	/* Awards Subgrid: Symmetrical 2-Column Cards */
	.awards-subgrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		height: 100%;
	}

	@media (max-width: 580px) {
		.awards-subgrid {
			grid-template-columns: 1fr;
		}
	}

	/* Full Frame Box: Open Source & Systems */
	:global(.full-frame-box) {
		width: 100%;
	}

	:global(.oss-full-body) {
		padding: 1.25rem 1.4rem;
	}

	@media (max-width: 640px) {
		:global(.oss-full-body) {
			padding: 0.85rem 0.75rem;
		}
	}

	/* OSS Subgrid: Full Frame 2-Column Responsive Grid */
	.oss-subgrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem 1.75rem;
	}

	@media (max-width: 768px) {
		.oss-subgrid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
