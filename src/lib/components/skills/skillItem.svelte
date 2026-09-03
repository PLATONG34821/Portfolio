<script lang="ts">
	import type { CapabilityItem } from '$lib/data/experienceData';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';

	interface Props {
		item: CapabilityItem;
	}

	let { item }: Props = $props();
</script>

<TuiBox
	title={item.skill}
	titleColor={item.isHighlighted ? 'cyan' : 'white'}
	borderColor="#1e293b"
	cornerColor="#334155"
	bgColor="rgba(3, 7, 18, 0.45)"
	padding="0.55rem 0.65rem"
	class="skill-tui-box"
	bodyClass="skill-tui-body"
>
	<div class="tui-item-focus">
		<span class="tui-focus-text">{item.focus}</span>
	</div>

	{#if item.evidence}
		<div class="tui-item-evidence">
			<span class="evidence-tag">USED IN:</span>
			<span class="evidence-val">{item.evidence}</span>
		</div>
	{/if}
</TuiBox>

<style>
	:global(.skill-tui-box) {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	:global(.skill-tui-body) {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		height: 100%;
		min-width: 0;
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
		margin-top: 0.05rem;
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
		.tui-item-focus {
			font-size: 0.72rem;
		}

		.tui-item-evidence {
			font-size: 0.66rem;
		}
	}
</style>
