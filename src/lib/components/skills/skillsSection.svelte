<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import TuiBox from '$lib/components/tui/tuiBox.svelte';
	import SectionHeader from '$lib/components/tui/sectionHeader.svelte';
	import SkillItem from './skillItem.svelte';
	import { capabilityCategories } from '$lib/data/experienceData';

	interface Props {
		titleColor?: string;
		borderColor?: string;
		cornerColor?: string;
		bgColor?: string;
	}

	let {
		titleColor = 'cyan',
		borderColor = '#1e293b',
		cornerColor = '#334155',
		bgColor = '#030712'
	}: Props = $props();

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

		// 1. Header row
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

		// 2. Capability Boxes stagger
		const capBoxes = sectionElement.querySelectorAll('.tui-grid-3col > .cap-box');
		if (capBoxes.length > 0) {
			const boxTween = gsap.from(capBoxes, {
				y: 28,
				opacity: 0,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power3.out',
				force3D: true,
				clearProps: 'transform,opacity',
				scrollTrigger: {
					trigger: '.tui-grid-3col',
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

<section bind:this={sectionElement} class="skills-section" id="skills">
	<div class="content-container">
		<div class="section-block">
			<SectionHeader
				tag="SECTION 02"
				title="CAPABILITIES MATRIX"
				prefixColor="#0284c7"
				titleColor="#38bdf8"
				subColor="#64748b"
				dividerColor="#1e293b"
			/>

			<div class="tui-grid-3col">
				{#each capabilityCategories as category (category.id)}
					<TuiBox
						title={category.title}
						{titleColor}
						{borderColor}
						{cornerColor}
						{bgColor}
						class="cap-box"
						bodyClass="cap-body"
					>
						{#each category.items as item (item.skill)}
							<SkillItem {item} />
						{/each}
					</TuiBox>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skills-section {
		position: relative;
		width: 100%;
		background: #000000;
		color: #e5e7eb;
		padding: 5rem 1.5rem 12rem;
		z-index: 10;
		visibility: hidden;
		opacity: 0;
		pointer-events: auto;
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	@media (max-width: 1024px) {
		.skills-section {
			padding: 4.5rem 1.25rem 8rem;
		}
	}

	@media (max-width: 640px) {
		.skills-section {
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
		gap: 1.25rem;
	}

	.tui-grid-3col {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.5rem;
		align-items: start;
	}

	@media (max-width: 1024px) {
		.tui-grid-3col {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	@media (max-width: 680px) {
		.tui-grid-3col {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	:global(.cap-body) {
		gap: 0.85rem;
	}
</style>
