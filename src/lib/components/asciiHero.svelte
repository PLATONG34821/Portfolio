<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		generateFigletArt,
		extractFigletPoints,
		createMultiStageFigletParticles,
		type MultiStageFigletParticle,
		type FigletPoint
	} from '$lib/ascii/variableAscii';

	interface Props {
		startText?: string;
		endText?: string;
		skillsText?: string;
		scrollProgress?: number;
	}

	let {
		startText = 'THANAPHUM\nPORTFOLIO',
		endText = 'EXPERIENCE',
		skillsText = 'SKILLS',
		scrollProgress = $bindable(0)
	}: Props = $props();

	let containerElement = $state<HTMLElement | null>(null);
	let canvasElement = $state<HTMLCanvasElement | null>(null);
	let overlayElement = $state<HTMLPreElement | null>(null);

	let activeGridText = $state('');

	// Theme color palette per stage:
	// Stage 0: Pure Silver / White
	// Stage 1: Radiant Gold / Amber (Experience Section Theme)
	// Stage 2: Cyber Cyan (Skills Section Theme)
	interface StageTheme {
		faceColor: [number, number, number]; // [r, g, b]
		outlineColor: [number, number, number]; // [r, g, b]
		shadowColor: [number, number, number, number]; // [r, g, b, a]
	}

	const stageThemes: StageTheme[] = [
		{
			faceColor: [255, 255, 255],
			outlineColor: [63, 63, 70],
			shadowColor: [255, 255, 255, 0.8]
		},
		{
			faceColor: [250, 204, 21], // #facc15 (Pure Gold)
			outlineColor: [120, 94, 47], // #785e2f (Warm Bronze)
			shadowColor: [251, 191, 36, 0.85] // #fbbf24 glow
		},
		{
			faceColor: [56, 189, 248], // #38bdf8 (Cyber Cyan)
			outlineColor: [30, 58, 95], // #1e3a5f (Midnight Cyber Slate)
			shadowColor: [56, 189, 248, 0.9] // #38bdf8 glow
		}
	];

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	const interpolateColor = (
		c1: [number, number, number],
		c2: [number, number, number],
		t: number
	): string => {
		const r = Math.round(lerp(c1[0], c2[0], t));
		const g = Math.round(lerp(c1[1], c2[1], t));
		const b = Math.round(lerp(c1[2], c2[2], t));
		return `rgb(${r}, ${g}, ${b})`;
	};

	const interpolateRgba = (
		c1: [number, number, number, number],
		c2: [number, number, number, number],
		t: number
	): string => {
		const r = Math.round(lerp(c1[0], c2[0], t));
		const g = Math.round(lerp(c1[1], c2[1], t));
		const b = Math.round(lerp(c1[2], c2[2], t));
		const a = +lerp(c1[3], c2[3], t).toFixed(3);
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	};

	onMount(() => {
		if (!canvasElement) return;

		gsap.registerPlugin(ScrollTrigger);

		let animationFrameId: number;
		let particles: MultiStageFigletParticle[] = [];
		let currentCols = 120;
		let currentRows = 38;
		let maxArtHeight = 19;
		let endTextLinesCount = 9;

		let gridTextA = '';
		let gridTextB = '';
		let gridTextC = '';

		const buildGridString = (points: FigletPoint[], cols: number, rows: number): string => {
			const grid: string[][] = Array.from({ length: rows }, () =>
				Array.from({ length: cols }, () => ' ')
			);
			for (const pt of points) {
				if (pt.y >= 0 && pt.y < rows && pt.x >= 0 && pt.x < cols) {
					grid[pt.y][pt.x] = pt.char;
				}
			}
			return grid.map((r) => r.join('').trimEnd()).join('\n');
		};

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
			const linesC = generateFigletArt(skillsText);

			const maxArtWidth = Math.max(
				...linesA.map((l) => l.length),
				...linesB.map((l) => l.length),
				...linesC.map((l) => l.length)
			);
			maxArtHeight = Math.max(linesA.length, linesB.length, linesC.length);
			endTextLinesCount = linesB.length;

			// Responsive column calculation:
			// On desktop (>=1024px), use generous padding (at least 120 cols).
			// On tablet/mobile, fit tightly around the art width so font size stays as large and legible as possible without overflowing viewport.
			const colPadding = width < 480 ? 0 : width < 768 ? 4 : 14;
			currentCols = Math.max(
				maxArtWidth + colPadding,
				width < 768 ? maxArtWidth + colPadding : 120
			);
			currentRows = Math.max(maxArtHeight + 8, 32);

			const pointsA = extractFigletPoints(linesA, currentCols, currentRows);
			const pointsB = extractFigletPoints(linesB, currentCols, currentRows);
			const pointsC = extractFigletPoints(linesC, currentCols, currentRows);

			particles = createMultiStageFigletParticles([pointsA, pointsB, pointsC]);

			gridTextA = buildGridString(pointsA, currentCols, currentRows);
			gridTextB = buildGridString(pointsB, currentCols, currentRows);
			gridTextC = buildGridString(pointsC, currentCols, currentRows);

			activeGridText = gridTextA;
		};

		initSimulation();

		let currentProgress = 0;
		let targetProgress = 0;
		let heroProgress = 0;
		let skillsProgress = 0;

		const updateTargetProgress = () => {
			targetProgress = heroProgress < 1 ? heroProgress : 1 + skillsProgress;
		};

		const heroTrigger = ScrollTrigger.create({
			trigger: containerElement,
			start: 'top top',
			end: 'bottom top',
			scrub: 0.2,
			onUpdate: (self) => {
				heroProgress = self.progress;
				scrollProgress = self.progress;
				updateTargetProgress();
			}
		});

		const skillsTrigger = ScrollTrigger.create({
			trigger: '#skills',
			start: 'top 75%',
			end: () => {
				const dockedHeaderBottom = window.innerWidth < 640 ? 125 : 200;
				return `top ${dockedHeaderBottom + (window.innerWidth < 640 ? 20 : 40)}px`;
			},
			scrub: 0.2,
			onUpdate: (self) => {
				skillsProgress = self.progress;
				updateTargetProgress();
			}
		});

		ScrollTrigger.refresh();

		const handleResize = () => {
			initSimulation();
			ScrollTrigger.refresh();
		};

		window.addEventListener('resize', handleResize, { passive: true });

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

			// Update selectable text layer to match current stage
			if (currentProgress < 0.5) {
				if (activeGridText !== gridTextA) activeGridText = gridTextA;
			} else if (currentProgress < 1.5) {
				if (activeGridText !== gridTextB) activeGridText = gridTextB;
			} else {
				if (activeGridText !== gridTextC) activeGridText = gridTextC;
			}

			// Multi-stage progression:
			// Stage 0 -> 1 (0.0 to 1.0): THANAPHUM -> EXPERIENCE (finishes right as experience section arrives)
			// Stage 1 -> 2 (1.0 to 2.0): EXPERIENCE -> SKILLS (docked at sticky top)
			let stageIdx: number;
			let morphPhase: number;
			let slideT: number;

			if (currentProgress <= 1.0) {
				stageIdx = 0;
				morphPhase = Math.min(1, currentProgress / 0.96);
				const slidePhase = Math.max(0, Math.min(1, (currentProgress - 0.05) / 0.92));
				slideT = easeInOutCubic(slidePhase);
			} else {
				stageIdx = 1;
				morphPhase = Math.min(1, currentProgress - 1.0);
				slideT = 1.0;
			}

			const t = easeInOutCubic(morphPhase);
			const midDispersal = Math.sin(t * Math.PI);
			const dispersionFactor = Math.pow(midDispersal, 1.8);

			// Interpolate theme colors smoothly across stages
			const currentTheme = stageThemes[stageIdx];
			const nextTheme = stageThemes[stageIdx + 1] || currentTheme;
			const activeFaceFill = interpolateColor(currentTheme.faceColor, nextTheme.faceColor, t);
			const activeOutlineFill = interpolateColor(
				currentTheme.outlineColor,
				nextTheme.outlineColor,
				t
			);
			const activeShadowGlow = interpolateRgba(currentTheme.shadowColor, nextTheme.shadowColor, t);

			// Clear canvas transparently so content underneath flows through
			context.save();
			context.scale(dpr, dpr);
			context.clearRect(0, 0, width, height);

			// Calculate responsive crisp font sizing with optimized cell ratio for larger scale on mobile
			const cellRatio = width < 768 ? 0.52 : 0.6;
			const cellHeightRatio = width < 768 ? 1.08 : 1.15;
			const widthCoverage = width < 480 ? 0.98 : width < 768 ? 0.96 : 0.94;

			const baseFontSize = Math.min(
				(width * widthCoverage) / (currentCols * cellRatio),
				(height * 0.8) / (currentRows * cellHeightRatio)
			);
			const minFontSize = width < 400 ? 6.5 : width < 600 ? 7.2 : 8.5;
			const maxFontSize = 14;
			const fontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize));
			const cellWidth = fontSize * cellRatio;
			const cellHeight = fontSize * cellHeightRatio;

			const gridPixelWidth = currentCols * cellWidth;
			const gridPixelHeight = currentRows * cellHeight;
			const originX = (width - gridPixelWidth) / 2;

			// Center Y transitioning smoothly to top sticky position:
			// 38px on mobile (<640px), 60px on tablet/desktop
			const targetLetterTop = width < 640 ? 38 : 60;
			const endArtTopRow = (currentRows - endTextLinesCount) >> 1;
			const centerY = (height - gridPixelHeight) / 2;
			const stickyOriginY = targetLetterTop - endArtTopRow * cellHeight;
			const originY = centerY + (stickyOriginY - centerY) * slideT;

			// Position selectable transparent text overlay precisely over the canvas grid
			if (overlayElement) {
				if (currentProgress >= 0.4) {
					overlayElement.style.display = 'none';
					overlayElement.style.pointerEvents = 'none';
					overlayElement.style.userSelect = 'none';
				} else {
					overlayElement.style.display = 'block';
					overlayElement.style.pointerEvents = 'auto';
					overlayElement.style.userSelect = 'text';
					overlayElement.style.left = `${originX}px`;
					overlayElement.style.top = `${originY}px`;
					overlayElement.style.width = `${gridPixelWidth}px`;
					overlayElement.style.height = `${gridPixelHeight}px`;
					overlayElement.style.fontSize = `${fontSize}px`;
					overlayElement.style.lineHeight = `${cellHeight}px`;
				}
			}

			context.font = `600 ${fontSize}px ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`;
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			// Render all particles with subpixel precision and dynamic stage-theme colors
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				const targetA = p.targets[stageIdx];
				const targetB = p.targets[stageIdx + 1] || targetA;

				p.angle += p.speed * delta;
				const noiseX = Math.cos(p.angle + i * 0.4) * p.radiusX * dispersionFactor * 0.7;
				const noiseY = Math.sin(p.angle * 1.2 + i * 0.4) * p.radiusY * dispersionFactor * 0.45;

				const targetGridX = targetA.x + (targetB.x - targetA.x) * t + noiseX;
				const targetGridY = targetA.y + (targetB.y - targetA.y) * t + noiseY;

				p.x = targetGridX;
				p.y = targetGridY;

				const pixelX = originX + p.x * cellWidth + cellWidth / 2;
				const pixelY = originY + p.y * cellHeight + cellHeight / 2;

				const char = t < 0.5 ? targetA.char : targetB.char;
				const type = t < 0.5 ? targetA.type : targetB.type;
				const alpha = targetA.alpha + (targetB.alpha - targetA.alpha) * t;

				if (alpha <= 0.01) continue;

				context.globalAlpha = Math.max(0, Math.min(1, alpha));

				if (type === 'shadow') {
					context.fillStyle = activeFaceFill;
					context.shadowColor = activeShadowGlow;
					context.shadowBlur = width < 640 ? 8 : 16;
					context.shadowOffsetY = width < 640 ? 1 : 2;
				} else {
					context.fillStyle = activeOutlineFill;
					context.shadowColor = 'rgba(0, 0, 0, 0.9)';
					context.shadowBlur = width < 640 ? 4 : 8;
					context.shadowOffsetY = width < 640 ? 1 : 2;
				}

				context.fillText(char, pixelX, pixelY);
			}

			context.globalAlpha = 1.0;
			context.restore();
			animationFrameId = requestAnimationFrame(render);
		};

		animationFrameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
			heroTrigger.kill();
			skillsTrigger.kill();
		};
	});
