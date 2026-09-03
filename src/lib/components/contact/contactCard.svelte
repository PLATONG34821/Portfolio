<script lang="ts">
	import { onMount } from 'svelte';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';

	interface Props {
		email?: string;
		githubUrl?: string;
	}

	let { email = 'thanaphum.dev@gmail.com', githubUrl = 'https://github.com/PLATONG34821' }: Props =
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
	title="COMMUNICATION HUB"
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
			<span class="node-label">BANGKOK (UTC+7) // {localTime ? `${localTime} ICT` : 'ONLINE'}</span>
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
			<div class="channel-card">
				<div class="channel-header">
					<span class="channel-idx">01</span>
					<span class="channel-type">DIRECT INBOX</span>
				</div>
				<div class="channel-main">
					<a href="mailto:{email}" class="channel-link">
						{email}
					</a>
				</div>
				<div class="channel-footer">
					<button
						type="button"
						class="tui-btn copy-btn"
						class:copied
						onclick={copyEmail}
						aria-label="Copy email address"
					>
						{copied ? '[COPIED ✓]' : '[COPY ADDRESS]'}
					</button>
					<a href="mailto:{email}" class="tui-btn mail-btn"> [OPEN MAIL ↗] </a>
				</div>
			</div>

			<!-- GitHub Card -->
			<div class="channel-card">
				<div class="channel-header">
					<span class="channel-idx">02</span>
					<span class="channel-type">CODE REPOSITORIES</span>
				</div>
				<div class="channel-main">
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={githubUrl} target="_blank" rel="external noreferrer" class="channel-link">
						github.com/PLATONG34821
					</a>
				</div>
				<div class="channel-footer">
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={githubUrl} target="_blank" rel="external noreferrer" class="tui-btn github-btn">
						[VISIT GITHUB ↗]
					</a>
				</div>
			</div>
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

	.channel-card {
		background: rgba(2, 26, 18, 0.6);
		border: 1px solid rgba(16, 185, 129, 0.2);
		padding: 1.15rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}

	.channel-card:hover {
		border-color: rgba(16, 185, 129, 0.45);
		background: rgba(2, 26, 18, 0.9);
	}

	.channel-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.72rem;
		color: #6b7280;
	}

	.channel-idx {
		color: #10b981;
		font-weight: 700;
	}

	.channel-type {
		letter-spacing: 0.06em;
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

	.channel-footer {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: auto;
		flex-wrap: wrap;
	}

	.tui-btn {
		background: transparent;
		color: #9ca3af;
		border: 1px solid rgba(156, 163, 175, 0.25);
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.35rem 0.65rem;
		cursor: pointer;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		line-height: 1;
		transition: all 0.15s ease;
	}

	.tui-btn:hover {
		color: #34d399;
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.08);
	}

	.copy-btn.copied {
		color: #10b981;
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.15);
	}
</style>
