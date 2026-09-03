<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import TuiBox from './tuiBox.svelte';

	let sectionElement = $state<HTMLElement | null>(null);
	let copiedEmail = $state(false);
	let localTime = $state('');

	const EMAIL = 'thanaphum.dev@gmail.com';
	const GITHUB_URL = 'https://github.com/PLATONG34821';

	function copyEmail() {
		navigator.clipboard.writeText(EMAIL);
		copiedEmail = true;
		setTimeout(() => {
			copiedEmail = false;
		}, 2500);
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		// Digital live clock in Bangkok (UTC+7)
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

		if (!sectionElement) return () => clearInterval(timer);
		gsap.registerPlugin(ScrollTrigger);

		const triggers: ScrollTrigger[] = [];
		const tweens: gsap.core.Tween[] = [];

		gsap.set(sectionElement, { autoAlpha: 0 });

		const mainTween = gsap.to(sectionElement, {
			autoAlpha: 1,
			duration: 0.4,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top 85%',
				once: true
			}
		});
		tweens.push(mainTween);
		if (mainTween.scrollTrigger) triggers.push(mainTween.scrollTrigger);

		// Header row animation
		const headerRow = sectionElement.querySelector('.section-header-row');
		if (headerRow) {
			const headerTween = gsap.from(headerRow, {
				y: -12,
				opacity: 0,
				duration: 0.4,
				ease: 'power2.out',
				force3D: true,
				clearProps: 'transform,opacity',
				scrollTrigger: {
					trigger: headerRow,
					start: 'top 88%',
					once: true
				}
			});
			tweens.push(headerTween);
			if (headerTween.scrollTrigger) triggers.push(headerTween.scrollTrigger);
		}

		// Grid boxes stagger
		const boxes = sectionElement.querySelectorAll('.contact-grid > *');
		if (boxes.length > 0) {
			const boxTween = gsap.from(boxes, {
				y: 28,
				opacity: 0,
				duration: 0.5,
				stagger: 0.1,
				ease: 'power3.out',
				force3D: true,
				clearProps: 'transform,opacity',
				scrollTrigger: {
					trigger: '.contact-grid',
					start: 'top 85%',
					once: true
				}
			});
			tweens.push(boxTween);
			if (boxTween.scrollTrigger) triggers.push(boxTween.scrollTrigger);
		}

		return () => {
			clearInterval(timer);
			triggers.forEach((st) => st.kill());
			tweens.forEach((tw) => tw.kill());
		};
	});
</script>

