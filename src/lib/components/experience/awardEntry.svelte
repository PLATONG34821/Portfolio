<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { Award } from '$lib/data/experienceData';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';

	interface Props {
		award: Award;
		onOpenCert?: (title: string, image: string) => void;
	}

	let { award, onOpenCert }: Props = $props();

	const openImage = () => onOpenCert?.(award.title, award.certImage!);
</script>

<TuiBox
	title={award.year}
	theme="amber"
	padding="0.65rem 0.75rem"
	class="award-tui-box"
	bodyClass="award-tui-body"
>
	{#if award.certImage}
		<button
			type="button"
			class="award-img-btn"
			onclick={openImage}
			title={m.clickToViewResolution()}
		>
			<img src={award.certImage} alt={award.title} class="award-img" loading="lazy" />
			<span class="img-badge-overlay" aria-hidden="true">⤢</span>
		</button>
	{/if}

	<div class="award-body">
		{#if award.certImage && onOpenCert}
			<button
				type="button"
				onclick={openImage}
				class="award-title-btn"
				class:highlighted={award.isHighlighted}
			>
				{award.title} ↗
			</button>
		{:else}
			<div class="award-title" class:highlighted={award.isHighlighted}>
				{award.title}
			</div>
		{/if}

		<p class="award-sub">{award.subtitle}</p>
	</div>
</TuiBox>

<style>
	:global(.award-tui-box) {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	:global(.award-tui-body) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
		min-width: 0;
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
		transition: border-color 0.2s ease;
	}

	.award-img-btn:hover {
		border-color: #fbbf24;
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
		background: rgba(9, 9, 11, 0.9);
		color: #fbbf24;
		font-family: inherit;
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1;
		padding: 0.25rem 0.35rem;
		border-radius: 3px;
		border: 1px solid #785e2f;
		user-select: none;
		pointer-events: none;
		opacity: 0;
		transform: scale(0.85);
		transition:
			opacity 0.15s ease,
			transform 0.15s ease;
	}

	.award-img-btn:hover .img-badge-overlay {
		opacity: 1;
		transform: scale(1);
	}

	.award-body {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex-grow: 1;
		min-width: 0;
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
		color: #fde047;
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
		.award-title-btn,
		.award-title {
			font-size: 0.8rem;
		}

		.award-sub {
			font-size: 0.7rem;
		}
	}
</style>
