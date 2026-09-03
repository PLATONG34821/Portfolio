<script lang="ts">
	import TuiBox from './tuiBox.svelte';
	import TuiModal from './tuiModal.svelte';
	import ProjectEntry from './projectEntry.svelte';
	import AwardEntry from './awardEntry.svelte';
	import { coreProjects, ossProjects, awards } from '$lib/data/experienceData';

	interface Props {
		scrollProgress?: number;
	}

	let { scrollProgress = 0 }: Props = $props();

	// Modal State for viewing high-res certificates and exhibition photos
	let activeCertModal: { title: string; image: string } | null = $state(null);

	function openCert(title: string, image: string) {
		activeCertModal = { title, image };
	}

	function closeCert() {
		activeCertModal = null;
	}

	// In-place fade in as EXP finishes assembling and docks at top (scrollProgress >= 0.85)
	let isRevealed = $derived(scrollProgress >= 0.85);
</script>

<!-- Fixed top gradient curtain that progressively masks text as it scrolls up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- SECTION 01: SELECTED PROJECTS & RECOGNITION (GOLD THEME) -->
		<div class="section-block" id="projects">
			<!-- Section Header: Tag at Top Right -->
			<div class="section-header-row">
				<div class="section-tag-wrap">
					<span class="section-tag-prefix">//</span>
					<span class="section-tag-title">SECTION 01</span>
					<span class="section-tag-sub">EXPERIENCE & AWARDS</span>
				</div>
			</div>

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
		height: 200px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 1) 150px,
			rgba(0, 0, 0, 0.85) 175px,
			rgba(0, 0, 0, 0.35) 200px,
			transparent 200px
		);
		pointer-events: none;
		user-select: none;
		-webkit-user-select: none;
		z-index: 40;
	}

	@media (max-width: 768px) {
		.top-fade-curtain {
			height: 125px;
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 1) 0%,
				rgba(0, 0, 1) 85px,
				rgba(0, 0, 0, 0.85) 105px,
				rgba(0, 0, 0, 0.35) 125px,
				transparent 125px
			);
		}
	}

	.experience-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #000000;
		color: #e5e7eb;
		padding: 7rem 1.5rem 3rem;
		z-index: 10;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 960px) {
		.experience-section {
			padding: 6rem 1.25rem 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.experience-section {
			padding: 5rem 0.75rem 2rem;
		}
	}

	.experience-section.is-revealed {
		opacity: 1;
		pointer-events: auto;
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

	/* Section Header Row with Tag at Left */
	.section-header-row {
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
		padding: 0 0.25rem 0.5rem;
		border-bottom: 1px dashed #292524;
	}

	.section-tag-wrap {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 600;
		flex-wrap: wrap;
	}

	.section-tag-prefix {
		color: #785e2f;
	}

	.section-tag-title {
		color: #fbbf24;
		letter-spacing: 0.04em;
	}

	.section-tag-sub {
		color: #71717a;
		font-size: 0.74rem;
		font-weight: 400;
	}

	@media (max-width: 640px) {
		.section-tag-wrap {
			font-size: 0.72rem;
			gap: 0.35rem;
		}

		.section-tag-sub {
			font-size: 0.66rem;
		}
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
