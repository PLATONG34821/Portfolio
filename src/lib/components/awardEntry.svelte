<script lang="ts">
	import type { Award } from '$lib/data/experienceData';

	interface Props {
		award: Award;
		onOpenCert?: (title: string, image: string) => void;
	}

	let { award, onOpenCert }: Props = $props();
</script>

<div class="award-entry">
	<span class="award-year">{award.year}</span>
	<div class="award-content">
		<div class="award-head">
			{#if award.certImage && onOpenCert}
				<button
					type="button"
					onclick={() => onOpenCert(award.title, award.certImage!)}
					class="award-title-btn"
					class:highlighted={award.isHighlighted}
				>
					<span class="award-badge">[{award.badge}]</span>
					<span class="award-title">{award.title}</span>
					{#if award.isHighlighted}
						<span class="check-mark">✓</span>
					{/if}
					<span class="cert-link-hint">[View ↗]</span>
				</button>
			{:else}
				<div class="award-title-static">
					<span class="award-badge">[{award.badge}]</span>
					<span class="award-title">{award.title}</span>
					{#if award.isHighlighted}
						<span class="check-mark">✓</span>
					{/if}
				</div>
			{/if}
		</div>
		<p class="award-sub">{award.subtitle}</p>
	</div>
</div>

<style>
	.award-entry {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px dashed #1e2430;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.award-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.award-year {
		color: #71717a;
		font-size: 0.82rem;
		font-weight: 600;
		flex-shrink: 0;
		padding-top: 0.1rem;
	}

	.award-content {
		display: flex;
		flex-direction: column;
		gap: 0.18rem;
		flex-grow: 1;
	}

	.award-head {
		display: flex;
		align-items: baseline;
	}

	.award-title-btn,
	.award-title-static {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f4f4f5;
		font-family: inherit;
		font-size: 0.88rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		flex-wrap: wrap;
		transition: color 0.15s ease;
	}

	.award-title-btn:hover .award-title {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.award-badge {
		color: #fbbf24;
		font-weight: 600;
		font-size: 0.8rem;
	}

	.award-title {
		color: #e4e4e7;
	}

	.award-title-btn.highlighted .award-title {
		color: #fdba74;
	}

	.check-mark {
		color: #f97316;
		margin-left: 0.35rem;
		font-weight: 700;
	}

	.cert-link-hint {
		color: #38bdf8;
		font-size: 0.76rem;
		font-weight: 500;
		margin-left: 0.2rem;
	}

	.award-sub {
		margin: 0;
		color: #71717a;
		font-size: 0.78rem;
		line-height: 1.4;
	}
</style>
