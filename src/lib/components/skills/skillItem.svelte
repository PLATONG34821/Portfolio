<script lang="ts">
	import type { CapabilityItem } from '$lib/data/experienceData';

	interface Props {
		item: CapabilityItem;
	}

	let { item }: Props = $props();
</script>

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

<style>
	.tui-item {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
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
		color: #38bdf8;
	}

	.check-mark {
		color: #22d3ee;
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
