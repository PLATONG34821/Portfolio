<script lang="ts">
	import type { Award } from '$lib/data/experienceData';

	interface Props {
		award: Award;
		onOpenCert?: (title: string, image: string) => void;
	}

	let { award, onOpenCert }: Props = $props();
</script>

<div class="award-card" class:has-image={!!award.certImage} class:no-image={!award.certImage}>
	{#if award.certImage}
		<button
			type="button"
			class="award-img-btn"
			onclick={() => onOpenCert?.(award.title, award.certImage!)}
			title="Click to view full resolution"
		>
			<img src={award.certImage} alt={award.title} class="award-img" loading="lazy" />
			<span class="img-badge-overlay">⤢ Full Res</span>
		</button>
	{/if}

	<div class="award-body">
		<div class="award-meta-row">
			<span class="award-year">{award.year}</span>
			<span class="award-badge">[{award.badge}]</span>
			{#if award.isHighlighted}
				<span class="check-mark">✓</span>
			{/if}
		</div>

		{#if award.certImage && onOpenCert}
			<button
				type="button"
				onclick={() => onOpenCert(award.title, award.certImage!)}
				class="award-title-btn"
				class:highlighted={award.isHighlighted}
			>
				{award.title}
			</button>
		{:else}
			<div class="award-title" class:highlighted={award.isHighlighted}>
				{award.title}
			</div>
		{/if}

		<p class="award-sub">{award.subtitle}</p>
	</div>
</div>

<style>
	.award-card {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0.85rem;
		background: rgba(18, 14, 8, 0.45);
		border: 1px solid #292524;
		border-radius: 4px;
		height: 100%;
		width: 100%;
		min-width: 0;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.award-card:hover {
		border-color: #785e2f;
		box-shadow: 0 0 10px rgba(251, 191, 36, 0.08);
	}

	.award-img-btn {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		height: auto;
		max-height: 180px;
		display: block;
		background: #09090b;
		border: 1px solid #382f1d;
		border-radius: 3px;
		overflow: hidden;
		padding: 0;
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.award-img-btn:hover {
		border-color: #fbbf24;
		box-shadow: 0 0 10px rgba(251, 191, 36, 0.2);
	}

	.award-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		transition: transform 0.25s ease;
	}

	.award-img-btn:hover .award-img {
		transform: scale(1.03);
	}

	.img-badge-overlay {
		position: absolute;
		bottom: 0.35rem;
		right: 0.35rem;
		background: rgba(9, 9, 11, 0.92);
		color: #fbbf24;
		font-family: inherit;
		font-size: 0.68rem;
		font-weight: 600;
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		border: 1px solid #785e2f;
		user-select: none;
		pointer-events: none;
	}

	.award-body {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex-grow: 1;
		min-width: 0;
	}

	.award-meta-row {
		display: flex;
		align-items: baseline;
		gap: 0.35rem 0.5rem;
		flex-wrap: wrap;
	}

	.award-year {
		color: #a1a1aa;
		font-size: 0.8rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.award-badge {
		color: #facc15; /* Bright Gold badge */
		font-weight: 600;
		font-size: 0.8rem;
		flex-shrink: 0;
	}

	.check-mark {
		color: #fbbf24;
		font-weight: 700;
		margin-left: 0.2rem;
		flex-shrink: 0;
	}

	.award-title-btn,
	.award-title {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f4f4f5;
		font-family: inherit;
		font-size: 0.88rem;
		font-weight: 600;
		text-align: left;
		cursor: pointer;
		display: inline-block;
		transition: color 0.15s ease;
		line-height: 1.35;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.award-title-btn:hover {
		color: #fde047;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.award-title-btn.highlighted,
	.award-title.highlighted {
		color: #fde047; /* Gold Highlight */
	}

	.award-sub {
		margin: 0;
		color: #78716c;
		font-size: 0.76rem;
		line-height: 1.4;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	@media (max-width: 640px) {
		.award-year,
		.award-badge {
			font-size: 0.72rem;
		}

		.award-title-btn,
		.award-title {
			font-size: 0.8rem;
		}

		.award-sub {
			font-size: 0.7rem;
		}
	}
</style>
