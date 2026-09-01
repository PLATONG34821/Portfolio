<script lang="ts">
	import AsciiHero from '$lib/components/asciiHero.svelte';
</script>

<svelte:head>
	<title>Thanaphum — Portfolio</title>
	<meta name="description" content="Portfolio of Thanaphum with variable typographic ASCII animation" />
</svelte:head>

<main class="page-container">
	<AsciiHero startText="THANAPHUM" endText="EXPERIENCE" />
</main>

<style>
	.page-container {
		background-color: #000000;
		min-height: 100vh;
		width: 100%;
	}
</style>
