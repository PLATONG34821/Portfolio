<script lang="ts">
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import { Link } from 'phosphor-svelte';

	interface Props {
		email?: string;
		githubUrl?: string;
	}

	let { email = 'platong34821@gmail.com', githubUrl = 'https://github.com/PLATONG34821' }: Props =
		$props();

	let copied = $state(false);

	function copyEmail() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2200);
		}
	}
</script>

<TuiBox
	title="GET IN TOUCH"
	titleColor="emerald"
	borderColor="#064e3b"
	cornerColor="#10b981"
	bgColor="#021a12"
	class="contact-card-box"
	bodyClass="contact-card-body"
>
	<div class="contact-card-content">
		<!-- Compact Spec Intro -->
		<div class="contact-intro">
			<p class="intro-summary">
				Available for full-stack engineering, performance systems, and collaborative software
				architecture.
			</p>
		</div>

		<!-- Direct Action Channels -->
		<div class="channels-grid">
			<!-- Email Card -->
			<TuiBox
				title="EMAIL ADDRESS"
				titleColor="emerald"
				borderColor="#064e3b"
				cornerColor="#10b981"
				bgColor="rgba(2, 26, 18, 0.6)"
				padding="0.75rem 0.95rem"
				class="channel-tui-box"
				bodyClass="channel-tui-body"
			>
				<div class="channel-content">
					<div class="channel-main">
						<a href="mailto:{email}" class="channel-link">
							{email}
						</a>
					</div>
					<div class="entry-meta">
						<span class="meta-label">Details:</span>
						<span class="meta-text"
							>Direct inbox for technical roles, inquiries & collaboration</span
						>
					</div>
					<div class="entry-links">
						<span class="links-label" title="Links" aria-label="Links">
							<Link size={13} weight="bold" />
						</span>
						<div class="links-list">
							<button
								type="button"
								class="text-link"
								onclick={copyEmail}
								aria-label="Copy email address"
							>
								{copied ? 'Copied!' : 'Copy Address ↗'}
							</button>
							<a href="mailto:{email}" class="text-link"> Open Mail ↗ </a>
						</div>
					</div>
				</div>
			</TuiBox>

			<!-- GitHub Card -->
			<TuiBox
				title="GITHUB PROFILE"
				titleColor="emerald"
				borderColor="#064e3b"
				cornerColor="#10b981"
				bgColor="rgba(2, 26, 18, 0.6)"
				padding="0.75rem 0.95rem"
				class="channel-tui-box"
				bodyClass="channel-tui-body"
			>
				<div class="channel-content">
					<div class="channel-main">
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={githubUrl} target="_blank" rel="external noreferrer" class="channel-link">
							github.com/PLATONG34821
						</a>
					</div>
					<div class="entry-meta">
						<span class="meta-label">Details:</span>
						<span class="meta-text"
							>Open source repositories, system infrastructure & active codebases</span
						>
					</div>
					<div class="entry-links">
						<span class="links-label" title="Links" aria-label="Links">
							<Link size={13} weight="bold" />
						</span>
						<div class="links-list">
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={githubUrl} target="_blank" rel="external noreferrer" class="text-link">
								GitHub Profile ↗
							</a>
						</div>
					</div>
				</div>
			</TuiBox>
		</div>
	</div>
</TuiBox>

<style>
	:global(.contact-card-box) {
		width: 100%;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	:global(.contact-card-body) {
		padding: 1.25rem 1.4rem;
	}

	@media (max-width: 640px) {
		:global(.contact-card-body) {
			padding: 0.85rem 0.75rem;
		}
	}

	.contact-card-content {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.contact-intro {
		margin: 0;
	}

	.intro-summary {
		margin: 0;
		color: #d4d4d8;
		font-size: 0.82rem;
		line-height: 1.4;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.channels-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	@media (max-width: 768px) {
		.channels-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	:global(.channel-tui-box) {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	:global(.channel-tui-box .tui-body),
	:global(.channel-tui-body) {
		display: flex !important;
		flex-direction: column !important;
		gap: 0 !important;
		height: 100% !important;
		min-width: 0 !important;
	}

	.channel-content {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 100%;
		height: 100%;
	}

	.channel-main {
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.25;
		margin: 0;
		padding: 0;
	}

	.channel-link {
		color: #f4f4f5;
		font-size: 1.08rem;
		font-weight: 700;
		text-decoration: none;
		word-break: break-all;
		transition: color 0.15s ease;
		display: inline-block;
		line-height: 1.25;
		margin: 0;
		padding: 0;
	}

	@media (max-width: 640px) {
		.channel-link {
			font-size: 0.95rem;
		}
	}

	.channel-link:hover {
		color: #34d399;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.entry-meta {
		display: flex;
		gap: 0.45rem;
		font-size: 0.76rem;
		line-height: 1.35;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
	}

	.meta-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.meta-text {
		color: #a1a1aa;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.entry-links {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.78rem;
		line-height: 1.4;
		padding-top: 0;
		margin-top: 0.05rem;
	}

	.links-label {
		color: #71717a;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 1.4em;
		flex-shrink: 0;
	}

	.links-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.35rem 0.75rem;
		line-height: 1.4;
	}

	.text-link {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #34d399 !important; /* Emerald Link matching Section 3 */
		font-family: inherit;
		font-size: 0.78rem;
		font-weight: 500;
		line-height: 1.4;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
		transition:
			color 0.15s ease,
			text-decoration 0.15s ease;
	}

	.text-link:hover {
		color: #ffffff !important;
		text-decoration: underline !important;
		text-underline-offset: 3px;
	}
</style>
