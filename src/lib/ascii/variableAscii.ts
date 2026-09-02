import figlet from 'figlet';
import { bigMoneySeFont } from '$lib/ascii/bigMoneySeFont';
import { slantFont } from '$lib/ascii/slantFont';

const FONT_NAME = 'Big Money-se';
const SUBTITLE_FONT = 'Slant';
const TWO_PI = Math.PI * 2;
const artCache = new Map<string, string[]>();
let isFontParsed = false;

function ensureFont(): void {
	if (!isFontParsed) {
		figlet.parseFont(FONT_NAME, bigMoneySeFont);
		figlet.parseFont(SUBTITLE_FONT, slantFont);
		isFontParsed = true;
	}
}

export function generateFigletArt(text: string): string[] {
	const cached = artCache.get(text);
	if (cached) return cached;

	ensureFont();

	// Split by either literal "\n" string or actual newline characters
	const words = text.split(/\\n|\n/);
	const allLines: string[] = [];

	for (let i = 0; i < words.length; i++) {
		const word = words[i].trim();
		if (!word) continue;

		// Main title uses Big Money-se; subtitle line uses Slant for a smaller, sleeker scale
		const font = i === 0 ? FONT_NAME : 'Slant';
		const raw = figlet.textSync(word, { font });
		const lines = raw.split('\n');

		// Trim trailing blank lines of this word
		while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
			lines.pop();
		}

		if (i > 0 && allLines.length > 0) {
			// Add 1 blank spacer row between lines
			allLines.push('');
		}

		allLines.push(...lines);
	}

	artCache.set(text, allLines);
	return allLines;
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
	const globalStartY = (rows - lineCount) >> 1;

	// Group contiguous lines into blocks (separated by empty lines)
	const blocks: { startRow: number; lines: string[]; width: number }[] = [];
	let currentBlockLines: string[] = [];
	let blockStartRow = 0;

	for (let r = 0; r < lineCount; r++) {
		const line = lines[r];
		if (line.trim() === '') {
			if (currentBlockLines.length > 0) {
				const width = Math.max(...currentBlockLines.map((l) => l.length));
				blocks.push({ startRow: blockStartRow, lines: currentBlockLines, width });
				currentBlockLines = [];
			}
		} else {
			if (currentBlockLines.length === 0) {
				blockStartRow = r;
			}
			currentBlockLines.push(line);
		}
	}

	if (currentBlockLines.length > 0) {
		const width = Math.max(...currentBlockLines.map((l) => l.length));
		blocks.push({ startRow: blockStartRow, lines: currentBlockLines, width });
	}

	const points: FigletPoint[] = [];

	for (const block of blocks) {
		const blockStartX = (cols - block.width) >> 1;

		for (let r = 0; r < block.lines.length; r++) {
			const line = block.lines[r];
			const len = line.length;
			const py = globalStartY + block.startRow + r;

			for (let c = 0; c < len; c++) {
				const ch = line[c];
				if (ch !== ' ') {
					points.push({
						x: blockStartX + c,
						y: py,
						char: ch,
						type: getCharType(ch)
					});
				}
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
