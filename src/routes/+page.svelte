<script lang="ts">
	import AsciiHero from '$lib/components/asciiHero.svelte';
	import ExperienceSection from '$lib/components/experienceSection.svelte';
</script>

<svelte:head>
	<title>Thanaphum — Portfolio</title>
	<meta
		name="description"
		content="Portfolio of Thanaphum — Developer & Open Source Creator"
	/>
</svelte:head>

<main class="page-container">
	<AsciiHero startText="THANAPHUM" endText="EXPERIENCE" />
	<ExperienceSection />
</main>

<style>
	.page-container {
		background-color: #000000;
		min-height: 100vh;
		width: 100%;
		position: relative;
	}
</style>
