<script lang="ts">
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import SkillItem from './skillItem.svelte';
	import { capabilityCategories } from '$lib/data/experienceData';

	interface Props {
		titleColor?: string;
		borderColor?: string;
		cornerColor?: string;
		bgColor?: string;
	}

	let {
		titleColor = 'cyan',
		borderColor = '#1e293b',
		cornerColor = '#334155',
		bgColor = '#030712'
	}: Props = $props();
</script>

<section class="skills-section" id="skills">
	<div class="content-container">
		<div class="section-block">
			<SectionHeader
				tag="SECTION 02"
				title="CAPABILITIES MATRIX"
				prefixColor="#0284c7"
				titleColor="#38bdf8"
				subColor="#64748b"
				dividerColor="#1e293b"
			/>

			<div class="tui-grid-3col">
				{#each capabilityCategories as category (category.id)}
					<TuiBox
						title={category.title}
						{titleColor}
						{borderColor}
						{cornerColor}
						{bgColor}
						class="cap-box"
						bodyClass="cap-body"
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
		padding: 5rem 1.5rem 12rem;
		z-index: 10;
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
</style>
