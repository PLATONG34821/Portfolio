<script lang="ts" module>
	export type TuiTheme = 'amber' | 'cyan' | 'emerald';

	export const tuiThemes: Record<
		TuiTheme,
		{ titleColor: string; borderColor: string; cornerColor: string; bgColor: string }
	> = {
		amber: {
			titleColor: 'amber',
			borderColor: '#382f1d',
			cornerColor: '#785e2f',
			bgColor: 'rgba(18, 14, 8, 0.45)'
		},
		cyan: {
			titleColor: 'cyan',
			borderColor: '#1e293b',
			cornerColor: '#334155',
			bgColor: '#030712'
		},
		emerald: {
			titleColor: 'emerald',
			borderColor: '#064e3b',
			cornerColor: '#10b981',
			bgColor: '#021a12'
		}
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		theme?: TuiTheme;
		titleColor?: string;
		borderColor?: string;
		cornerColor?: string;
		bgColor?: string;
		padding?: string;
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
		theme,
		titleColor = theme ? tuiThemes[theme].titleColor : 'amber',
		borderColor = theme ? tuiThemes[theme].borderColor : '#27272a',
		cornerColor = theme ? tuiThemes[theme].cornerColor : '#3f3f46',
		bgColor = theme ? tuiThemes[theme].bgColor : 'transparent',
		padding,
		titlePrefix = '',
		titleSuffix = '',
		id,
		class: className = '',
		bodyClass = '',
		topRightAction,
		children
	}: Props = $props();

	const colorMap: Record<string, string> = {
		coral: '#f87171',
		cyan: '#38bdf8',
		emerald: '#34d399',
		amber: '#fbbf24',
		gold: '#facc15',
		purple: '#c084fc',
		rose: '#fb7185'
	};

	const resolvedTitleColor = $derived(colorMap[titleColor] ?? titleColor);
	const horizontalFill = '-'.repeat(250);
	const verticalBorderText = '|\n'.repeat(200);
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
	<div class="tui-line-top">
		<span class="tui-corner">+--</span>
		<span class="tui-title">{titlePrefix}{title}{titleSuffix}</span>
		<span class="tui-fill">{horizontalFill}</span>
		{#if topRightAction}
			{@render topRightAction()}
		{/if}
		<span class="tui-corner">--+</span>
	</div>

	<div class="tui-middle-row">
		<div class="tui-side-col tui-side-left">
			{verticalBorderText}
		</div>

		<div class="tui-body {bodyClass}">
			{#if children}
				{@render children()}
			{/if}
		</div>

		<div class="tui-side-col tui-side-right">
			{verticalBorderText}
		</div>
	</div>

	<div class="tui-line-bot">
		<span class="tui-corner">+--</span>
		<span class="tui-fill">{horizontalFill}</span>
		<span class="tui-corner">--+</span>
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
