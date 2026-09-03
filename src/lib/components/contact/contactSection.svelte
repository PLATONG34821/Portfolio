<script lang="ts">
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import ContactCard from './contactCard.svelte';
</script>

<section class="contact-section" id="contact">
	<div class="content-container">
		<div class="section-block">
			<SectionHeader tag="SECTION 03" title="CONTACT INFORMATION" theme="emerald" />

			<ContactCard />
		</div>
	</div>
</section>

<style>
	.contact-section {
		position: relative;
		width: 100%;
		background: #000000;
		color: #e5e7eb;
		padding: 5rem 1.5rem 14rem;
		z-index: 10;
		pointer-events: auto;
	}

	@media (max-width: 1024px) {
		.contact-section {
			padding: 4.5rem 1.25rem 10rem;
		}
	}

	@media (max-width: 640px) {
		.contact-section {
			padding: 3.5rem 0.75rem 8rem;
		}
	}
</style>
