<script lang="ts">
	import type { Project } from '$lib/data/experienceData';

	interface Props {
		project: Project;
		onOpenCert?: (title: string, image: string) => void;
	}

	let { project, onOpenCert }: Props = $props();
</script>

<div class="project-entry" class:has-media={!!project.certImage}>
	<div class="entry-main">
		<div class="entry-header">
			<div class="entry-title-wrap">
				<span class="entry-number">{project.id}.</span>
				{#if project.certImage && onOpenCert}
					<button
						type="button"
						onclick={() => onOpenCert(project.title, project.certImage!)}
						class="entry-title-btn"
						class:highlighted={project.isFeatured}
					>
						{project.title}
						{#if project.isFeatured}
							<span class="check-mark">✓</span>
						{/if}
					</button>
				{:else}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a
						href={project.githubUrl}
						target="_blank"
						rel="external noreferrer"
						class="entry-title-link"
						class:highlighted={project.isFeatured}
					>
						{project.title}
						{#if project.isFeatured}
							<span class="check-mark">✓</span>
						{/if}
					</a>
				{/if}
			</div>
			<span class="entry-badge">{project.category}</span>
		</div>

		<p class="entry-summary">{project.summary}</p>

		<div class="entry-meta">
			<span class="meta-label">Details:</span>
			<span class="meta-text">{project.metrics}</span>
		</div>

		{#if project.links && project.links.length > 0}
			<div class="entry-links">
				<span class="links-label">Links:</span>
				<div class="links-list">
					{#each project.links as link (link.label)}
						{#if link.isCertModal && link.certImage && onOpenCert}
							<button
								type="button"
								onclick={() => onOpenCert(project.title, link.certImage!)}
								class="text-link"
							>
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

	<!-- Embedded Project Image (Side-by-side on desktop, compact & crisp) -->
	{#if project.certImage}
		<div class="entry-media-wrap">
			<button
				type="button"
				class="entry-media-btn"
				onclick={() => onOpenCert?.(project.title, project.certImage!)}
				title="Click to expand full resolution"
			>
				<img src={project.certImage} alt={project.title} class="entry-media-img" loading="lazy" />
				<span class="media-overlay-badge">⤢ Full Res</span>
			</button>
		</div>
	{/if}
</div>

<style>
	.project-entry {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px dashed #27272a;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
		width: 100%;
		min-width: 0;
	}

	.project-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.project-entry.has-media {
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

	.entry-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.entry-title-wrap {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
		flex-wrap: wrap;
		min-width: 0;
	}

	.entry-number {
		color: #71717a;
		font-size: 0.88rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.entry-title-btn,
	.entry-title-link {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f4f4f5;
		font-family: inherit;
		font-size: 0.92rem;
		font-weight: 600;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		transition: color 0.15s ease;
		line-height: 1.35;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.entry-title-btn:hover,
	.entry-title-link:hover {
		color: #fde047;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.entry-title-btn.highlighted,
	.entry-title-link.highlighted {
		color: #facc15; /* Pure Gold highlight */
	}

	.check-mark {
		color: #fbbf24; /* Warm Gold checkmark */
		margin-left: 0.35rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.entry-badge {
		color: #a1a1aa;
		font-size: 0.74rem;
		font-weight: 500;
		flex-shrink: 0;
	}

	.entry-summary {
		margin: 0;
		color: #d4d4d8;
		font-size: 0.82rem;
		line-height: 1.5;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.entry-meta {
		display: flex;
		gap: 0.45rem;
		font-size: 0.76rem;
		line-height: 1.4;
		flex-wrap: wrap;
	}

	.meta-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.meta-text {
		color: #a1a1aa;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.entry-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.78rem;
		padding-top: 0.1rem;
	}

	.links-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.links-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.text-link {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #fbbf24 !important; /* Gold Link */
		font-family: inherit;
		font-size: 0.78rem;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		transition:
			color 0.15s ease,
			text-decoration 0.15s ease;
	}

	.text-link:hover {
		color: #ffffff !important;
		text-decoration: underline !important;
		text-underline-offset: 3px;
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
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.entry-media-btn:hover {
		border-color: #fbbf24;
		box-shadow: 0 0 10px rgba(251, 191, 36, 0.15);
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
		bottom: 0.3rem;
		right: 0.3rem;
		background: rgba(9, 9, 11, 0.92);
		color: #fbbf24;
		font-family: inherit;
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.15rem 0.35rem;
		border-radius: 3px;
		border: 1px solid #785e2f;
	}

	@media (max-width: 600px) {
		.project-entry.has-media {
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

		.entry-number {
			font-size: 0.78rem;
		}

		.entry-title-btn,
		.entry-title-link {
			font-size: 0.84rem;
		}

		.entry-badge {
			font-size: 0.68rem;
		}

		.entry-summary {
			font-size: 0.76rem;
		}

		.entry-meta {
			font-size: 0.72rem;
		}

		.entry-links {
			font-size: 0.72rem;
		}

		.text-link {
			font-size: 0.72rem !important;
		}
	}
</style>
