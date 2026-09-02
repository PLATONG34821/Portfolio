<script lang="ts">
	import type { Snippet } from 'svelte';
	import cliBoxes, { type BoxStyle } from 'cli-boxes';

	export type BoxStyleType =
		| 'classic'
		| 'round'
		| 'single'
		| 'double'
		| 'bold'
		| 'singleDouble'
		| 'doubleSingle'
		| 'arrow'
		| BoxStyle;

	interface Props {
		title: string;
		boxStyle?: BoxStyleType;
		titleColor?: string; // Hex code or preset ('coral' | 'cyan' | 'emerald' | 'amber' | 'purple')
		borderColor?: string; // Hex code for border lines
		cornerColor?: string; // Hex code for corners
		bgColor?: string; // Background color for the box body
		padding?: string; // Custom padding for body e.g. "1rem 1.25rem"
		titlePrefix?: string;
		titleSuffix?: string;
		id?: string;
		class?: string;
		bodyClass?: string;
		children?: Snippet;
	}

	let {
		title,
		boxStyle = 'classic',
		titleColor = 'coral',
		borderColor = '#27272a',
		cornerColor = '#3f3f46',
		bgColor = 'transparent',
		padding,
		titlePrefix = '',
		titleSuffix = '',
		id,
		class: className = '',
		bodyClass = '',
		children
	}: Props = $props();

	// Resolve the active box definition from cli-boxes or custom object
	const activeBox = $derived.by<BoxStyle>(() => {
		if (typeof boxStyle === 'object') {
			return boxStyle;
		}
		if (boxStyle in cliBoxes) {
			return cliBoxes[boxStyle as keyof typeof cliBoxes] || cliBoxes.classic;
		}
		return cliBoxes.classic;
	});

	// Color preset mapping
	const resolvedTitleColor = $derived.by(() => {
		switch (titleColor) {
			case 'coral':
				return '#f87171';
			case 'cyan':
				return '#38bdf8';
			case 'emerald':
				return '#34d399';
			case 'amber':
				return '#fbbf24';
			case 'purple':
				return '#c084fc';
			case 'rose':
				return '#fb7185';
			default:
				return titleColor;
		}
	});
</script>

<div
	class="tui-box {className}"
	{id}
	style="
		--tui-border-color: {borderColor};
		--tui-corner-color: {cornerColor};
		--tui-title-color: {resolvedTitleColor};
		--tui-bg-color: {bgColor};
		{padding ? `--tui-body-padding: ${padding};` : ''}
	"
>
	<!-- Top Line with Title -->
	<div class="tui-line-top">
		<span class="tui-corner">{activeBox.topLeft}{activeBox.top}{activeBox.top}</span>
		<span class="tui-title">
			{titlePrefix}{title}{titleSuffix}
		</span>
		<span class="tui-fill">{activeBox.top}</span>
		<span class="tui-corner">{activeBox.top}{activeBox.top}{activeBox.topRight}</span>
	</div>

	<!-- Box Body Content -->
	<div class="tui-body {bodyClass}">
		{#if children}
			{@render children()}
		{/if}
	</div>

	<!-- Bottom Line -->
	<div class="tui-line-bot">
		<span class="tui-corner">{activeBox.bottomLeft}{activeBox.bottom}{activeBox.bottom}</span>
		<span class="tui-fill">{activeBox.bottom}</span>
		<span class="tui-corner">{activeBox.bottom}{activeBox.bottom}{activeBox.bottomRight}</span>
	</div>
</div>

<style>
	.tui-box {
		display: flex;
		flex-direction: column;
		background: transparent;
		user-select: none;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.tui-line-top,
	.tui-line-bot {
		display: flex;
		align-items: center;
		font-size: 0.88rem;
		line-height: 1;
		color: var(--tui-border-color, #27272a);
		white-space: nowrap;
	}

	.tui-corner {
		color: var(--tui-corner-color, #3f3f46);
		font-weight: 400;
	}

	.tui-fill {
		flex-grow: 1;
		overflow: hidden;
		letter-spacing: -0.05em;
		color: var(--tui-border-color, #27272a);
	}

	.tui-title {
		color: var(--tui-title-color, #f87171);
		font-weight: 600;
		font-size: 0.88rem;
		padding: 0 0.5rem;
		letter-spacing: 0.02em;
	}

	.tui-body {
		border-left: 1px solid var(--tui-border-color, #27272a);
		border-right: 1px solid var(--tui-border-color, #27272a);
		background: var(--tui-bg-color, transparent);
		padding: var(--tui-body-padding, 1.25rem 1.4rem);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 0 1px;
		user-select: text;
	}
</style>
