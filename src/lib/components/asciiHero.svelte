<script lang="ts">
	import { onMount } from 'svelte';
	import {
		buildPalette,
		sampleTextAnchors,
		createParticles,
		createFieldStamp,
		defaultConfig,
		type AsciiConfig,
		type LookupEntry,
		type Particle
	} from '$lib/ascii/variableAscii';

	interface Props {
		startText?: string;
		endText?: string;
		config?: Partial<AsciiConfig>;
	}

	let {
		startText = 'THANAPHUM',
		endText = 'EXPERIENCE',
		config: userConfig = {}
	}: Props = $props();

	let containerElement = $state<HTMLElement | null>(null);
	let propBoxElement = $state<HTMLElement | null>(null);
	let scrollProgress = $state(0);

	let config: AsciiConfig = $derived({ ...defaultConfig, ...userConfig });

	onMount(() => {
		if (!propBoxElement || !containerElement) return;

		const lookup = buildPalette(config);
		if (lookup.length === 0) return;

		// Calculate canvas metrics & field resolution
		const fieldOversample = 2;
		const fieldCols = config.cols * fieldOversample;
		const fieldRows = config.rows * fieldOversample;
		const fieldScaleX = fieldCols / config.canvasWidth;
		const fieldScaleY = fieldRows / config.canvasHeight;

		const startAnchors = sampleTextAnchors(
			startText,
			config.particleCount,
			config.canvasWidth,
			config.canvasHeight,
			62,
			config.fontFamily
		);

		const endAnchors = sampleTextAnchors(
			endText,
			config.particleCount,
			config.canvasWidth,
			config.canvasHeight,
			56,
			config.fontFamily
		);

		const particles = createParticles(startAnchors, endAnchors, config.particleCount);
		const particleStamp = createFieldStamp(10, fieldScaleX, fieldScaleY);
		const brightnessField = new Float32Array(fieldCols * fieldRows);

		// Build row DOM elements once
		propBoxElement.innerHTML = '';
		const rowElements: HTMLDivElement[] = [];
		for (let row = 0; row < config.rows; row++) {
			const rowDiv = document.createElement('div');
			rowDiv.className = 'ascii-row';
			rowDiv.style.height = `${config.lineHeight}px`;
			rowDiv.style.lineHeight = `${config.lineHeight}px`;
			propBoxElement.appendChild(rowDiv);
			rowElements.push(rowDiv);
		}

		let currentProgress = 0;
		let targetProgress = 0;

		const handleScroll = () => {
			if (!containerElement) return;
			const rect = containerElement.getBoundingClientRect();
			const totalScroll = rect.height - window.innerHeight;
			if (totalScroll <= 0) return;
			const rawProgress = -rect.top / totalScroll;
			targetProgress = Math.max(0, Math.min(1, rawProgress));
			scrollProgress = targetProgress;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		let animationFrameId: number;

		const splatStamp = (centerX: number, centerY: number) => {
			const gridCenterX = Math.round(centerX * fieldScaleX);
			const gridCenterY = Math.round(centerY * fieldScaleY);

			for (let y = -particleStamp.radiusY; y <= particleStamp.radiusY; y++) {
				const gridY = gridCenterY + y;
				if (gridY < 0 || gridY >= fieldRows) continue;

				const fieldRowOffset = gridY * fieldCols;
				const stampRowOffset = (y + particleStamp.radiusY) * particleStamp.sizeX;

				for (let x = -particleStamp.radiusX; x <= particleStamp.radiusX; x++) {
					const gridX = gridCenterX + x;
					if (gridX < 0 || gridX >= fieldCols) continue;

					const stampVal = particleStamp.values[stampRowOffset + x + particleStamp.radiusX];
					if (stampVal === 0) continue;

					const fieldIndex = fieldRowOffset + gridX;
					brightnessField[fieldIndex] = Math.min(1, brightnessField[fieldIndex] + stampVal);
				}
			}
		};

		const easeInOutCubic = (t: number): number => {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		};

		let lastTime = performance.now();

		const render = (now: number) => {
			const delta = Math.min(32, now - lastTime);
			lastTime = now;

			// Smooth scroll interpolation
			currentProgress += (targetProgress - currentProgress) * 0.12;
			const t = easeInOutCubic(currentProgress);
			const midDispersal = Math.sin(t * Math.PI);

			// Field decay
			for (let index = 0; index < brightnessField.length; index++) {
				brightnessField[index] *= 0.85;
			}

			// Update particles & splat
			for (let index = 0; index < particles.length; index++) {
				const p = particles[index];

				// Mid-flight turbulence
				p.noiseAngle += p.noiseSpeed * delta;
				const noiseOffsetX = Math.cos(p.noiseAngle + index) * p.noiseRadius * midDispersal * 4.5;
				const noiseOffsetY =
					Math.sin(p.noiseAngle * 1.3 + index) * p.noiseRadius * midDispersal * 3.5;

				const targetX = p.startX + (p.endX - p.startX) * t + noiseOffsetX;
				const targetY = p.startY + (p.endY - p.startY) * t + noiseOffsetY;

				const dx = targetX - p.x;
				const dy = targetY - p.y;

				p.vx += dx * 0.08;
				p.vy += dy * 0.08;
				p.vx *= 0.78;
				p.vy *= 0.78;

				p.x += p.vx;
				p.y += p.vy;

				splatStamp(p.x, p.y);
			}

			// Sample field to ASCII rows
			for (let row = 0; row < config.rows; row++) {
				let rowHtml = '';
				const fieldRowStart = row * fieldOversample * fieldCols;

				for (let col = 0; col < config.cols; col++) {
					const fieldColStart = col * fieldOversample;
					let brightnessSum = 0;

					for (let sy = 0; sy < fieldOversample; sy++) {
						const sampleRowOffset = fieldRowStart + sy * fieldCols + fieldColStart;
						for (let sx = 0; sx < fieldOversample; sx++) {
							brightnessSum += brightnessField[sampleRowOffset + sx];
						}
					}

					const brightnessNormalized = brightnessSum / (fieldOversample * fieldOversample);
					const brightnessByte = Math.min(255, (brightnessNormalized * 255) | 0);
					const entry = lookup[brightnessByte];
					rowHtml += entry.propHtml;
				}

				rowElements[row].innerHTML = rowHtml;
			}

			animationFrameId = requestAnimationFrame(render);
		};

		animationFrameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div bind:this={containerElement} class="ascii-scroll-container">
	<div class="ascii-sticky-viewport">
		<div class="ascii-wrapper">
			<div class="ascii-header-tag">
				<span class="indicator-dot"></span>
				<span class="indicator-text">
					{scrollProgress < 0.35
						? 'Variable Typographic ASCII — THANAPHUM'
						: scrollProgress < 0.75
							? 'Morphing in progress...'
							: 'Variable Typographic ASCII — EXPERIENCE'}
				</span>
			</div>

			<div class="ascii-art-box" bind:this={propBoxElement}></div>

			<div class="ascii-footer-hint" style="opacity: {Math.max(0, 1 - scrollProgress * 2.5)};">
				<span class="scroll-arrow">↓</span>
				<span class="scroll-text">Scroll to morph</span>
			</div>
		</div>
	</div>
</div>

<style>
	.ascii-scroll-container {
		position: relative;
		width: 100%;
		height: 260vh;
		background: #000000;
	}

	.ascii-sticky-viewport {
		position: sticky;
		top: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: #000000;
	}

	.ascii-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		max-width: 95vw;
	}

	.ascii-header-tag {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.85rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.6);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}

	.indicator-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 8px #22c55e;
	}

	.ascii-art-box {
		width: 100%;
		max-width: 640px;
		background: radial-gradient(circle at center, rgba(20, 20, 25, 0.7) 0%, rgba(0, 0, 0, 0.95) 100%);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		padding: 1.5rem 1rem;
		box-shadow:
			0 20px 40px -15px rgba(0, 0, 0, 0.9),
			inset 0 0 40px rgba(0, 0, 0, 0.8);
		overflow: hidden;
		user-select: none;
	}

	:global(.ascii-row) {
		display: block;
		width: fit-content;
		margin-inline: auto;
		white-space: pre;
		font-family: Georgia, Palatino, 'Times New Roman', serif;
		font-size: 14px;
		letter-spacing: -0.01em;
	}

	:global(.w3) {
		font-weight: 300;
	}
	:global(.w5) {
		font-weight: 500;
	}
	:global(.w8) {
		font-weight: 800;
	}
	:global(.it) {
		font-style: italic;
	}

	:global(.a1) {
		color: rgba(230, 220, 200, 0.12);
	}
	:global(.a2) {
		color: rgba(230, 220, 200, 0.22);
	}
	:global(.a3) {
		color: rgba(230, 220, 200, 0.32);
	}
	:global(.a4) {
		color: rgba(230, 220, 200, 0.44);
	}
	:global(.a5) {
		color: rgba(235, 225, 205, 0.56);
	}
	:global(.a6) {
		color: rgba(240, 230, 210, 0.68);
	}
	:global(.a7) {
		color: rgba(245, 235, 215, 0.8);
	}
	:global(.a8) {
		color: rgba(250, 240, 220, 0.9);
	}
	:global(.a9) {
		color: rgba(255, 248, 230, 0.96);
	}
	:global(.a10) {
		color: #ffffff;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.ascii-footer-hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.8rem;
		transition: opacity 0.2s ease-out;
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
