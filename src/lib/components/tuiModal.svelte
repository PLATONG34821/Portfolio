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
		titleColor = 'amber',
		borderColor = '#785e2f',
		cornerColor = '#fbbf24',
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
			padding="0.75rem 1rem"
			class="modal-box"
			bodyClass="modal-body-pad"
		>
			{#snippet topRightAction()}
				<button
					type="button"
					class="tui-modal-close-btn"
					onclick={onClose}
					title="Close (ESC)"
					aria-label="Close modal"
				>
					[x]
				</button>
			{/snippet}

			<div class="tui-modal-body">
				<img src={image} alt={title} class="tui-cert-img" loading="eager" />
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
		background: rgba(0, 0, 0, 0.92);
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
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.95);
	}

	:global(.modal-body-pad) {
		gap: 0.5rem;
	}

	.tui-modal-body {
		padding: 0.25rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 75vh;
		overflow-y: auto;
	}

	.tui-cert-img {
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
		display: block;
		border-radius: 0;
		border: 1px solid var(--tui-border-color, #382f1d);
	}

	.tui-modal-close-btn {
		background: transparent;
		border: none;
		color: #f87171;
		font-family: inherit;
		font-size: 0.88rem;
		font-weight: 700;
		cursor: pointer;
		padding: 0 0.25rem;
		line-height: 1;
		transition:
			color 0.15s ease,
			transform 0.1s ease;
	}

	.tui-modal-close-btn:hover {
		color: #ef4444;
		text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
	}

	@media (max-width: 640px) {
		.tui-modal-backdrop {
			padding: 0.75rem;
		}

		.tui-modal-body {
			max-height: 80vh;
		}

		.tui-cert-img {
			max-height: 75vh;
		}
	}
</style>
