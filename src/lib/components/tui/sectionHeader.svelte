<script lang="ts">
	interface Props {
		tag: string; // e.g. "SECTION 01"
		title: string; // e.g. "EXPERIENCE & AWARDS"
		prefixColor?: string;
		titleColor?: string;
		subColor?: string;
		dividerColor?: string;
	}

	let {
		tag,
		title,
		prefixColor = '#785e2f',
		titleColor = '#fbbf24',
		subColor = '#a8a29e',
		dividerColor = '#292524'
	}: Props = $props();

	const dividerText = '-'.repeat(250);
</script>

<div class="section-header-row">
	<div class="section-tag-wrap">
		<span class="section-tag-prefix" style="color: {prefixColor};">//</span>
		<span class="section-tag-title" style="color: {titleColor};">{tag}</span>
		<span class="section-tag-sub" style="color: {subColor};">{title}</span>
	</div>
	<div class="section-header-divider" style="color: {dividerColor};">{dividerText}</div>
</div>

<style>
	.section-header-row {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0 0.25rem 0;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.section-tag-wrap {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 600;
		flex-wrap: wrap;
	}

	.section-tag-title {
		letter-spacing: 0.04em;
	}

	.section-tag-sub {
		font-size: 0.74rem;
		font-weight: 400;
	}

	.section-header-divider {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		letter-spacing: 0;
		font-family: inherit;
		font-size: 0.8rem;
		line-height: 1;
		user-select: text;
		-webkit-user-select: text;
	}

	@media (max-width: 640px) {
		.section-tag-wrap {
			font-size: 0.72rem;
			gap: 0.35rem;
		}

		.section-tag-sub {
			font-size: 0.68rem;
		}

		.section-header-divider {
			font-size: 0.72rem;
		}
	}
</style>
