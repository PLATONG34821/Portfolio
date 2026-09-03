<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import SkillItem from './skillItem.svelte';
	import { capabilityCategories, quickScanTools } from '$lib/data/skillsData';
</script>

<section class="skills-section" id="skills">
	<div class="content-container">
		<div class="section-block">
			<SectionHeader tag={m.sectionSkillsTag()} title={m.sectionSkillsTitle()} theme="cyan" />

			<TuiBox
				title={m.toolsTitle()}
				theme="cyan"
				class="quick-scan-box"
				bodyClass="quick-scan-body"
			>
				<div class="quick-scan-items">
					{#each quickScanTools as tool, i (tool)}
						{#if i > 0}
							<span class="scan-dot">•</span>
						{/if}
						<span class="scan-item">{tool}</span>
					{/each}
				</div>
			</TuiBox>

			<div class="tui-grid-3col">
				{#each capabilityCategories as category (category.id)}
					<TuiBox
						title={category.title}
						theme="cyan"
						class={category.id === '04' ? 'cap-box full-frame' : 'cap-box'}
						bodyClass={category.id === '04' ? 'cap-body full-frame-body' : 'cap-body'}
					>
						{#each category.items as item (item.skill)}
							<SkillItem {item} />
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
		padding: 5rem 1.5rem 10rem;
		z-index: 10;
		pointer-events: auto;
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

	.quick-scan-items {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: #94a3b8;
		line-height: 1.5;
	}

	.scan-item {
		color: #f1f5f9;
		font-weight: 500;
		transition: color 0.15s ease;
	}

	.scan-item:hover {
		color: #38bdf8;
	}

	.scan-dot {
		color: #475569;
		font-size: 0.65rem;
	}

	@media (max-width: 640px) {
		.quick-scan-items {
			font-size: 0.72rem;
			gap: 0.35rem;
		}
	}

	:global(.cap-body) {
		gap: 0.85rem;
	}

	:global(.cap-box.full-frame) {
		grid-column: 1 / -1;
	}

	:global(.cap-body.full-frame-body) {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.85rem;
	}

	@media (max-width: 1100px) {
		:global(.cap-body.full-frame-body) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		:global(.cap-body.full-frame-body) {
			grid-template-columns: 1fr;
		}
	}
</style>
