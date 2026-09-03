<script lang="ts">
	import type { CapabilityItem } from '$lib/data/experienceData';

	interface Props {
		item: CapabilityItem;
	}

	let { item }: Props = $props();
</script>

<div class="tui-item" class:highlighted={item.isHighlighted}>
	<div class="tui-item-header">
		<span class="tui-title" class:highlighted={item.isHighlighted}>
			{item.skill}
			{#if item.isHighlighted}
				<span class="check-mark" title="Core Production Stack">✓</span>
			{/if}
		</span>
		<span class="tui-level">[{item.level}]</span>
	</div>

	<div class="tui-item-focus">
		<span class="tui-focus-text">{item.focus}</span>
	</div>

	{#if item.evidence}
		<div class="tui-item-evidence">
			<span class="evidence-tag">USED IN:</span>
			<span class="evidence-val">{item.evidence}</span>
		</div>
	{/if}
</div>

<style>
	.tui-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.55rem 0.65rem;
		background: rgba(3, 7, 18, 0.4);
		border-left: 2px solid #1e293b;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.tui-item:hover {
		border-left-color: #38bdf8;
		background: rgba(14, 165, 233, 0.04);
	}

	.tui-item.highlighted {
		border-left-color: #0284c7;
	}

	.tui-item.highlighted:hover {
		border-left-color: #38bdf8;
	}

	.tui-item-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem;
		line-height: 1.35;
		flex-wrap: wrap;
	}

	.tui-title {
		color: #f1f5f9;
		font-size: 0.88rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		word-break: break-word;
		transition: color 0.15s ease;
	}

	.tui-item:hover .tui-title {
		color: #38bdf8;
	}

	.tui-title.highlighted {
		color: #e0f2fe;
	}

	.check-mark {
		color: #38bdf8;
		margin-left: 0.25rem;
		font-weight: 700;
	}

	.tui-level {
		color: #64748b;
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		flex-shrink: 0;
		transition: color 0.15s ease;
	}

	.tui-item:hover .tui-level {
		color: #0284c7;
	}

	.tui-item-focus {
		font-size: 0.76rem;
		line-height: 1.4;
		color: #94a3b8;
	}

	.tui-focus-text {
		word-break: break-word;
	}

	.tui-item-evidence {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		font-size: 0.7rem;
		line-height: 1.35;
		color: #64748b;
		margin-top: 0.1rem;
	}

	.evidence-tag {
		color: #0284c7;
		font-weight: 700;
		font-size: 0.65rem;
		flex-shrink: 0;
	}

	.evidence-val {
		color: #64748b;
		word-break: break-word;
	}

	@media (max-width: 640px) {
		.tui-item {
			padding: 0.45rem 0.5rem;
		}

		.tui-title {
			font-size: 0.82rem;
		}

		.tui-item-focus {
			font-size: 0.72rem;
		}

		.tui-item-evidence {
			font-size: 0.66rem;
		}
	}
</style>
