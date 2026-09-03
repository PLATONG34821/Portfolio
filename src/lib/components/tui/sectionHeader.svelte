<script lang="ts" module>
	export type HeaderTheme = 'amber' | 'cyan' | 'emerald';

	export const headerThemes: Record<
		HeaderTheme,
		{ prefixColor: string; titleColor: string; subColor: string }
	> = {
		amber: { prefixColor: '#d97706', titleColor: '#f59e0b', subColor: '#fbbf24' },
		cyan: { prefixColor: '#0284c7', titleColor: '#38bdf8', subColor: '#64748b' },
		emerald: { prefixColor: '#059669', titleColor: '#10b981', subColor: '#6ee7b7' }
	};
</script>

<script lang="ts">
	interface Props {
		tag: string;
		title: string;
		theme?: HeaderTheme;
		prefixColor?: string;
		titleColor?: string;
		subColor?: string;
	}

	let {
		tag,
		title,
		theme,
		prefixColor = theme ? headerThemes[theme].prefixColor : '#785e2f',
		titleColor = theme ? headerThemes[theme].titleColor : '#fbbf24',
		subColor = theme ? headerThemes[theme].subColor : '#a8a29e'
	}: Props = $props();
</script>

<div class="section-header-row">
	<div class="section-tag-wrap">
		<span class="section-tag-prefix" style="color: {prefixColor};">//</span>
		<span class="section-tag-title" style="color: {titleColor};">{tag}</span>
		<span class="section-tag-sub" style="color: {subColor};">{title}</span>
	</div>
</div>

<style>
	.section-header-row {
		display: flex;
		justify-content: center;
		padding: 0 0.25rem;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.section-tag-wrap {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 600;
		flex-wrap: wrap;
		text-align: center;
	}

	.section-tag-title {
		letter-spacing: 0.04em;
	}

	.section-tag-sub {
		font-size: 0.74rem;
		font-weight: 400;
	}

	@media (max-width: 640px) {
		.section-tag-wrap {
			font-size: 0.72rem;
			gap: 0.35rem;
		}

		.section-tag-sub {
			font-size: 0.68rem;
		}
	}
</style>
