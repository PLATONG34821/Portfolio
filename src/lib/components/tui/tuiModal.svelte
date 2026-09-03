<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	import TuiBox, { type TuiTheme } from './tuiBox.svelte';

	interface Props {
		title: string;
		image: string;
		theme?: TuiTheme;
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
		theme = 'amber',
		titleColor,
		borderColor,
		cornerColor,
		bgColor = '#09090b',
		maxWidth = '860px',
		onClose
	}: Props = $props();

	let dialogElement = $state<HTMLDialogElement | null>(null);

	onMount(() => {
		dialogElement?.showModal();
		return () => {
			if (dialogElement?.open) {
				dialogElement.close();
			}
		};
	});

	function handleDialogClick(e: MouseEvent) {
		if (!dialogElement) return;
		const rect = dialogElement.getBoundingClientRect();
		const isOutside =
			e.clientX < rect.left ||
			e.clientX > rect.right ||
			e.clientY < rect.top ||
			e.clientY > rect.bottom;
		if (isOutside || e.target === dialogElement) {
			onClose();
		}
	}
</script>

<dialog
	bind:this={dialogElement}
	class="tui-modal-dialog"
	style="--modal-max-width: {maxWidth};"
	aria-modal="true"
	aria-label={title}
	oncancel={(e) => {
		e.preventDefault();
		onClose();
	}}
	onclick={handleDialogClick}
	transition:scale={{ duration: 150, start: 0.95 }}
>
	<TuiBox
		{title}
		{theme}
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
				title={m.closeModal()}
				aria-label={m.closeModal()}
			>
				[x]
			</button>
		{/snippet}

		<div class="tui-modal-body">
			<enhanced:img src={image} alt={title} class="tui-cert-img" loading="eager" />
		</div>
	</TuiBox>
</dialog>

<style>
	.tui-modal-dialog {
		border: none;
		padding: 1.5rem;
		background: transparent;
		color: inherit;
		max-width: min(calc(100vw - 2rem), var(--modal-max-width, 860px));
		width: 100%;
		margin: auto;
		overflow: visible;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.tui-modal-dialog::backdrop {
		background: rgba(0, 0, 0, 0.92);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
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
	}

	@media (max-width: 640px) {
		.tui-modal-dialog {
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