</script>

<div bind:this={containerElement} class="ascii-scroll-container">
	<!-- Fixed fullscreen viewport -->
	<div class="ascii-fixed-viewport">
		<canvas bind:this={canvasElement} class="ascii-canvas"></canvas>

		<!-- Selectable transparent text layer for native highlighting/copying -->
		<pre
			bind:this={overlayElement}
			class="ascii-selectable-overlay"
			aria-label="Figlet ASCII Header">{activeGridText}</pre>

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
		user-select: none;
		-webkit-user-select: none;
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
		user-select: none;
		-webkit-user-select: none;
		z-index: 50;
	}

	.ascii-canvas {
		display: block;
		width: 100vw;
		height: 100vh;
		background: transparent;
		user-select: none;
		-webkit-user-select: none;
		pointer-events: none;
		filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.95)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.85));
	}

	.ascii-selectable-overlay {
		position: absolute;
		margin: 0;
		padding: 0;
		color: transparent;
		caret-color: #fbbf24;
		font-family: ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace;
		font-weight: 600;
		white-space: pre;
		overflow: hidden;
		user-select: text;
		-webkit-user-select: text;
		pointer-events: auto;
		cursor: text;
		z-index: 60;
		background: transparent;
	}

	.ascii-selectable-overlay::selection {
		background: rgba(251, 191, 36, 0.45);
		color: transparent;
		-webkit-text-fill-color: transparent;
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

	@media (max-width: 640px) {
		.ascii-footer-hint {
			bottom: 1.25rem;
			font-size: 0.72rem;
		}
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
