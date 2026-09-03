<script lang="ts">
	import { onMount } from 'svelte';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';

	interface Props {
		email?: string;
		githubUrl?: string;
	}

	let { email = 'thanaphum.dev@gmail.com', githubUrl = 'https://github.com/PLATONG34821' }: Props =
		$props();

	let copiedEmail = $state(false);
	let localTime = $state('');

	function copyEmail() {
		navigator.clipboard.writeText(email);
		copiedEmail = true;
		setTimeout(() => {
			copiedEmail = false;
		}, 2500);
	}

	onMount(() => {
		const updateClock = () => {
			const now = new Date();
			localTime = now.toLocaleTimeString('en-US', {
				timeZone: 'Asia/Bangkok',
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});
		};
		updateClock();
		const timer = setInterval(updateClock, 1000);
		return () => clearInterval(timer);
	});
</script>

<TuiBox
	title="Transmission Channels"
	titleColor="emerald"
	borderColor="#064e3b"
	cornerColor="#10b981"
	bgColor="#021a12"
	class="contact-box"
	bodyClass="contact-box-body"
>
	<!-- Status LED Banner -->
	<div class="status-banner">
		<span class="status-pulse"></span>
		<span class="status-text">TRANSMITTER ONLINE // OPEN FOR COLLABORATION</span>
	</div>

	<div class="channels-list">
		<!-- Email Channel -->
		<div class="channel-row">
			<div class="channel-meta">
				<span class="channel-protocol">PROTO: SMTP/TLS</span>
				<span class="channel-label">DIRECT EMAIL</span>
				<span class="channel-val">{email}</span>
			</div>
			<div class="channel-actions">
				<button type="button" class="action-btn" class:active={copiedEmail} onclick={copyEmail}>
					{copiedEmail ? '[COPIED ✓]' : '[COPY ADDR]'}
				</button>
				<a href="mailto:{email}" class="action-btn link-btn"> [MAIL CLIENT ↗] </a>
			</div>
		</div>

		<!-- GitHub Channel -->
		<div class="channel-row">
			<div class="channel-meta">
				<span class="channel-protocol">PROTO: HTTPS/GIT</span>
				<span class="channel-label">GITHUB REPOSITORIES</span>
				<span class="channel-val">@PLATONG34821</span>
			</div>
			<div class="channel-actions">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={githubUrl} target="_blank" rel="external noreferrer" class="action-btn link-btn">
					[VIEW CODE ↗]
				</a>
			</div>
		</div>

		<!-- Signal & Geolocation -->
		<div class="channel-row">
			<div class="channel-meta">
				<span class="channel-protocol">NODE: UTC+7 (BKK)</span>
				<span class="channel-label">STATION LOCAL TIME</span>
				<span class="channel-val font-mono">
					{localTime ? `${localTime} ICT` : 'SYNCHRONIZING...'}
				</span>
			</div>
			<div class="channel-actions">
				<span class="station-badge">ONLINE</span>
			</div>
		</div>
	</div>
</TuiBox>

<style>
	:global(.contact-box) {
		height: 100%;
	}

	:global(.contact-box-body) {
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	@media (max-width: 640px) {
		:global(.contact-box-body) {
			padding: 1rem 1rem;
			gap: 1rem;
		}
	}

	/* Status Banner */
	.status-banner {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.5rem 0.75rem;
		background: rgba(16, 185, 129, 0.08);
		border: 1px solid rgba(16, 185, 129, 0.25);
		font-size: 0.75rem;
		color: #34d399;
		letter-spacing: 0.04em;
	}

	.status-pulse {
		width: 8px;
		height: 8px;
		background-color: #10b981;
		border-radius: 50%;
		box-shadow: 0 0 8px #10b981;
		display: inline-block;
		animation: pulse-glow 2s infinite ease-in-out;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.3);
			opacity: 0.6;
		}
	}

	.status-text {
		font-weight: 600;
	}

	/* Channels List */
	.channels-list {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
	}

	.channel-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		padding-bottom: 1.15rem;
		border-bottom: 1px dashed #064e3b;
	}

	.channel-row:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	@media (max-width: 540px) {
		.channel-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}

	.channel-meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.channel-protocol {
		font-size: 0.68rem;
		color: #6ee7b7;
		letter-spacing: 0.06em;
	}

	.channel-label {
		font-size: 0.78rem;
		color: #9ca3af;
		font-weight: 600;
	}

	.channel-val {
		font-size: 0.88rem;
		color: #f3f4f6;
		word-break: break-all;
	}

	.channel-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.action-btn {
		background: transparent;
		color: #34d399;
		border: 1px solid #065f46;
		padding: 0.35rem 0.65rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s ease;
		display: inline-flex;
		align-items: center;
	}

	.action-btn:hover {
		background: rgba(16, 185, 129, 0.15);
		border-color: #10b981;
		color: #ffffff;
	}

	.action-btn.active {
		background: #10b981;
		color: #021a12;
		border-color: #10b981;
	}

	.station-badge {
		font-size: 0.72rem;
		color: #34d399;
		border: 1px solid #065f46;
		padding: 0.25rem 0.6rem;
		background: rgba(16, 185, 129, 0.05);
	}
</style>
