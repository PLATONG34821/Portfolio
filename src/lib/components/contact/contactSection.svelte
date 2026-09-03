<script lang="ts">
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import ContactCard from './contactCard.svelte';
	import TerminalFooter from './terminalFooter.svelte';
</script>

<section class="contact-section" id="contact">
	<div class="content-container">
		<div class="section-block">
			<SectionHeader
				tag="SECTION 03"
				title="COMM CHANNELS & TRANSMISSION"
				prefixColor="#059669"
				titleColor="#10b981"
				subColor="#6ee7b7"
				dividerColor="#064e3b"
			/>

			<ContactCard />

			<TerminalFooter />
		</div>
	</div>
</section>

<style>
	.contact-section {
		position: relative;
		width: 100%;
		background: #000000;
		color: #e5e7eb;
		padding: 5rem 1.5rem 10rem;
		z-index: 10;
		pointer-events: auto;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 1024px) {
		.contact-section {
			padding: 4.5rem 1.25rem 8rem;
		}
	}

	@media (max-width: 640px) {
		.contact-section {
			padding: 3.5rem 0.75rem 6rem;
		}
	}

	.content-container {
		max-width: 1160px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (max-width: 640px) {
		.content-container {
			gap: 1.25rem;
		}
	}

	.section-block {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
