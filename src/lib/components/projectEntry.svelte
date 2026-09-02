<script lang="ts">
	import type { Project } from '$lib/data/experienceData';

	interface Props {
		project: Project;
		onOpenCert?: (title: string, image: string) => void;
	}

	let { project, onOpenCert }: Props = $props();
</script>

<div class="project-entry">
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

<style>
	.project-entry {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding-bottom: 1.4rem;
		border-bottom: 1px dashed #27272a;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.project-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.entry-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.entry-title-wrap {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
	}

	.entry-number {
		color: #71717a;
		font-size: 0.88rem;
		font-weight: 600;
	}

	.entry-title-btn,
	.entry-title-link {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f4f4f5;
		font-family: inherit;
		font-size: 0.96rem;
		font-weight: 600;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		transition: color 0.15s ease;
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
	}

	.entry-badge {
		color: #a1a1aa;
		font-size: 0.76rem;
		font-weight: 500;
	}

	.entry-summary {
		margin: 0;
		color: #d4d4d8;
		font-size: 0.85rem;
		line-height: 1.55;
	}

	.entry-meta {
		display: flex;
		gap: 0.5rem;
		font-size: 0.78rem;
		line-height: 1.45;
	}

	.meta-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.meta-text {
		color: #a1a1aa;
	}

	.entry-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		padding-top: 0.15rem;
	}

	.links-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.links-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.text-link {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #fbbf24 !important; /* Gold Link */
		font-family: inherit;
		font-size: 0.8rem;
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
</style>
