<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import { Link } from 'phosphor-svelte';
	import { contactProfile, getContactChannels } from '$lib/data/contactData';

	interface Props {
		email?: string;
		githubUrl?: string;
		lineUrl?: string;
		facebookUrl?: string;
	}

	let {
		email = contactProfile.email,
		githubUrl = contactProfile.githubUrl,
		lineUrl = contactProfile.lineUrl,
		facebookUrl = contactProfile.facebookUrl
	}: Props = $props();

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	const channels = $derived(getContactChannels(email, githubUrl, lineUrl, facebookUrl));

	function copyEmail() {
		if (copyTimer) clearTimeout(copyTimer);
		navigator?.clipboard?.writeText(email);
		copied = true;
		copyTimer = setTimeout(() => (copied = false), 2200);
	}

	$effect(() => {
		return () => {
			if (copyTimer) clearTimeout(copyTimer);
		};
	});
</script>

<TuiBox
	title={m.contactGetInTouch()}
	theme="emerald"
	class="contact-card-box"
	bodyClass="contact-card-body"
>
	<div class="contact-card-content">
		<div class="contact-intro">
			<p class="intro-summary">{contactProfile.summary}</p>
		</div>

		<div class="channels-grid">
			{#each channels as channel (channel.title)}
				<TuiBox
					title={channel.title}
					theme="emerald"
					bgColor="rgba(2, 26, 18, 0.6)"
					padding="0.75rem 0.95rem"
					class="channel-tui-box"
					bodyClass="channel-tui-body"
				>
					<div class="channel-content">
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<div class="channel-main">
							<a
								href={channel.href}
								target={channel.isExternal ? '_blank' : undefined}
								rel={channel.isExternal ? 'external noreferrer' : 'external'}
								class="channel-link"
							>
								{channel.display}
							</a>
						</div>
						<div class="entry-meta">
							<span class="meta-label">{m.detailsLabel()}</span>
							<span class="meta-text">{channel.details}</span>
						</div>
						<div class="entry-links">
							<span class="links-label" title={m.linksLabel()} aria-label={m.linksLabel()}>
								<Link size={13} weight="bold" />
							</span>
							<div class="links-list">
								{#if channel.id === 'email'}
									<button
										type="button"
										class="text-link"
										onclick={copyEmail}
										aria-label={m.copyEmailAria()}
									>
										{copied ? m.copied() : m.copyAddress()}
									</button>
									<a href={channel.href} class="text-link">{channel.linkLabel}</a>
								{:else}
									<a
										href={channel.href}
										target="_blank"
										rel="external noreferrer"
										class="text-link"
									>
										{channel.linkLabel}
									</a>
								{/if}
							</div>
						</div>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					</div>
				</TuiBox>
			{/each}
		</div>
	</div>
</TuiBox>

<style>
	:global(.contact-card-box) {
		width: 100%;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
		--tui-link-color: #34d399;
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
</style>
