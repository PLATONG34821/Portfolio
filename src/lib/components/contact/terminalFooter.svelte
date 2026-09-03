<script lang="ts">
	interface Props {
		statusText?: string;
		copyrightText?: string;
	}

	let {
		statusText = '[SYS_STATUS: 0 OK]',
		copyrightText = 'THANAPHUM © 2026 // ALL SYSTEMS OPERATIONAL'
	}: Props = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="terminal-footer">
	<div class="footer-meta">
		<span class="meta-code">{statusText}</span>
		<span class="meta-copy">{copyrightText}</span>
	</div>
	<button type="button" class="back-to-top-btn" onclick={scrollToTop}> [▲ RETURN TO TOP] </button>
</div>

<style>
	.terminal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
		margin-top: 1rem;
		border-top: 1px solid #1f2937;
		font-size: 0.78rem;
		gap: 1rem;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 640px) {
		.terminal-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			padding-top: 1.5rem;
		}
	}

	.footer-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.meta-code {
		color: #34d399;
		font-weight: 700;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	.meta-copy {
		color: #6b7280;
	}

	.back-to-top-btn {
		background: transparent;
		color: #9ca3af;
		border: 1px solid #374151;
		padding: 0.45rem 0.85rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.back-to-top-btn:hover {
		color: #f9fafb;
		border-color: #6b7280;
		background: #111827;
	}
</style>
