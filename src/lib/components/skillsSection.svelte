<script lang="ts">
	import TuiBox, { type BoxStyleType } from './tuiBox.svelte';
	import { capabilityCategories } from '$lib/data/experienceData';

	interface Props {
		scrollProgress?: number;
		boxStyle?: BoxStyleType;
		titleColor?: string;
		borderColor?: string;
		cornerColor?: string;
		bgColor?: string;
	}

	let {
		scrollProgress = 0,
		boxStyle = 'classic',
		titleColor = 'cyan',
		borderColor = '#1e293b',
		cornerColor = '#334155',
		bgColor = '#030712'
	}: Props = $props();

	// In-place fade-in matching experience section (scrollProgress >= 0.6)
	let isRevealed = $derived(scrollProgress >= 0.6);
</script>

<section class="skills-section" class:is-revealed={isRevealed} id="skills">
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
		padding: 0 1.5rem 12rem;
		z-index: 10;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.skills-section.is-revealed {
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

	.tui-grid-3col {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
		align-items: start;
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
	}

	.tui-title-static.highlighted {
		color: #38bdf8; /* Cyber Cyan highlight in skills section */
	}

	.check-mark {
		color: #22d3ee; /* Electric Cyan checkmark */
		margin-left: 0.35rem;
		font-weight: 700;
	}

	.tui-desc {
		color: #94a3b8;
	}
</style>
