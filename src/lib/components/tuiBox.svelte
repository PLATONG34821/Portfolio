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
		titleColor?: string; // Hex code or preset ('coral' | 'cyan' | 'emerald' | 'amber' | 'gold' | 'purple')
		borderColor?: string; // Hex code for border lines
		cornerColor?: string; // Hex code for corners
		bgColor?: string; // Background color for the box body
		padding?: string; // Custom padding for body e.g. "1rem 1.25rem"
		titlePrefix?: string;
		titleSuffix?: string;
		id?: string;
		class?: string;
		bodyClass?: string;
		topRightAction?: Snippet;
		children?: Snippet;
	}

	let {
		title,
		boxStyle = 'classic',
		titleColor = 'amber',
		borderColor = '#27272a',
		cornerColor = '#3f3f46',
		bgColor = 'transparent',
		padding,
		titlePrefix = '',
		titleSuffix = '',
		id,
		class: className = '',
		bodyClass = '',
		topRightAction,
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
			case 'gold':
				return '#facc15';
			case 'purple':
				return '#c084fc';
			case 'rose':
				return '#fb7185';
			default:
				return titleColor;
		}
	});

	// Use solid box-drawing '─' when '-' is given so the horizontal line connects seamlessly without gaps
	const resolvedTopChar = $derived.by(() => (activeBox.top === '-' ? '─' : activeBox.top));
	const resolvedBotChar = $derived.by(() => (activeBox.bottom === '-' ? '─' : activeBox.bottom));

	// Fill repeated characters across the full width
	const horizontalFillTop = $derived.by(() => resolvedTopChar.repeat(250));
	const horizontalFillBot = $derived.by(() => resolvedBotChar.repeat(250));

	// Real text characters for vertical borders so they can be selected / highlighted
	const verticalLineCount = 200;
	const leftBorderText = $derived.by(() =>
		Array(verticalLineCount).fill(activeBox.left).join('\n')
	);
	const rightBorderText = $derived.by(() =>
		Array(verticalLineCount).fill(activeBox.right).join('\n')
	);
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
		<span class="tui-corner">{activeBox.topLeft}{resolvedTopChar}{resolvedTopChar}</span>
		<span class="tui-title">
			{titlePrefix}{title}{titleSuffix}
		</span>
		<span class="tui-fill">{horizontalFillTop}</span>
		{#if topRightAction}
			{@render topRightAction()}
		{/if}
		<span class="tui-corner">{resolvedTopChar}{resolvedTopChar}{activeBox.topRight}</span>
	</div>

	<!-- Box Middle Row with Real Text Vertical Borders -->
	<div class="tui-middle-row">
		<div class="tui-side-col tui-side-left">
			{leftBorderText}
		</div>

		<div class="tui-body {bodyClass}">
			{#if children}
				{@render children()}
			{/if}
		</div>

		<div class="tui-side-col tui-side-right">
			{rightBorderText}
		</div>
	</div>

	<!-- Bottom Line -->
	<div class="tui-line-bot">
		<span class="tui-corner">{activeBox.bottomLeft}{resolvedBotChar}{resolvedBotChar}</span>
		<span class="tui-fill">{horizontalFillBot}</span>
		<span class="tui-corner">{resolvedBotChar}{resolvedBotChar}{activeBox.bottomRight}</span>
	</div>
</div>

<style>
	.tui-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		max-width: 100%;
		min-width: 0;
		background: var(--tui-bg-color, transparent);
		border: none;
		outline: none;
		box-shadow: none;
		user-select: text;
		-webkit-user-select: text;
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
		overflow: hidden;
		width: 100%;
		min-width: 0;
		border: none;
		outline: none;
		user-select: text;
		-webkit-user-select: text;
	}

	.tui-corner {
		color: var(--tui-corner-color, #3f3f46);
		font-weight: 400;
		user-select: text;
		-webkit-user-select: text;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.tui-fill {
		flex: 1 1 0;
		overflow: hidden;
		white-space: nowrap;
		letter-spacing: 0;
		color: var(--tui-border-color, #27272a);
		user-select: text;
		-webkit-user-select: text;
		min-width: 0;
	}

	.tui-title {
		color: var(--tui-title-color, #fbbf24);
		font-weight: 600;
		font-size: 0.88rem;
		padding: 0 0.5rem;
		letter-spacing: 0.02em;
		user-select: text;
		-webkit-user-select: text;
		white-space: nowrap;
		flex-shrink: 0;
		max-width: calc(100% - 4ch);
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-middle-row {
		display: flex;
		flex-direction: row;
		position: relative;
		flex-grow: 1;
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow: hidden;
		border: none;
		outline: none;
	}

	.tui-side-col {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1ch;
		overflow: hidden;
		white-space: pre;
		font-family: inherit;
		font-size: 0.88rem;
		line-height: 1;
		color: var(--tui-border-color, #27272a);
		border: none;
		outline: none;
		user-select: text;
		-webkit-user-select: text;
		pointer-events: auto;
		z-index: 2;
		flex-shrink: 0;
	}

	.tui-side-left {
		left: 0;
		text-align: left;
	}

	.tui-side-right {
		right: 0;
		text-align: right;
	}

	.tui-body {
		background: transparent;
		padding: var(--tui-body-padding, 1.25rem 1.4rem);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		margin: 0 1ch;
		width: calc(100% - 2ch);
		max-width: calc(100% - 2ch);
		min-width: 0;
		box-sizing: border-box;
		gap: 1.5rem;
		border: none;
		outline: none;
		user-select: text;
		-webkit-user-select: text;
	}

	@media (max-width: 640px) {
		.tui-line-top,
		.tui-line-bot {
			font-size: 0.74rem;
		}

		.tui-title {
			font-size: 0.74rem;
			padding: 0 0.35rem;
		}

		.tui-side-col {
			font-size: 0.74rem;
		}

		.tui-body {
			padding: var(--tui-body-padding, 0.75rem 0.65rem);
			gap: 0.85rem;
		}
	}
</style>
