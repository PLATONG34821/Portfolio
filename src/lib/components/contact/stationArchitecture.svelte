<script lang="ts">
	import TuiBox from '$lib/components/tui/tuiBox.svelte';

	interface SpecItem {
		label: string;
		value: string;
		isHighlighted?: boolean;
	}

	const specs: SpecItem[] = [
		{ label: 'Role:', value: 'Full-Stack & Systems Developer' },
		{ label: 'OS / Core:', value: 'macOS / Arch Linux' },
		{ label: 'Primary Stack:', value: 'TypeScript, Svelte 5, Go, Python' },
		{ label: 'DevOps & Cloud:', value: 'Docker Swarm, Linux Containers, Cloudflare' },
		{ label: 'Focus:', value: 'High-performance web, Clean Architecture, TUI' },
		{ label: 'Availability:', value: 'Open to Full-Time / Contract', isHighlighted: true }
	];
</script>

<TuiBox
	title="Station Architecture"
	titleColor="emerald"
	borderColor="#064e3b"
	cornerColor="#10b981"
	bgColor="#021a12"
	class="contact-box"
	bodyClass="contact-box-body"
>
	<div class="sys-info-wrap">
		<div class="sys-header">
			<span class="sys-prompt">thanaphum@dev-station</span>
			<span class="sys-sub">------------------------</span>
		</div>

		<div class="sys-spec-list">
			{#each specs as spec (spec.label)}
				<div class="spec-line">
					<span class="spec-k">{spec.label}</span>
					<span class="spec-v" class:highlight-green={spec.isHighlighted}>
						{spec.value}
					</span>
				</div>
			{/each}
		</div>

		<div class="sys-footer-note">
			<span class="note-prefix">></span>
			<span class="note-body">Need a reliable engineer with sharp execution? Let's talk.</span>
		</div>
	</div>
</TuiBox>

<style>
	:global(.contact-box) {
		height: 100%;
	}

	:global(.contact-box-body) {
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	@media (max-width: 640px) {
		:global(.contact-box-body) {
			padding: 1rem 1rem;
			gap: 1rem;
		}
	}

	/* System Node Specs */
	.sys-info-wrap {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.82rem;
	}

	.sys-header {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.sys-prompt {
		color: #34d399;
		font-weight: 700;
		font-size: 0.88rem;
	}

	.sys-sub {
		color: #064e3b;
	}

	.sys-spec-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.spec-line {
		display: flex;
		align-items: baseline;
		gap: 0.65rem;
		line-height: 1.4;
	}

	@media (max-width: 500px) {
		.spec-line {
			flex-direction: column;
			gap: 0.15rem;
		}
	}

	.spec-k {
		color: #6b7280;
		min-width: 120px;
		flex-shrink: 0;
	}

	.spec-v {
		color: #e5e7eb;
	}

	.highlight-green {
		color: #34d399;
		font-weight: 600;
	}

	.sys-footer-note {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px dashed #064e3b;
		color: #a7f3d0;
		font-size: 0.8rem;
		font-style: italic;
	}

	.note-prefix {
		color: #10b981;
		font-weight: 700;
		font-style: normal;
	}
</style>
