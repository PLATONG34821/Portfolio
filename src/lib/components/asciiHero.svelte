<script lang="ts">
	import { onMount } from 'svelte';
	import {
		generateFigletArt,
		extractFigletPoints,
		createFigletParticles,
		type FigletParticle
	} from '$lib/ascii/variableAscii';

	interface Props {
		startText?: string;
		endText?: string;
		scrollProgress?: number;
	}

	let {
		startText = 'THANAPHUM\nPORTFOLIO',
		endText = 'EXPERIENCE',
		scrollProgress = $bindable(0)
	}: Props = $props();

	let containerElement = $state<HTMLElement | null>(null);
	let canvasElement = $state<HTMLCanvasElement | null>(null);

	onMount(() => {
		if (!canvasElement) return;

		let animationFrameId: number;
		let particles: FigletParticle[] = [];
		let currentCols = 120;
		let currentRows = 38;
		let maxArtHeight = 19;
		let endTextLinesCount = 9;

		const initSimulation = () => {
			if (!canvasElement) return;

			const dpr = window.devicePixelRatio || 1;
			const width = window.innerWidth;
			const height = window.innerHeight;

			canvasElement.width = width * dpr;
			canvasElement.height = height * dpr;
			canvasElement.style.width = `${width}px`;
			canvasElement.style.height = `${height}px`;

			const linesA = generateFigletArt(startText);
			const linesB = generateFigletArt(endText);

			const maxArtWidth = Math.max(...linesA.map((l) => l.length), ...linesB.map((l) => l.length));
			maxArtHeight = Math.max(linesA.length, linesB.length);
			endTextLinesCount = linesB.length;

			currentCols = Math.max(maxArtWidth + 14, 120);
			currentRows = Math.max(maxArtHeight + 8, 32);

			const pointsA = extractFigletPoints(linesA, currentCols, currentRows);
			const pointsB = extractFigletPoints(linesB, currentCols, currentRows);

			particles = createFigletParticles(pointsA, pointsB);
		};

		initSimulation();

		let currentProgress = 0;
		let targetProgress = 0;

		const handleScroll = () => {
			const scrollY = window.scrollY || window.pageYOffset;
			const scrollDistance = Math.max(350, window.innerHeight * 0.65);
			const rawProgress = scrollY / scrollDistance;
			targetProgress = Math.max(0, Math.min(1, rawProgress));
			scrollProgress = targetProgress;
		};

		const handleResize = () => {
			initSimulation();
			handleScroll();
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize, { passive: true });
		handleScroll();

		const easeInOutCubic = (t: number): number => {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		};

		let lastTime = performance.now();

		const render = (now: number) => {
			const delta = Math.min(32, now - lastTime);
			lastTime = now;

			if (!canvasElement || !particles.length) {
				animationFrameId = requestAnimationFrame(render);
				return;
			}

			const context = canvasElement.getContext('2d');
			if (!context) {
				animationFrameId = requestAnimationFrame(render);
				return;
			}

			const dpr = window.devicePixelRatio || 1;
			const width = window.innerWidth;
			const height = window.innerHeight;

			// Smooth scroll interpolation
			currentProgress += (targetProgress - currentProgress) * 0.16;

			// Phase 1: 0.0 -> 0.7 (Morph THANAPHUM -> EXPERIENCE)
			// Phase 2: 0.2 -> 0.85 (Slide EXP smoothly up to top header)
			const morphPhase = Math.min(1, currentProgress / 0.7);
			const slidePhase = Math.max(0, Math.min(1, (currentProgress - 0.2) / 0.65));

			const t = easeInOutCubic(morphPhase);
			const slideT = easeInOutCubic(slidePhase);

			const midDispersal = Math.sin(t * Math.PI);
			const dispersionFactor = Math.pow(midDispersal, 1.8);

			// Clear canvas transparently so content underneath flows through
			context.save();
			context.scale(dpr, dpr);
			context.clearRect(0, 0, width, height);

			// Calculate original crisp font sizing (no shrinking)
			const baseFontSize = Math.min(
				Math.floor((width * 0.94) / (currentCols * 0.6)),
				Math.floor((height * 0.8) / (currentRows * 1.15))
			);
			const fontSize = Math.max(6.5, Math.min(14, baseFontSize));
			const cellWidth = fontSize * 0.6;
			const cellHeight = fontSize * 1.15;

			const gridPixelWidth = currentCols * cellWidth;
			const gridPixelHeight = currentRows * cellHeight;
			const originX = (width - gridPixelWidth) / 2;

			// Center Y transitioning smoothly to top sticky position (60px from top)
			const endArtTopRow = (currentRows - endTextLinesCount) >> 1;
			const centerY = (height - gridPixelHeight) / 2;
			const targetLetterTop = 60;
			const stickyOriginY = targetLetterTop - endArtTopRow * cellHeight;
			const originY = centerY + (stickyOriginY - centerY) * slideT;

			context.font = `600 ${fontSize}px ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`;
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			// Render all particles with subpixel precision
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];

				p.angle += p.speed * delta;
				const noiseX = Math.cos(p.angle + i * 0.4) * p.radiusX * dispersionFactor * 0.7;
				const noiseY = Math.sin(p.angle * 1.2 + i * 0.4) * p.radiusY * dispersionFactor * 0.45;

				const targetGridX = p.startX + (p.endX - p.startX) * t + noiseX;
				const targetGridY = p.startY + (p.endY - p.startY) * t + noiseY;

				p.x = targetGridX;
				p.y = targetGridY;

				const pixelX = originX + p.x * cellWidth + cellWidth / 2;
				const pixelY = originY + p.y * cellHeight + cellHeight / 2;

				const char = t < 0.5 ? p.startChar : p.endChar;
				const type = t < 0.5 ? p.startType : p.endType;

				// Swapped color mapping:
				// - Body fill ($) in crisp pure white
				// - Outlines/edges in sleek slate gray
				if (type === 'shadow') {
					context.fillStyle = '#ffffff';
					context.shadowColor = 'rgba(255, 255, 255, 0.6)';
					context.shadowBlur = 6;
				} else if (type === 'outline') {
					context.fillStyle = '#393939ff';
					context.shadowColor = 'rgba(100, 116, 139, 0.4)';
					context.shadowBlur = 4;
				} else {
					context.fillStyle = '#64748b';
					context.shadowColor = 'transparent';
					context.shadowBlur = 0;
				}

				context.fillText(char, pixelX, pixelY);
			}

			context.restore();
			animationFrameId = requestAnimationFrame(render);
		};

		animationFrameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={containerElement} class="ascii-scroll-container">
	<!-- Fixed fullscreen canvas locked in viewport -->
	<div class="ascii-fixed-viewport">
		<canvas bind:this={canvasElement} class="ascii-canvas"></canvas>

		<!-- Floating scroll hint -->
		<div class="ascii-footer-hint" style="opacity: {Math.max(0, 1 - scrollProgress * 2.5)};">
			<span class="scroll-arrow">↓</span>
			<span class="scroll-text">Scroll down</span>
		</div>
	</div>
</div>

<style>
	.ascii-scroll-container {
		position: relative;
		width: 100%;
		height: 65vh;
		background: #000000;
	}

	.ascii-fixed-viewport {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: transparent;
		pointer-events: none;
		z-index: 50;
	}

	.ascii-canvas {
		display: block;
		width: 100vw;
		height: 100vh;
		background: transparent;
		user-select: none;
	}

	.ascii-footer-hint {
		position: absolute;
		bottom: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.8rem;
		font-family: ui-monospace, monospace;
		transition: opacity 0.2s ease-out;
		pointer-events: none;
	}

	.scroll-arrow {
		animation: bounce 1.8s infinite ease-in-out;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}
</style>
