<script lang="ts">
	import TuiBox, { type BoxStyleType } from './tuiBox.svelte';

	interface Props {
		title: string;
		image: string;
		boxStyle?: BoxStyleType;
		titleColor?: string;
		borderColor?: string;
		cornerColor?: string;
		bgColor?: string;
		maxWidth?: string;
		onClose: () => void;
	}

	let {
		title,
		image,
		boxStyle = 'classic',
		titleColor = 'coral',
		borderColor = '#3f3f46',
		cornerColor = '#52525b',
		bgColor = '#09090b',
		maxWidth = '860px',
		onClose
	}: Props = $props();
</script>

<div
	class="tui-modal-backdrop"
	role="dialog"
	aria-modal="true"
	tabindex="-1"
	onclick={onClose}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="tui-modal-dialog"
		style="max-width: {maxWidth};"
		onclick={(e) => e.stopPropagation()}
		role="document"
	>
		<TuiBox
			{title}
			{boxStyle}
			{titleColor}
			{borderColor}
			{cornerColor}
			{bgColor}
			padding="1rem 1.25rem"
			class="modal-box"
			bodyClass="modal-body-pad"
		>
			<div class="tui-modal-body">
				<img src={image} alt={title} class="tui-cert-img" loading="eager" />
			</div>
			<div class="tui-modal-footer">
				<span class="footer-text">&gt; Official Certificate Record</span>
				<div class="tui-modal-actions">
					<a href={image} target="_blank" rel="external noreferrer" class="text-link">
						Open Full-Res ↗
					</a>
					<button type="button" class="cli-close-btn" onclick={onClose}> Close [ESC ×] </button>
				</div>
			</div>
		</TuiBox>
	</div>
</div>

<style>
	.tui-modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.tui-modal-dialog {
		width: 100%;
	}

	:global(.modal-body-pad) {
		gap: 1rem;
	}

	.tui-modal-body {
		padding: 0.5rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 70vh;
		overflow-y: auto;
	}

	.tui-cert-img {
		max-width: 100%;
		max-height: 65vh;
		object-fit: contain;
		border-radius: 4px;
		border: 1px solid #27272a;
	}

	.tui-modal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding-top: 0.5rem;
		border-top: 1px solid #1f1f23;
		font-size: 0.78rem;
	}

	.footer-text {
		color: #71717a;
	}

	.tui-modal-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.text-link {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #38bdf8 !important;
		font-family: inherit;
		font-size: 0.8rem;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		transition: color 0.15s ease;
	}

	.text-link:hover {
		color: #ffffff !important;
		text-decoration: underline !important;
	}

	.cli-close-btn {
		background: transparent;
		border: none;
		color: #f87171;
		font-family: inherit;
		font-size: 0.78rem;
		font-weight: 600;
		cursor: pointer;
		padding: 0;
	}

	.cli-close-btn:hover {
		text-decoration: underline;
	}
</style>
