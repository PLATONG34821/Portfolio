<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$lib/paraglide/messages';
	import AsciiHero from '$lib/components/hero/asciiHero.svelte';
	import ExperienceSection from '$lib/components/experience/experienceSection.svelte';
	import SkillsSection from '$lib/components/skills/skillsSection.svelte';
	import ContactSection from '$lib/components/contact/contactSection.svelte';

	const origin = $derived($page.url.origin);
	const canonical = $derived($page.url.href);
</script>

<svelte:head>
	<title>{m.pageTitle()}</title>
	<meta name="description" content={m.pageDescription()} />
	<meta name="theme-color" content="#000000" />

	<!-- Canonical -->
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={m.pageTitle()} />
	<meta property="og:description" content={m.pageDescription()} />
	<meta property="og:image" content="{origin}/og-image.png" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.pageTitle()} />
	<meta name="twitter:description" content={m.pageDescription()} />
	<meta name="twitter:image" content="{origin}/og-image.png" />

	<!-- i18n alternates -->
	<link rel="alternate" hreflang="en" href="{origin}/" />
	<link rel="alternate" hreflang="th" href="{origin}/th" />
	<link rel="alternate" hreflang="x-default" href="{origin}/" />
</svelte:head>

<main class="page-container">
	<h1 class="sr-only">{m.pageTitle()}</h1>
	<AsciiHero />
	<ExperienceSection />
	<SkillsSection />
	<ContactSection />
</main>

<style>
	.page-container {
		background-color: #000000;
		min-height: 100vh;
		width: 100%;
		position: relative;
		overflow-x: hidden;
	}
</style>
