<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import TuiBox, { type BoxStyleType } from './tuiBox.svelte';
	import { capabilityCategories } from '$lib/data/experienceData';

	interface Props {
		boxStyle?: BoxStyleType;
		titleColor?: string;
		borderColor?: string;
		cornerColor?: string;
		bgColor?: string;
	}

	let {
		boxStyle = 'classic',
		titleColor = 'cyan',
		borderColor = '#1e293b',
		cornerColor = '#334155',
		bgColor = '#030712'
	}: Props = $props();

	let sectionElement = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!sectionElement) return;
		gsap.registerPlugin(ScrollTrigger);

		gsap.set(sectionElement, { autoAlpha: 0 });

		const tween = gsap.to(sectionElement, {
			autoAlpha: 1,
			duration: 0.5,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top 85%',
				toggleActions: 'play none none reverse'
			}
		});

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	});
</script>

<section bind:this={sectionElement} class="skills-section" id="skills">
	<div class="content-container">
		<div class="section-block">
			<!-- Section Header: Tag at Top Right -->
			<div class="section-header-row">
				<div class="section-tag-wrap">
					<span class="section-tag-prefix">//</span>
					<span class="section-tag-title">SECTION 02</span>
					<span class="section-tag-sub">CAPABILITIES MATRIX</span>
				</div>
			</div>

			<div class="tui-grid-3col">
				{#each capabilityCategories as category (category.id)}
					<TuiBox
						title={category.title}
						{boxStyle}
						{titleColor}
						{borderColor}
						{cornerColor}
						{bgColor}
						class="cap-box"
						bodyClass="cap-body"
					>
						{#each category.items as item (item.skill)}
							<div class="tui-item">
								<div class="tui-item-line1">
									<span class="tui-title-static" class:highlighted={item.isHighlighted}>
										{item.skill}
										{#if item.isHighlighted}
											<span class="check-mark">✓</span>
										{/if}
									</span>
								</div>
								<div class="tui-item-line2">
									<span class="tui-desc">{item.focus}</span>
								</div>
							</div>
						{/each}
					</TuiBox>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skills-section {
		position: relative;
		width: 100%;
		background: #000000;
		color: #e5e7eb;
		padding: 5rem 1.5rem 12rem;
		z-index: 10;
		visibility: hidden;
		opacity: 0;
		pointer-events: auto;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 1024px) {
		.skills-section {
			padding: 4.5rem 1.25rem 8rem;
		}
	}

	@media (max-width: 640px) {
		.skills-section {
			padding: 3.5rem 0.75rem 6rem;
		}
	}

	.content-container {
		max-width: 1160px;
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
		border-bottom: 1px dashed #1e293b;
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
		color: #0284c7;
	}

	.section-tag-title {
		color: #38bdf8;
		letter-spacing: 0.04em;
	}

	.section-tag-sub {
		color: #64748b;
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

	.tui-grid-3col {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.5rem;
		align-items: start;
	}

	@media (max-width: 1024px) {
		.tui-grid-3col {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	@media (max-width: 680px) {
		.tui-grid-3col {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	:global(.cap-body) {
		gap: 0.85rem;
	}

	.tui-item {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.tui-item-line1 {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
		line-height: 1.4;
		flex-wrap: wrap;
	}

	.tui-item-line2 {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.45rem;
		font-size: 0.78rem;
		line-height: 1.4;
		color: #94a3b8;
	}

	.tui-title-static {
		color: #e2e8f0;
		font-size: 0.88rem;
		font-weight: 500;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.tui-title-static.highlighted {
		color: #38bdf8; /* Cyber Cyan highlight in skills section */
	}

	.check-mark {
		color: #22d3ee; /* Electric Cyan checkmark */
		margin-left: 0.35rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.tui-desc {
		color: #94a3b8;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	@media (max-width: 640px) {
		.tui-title-static {
			font-size: 0.78rem;
		}

		.tui-item-line2 {
			font-size: 0.7rem;
		}
	}
</style>
