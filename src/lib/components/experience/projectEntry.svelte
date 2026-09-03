<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { Project } from '$lib/data/experienceData';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import { Link } from 'phosphor-svelte';

	interface Props {
		project: Project;
		onOpenCert?: (title: string, image: string) => void;
	}

	let { project, onOpenCert }: Props = $props();

	const openImage = (img: string) => onOpenCert?.(project.title, img);
</script>

<TuiBox
	title="{project.id}. {project.title}"
	theme="amber"
	padding="0.65rem 0.85rem"
	class="project-tui-box"
	bodyClass="project-tui-body"
>
	<div class="project-content-grid" class:has-media={!!project.certImage}>
		<div class="entry-main">
			<p class="entry-summary">{project.summary}</p>

			<div class="entry-meta">
				<span class="meta-label">{m.detailsLabel()}</span>
				<span class="meta-text">{project.metrics}</span>
			</div>

			{#if project.links?.length}
				<div class="entry-links">
					<span class="links-label" title={m.linksLabel()} aria-label={m.linksLabel()}>
						<Link size={13} weight="bold" />
					</span>
					<div class="links-list">
						{#each project.links as link (link.label)}
							{#if link.isCertModal && link.certImage && onOpenCert}
								<button type="button" onclick={() => openImage(link.certImage!)} class="text-link">
									{link.label} ↗
								</button>
							{:else}
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a href={link.url} target="_blank" rel="external noreferrer" class="text-link">
									{link.label} ↗
								</a>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>

		{#if project.certImage}
			<div class="entry-media-wrap">
				<button
					type="button"
					class="entry-media-btn"
					onclick={() => openImage(project.certImage!)}
					title={m.clickToExpand()}
				>
					<img src={project.certImage} alt={project.title} class="entry-media-img" loading="lazy" />
					<span class="media-overlay-badge" aria-hidden="true">⤢</span>
				</button>
			</div>
		{/if}
	</div>
</TuiBox>

<style>
	:global(.project-tui-box) {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	:global(.project-tui-body) {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-width: 0;
	}

	.project-content-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
		min-width: 0;
	}

	.project-content-grid.has-media {
		display: grid;
		grid-template-columns: 1fr 140px;
		gap: 0.85rem;
		align-items: center;
	}

	.entry-main {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.entry-summary {
		margin: 0;
		color: #d4d4d8;
		font-size: 0.82rem;
		line-height: 1.5;
		word-break: break-word;
		overflow-wrap: break-word;
	}
	/* Compact Embedded Media Preview Styling */
	.entry-media-wrap {
		width: 140px;
		height: 105px;
		flex-shrink: 0;
	}

	.entry-media-btn {
		position: relative;
		width: 100%;
		height: 100%;
		display: block;
		background: #09090b;
		border: 1px solid #382f1d;
		border-radius: 4px;
		overflow: hidden;
		padding: 0;
		cursor: pointer;
		transition: border-color 0.2s ease;
	}

	.entry-media-btn:hover {
		border-color: #fbbf24;
	}

	.entry-media-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		transition: transform 0.25s ease;
	}

	.entry-media-btn:hover .entry-media-img {
		transform: scale(1.04);
	}

	.media-overlay-badge {
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

	.entry-media-btn:hover .media-overlay-badge {
		opacity: 1;
		transform: scale(1);
	}

	@media (max-width: 600px) {
		.project-content-grid.has-media {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
		}

		.entry-media-wrap {
			width: 100%;
			height: auto;
			aspect-ratio: 16 / 9;
			max-height: 200px;
		}

		.entry-summary {
			font-size: 0.76rem;
		}
	}
</style>
