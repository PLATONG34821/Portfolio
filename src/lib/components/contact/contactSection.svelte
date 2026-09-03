<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import TransmissionChannels from './transmissionChannels.svelte';
	import StationArchitecture from './stationArchitecture.svelte';
	import TerminalFooter from './terminalFooter.svelte';

	let sectionElement = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!sectionElement) return;
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
			triggers.forEach((st) => st.kill());
			tweens.forEach((tw) => tw.kill());
		};
	});
</script>

<section bind:this={sectionElement} class="contact-section" id="contact">
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

			<div class="contact-grid">
				<TransmissionChannels />
				<StationArchitecture />
			</div>

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
		visibility: hidden;
		opacity: 0;
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
</style>
