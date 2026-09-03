import { precomputedAsciiArt } from '$lib/data/asciiData';
export { precomputedAsciiArt };

const TWO_PI = Math.PI * 2;

export function generateFigletArt(text: string): string[] {
	const normalized = text.replace(/\\n/g, '\n');
	return precomputedAsciiArt[normalized] || precomputedAsciiArt[text] || [];
}

export type CharType = 'shadow' | 'outline' | 'normal';

export interface FigletPoint {
	x: number;
	y: number;
	char: string;
	type: CharType;
}

export function extractFigletPoints(lines: string[], cols: number, rows: number): FigletPoint[] {
	const globalStartY = (rows - lines.length) >> 1;
	const points: FigletPoint[] = [];
	let blockLines: string[] = [];
	let blockStartRow = 0;

	const flushBlock = () => {
		if (!blockLines.length) return;
		const width = Math.max(...blockLines.map((l) => l.length));
		const blockStartX = (cols - width) >> 1;
		const is3d = blockLines.some((l) => l.includes('$'));

		blockLines.forEach((line, r) => {
			for (let c = 0; c < line.length; c++) {
				const char = line[c];
				if (char !== ' ') {
					points.push({
						x: blockStartX + c,
						y: globalStartY + blockStartRow + r,
						char,
						type: is3d ? (char === '$' ? 'shadow' : 'outline') : 'shadow'
					});
				}
			}
		});
		blockLines = [];
	};

	lines.forEach((line, r) => {
		if (line.trim() === '') {
			flushBlock();
		} else {
			if (!blockLines.length) blockStartRow = r;
			blockLines.push(line);
		}
	});
	flushBlock();

	return points;
}

export interface MultiStageTarget {
	x: number;
	y: number;
	char: string;
	type: CharType;
	alpha: number;
}

export interface MultiStageFigletParticle {
	targets: MultiStageTarget[];
	angle: number;
	speed: number;
	radiusX: number;
	radiusY: number;
}

export function createMultiStageFigletParticles(
	stages: FigletPoint[][]
): MultiStageFigletParticle[] {
	if (!stages.length) return [];
	const count = Math.max(...stages.map((s) => s.length));
	if (count === 0) return [];

	const particles: MultiStageFigletParticle[] = Array.from({ length: count }, (_, i) => ({
		targets: [],
		angle: (i / count) * TWO_PI,
		speed: 0.001 + (i % 11) * 0.0002,
		radiusX: 2 + (i % 4) * 0.8,
		radiusY: 1 + (i % 3) * 0.5
	}));

	for (let k = 0; k < stages.length; k++) {
		const pts = stages[k];
		const ptsLen = pts.length;
		if (ptsLen === 0) continue;

		const used = new Uint8Array(ptsLen);

		for (let i = 0; i < count; i++) {
			if (k === 0) {
				const pt = pts[i % ptsLen];
				particles[i].targets.push({
					x: pt.x,
					y: pt.y,
					char: pt.char,
					type: pt.type,
					alpha: i < ptsLen ? 1.0 : 0.0
				});
				continue;
			}

			const prevTarget = particles[i].targets[k - 1];
			let bestIdx = -1;
			let bestDist = Infinity;

			for (let j = 0; j < ptsLen; j++) {
				if (used[j] === 0) {
					const dx = prevTarget.x - pts[j].x;
					const dy = prevTarget.y - pts[j].y;
					const dist = dx * dx + dy * dy;
					if (dist < bestDist) {
						bestDist = dist;
						bestIdx = j;
					}
				}
			}

			if (bestIdx !== -1) {
				used[bestIdx] = 1;
				const pt = pts[bestIdx];
				particles[i].targets.push({ x: pt.x, y: pt.y, char: pt.char, type: pt.type, alpha: 1.0 });
			} else {
				// Surplus particle: disperse gently with alpha = 0 to prevent stacking
				particles[i].targets.push({
					x: prevTarget.x + Math.sin(i * 2.3) * 2,
					y: prevTarget.y + Math.cos(i * 2.3) * 2,
					char: prevTarget.char,
					type: prevTarget.type,
					alpha: 0.0
				});
			}
		}
	}

	return particles;
}
