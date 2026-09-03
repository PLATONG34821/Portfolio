<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import AsciiHero from '$lib/components/hero/asciiHero.svelte';
	import ExperienceSection from '$lib/components/experience/experienceSection.svelte';
	import SkillsSection from '$lib/components/skills/skillsSection.svelte';
	import ContactSection from '$lib/components/contact/contactSection.svelte';
</script>

<svelte:head>
	<title>{m.pageTitle()}</title>
	<meta name="description" content={m.pageDescription()} />
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
