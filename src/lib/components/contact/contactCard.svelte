<script lang="ts">
	import { onMount } from 'svelte';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import { Link } from 'phosphor-svelte';

	interface Props {
		email?: string;
		githubUrl?: string;
	}

	let { email = 'platong34821@gmail.com', githubUrl = 'https://github.com/PLATONG34821' }: Props =
		$props();

	let copied = $state(false);
	let localTime = $state('');

	function copyEmail() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2200);
		}
	}

	onMount(() => {
		const updateTime = () => {
			localTime = new Intl.DateTimeFormat('en-GB', {
				timeZone: 'Asia/Bangkok',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			}).format(new Date());
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
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
	{#snippet topRightAction()}
		<div class="node-badge">
			<span class="pulse-dot"></span>
			<span class="node-label"
				>BANGKOK, THAILAND (UTC+7) // {localTime ? `${localTime} ICT` : 'ONLINE'}</span
			>
		</div>
	{/snippet}

	<div class="contact-card-content">
		<!-- Minimal Editorial Intro -->
		<div class="intro-headline-row">
			<div class="headline-block">
				<h3 class="headline-text">HAVE A PROJECT OR ROLE IN MIND?</h3>
				<p class="headline-sub">
					Open for full-stack engineering, performance systems, and collaborative software
					architecture.
				</p>
			</div>
		</div>

		<!-- Direct Action Channels -->
		<div class="channels-grid">
			<!-- Email Card -->
			<TuiBox
				title="01 // EMAIL ADDRESS"
				titleColor="emerald"
				borderColor="#064e3b"
				cornerColor="#10b981"
				bgColor="rgba(2, 26, 18, 0.6)"
				padding="0.85rem 1rem"
				class="channel-tui-box"
				bodyClass="channel-tui-body"
			>
				<div class="channel-main">
					<a href="mailto:{email}" class="channel-link">
						{email}
					</a>
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
							{copied ? 'Copied ✓' : 'Copy Address'}
						</button>
						<a href="mailto:{email}" class="text-link"> Open Mail ↗ </a>
					</div>
				</div>
			</TuiBox>

			<!-- GitHub Card -->
			<TuiBox
				title="02 // GITHUB PROFILE"
				titleColor="emerald"
				borderColor="#064e3b"
				cornerColor="#10b981"
				bgColor="rgba(2, 26, 18, 0.6)"
				padding="0.85rem 1rem"
				class="channel-tui-box"
				bodyClass="channel-tui-body"
			>
				<div class="channel-main">
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={githubUrl} target="_blank" rel="external noreferrer" class="channel-link">
						github.com/PLATONG34821
					</a>
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
			</TuiBox>
		</div>
	</div>
</TuiBox>

<style>
	:global(.contact-card-box) {
		width: 100%;
	}

	:global(.contact-card-body) {
		padding: 1.75rem 2rem;
	}

	@media (max-width: 640px) {
		:global(.contact-card-body) {
			padding: 1.25rem 1.1rem;
		}
	}

	.node-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.72rem;
		letter-spacing: 0.05em;
		color: #34d399;
	}

	.pulse-dot {
		width: 6px;
		height: 6px;
		background: #10b981;
		border-radius: 50%;
		box-shadow: 0 0 6px #10b981;
		display: inline-block;
	}

	.contact-card-content {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	/* Headline Row */
	.intro-headline-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.5rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid rgba(16, 185, 129, 0.15);
	}

	@media (max-width: 768px) {
		.intro-headline-row {
			flex-direction: column;
			gap: 1rem;
		}
	}

	.headline-block {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.headline-text {
		font-size: 1.25rem;
		font-weight: 700;
		color: #f3f4f6;
		letter-spacing: -0.01em;
		margin: 0;
	}

	@media (max-width: 640px) {
		.headline-text {
			font-size: 1.05rem;
		}
	}

	.headline-sub {
		color: #9ca3af;
		font-size: 0.85rem;
		line-height: 1.5;
		margin: 0;
		max-width: 650px;
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
	}

	:global(.channel-tui-body) {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		height: 100%;
		min-width: 0;
	}

	.channel-main {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.channel-link {
		color: #e5e7eb;
		font-size: 0.98rem;
		font-weight: 600;
		text-decoration: none;
		word-break: break-all;
		transition: color 0.15s ease;
	}

	.channel-link:hover {
		color: #34d399;
	}

	.entry-links {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.78rem;
		margin-top: auto;
		padding-top: 0.1rem;
		flex-wrap: wrap;
	}

	.links-label {
		color: #71717a;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
	}

	.links-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
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
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
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
