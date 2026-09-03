<script lang="ts">
	import type { Certification } from '$lib/data/experienceData';

	interface Props {
		cert: Certification;
	}

	let { cert }: Props = $props();
</script>

<div class="cert-entry">
	<span class="cert-code">{cert.code}</span>
	<div class="cert-info">
		<span class="cert-name">{cert.name}</span>
		<span class="cert-meta">— {cert.issuer}</span>
	</div>
</div>

<style>
	.cert-entry {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding-bottom: 0.55rem;
		border-bottom: 1px dashed #27272a;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.cert-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.cert-code {
		color: #fbbf24; /* Warm Gold Code */
		font-size: 0.78rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.cert-info {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		flex-wrap: wrap;
		font-size: 0.84rem;
	}

	.cert-name {
		color: #e4e4e7;
		font-weight: 500;
	}

	.cert-meta {
		color: #71717a;
		font-size: 0.78rem;
	}

	@media (max-width: 640px) {
		.cert-code {
			font-size: 0.72rem;
		}

		.cert-name {
			font-size: 0.76rem;
		}

		.cert-meta {
			font-size: 0.7rem;
		}
	}
</style>
