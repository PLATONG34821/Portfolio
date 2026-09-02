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
		<!-- SECTION 01: SELECTED PROJECTS & RECOGNITION (GOLD THEME) -->
		<div class="section-block" id="projects">
			<div class="two-column-layout">
				<!-- LEFT COLUMN: Selected Projects & Open Source Systems -->
				<div class="column-stack">
					<!-- Box 1: Core Production Systems -->
					<TuiBox
						title="Selected Projects"
						titleColor="amber"
						borderColor="#382f1d"
						cornerColor="#785e2f"
					>
						{#each coreProjects as project (project.id)}
							<ProjectEntry {project} onOpenCert={openCert} />
						{/each}
					</TuiBox>

					<!-- Box 2: Open Source & Research Systems -->
					<TuiBox
						title="Open Source & Systems"
						titleColor="amber"
						borderColor="#382f1d"
						cornerColor="#785e2f"
					>
						{#each ossProjects as project (project.id)}
							<ProjectEntry {project} onOpenCert={openCert} />
						{/each}
					</TuiBox>
				</div>

				<!-- RIGHT COLUMN: Awards & Certifications -->
				<div class="column-stack">
					<!-- Box 3: Awards & Recognition -->
					<TuiBox
						title="Awards & Honors"
						titleColor="amber"
						borderColor="#382f1d"
						cornerColor="#785e2f"
						id="awards"
					>
						{#each awards as award (award.id)}
							<AwardEntry {award} onOpenCert={openCert} />
						{/each}
					</TuiBox>

					<!-- Box 4: Academic Certifications -->
					<TuiBox
						title="Academic Certifications"
						titleColor="amber"
						borderColor="#382f1d"
						cornerColor="#785e2f"
						id="certifications"
					>
						{#each certifications as cert (cert.code)}
							<CertEntry {cert} />
						{/each}
					</TuiBox>
				</div>
			</div>
		</div>

		<!-- Operator Status Box -->
		<TuiBox
			title="Operator Session"
			titleColor="amber"
			borderColor="#382f1d"
			cornerColor="#785e2f"
			class="footer-box"
			bodyClass="footer-body"
		>
			<span class="footer-text">Operator: Thanaphum Masayamas</span>
			<span class="footer-text">Status: Active ({new Date().getFullYear()})</span>
			<a
				href="https://github.com/PLATONG34821"
				target="_blank"
				rel="external noreferrer"
				class="text-link"
			>
				GitHub Profile ↗
			</a>
		</TuiBox>
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
		max-width: 1160px;
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

	.two-column-layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
		gap: 1.5rem;
		align-items: start;
	}

	.column-stack {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	:global(.footer-body) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 0.5rem 1.15rem;
	}

	.footer-text {
		color: #78716c;
		font-size: 0.76rem;
	}

	.text-link {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #fbbf24 !important; /* Gold Link */
		font-family: inherit;
		font-size: 0.78rem;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		transition: color 0.15s ease;
	}

	.text-link:hover {
		color: #ffffff !important;
		text-decoration: underline !important;
	}
</style>
