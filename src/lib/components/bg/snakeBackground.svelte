<script lang="ts">
	import { onMount } from 'svelte';

	interface Segment {
		x: number;
		y: number;
		angle: number;
		normalX: number;
		normalY: number;
		radius: number;
	}

	interface WakeParticle {
		x: number;
		y: number;
		char: string;
		alpha: number;
		size: number;
		color: string;
	}

	let canvasElement = $state<HTMLCanvasElement | null>(null);

	const NUM_SEGMENTS = 78;
	const SEGMENT_DISTANCE = 8.5;
	const BASE_SPEED = 2.4;
	const TURN_SMOOTHING = 0.048;

	// Character sets for density-based ASCII cylindrical shading
	const DORSAL_GLYPHS = ['◈', '◆', '◇', '§', 'X', 'O', '8'];
	const SPINE_GLYPHS = ['█', '▓', '#', 'B', '%', '@'];
	const INNER_FLANK_GLYPHS = ['▒', '=', '+', '*', '&'];
	const OUTER_FLANK_GLYPHS = ['░', '~', '-', ':'];
	const EDGE_LEFT_GLYPHS = ['[', '(', '{', '<', '/'];
	const EDGE_RIGHT_GLYPHS = [']', ')', '}', '>', '\\'];
	const WAKE_GLYPHS = ['.', '·', ':', "'", '`', '~'];

	onMount(() => {
		if (!canvasElement) return;
		const canvas = canvasElement;
		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let animationFrameId: number;
		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);
		let dpr = Math.min(window.devicePixelRatio || 1, 2);

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		resize();
		window.addEventListener('resize', resize, { passive: true });

		// Mouse interaction
		let mouseX = -1000;
		let mouseY = -1000;
		let hasMouse = false;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			hasMouse = true;
		};

		const handleMouseLeave = () => {
			hasMouse = false;
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

		// Anatomical radius profile
		function computeRadius(i: number, total: number): number {
			const t = i / total;
			if (t < 0.06) {
				// Snout
				return 8 + (t / 0.06) * 8; // 8 -> 16
			} else if (t < 0.14) {
				// Head width at jaw angles
				const ht = (t - 0.06) / 0.08;
				return 16 + Math.sin(ht * Math.PI) * 7.5; // reaches ~23.5
			} else if (t < 0.22) {
				// Neck taper
				const nt = (t - 0.14) / 0.08;
				return 20 - Math.sin(nt * Math.PI * 0.5) * 6; // narrows to 14
			} else if (t < 0.68) {
				// Main muscular body
				const bt = (t - 0.22) / 0.46;
				return 14 + Math.sin(bt * Math.PI * 0.5) * 6.5; // up to 20.5
			} else {
				// Tail taper down to single glyph
				const tt = (t - 0.68) / 0.32;
				return Math.max(1.5, 20.5 * Math.pow(1 - tt, 1.75));
			}
		}

		const radii = new Float32Array(NUM_SEGMENTS);
		for (let i = 0; i < NUM_SEGMENTS; i++) {
			radii[i] = computeRadius(i, NUM_SEGMENTS);
		}

		// Initialize snake segments
		const segments: Segment[] = [];
		let headX = width * 0.4;
		let headY = height * 0.45;
		let headAngle = Math.random() * Math.PI * 2;
		let targetAngle = headAngle;

		for (let i = 0; i < NUM_SEGMENTS; i++) {
			const x = headX - Math.cos(headAngle) * (i * SEGMENT_DISTANCE);
			const y = headY - Math.sin(headAngle) * (i * SEGMENT_DISTANCE);
			segments.push({
				x,
				y,
				angle: headAngle,
				normalX: -Math.sin(headAngle),
				normalY: Math.cos(headAngle),
				radius: radii[i]
			});
		}

		// Faint trailing wake particles shed by the snake
		const wakeParticles: WakeParticle[] = [];

		// Animation state
		let walkCycle = 0;
		let tongueCycle = 0;
		let isTongueOut = false;
		let tonguePhase = 0;
		let isPageVisible = !document.hidden;

		const handleVisibilityChange = () => {
			isPageVisible = !document.hidden;
			if (isPageVisible) {
				animationFrameId = requestAnimationFrame(render);
			}
		};
		document.addEventListener('visibilitychange', handleVisibilityChange);

		function render() {
			if (!ctx || !isPageVisible) return;

			// Clear frame
			ctx.clearRect(0, 0, width, height);

			// AI Autonomous path steering
			if (Math.random() < 0.035) {
				targetAngle += (Math.random() - 0.5) * 1.35;
			}

			// Screen edge repulsion
			const edgeMargin = 110;
			let edgeSteerX = 0;
			let edgeSteerY = 0;

			if (headX < edgeMargin) edgeSteerX += (edgeMargin - headX) / edgeMargin;
			if (headX > width - edgeMargin) edgeSteerX -= (headX - (width - edgeMargin)) / edgeMargin;
			if (headY < edgeMargin) edgeSteerY += (edgeMargin - headY) / edgeMargin;
			if (headY > height - edgeMargin) edgeSteerY -= (headY - (height - edgeMargin)) / edgeMargin;

			if (edgeSteerX !== 0 || edgeSteerY !== 0) {
				const desiredAngle = Math.atan2(edgeSteerY, edgeSteerX);
				let angleDiff = desiredAngle - headAngle;
				while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
				while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
				targetAngle += angleDiff * 0.14;
			}

			// Interactive mouse steering
			if (hasMouse) {
				const dx = mouseX - headX;
				const dy = mouseY - headY;
				const dist = Math.hypot(dx, dy);

				if (dist < 280 && dist > 40) {
					const toMouseAngle = Math.atan2(dy, dx);
					let diff = toMouseAngle - headAngle;
					while (diff < -Math.PI) diff += Math.PI * 2;
					while (diff > Math.PI) diff -= Math.PI * 2;
					targetAngle += diff * 0.022;
				}
			}

			// Smooth angle interpolation
			let angleDiff = targetAngle - headAngle;
			while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
			while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
			headAngle += angleDiff * TURN_SMOOTHING;

			// Forward locomotion + serpentine lateral wave
			walkCycle += 0.088;
			const lateralDrift = Math.cos(walkCycle) * 1.4;
			const normalX = -Math.sin(headAngle);
			const normalY = Math.cos(headAngle);

			headX += Math.cos(headAngle) * BASE_SPEED + normalX * lateralDrift * 0.35;
			headY += Math.sin(headAngle) * BASE_SPEED + normalY * lateralDrift * 0.35;

			// Update head segment
			segments[0].x = headX;
			segments[0].y = headY;
			segments[0].angle = headAngle;
			segments[0].normalX = normalX;
			segments[0].normalY = normalY;

			// Inverse kinematics for trailing spine
			for (let i = 1; i < NUM_SEGMENTS; i++) {
				const prev = segments[i - 1];
				const curr = segments[i];

				const dx = prev.x - curr.x;
				const dy = prev.y - curr.y;
				const segAngle = Math.atan2(dy, dx);

				// S-curve wave traveling backward
				const waveProgress = (i / NUM_SEGMENTS) * Math.PI;
				const waveOffset = Math.sin(walkCycle - i * 0.17) * Math.sin(waveProgress) * 2.3;

				const targetX = prev.x - Math.cos(segAngle) * SEGMENT_DISTANCE;
				const targetY = prev.y - Math.sin(segAngle) * SEGMENT_DISTANCE;

				curr.x += (targetX - curr.x) * 0.88;
				curr.y += (targetY - curr.y) * 0.88;

				const segNormalX = -Math.sin(segAngle);
				const segNormalY = Math.cos(segAngle);

				curr.x += segNormalX * waveOffset * 0.16;
				curr.y += segNormalY * waveOffset * 0.16;

				curr.angle = segAngle;
				curr.normalX = segNormalX;
				curr.normalY = segNormalY;
			}

			// Tongue timer
			tongueCycle++;
			if (!isTongueOut && tongueCycle % 220 === 0) {
				isTongueOut = true;
				tonguePhase = 0;
			}
			if (isTongueOut) {
				tonguePhase++;
				if (tonguePhase > 36) {
					isTongueOut = false;
				}
			}

			// Shed occasional faint ASCII wake particles from midbody and tail
			if (Math.random() < 0.25) {
				const segIdx = Math.floor(Math.random() * (NUM_SEGMENTS - 15)) + 10;
				const seg = segments[segIdx];
				const jitter = (Math.random() - 0.5) * seg.radius * 1.4;
				wakeParticles.push({
					x: seg.x + seg.normalX * jitter,
					y: seg.y + seg.normalY * jitter,
					char: WAKE_GLYPHS[Math.floor(Math.random() * WAKE_GLYPHS.length)],
					alpha: 0.35,
					size: 8 + Math.random() * 3,
					color: Math.random() < 0.3 ? '#34d399' : '#71717a'
				});
			}

			// ─── PASS 1: RENDER FAINT SHED WAKE PARTICLES ───
			ctx.save();
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			for (let p = wakeParticles.length - 1; p >= 0; p--) {
				const pt = wakeParticles[p];
				pt.alpha -= 0.007;
				if (pt.alpha <= 0) {
					wakeParticles.splice(p, 1);
					continue;
				}
				ctx.font = `${pt.size}px ui-monospace, monospace`;
				ctx.fillStyle = pt.color;
				ctx.globalAlpha = pt.alpha;
				ctx.fillText(pt.char, pt.x, pt.y);
			}
			ctx.restore();

			// ─── PASS 2: RENDER FORKED ASCII TONGUE ───
			if (isTongueOut) {
				ctx.save();
				const head = segments[0];
				const snoutDist = 20;
				const snoutX = head.x + Math.cos(head.angle) * snoutDist;
				const snoutY = head.y + Math.sin(head.angle) * snoutDist;

				const flicker = Math.sin(tonguePhase * 1.8) * 3;
				const tongueProgress =
					tonguePhase <= 10 ? tonguePhase / 10 : tonguePhase <= 24 ? 1 : (36 - tonguePhase) / 12;

				ctx.translate(snoutX, snoutY);
				ctx.rotate(head.angle);

				ctx.font = 'bold 12px ui-monospace, monospace';
				ctx.textAlign = 'left';
				ctx.textBaseline = 'middle';

				// Ruby terminal red
				ctx.fillStyle = '#f43f5e';
				ctx.shadowColor = '#f43f5e';
				ctx.shadowBlur = 4;
				ctx.globalAlpha = tongueProgress * 0.9;

				const tongueLength = Math.floor(tongueProgress * 3);
				const stem = '='.repeat(Math.max(1, tongueLength));
				const fork = tonguePhase % 4 < 2 ? '<' : '{';

				ctx.fillText(`${stem}${fork}`, 2, flicker);
				ctx.restore();
			}

			// ─── PASS 3: RENDER ASCII BODY VERTEBRAE & SCALES (TAIL TO NECK) ───
			ctx.save();
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			// Render from tail to neck so forward scales naturally overlap
			for (let i = NUM_SEGMENTS - 1; i >= 1; i--) {
				const seg = segments[i];
				const r = seg.radius;
				const t = i / NUM_SEGMENTS;

				ctx.save();
				ctx.translate(seg.x, seg.y);
				ctx.rotate(seg.angle);

				// Font scaling tailored to vertebra radius
				const baseFontSize = Math.min(13, Math.max(7.5, r * 0.72));
				ctx.font = `${baseFontSize}px ui-monospace, 'SF Mono', 'Cascadia Code', monospace`;

				if (r < 3.5) {
					// Tail tip: single delicate terminal character
					const tipChars = ['.', '·', '-', '~'];
					const char = tipChars[Math.min(tipChars.length - 1, Math.floor((1 - t) * 10))];
					ctx.fillStyle = 'rgba(113, 113, 122, 0.45)';
					ctx.fillText(char, 0, 0);
				} else {
					// Rib character spacing across body width
					const charSpacing = Math.max(5.5, baseFontSize * 0.75);
					const maxOffsets = Math.max(1, Math.floor((r * 0.9) / charSpacing));

					// Render symmetric characters across the vertebra rib
					for (let step = -maxOffsets; step <= maxOffsets; step++) {
						const offsetNorm = step / maxOffsets; // -1 to +1
						const absOffset = Math.abs(offsetNorm);
						const offsetX = 0;
						const offsetY = step * charSpacing;

						let char: string;
						let color: string;
						let alpha: number;

						if (step === 0) {
							// ─── DORSAL SPINE CORE ───
							if (i % 7 === 0 && i < NUM_SEGMENTS - 8) {
								// Glowing emerald geometric diamond crest
								char = DORSAL_GLYPHS[(i / 7) % DORSAL_GLYPHS.length];
								color = '#34d399';
								alpha = 0.85;
								ctx.shadowColor = '#34d399';
								ctx.shadowBlur = 5;
							} else {
								// Dense central spine plate
								char = SPINE_GLYPHS[((i + walkCycle * 2) % SPINE_GLYPHS.length) | 0];
								color = '#e4e4e7';
								alpha = 0.65;
								ctx.shadowBlur = 0;
							}
						} else if (absOffset <= 0.45) {
							// ─── INNER FLANK (MEDIAL SCALES) ───
							char = INNER_FLANK_GLYPHS[((i + step) % INNER_FLANK_GLYPHS.length) | 0];
							color = '#a1a1aa';
							alpha = 0.48;
							ctx.shadowBlur = 0;
						} else if (absOffset <= 0.82) {
							// ─── OUTER FLANK (LATERAL SCALES) ───
							char = OUTER_FLANK_GLYPHS[((i + step) % OUTER_FLANK_GLYPHS.length) | 0];
							color = '#52525b';
							alpha = 0.38;
							ctx.shadowBlur = 0;
						} else {
							// ─── EDGE FLANK SCALES ───
							char =
								step < 0
									? EDGE_LEFT_GLYPHS[i % EDGE_LEFT_GLYPHS.length]
									: EDGE_RIGHT_GLYPHS[i % EDGE_RIGHT_GLYPHS.length];
							color = '#3f3f46';
							alpha = 0.28;
							ctx.shadowBlur = 0;
						}

						ctx.fillStyle = color;
						ctx.globalAlpha = alpha;
						ctx.fillText(char, offsetX, offsetY);
					}
				}

				ctx.restore();
			}
			ctx.restore();

			// ─── PASS 4: RENDER DETAILED ASCII VIPER HEAD ───
			ctx.save();
			const head = segments[0];
			ctx.translate(head.x, head.y);
			ctx.rotate(head.angle);

			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			// Snout tip glyph
			ctx.font = 'bold 13px ui-monospace, monospace';
			ctx.fillStyle = '#a1a1aa';
			ctx.globalAlpha = 0.75;
			ctx.fillText('▲', 17, 0);

			// Cranial frontal armor: [ █ ▓ █ ]
			ctx.font = 'bold 11px ui-monospace, monospace';
			ctx.fillStyle = '#e4e4e7';
			ctx.globalAlpha = 0.85;
			ctx.fillText('█', 8, 0);
			ctx.fillText('▓', 1, 0);
			ctx.fillText('█', -6, 0);

			// Parietal head plates & jaw margins
			ctx.font = '10px ui-monospace, monospace';
			ctx.fillStyle = '#71717a';
			ctx.globalAlpha = 0.55;
			ctx.fillText('[', 10, -5);
			ctx.fillText(']', 10, 5);
			ctx.fillText('/', 4, -13);
			ctx.fillText('\\', 4, 13);
			ctx.fillText('(', -4, -15);
			ctx.fillText(')', -4, 15);
			ctx.fillText('\\', -10, -11);
			ctx.fillText('/', -10, 11);

			// Nostrils: '·'
			ctx.font = 'bold 8px ui-monospace, monospace';
			ctx.fillStyle = '#3f3f46';
			ctx.globalAlpha = 0.85;
			ctx.fillText('·', 13, -3.2);
			ctx.fillText('·', 13, 3.2);

			// Piercing Emerald ASCII Eyes: ◉
			const eyeCoords = [
				{ x: 5, y: -8.8 },
				{ x: 5, y: 8.8 }
			];

			for (const eye of eyeCoords) {
				// Bioluminescent pupil glow
				ctx.shadowColor = '#34d399';
				ctx.shadowBlur = 8;

				ctx.font = 'bold 12px ui-monospace, monospace';
				ctx.fillStyle = '#6ee7b7';
				ctx.globalAlpha = 0.95;
				ctx.fillText('◉', eye.x, eye.y);

				// Outer eye bracket
				ctx.shadowBlur = 0;
				ctx.font = '9px ui-monospace, monospace';
				ctx.fillStyle = '#065f46';
				ctx.globalAlpha = 0.6;
				ctx.fillText(eye.y < 0 ? '⌢' : '⌣', eye.x, eye.y + (eye.y < 0 ? -4 : 4));
			}

			ctx.restore();

			animationFrameId = requestAnimationFrame(render);
		}

		animationFrameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<canvas bind:this={canvasElement} class="snake-ascii-canvas" aria-hidden="true"></canvas>

<style>
	.snake-ascii-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 1; /* Sits behind page content (z-index: 10) and hero text (z-index: 50) */
		transform: translateZ(0);
		user-select: none;
		-webkit-user-select: none;
	}
</style>
