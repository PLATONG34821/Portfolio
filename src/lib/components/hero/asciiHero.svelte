<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref, getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
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
		contactText?: string;
	}

	let {
		startText = 'THANAPHUM\nPORTFOLIO',
		endText = 'EXPERIENCE',
		skillsText = 'SKILLS',
		contactText = 'CONTACT'
	}: Props = $props();

	let containerElement = $state<HTMLElement | null>(null);
	let canvasElement = $state<HTMLCanvasElement | null>(null);
	let overlayElement = $state<HTMLPreElement | null>(null);
	let footerHintElement = $state<HTMLElement | null>(null);
	let langSwitcherElement = $state<HTMLElement | null>(null);

	let activeGridText = $state('');

	function switchLocale(e: MouseEvent, targetLocale: Locale) {
		e.preventDefault();
		setLocale(targetLocale);
	}

	// Theme color palette per stage:
	// Stage 0: Pure Silver / White
	// Stage 1: Radiant Gold / Amber (Experience Section Theme)
	// Stage 2: Cyber Cyan (Skills Section Theme)
	interface StageTheme {
		faceColor: [number, number, number]; // [r, g, b]
		outlineColor: [number, number, number]; // [r, g, b]
	}

	const stageThemes: StageTheme[] = [
		{
			faceColor: [255, 255, 255],
			outlineColor: [63, 63, 70]
		},
		{
			faceColor: [250, 204, 21], // #facc15 (Pure Gold)
			outlineColor: [120, 94, 47] // #785e2f (Warm Bronze)
		},
		{
			faceColor: [56, 189, 248], // #38bdf8 (Cyber Cyan)
			outlineColor: [30, 58, 95] // #1e3a5f (Midnight Cyber Slate)
		},
		{
			faceColor: [52, 211, 153], // #34d399 (Terminal Emerald)
			outlineColor: [6, 78, 59] // #064e3b (Deep Emerald Slate)
		}
	];

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	const interpolateColor = (
		c1: [number, number, number],
		c2: [number, number, number],
		t: number
	): string =>
		`rgb(${Math.round(lerp(c1[0], c2[0], t))}, ${Math.round(lerp(c1[1], c2[1], t))}, ${Math.round(lerp(c1[2], c2[2], t))})`;

	onMount(() => {
		if (!canvasElement) return;

		const savedScrollY = Number(sessionStorage.getItem('portfolio_scroll_y') || '0');
		if (savedScrollY > 0) {
			window.scrollTo(0, savedScrollY);
		}

		gsap.registerPlugin(ScrollTrigger);

		let animationFrameId: number;
		let particles: MultiStageFigletParticle[] = [];
		let currentCols = 120;
		let currentRows = 38;
		let maxArtHeight = 19;
		let endTextLinesCount = 9;
		let gridTexts: string[] = [];

		let dpr = 1;
		let viewportWidth = 0;
		let viewportHeight = 0;
		let originX = 0;
		let centerY = 0;
		let stickyOriginY = 0;
		let cellWidth = 0;
		let cellHeight = 0;
		let fontSize = 10;
		let isDirty = true;
		let overlayVisible = true;
		let lastSlideT = -1;
		let heroSwitcherY = 0;
		let stickySwitcherY = 0;
		let lastSwitcherY = -1;
		let slideT = 0;
		let lastFaceFill = '';

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

			dpr = window.devicePixelRatio || 1;
			viewportWidth = window.innerWidth;
			viewportHeight = window.innerHeight;

			const targetW = Math.round(viewportWidth * dpr);
			const targetH = Math.round(viewportHeight * dpr);

			if (canvasElement.width !== targetW || canvasElement.height !== targetH) {
				canvasElement.width = targetW;
				canvasElement.height = targetH;
				canvasElement.style.width = `${viewportWidth}px`;
				canvasElement.style.height = `${viewportHeight}px`;
			}

			const artTexts = [startText, endText, skillsText, contactText];
			const artLinesList = artTexts.map(generateFigletArt);

			const maxArtWidth = Math.max(...artLinesList.flatMap((lines) => lines.map((l) => l.length)));
			maxArtHeight = Math.max(...artLinesList.map((lines) => lines.length));
			endTextLinesCount = artLinesList[1].length;

			const colPadding = viewportWidth < 480 ? 0 : viewportWidth < 768 ? 4 : 14;
			currentCols = Math.max(
				maxArtWidth + colPadding,
				viewportWidth < 768 ? maxArtWidth + colPadding : 120
			);
			currentRows = Math.max(maxArtHeight + 8, 32);

			const stagePoints = artLinesList.map((lines) =>
				extractFigletPoints(lines, currentCols, currentRows)
			);
			particles = createMultiStageFigletParticles(stagePoints);

			gridTexts = stagePoints.map((pts) => buildGridString(pts, currentCols, currentRows));
			activeGridText = gridTexts[0] || '';

			const cellRatio = viewportWidth < 768 ? 0.52 : 0.6;
			const cellHeightRatio = viewportWidth < 768 ? 1.08 : 1.15;
			const widthCoverage = viewportWidth < 480 ? 0.98 : viewportWidth < 768 ? 0.96 : 0.94;

			const baseFontSize = Math.min(
				(viewportWidth * widthCoverage) / (currentCols * cellRatio),
				(viewportHeight * 0.8) / (currentRows * cellHeightRatio)
			);
			const minFontSize = viewportWidth < 400 ? 6.5 : viewportWidth < 600 ? 7.2 : 8.5;
			const maxFontSize = 14;
			fontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize));
			cellWidth = fontSize * cellRatio;
			cellHeight = fontSize * cellHeightRatio;

			const gridPixelWidth = currentCols * cellWidth;
			const gridPixelHeight = currentRows * cellHeight;
			originX = (viewportWidth - gridPixelWidth) / 2;

			const targetLetterTop = viewportWidth < 640 ? 38 : 60;
			const endArtTopRow = (currentRows - endTextLinesCount) >> 1;
			centerY = (viewportHeight - gridPixelHeight) / 2;
			stickyOriginY = targetLetterTop - endArtTopRow * cellHeight;

			if (overlayElement) {
				overlayElement.style.left = `${originX}px`;
				overlayElement.style.top = `${centerY}px`;
				overlayElement.style.width = `${gridPixelWidth}px`;
				overlayElement.style.height = `${gridPixelHeight}px`;
				overlayElement.style.fontSize = `${fontSize}px`;
				overlayElement.style.lineHeight = `${cellHeight}px`;
				overlayElement.style.transform = 'translateY(0px)';
			}

			const startLinesCount = artLinesList[0].length;
			const startArtTopRow = (currentRows - startLinesCount) >> 1;
			const heroArtBottom = centerY + (startArtTopRow + startLinesCount) * cellHeight;
			const heroSwitcherGap = viewportWidth < 640 ? 14 : 22;
			heroSwitcherY = heroArtBottom + heroSwitcherGap;

			const stickyArtBottom = targetLetterTop + endTextLinesCount * cellHeight;
			const stickySwitcherGap = viewportWidth < 640 ? 8 : 12;
			stickySwitcherY = stickyArtBottom + stickySwitcherGap;

			if (langSwitcherElement) {
				const currentSwitcherY = heroSwitcherY + (stickySwitcherY - heroSwitcherY) * slideT;
				lastSwitcherY = Math.round(currentSwitcherY);
				langSwitcherElement.style.transform = `translate(-50%, ${lastSwitcherY}px)`;
				langSwitcherElement.style.setProperty('--lang-active-color', 'rgb(255, 255, 255)');
				lastFaceFill = 'rgb(255, 255, 255)';
			}

			isDirty = true;
		};

		initSimulation();

		let currentProgress = 0;
		let targetProgress = 0;
		let heroProgress = 0;
		let skillsProgress = 0;
		let contactProgress = 0;

		const updateTargetProgress = () => {
			targetProgress =
				contactProgress > 0.001
					? 2 + contactProgress
					: skillsProgress > 0.001
						? 1 + skillsProgress
						: Math.min(1, heroProgress);
		};

		const updateFooterHint = (progress: number) => {
			if (!footerHintElement) return;
			const opacity = Math.max(0, 1 - progress * 2.5);
			footerHintElement.style.opacity = `${opacity}`;
			footerHintElement.style.pointerEvents = opacity <= 0.05 ? 'none' : 'auto';
		};

		const syncProgress = () => {
			heroProgress = heroTrigger.progress;
			skillsProgress = skillsTrigger.progress;
			contactProgress = contactTrigger.progress;
			updateTargetProgress();
			currentProgress = targetProgress;
		};

		const heroTrigger = ScrollTrigger.create({
			trigger: containerElement,
			start: 'top top',
			end: 'bottom top',
			scrub: true,
			onUpdate: (self) => {
				heroProgress = self.progress;
				updateFooterHint(self.progress);
				updateTargetProgress();
				isDirty = true;
			}
		});

		const skillsTrigger = ScrollTrigger.create({
			trigger: '#skills',
			start: 'top 75%',
			end: () => {
				const dockedHeaderBottom = window.innerWidth < 640 ? 125 : 200;
				return `top ${dockedHeaderBottom + (window.innerWidth < 640 ? 20 : 40)}px`;
			},
			scrub: true,
			onUpdate: (self) => {
				skillsProgress = self.progress;
				updateTargetProgress();
				isDirty = true;
			}
		});

		const contactTrigger = ScrollTrigger.create({
			trigger: '#contact',
			start: 'top 80%',
			end: '+=220',
			scrub: true,
			onUpdate: (self) => {
				contactProgress = self.progress;
				updateTargetProgress();
				isDirty = true;
			}
		});

		ScrollTrigger.refresh();

		syncProgress();
		updateFooterHint(heroProgress);

		let lastWindowWidth = window.innerWidth;
		let lastWindowHeight = window.innerHeight;

		const handleResize = () => {
			if (window.innerWidth === lastWindowWidth && window.innerHeight === lastWindowHeight) {
				return;
			}
			lastWindowWidth = window.innerWidth;
			lastWindowHeight = window.innerHeight;
			initSimulation();
			ScrollTrigger.refresh();
			render(performance.now());
		};

		const handleScroll = () => {
			sessionStorage.setItem('portfolio_scroll_y', String(window.scrollY));
		};

		window.addEventListener('resize', handleResize, { passive: true });
		window.addEventListener('scroll', handleScroll, { passive: true });

		const easeInOutCubic = (t: number): number =>
			t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

		let lastTime = performance.now();
		let initialSnapFrames = 3;

		const render = (now: number) => {
			const delta = Math.min(32, now - lastTime);
			lastTime = now;

			if (!canvasElement || !particles.length) {
				animationFrameId = requestAnimationFrame(render);
				return;
			}

			if (initialSnapFrames > 0) {
				initialSnapFrames--;
				syncProgress();
			}

			const progressDiff = Math.abs(targetProgress - currentProgress);
			if (progressDiff > 0.0001) {
				currentProgress += (targetProgress - currentProgress) * 0.18;
				isDirty = true;
			} else {
				currentProgress = targetProgress;
			}

			const stageIdx = currentProgress <= 1.0 ? 0 : currentProgress <= 2.0 ? 1 : 2;
			const morphPhase =
				currentProgress <= 1.0
					? Math.min(1, currentProgress / 0.96)
					: Math.min(1, currentProgress - stageIdx);
			const slideT =
				currentProgress <= 1.0
					? easeInOutCubic(Math.max(0, Math.min(1, (currentProgress - 0.05) / 0.92)))
					: 1.0;

			const t = easeInOutCubic(morphPhase);
			const midDispersal = Math.sin(t * Math.PI);
			const dispersionFactor = Math.pow(midDispersal, 1.8);

			if (!isDirty && progressDiff <= 0.0001 && dispersionFactor <= 0.001) {
				animationFrameId = requestAnimationFrame(render);
				return;
			}

			const stageTextIndex = Math.min(3, Math.max(0, Math.floor(currentProgress + 0.5)));
			if (activeGridText !== gridTexts[stageTextIndex]) {
				activeGridText = gridTexts[stageTextIndex];
			}

			const originY = centerY + (stickyOriginY - centerY) * slideT;

			if (langSwitcherElement) {
				const currentSwitcherY = Math.round(
					heroSwitcherY + (stickySwitcherY - heroSwitcherY) * slideT
				);
				if (currentSwitcherY !== lastSwitcherY || isDirty) {
					lastSwitcherY = currentSwitcherY;
					langSwitcherElement.style.transform = `translate(-50%, ${currentSwitcherY}px)`;
				}
			}

			if (overlayElement) {
				const isVisible = currentProgress < 0.4;
				if (isVisible !== overlayVisible) {
					overlayVisible = isVisible;
					overlayElement.style.display = isVisible ? 'block' : 'none';
					overlayElement.style.pointerEvents = isVisible ? 'auto' : 'none';
				}
				if (isVisible && slideT !== lastSlideT) {
					lastSlideT = slideT;
					overlayElement.style.transform = `translateY(${(stickyOriginY - centerY) * slideT}px)`;
				}
			}

			const context = canvasElement.getContext('2d', { alpha: true });
			if (!context) {
				animationFrameId = requestAnimationFrame(render);
				return;
			}

			const currentTheme = stageThemes[stageIdx];
			const nextTheme = stageThemes[stageIdx + 1] || currentTheme;
			const activeFaceFill = interpolateColor(currentTheme.faceColor, nextTheme.faceColor, t);
			const activeOutlineFill = interpolateColor(
				currentTheme.outlineColor,
				nextTheme.outlineColor,
				t
			);

			if (langSwitcherElement && activeFaceFill !== lastFaceFill) {
				lastFaceFill = activeFaceFill;
				langSwitcherElement.style.setProperty('--lang-active-color', activeFaceFill);
			}

			context.save();
			context.scale(dpr, dpr);
			context.clearRect(0, 0, viewportWidth, viewportHeight);

			context.font = `600 ${fontSize}px ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`;
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			const halfCellW = cellWidth / 2;
			const halfCellH = cellHeight / 2;
			let lastFill = '';

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				const targetA = p.targets[stageIdx];
				const targetB = p.targets[stageIdx + 1] || targetA;

				p.angle += p.speed * delta;
				const noiseX = Math.cos(p.angle + i * 0.4) * p.radiusX * dispersionFactor * 0.7;
				const noiseY = Math.sin(p.angle * 1.2 + i * 0.4) * p.radiusY * dispersionFactor * 0.45;

				const targetGridX = targetA.x + (targetB.x - targetA.x) * t + noiseX;
				const targetGridY = targetA.y + (targetB.y - targetA.y) * t + noiseY;

				const pixelX = originX + targetGridX * cellWidth + halfCellW;
				const pixelY = originY + targetGridY * cellHeight + halfCellH;

				const char = t < 0.5 ? targetA.char : targetB.char;
				const type = t < 0.5 ? targetA.type : targetB.type;
				const alpha = targetA.alpha + (targetB.alpha - targetA.alpha) * t;

				if (alpha <= 0.01) continue;

				context.globalAlpha = Math.max(0, Math.min(1, alpha));

				const fill = type === 'shadow' ? activeFaceFill : activeOutlineFill;
				if (fill !== lastFill) {
					context.fillStyle = fill;
					lastFill = fill;
				}

				context.fillText(char, pixelX, pixelY);
			}

			context.globalAlpha = 1.0;
			context.restore();
			isDirty = false;
			animationFrameId = requestAnimationFrame(render);
		};

		render(performance.now());

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
			heroTrigger.kill();
			skillsTrigger.kill();
			contactTrigger.kill();
		};
	});
