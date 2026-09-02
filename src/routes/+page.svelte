<script lang="ts">
	import AsciiHero from '$lib/components/asciiHero.svelte';
	import ExperienceSection from '$lib/components/experienceSection.svelte';

	let scrollProgress = $state(0);
</script>

<svelte:head>
	<title>Thanaphum — Portfolio</title>
	<meta name="description" content="Portfolio of Thanaphum — Developer & Open Source Creator" />
</svelte:head>

<main class="page-container">
	<AsciiHero bind:scrollProgress startText="THANAPHUM\nPORTFOLIO" endText="EXPERIENCE" />
	<ExperienceSection {scrollProgress} />
</main>

<style>
	.page-container {
		background-color: #000000;
		min-height: 100vh;
		width: 100%;
		position: relative;
	}
</style>