<section bind:this={sectionElement} class="contact-section" id="contact">
	<div class="content-container">
		<div class="section-block">
			<!-- Section Header: Tag at Top Right -->
			<div class="section-header-row">
				<div class="section-tag-wrap">
					<span class="section-tag-prefix">//</span>
					<span class="section-tag-title">SECTION 03</span>
					<span class="section-tag-sub">COMM CHANNELS & TRANSMISSION</span>
				</div>
			</div>

			<div class="contact-grid">
				<!-- Column 1: Direct Transmission Channels -->
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
								<span class="channel-val">{EMAIL}</span>
							</div>
							<div class="channel-actions">
								<button
									type="button"
									class="action-btn"
									class:active={copiedEmail}
									onclick={copyEmail}
								>
									{copiedEmail ? '[COPIED ✓]' : '[COPY ADDR]'}
								</button>
								<a href="mailto:{EMAIL}" class="action-btn link-btn"> [MAIL CLIENT ↗] </a>
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
								<a href={GITHUB_URL} target="_blank" rel="noreferrer" class="action-btn link-btn">
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

				<!-- Column 2: System Node Info (Fastfetch Spec) -->
				<TuiBox
					title="Station Architecture"
					titleColor="emerald"
					borderColor="#064e3b"
					cornerColor="#10b981"
					bgColor="#021a12"
					class="contact-box"
					bodyClass="contact-box-body"
				>
					<div class="sys-info-wrap">
						<div class="sys-header">
							<span class="sys-prompt">thanaphum@dev-station</span>
							<span class="sys-sub">------------------------</span>
						</div>

						<div class="sys-spec-list">
							<div class="spec-line">
								<span class="spec-k">Role:</span>
								<span class="spec-v">Full-Stack & Systems Developer</span>
							</div>
							<div class="spec-line">
								<span class="spec-k">OS / Core:</span>
								<span class="spec-v">macOS / Arch Linux</span>
							</div>
							<div class="spec-line">
								<span class="spec-k">Primary Stack:</span>
								<span class="spec-v">TypeScript, Svelte 5, Go, Python</span>
							</div>
							<div class="spec-line">
								<span class="spec-k">DevOps & Cloud:</span>
								<span class="spec-v">Docker Swarm, Linux Containers, Cloudflare</span>
							</div>
							<div class="spec-line">
								<span class="spec-k">Focus:</span>
								<span class="spec-v">High-performance web, Clean Architecture, TUI</span>
							</div>
							<div class="spec-line">
								<span class="spec-k">Availability:</span>
								<span class="spec-v highlight-green">Open to Full-Time / Contract</span>
							</div>
						</div>

						<div class="sys-footer-note">
							<span class="note-prefix">></span>
							<span class="note-body"
								>Need a reliable engineer with sharp execution? Let's talk.</span
							>
						</div>
					</div>
				</TuiBox>
			</div>

			<!-- Terminal Footer Bar -->
			<div class="terminal-footer">
				<div class="footer-meta">
					<span class="meta-code">[SYS_STATUS: 0 OK]</span>
					<span class="meta-copy">THANAPHUM © 2026 // ALL SYSTEMS OPERATIONAL</span>
				</div>
				<button type="button" class="back-to-top-btn" onclick={scrollToTop}>
					[^ BACK TO TOP]
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-section {
		position: relative;
		width: 100%;
		background: #000000;
		color: #e5e7eb;
		padding: 5rem 1.5rem 8rem;
		z-index: 10;
		visibility: hidden;
		opacity: 0;
		pointer-events: auto;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 1024px) {
		.contact-section {
			padding: 4.5rem 1.25rem 6rem;
		}
	}

	@media (max-width: 640px) {
		.contact-section {
			padding: 3.5rem 0.75rem 5rem;
		}
	}

	.content-container {
		max-width: 1180px;
		width: 100%;
		margin: 0 auto;
	}

	.section-block {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Section Header Row with Tag at Left */
	.section-header-row {
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
		padding: 0 0.25rem 0.5rem;
		border-bottom: 1px dashed #064e3b;
		margin-bottom: 0.5rem;
	}

	.section-tag-wrap {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.82rem;
		letter-spacing: 0.08em;
	}

	@media (max-width: 640px) {
		.section-tag-wrap {
			font-size: 0.72rem;
			gap: 0.35rem;
		}
	}

	.section-tag-prefix {
		color: #10b981;
		font-weight: 700;
	}

	.section-tag-title {
		color: #e5e7eb;
		font-weight: 700;
	}

	.section-tag-sub {
		color: #34d399;
		font-weight: 500;
	}

	/* 2-Column Responsive Layout */
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		width: 100%;
	}

	@media (max-width: 900px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
	}

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

	/* System Node Specs */
	.sys-info-wrap {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.82rem;
	}

	.sys-header {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.sys-prompt {
		color: #34d399;
		font-weight: 700;
		font-size: 0.88rem;
	}

	.sys-sub {
		color: #064e3b;
	}

	.sys-spec-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.spec-line {
		display: flex;
		align-items: baseline;
		gap: 0.65rem;
		line-height: 1.4;
	}

	@media (max-width: 500px) {
		.spec-line {
			flex-direction: column;
			gap: 0.15rem;
		}
	}

	.spec-k {
		color: #6b7280;
		min-width: 120px;
		flex-shrink: 0;
	}

	.spec-v {
		color: #e5e7eb;
	}

	.highlight-green {
		color: #34d399;
		font-weight: 600;
	}

	.sys-footer-note {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px dashed #064e3b;
		color: #a7f3d0;
		font-size: 0.8rem;
		font-style: italic;
	}

	.note-prefix {
		color: #10b981;
		font-weight: 700;
		font-style: normal;
	}

	/* Terminal Footer Bar */
	.terminal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
		margin-top: 1rem;
		border-top: 1px solid #1f2937;
		font-size: 0.78rem;
		gap: 1rem;
	}

	@media (max-width: 640px) {
		.terminal-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			padding-top: 1.5rem;
		}
	}

	.footer-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.meta-code {
		color: #34d399;
		font-weight: 700;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	.meta-copy {
		color: #6b7280;
	}

	.back-to-top-btn {
		background: transparent;
		color: #9ca3af;
		border: 1px solid #374151;
		padding: 0.45rem 0.85rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.back-to-top-btn:hover {
		color: #f9fafb;
		border-color: #6b7280;
		background: #111827;
	}
</style>