</script>

<div bind:this={containerElement} class="ascii-scroll-container">
	<div class="ascii-fixed-viewport">
		<canvas bind:this={canvasElement} class="ascii-canvas"></canvas>

		<pre
			bind:this={overlayElement}
			class="ascii-selectable-overlay"
			aria-label="Figlet ASCII Header">{activeGridText}</pre>

		<div bind:this={langSwitcherElement} class="hero-lang-switcher" aria-label="Language selector">
			<a
				href={resolve(localizeHref(page.url.pathname, { locale: 'en' }) as Pathname)}
				class="hero-lang-link"
				class:active={getLocale() === 'en'}
				aria-current={getLocale() === 'en' ? 'page' : undefined}
				onclick={(e) => switchLocale(e, 'en')}
			>
				EN
			</a>
			<span class="hero-lang-divider" aria-hidden="true">:</span>
			<a
				href={resolve(localizeHref(page.url.pathname, { locale: 'th' }) as Pathname)}
				class="hero-lang-link"
				class:active={getLocale() === 'th'}
				aria-current={getLocale() === 'th' ? 'page' : undefined}
				onclick={(e) => switchLocale(e, 'th')}
			>
				TH
			</a>
		</div>

		<div bind:this={footerHintElement} class="ascii-footer-hint">
			<span class="scroll-arrow">↓</span>
			<span class="scroll-text">{m.heroScrollDown()}</span>
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
		transform: translateZ(0);
	}

	.ascii-canvas {
		display: block;
		width: 100vw;
		height: 100vh;
		background: transparent;
		user-select: none;
		-webkit-user-select: none;
		pointer-events: none;
		transform: translateZ(0);
		will-change: transform;
	}

	.ascii-selectable-overlay {
		position: absolute;
		margin: 0;
		padding: 0;
		color: transparent;
		caret-color: #e4e4e7;
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
		background: rgba(255, 255, 255, 0.4) !important;
		color: #ffffff !important;
		-webkit-text-fill-color: #ffffff !important;
	}

	.ascii-footer-hint {
		position: absolute;
		bottom: clamp(1.75rem, 5vh, 3.5rem);
		left: 50%;
		transform: translateX(-50%);
		z-index: 65;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.8rem;
		font-family: ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace;
		transition: opacity 0.2s ease-out;
		pointer-events: none;
	}

	.hero-lang-switcher {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 65vh);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		pointer-events: auto;
		z-index: 70;
		font-family: ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace;
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		user-select: none;
		will-change: transform;
		--lang-active-color: #ffffff;
	}

	.hero-lang-link {
		color: #71717a;
		text-decoration: none;
		font-weight: 500;
		padding: 0.2rem 0.4rem;
		transition: color 0.15s ease;
		cursor: pointer;
	}

	.hero-lang-link:hover {
		color: #e4e4e7;
	}

	.hero-lang-link.active {
		color: var(--lang-active-color, #ffffff);
		font-weight: 700;
	}

	.hero-lang-divider {
		color: var(--lang-active-color, #ffffff);
		opacity: 0.35;
		font-weight: 400;
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

	@media (max-width: 640px) {
		.hero-lang-switcher {
			font-size: 0.78rem;
			gap: 0.35rem;
		}

		.hero-lang-link {
			padding: 0.15rem 0.3rem;
		}

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
