<script lang="ts">
	import TuiBox from './tuiBox.svelte';
	import TuiModal from './tuiModal.svelte';
	import ProjectEntry from './projectEntry.svelte';
	import AwardEntry from './awardEntry.svelte';
	import CertEntry from './certEntry.svelte';
	import { coreProjects, ossProjects, awards, certifications } from '$lib/data/experienceData';

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

	// Pure in-place fade in once EXP finishes assembling (scrollProgress >= 0.6)
	let isRevealed = $derived(scrollProgress >= 0.6);
</script>

<!-- Fixed top gradient curtain that progressively masks text as it scrolls up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- SECTION 01: SYMMETRICAL 2-COLUMN EXPERIENCE GRID (EQUAL HEIGHT BOXES WITHOUT EMPTY SPACE) -->
		<div class="section-block" id="projects">
			<div class="experience-symmetric-grid">
				<!-- ROW 1, COL 1: Selected Projects -->
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

				<!-- ROW 1, COL 2: Awards & Honors -->
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

				<!-- ROW 2, COL 1: Open Source & Systems -->
				<TuiBox
					title="Open Source & Systems"
					titleColor="amber"
					borderColor="#382f1d"
					cornerColor="#785e2f"
					class="grid-box"
					bodyClass="grid-box-body"
				>
					<div class="oss-subgrid">
						{#each ossProjects as project (project.id)}
							<ProjectEntry {project} onOpenCert={openCert} />
						{/each}
					</div>
				</TuiBox>

				<!-- ROW 2, COL 2: Academic Certifications -->
				<TuiBox
					title="Academic Certifications"
					titleColor="amber"
					borderColor="#382f1d"
					cornerColor="#785e2f"
					id="certifications"
					class="grid-box"
					bodyClass="grid-box-body"
				>
					<div class="certs-subgrid">
						{#each certifications as cert (cert.code)}
							<CertEntry {cert} />
						{/each}
					</div>
				</TuiBox>
			</div>
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
		height: 220px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 1) 180px,
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
		color: #e5e7eb;
		padding: 7rem 1.5rem 3rem;
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
		max-width: 1180px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section-block {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Symmetrical 2-Column Desktop Grid with Strict Equal Heights */
	.experience-symmetric-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.75rem;
		align-items: stretch;
	}

	@media (max-width: 960px) {
		.experience-symmetric-grid {
			grid-template-columns: 1fr;
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

	/* Awards Subgrid: Symmetrical 2-Column Cards packed with NO empty space */
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

	/* OSS Subgrid: Balanced 2-Column Grid */
	.oss-subgrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.15rem;
		height: 100%;
	}

	@media (max-width: 580px) {
		.oss-subgrid {
			grid-template-columns: 1fr;
		}
	}

	/* Academic Certifications Subgrid: Balanced 2-Column Grid */
	.certs-subgrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem 1.15rem;
		height: 100%;
	}

	@media (max-width: 580px) {
		.certs-subgrid {
			grid-template-columns: 1fr;
		}
	}
</style>
