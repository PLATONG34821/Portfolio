import figlet from 'figlet';
import { bigMoneySeFont } from '$lib/ascii/bigMoneySeFont';

const FONT_NAME = 'Big Money-se';
const TWO_PI = Math.PI * 2;
const artCache = new Map<string, string[]>();
let isFontParsed = false;

function ensureFont(): void {
	if (!isFontParsed) {
		figlet.parseFont(FONT_NAME, bigMoneySeFont);
		isFontParsed = true;
	}
}

export function generateFigletArt(text: string): string[] {
	const cached = artCache.get(text);
	if (cached) return cached;

	ensureFont();
	const raw = figlet.textSync(text, { font: FONT_NAME });
	const lines = raw.split('\n');

	// Trim trailing blank lines
	while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
		lines.pop();
	}

	artCache.set(text, lines);
	return lines;
}

export type CharType = 'shadow' | 'outline' | 'normal';

export interface FigletPoint {
	x: number;
	y: number;
	char: string;
	type: CharType;
}

export interface FigletParticle {
	x: number;
	y: number;
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	startChar: string;
	endChar: string;
	startType: CharType;
	endType: CharType;
	angle: number;
	speed: number;
	radiusX: number;
	radiusY: number;
}

function getCharType(char: string): CharType {
	if (char === '$') return 'shadow';
	if (char === '_' || char === '|' || char === '/' || char === '\\' || char === '-') {
		return 'outline';
	}
	return 'normal';
}

export function extractFigletPoints(lines: string[], cols: number, rows: number): FigletPoint[] {
	const lineCount = lines.length;
	let maxLineWidth = 0;

	for (let i = 0; i < lineCount; i++) {
		const len = lines[i].length;
		if (len > maxLineWidth) maxLineWidth = len;
	}

	const startY = (rows - lineCount) >> 1;
	const startX = (cols - maxLineWidth) >> 1;

	const points: FigletPoint[] = [];

	for (let r = 0; r < lineCount; r++) {
		const line = lines[r];
		const len = line.length;
		const py = startY + r;

		for (let c = 0; c < len; c++) {
			const ch = line[c];
			if (ch !== ' ') {
				points.push({
					x: startX + c,
					y: py,
					char: ch,
					type: getCharType(ch)
				});
			}
		}
	}

	return points;
}

export function createFigletParticles(
	startPoints: FigletPoint[],
	endPoints: FigletPoint[]
): FigletParticle[] {
	const startLen = startPoints.length;
	const endLen = endPoints.length;
	if (startLen === 0 || endLen === 0) return [];

	const count = Math.max(startLen, endLen);
	const particles: FigletParticle[] = new Array(count);

	// Track matched endpoints with a bitset/byte array for O(1) matching checks
	const usedEnd = new Uint8Array(endLen);
	let usedEndCount = 0;

	for (let i = 0; i < startLen; i++) {
		const s = startPoints[i];
		let bestIdx = -1;
		let bestDist = Infinity;

		for (let j = 0; j < endLen; j++) {
			if (usedEnd[j] === 0) {
				const e = endPoints[j];
				const dx = s.x - e.x;
				const dy = s.y - e.y;
				const dist = dx * dx + dy * dy;

				if (dist < bestDist) {
					bestDist = dist;
					bestIdx = j;
				}
			}
		}

		if (bestIdx !== -1) {
			usedEnd[bestIdx] = 1;
			usedEndCount++;
		} else {
			bestIdx = i % endLen;
		}

		const e = endPoints[bestIdx];

		particles[i] = {
			x: s.x,
			y: s.y,
			startX: s.x,
			startY: s.y,
			endX: e.x,
			endY: e.y,
			startChar: s.char,
			endChar: e.char,
			startType: s.type,
			endType: e.type,
			angle: (i / count) * TWO_PI,
			speed: 0.001 + (i % 11) * 0.0002,
			radiusX: 2 + (i % 4) * 0.8,
			radiusY: 1 + (i % 3) * 0.5
		};
	}

	// Handle surplus endpoints if target has more characters than start
	let particleIndex = startLen;
	if (usedEndCount < endLen) {
		for (let j = 0; j < endLen && particleIndex < count; j++) {
			if (usedEnd[j] === 0) {
				const e = endPoints[j];
				const s = startPoints[particleIndex % startLen];

				particles[particleIndex++] = {
					x: s.x,
					y: s.y,
					startX: s.x,
					startY: s.y,
					endX: e.x,
					endY: e.y,
					startChar: s.char,
					endChar: e.char,
					startType: s.type,
					endType: e.type,
					angle: (particleIndex / count) * TWO_PI,
					speed: 0.0012,
					radiusX: 2,
					radiusY: 1
				};
			}
		}
	}

	return particles;
}
