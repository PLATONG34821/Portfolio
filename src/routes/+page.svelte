<script lang="ts">
	import AsciiHero from '$lib/components/hero/asciiHero.svelte';
	import ExperienceSection from '$lib/components/experience/experienceSection.svelte';
	import SkillsSection from '$lib/components/skills/skillsSection.svelte';
	import ContactSection from '$lib/components/contact/contactSection.svelte';
</script>

<svelte:head>
	<title>Thanaphum — Portfolio</title>
	<meta name="description" content="Portfolio of Thanaphum — Developer & Open Source Creator" />
</svelte:head>

<main class="page-container">
	<AsciiHero startText="THANAPHUM\nPORTFOLIO" endText="EXPERIENCE" />
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
