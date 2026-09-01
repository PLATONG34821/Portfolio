import { prepareWithSegments } from '@chenglou/pretext';

export interface PaletteEntry {
	char: string;
	weight: number;
	style: 'normal' | 'italic';
	font: string;
	width: number;
	brightness: number;
}

export interface LookupEntry {
	monoChar: string;
	propHtml: string;
}

export interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	noiseAngle: number;
	noiseSpeed: number;
	noiseRadius: number;
}

export interface AsciiConfig {
	canvasWidth: number;
	canvasHeight: number;
	cols: number;
	rows: number;
	fontSize: number;
	lineHeight: number;
	targetRowWidth: number;
	fontFamily: string;
	particleCount: number;
}

export const defaultConfig: AsciiConfig = {
	canvasWidth: 520,
	canvasHeight: 320,
	cols: 58,
	rows: 26,
	fontSize: 14,
	lineHeight: 16,
	targetRowWidth: 500,
	fontFamily: 'Georgia, Palatino, "Times New Roman", serif',
	particleCount: 850
};

const charset =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",./<>?~';
const weights = [300, 500, 800];
const styles: ('normal' | 'italic')[] = ['normal', 'italic'];

function escapeHtml(char: string): string {
	if (char === '<') return '&lt;';
	if (char === '>') return '&gt;';
	if (char === '&') return '&amp;';
	if (char === '"') return '&quot;';
	return char;
}

function getWeightClass(weight: number, style: 'normal' | 'italic'): string {
	const weightClass = weight === 300 ? 'w3' : weight === 500 ? 'w5' : 'w8';
	return style === 'italic' ? `${weightClass} it` : weightClass;
}

export function buildPalette(config: AsciiConfig = defaultConfig): LookupEntry[] {
	if (typeof document === 'undefined') return [];

	const measureCanvas = document.createElement('canvas');
	const size = 32;
	measureCanvas.width = size;
	measureCanvas.height = size;
	const context = measureCanvas.getContext('2d', { willReadFrequently: true });
	if (!context) return [];

	const palette: PaletteEntry[] = [];

	for (const style of styles) {
		for (const weight of weights) {
			const font = `${style === 'italic' ? 'italic ' : ''}${weight} ${config.fontSize}px ${config.fontFamily}`;

			for (const char of charset) {
				if (char === ' ') continue;

				let width = 0;
				try {
					const prepared = prepareWithSegments(char, font);
					width = prepared.widths && prepared.widths.length > 0 ? prepared.widths[0] : 0;
				} catch {
					width = 8;
				}

				if (width <= 0) continue;

				context.clearRect(0, 0, size, size);
				context.font = font;
				context.fillStyle = '#ffffff';
				context.textBaseline = 'middle';
				context.fillText(char, 1, size / 2);

				const imageData = context.getImageData(0, 0, size, size).data;
				let sum = 0;
				for (let index = 3; index < imageData.length; index += 4) {
					sum += imageData[index];
				}
				const brightness = sum / (255 * size * size);

				palette.push({
					char,
					weight,
					style,
					font,
					width,
					brightness
				});
			}
		}
	}

	const maxBrightness = Math.max(...palette.map((item) => item.brightness), 0.001);
	for (let index = 0; index < palette.length; index++) {
		palette[index].brightness /= maxBrightness;
	}

	palette.sort((a, b) => a.brightness - b.brightness);

	const targetCellWidth = config.targetRowWidth / config.cols;

	function findBestMatch(targetBrightness: number): PaletteEntry {
		let low = 0;
		let high = palette.length - 1;
		while (low < high) {
			const mid = (low + high) >> 1;
			if (palette[mid].brightness < targetBrightness) {
				low = mid + 1;
			} else {
				high = mid;
			}
		}

		let bestScore = Infinity;
		let bestEntry = palette[low] || palette[0];
		const start = Math.max(0, low - 18);
		const end = Math.min(palette.length, low + 18);

		for (let index = start; index < end; index++) {
			const entry = palette[index];
			const brightnessError = Math.abs(entry.brightness - targetBrightness) * 2.8;
			const widthError = Math.abs(entry.width - targetCellWidth) / targetCellWidth;
			const score = brightnessError + widthError;
			if (score < bestScore) {
				bestScore = score;
				bestEntry = entry;
			}
		}

		return bestEntry;
	}

	const monoRamp = ' .`-_:,;^=+/|)\\!?0oOQ#%@';
	const lookup: LookupEntry[] = [];

	for (let brightnessByte = 0; brightnessByte < 256; brightnessByte++) {
		const brightness = brightnessByte / 255;
		const monoChar = monoRamp[Math.min(monoRamp.length - 1, (brightness * monoRamp.length) | 0)];

		if (brightness < 0.035) {
			lookup.push({ monoChar: ' ', propHtml: ' ' });
			continue;
		}

		const match = findBestMatch(brightness);
		const alphaIndex = Math.max(1, Math.min(10, Math.round(brightness * 10)));
		const weightClass = getWeightClass(match.weight, match.style);

		lookup.push({
			monoChar,
			propHtml: `<span class="${weightClass} a${alphaIndex}">${escapeHtml(match.char)}</span>`
		});
	}

	return lookup;
}

export function sampleTextAnchors(
	text: string,
	count: number,
	width: number,
	height: number,
	fontSize: number = 72,
	fontFamily: string = 'Georgia, serif'
): { x: number; y: number }[] {
	if (typeof document === 'undefined') return [];

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext('2d', { willReadFrequently: true });
	if (!context) return [];

	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);

	context.fillStyle = '#ffffff';
	context.font = `900 ${fontSize}px ${fontFamily}`;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(text, width / 2, height / 2);

	const imageData = context.getImageData(0, 0, width, height).data;
	const whitePixels: { x: number; y: number }[] = [];

	const step = 2;
	for (let y = 0; y < height; y += step) {
		for (let x = 0; x < width; x += step) {
			const index = (y * width + x) * 4;
			if (imageData[index] > 100) {
				whitePixels.push({ x, y });
			}
		}
	}

	if (whitePixels.length === 0) {
		return Array.from({ length: count }, () => ({
			x: width / 2 + (Math.random() - 0.5) * 100,
			y: height / 2 + (Math.random() - 0.5) * 40
		}));
	}

	const anchors: { x: number; y: number }[] = [];
	for (let index = 0; index < count; index++) {
		const randomIndex = Math.floor((index / count) * whitePixels.length);
		const pixel = whitePixels[randomIndex];
		anchors.push({
			x: pixel.x + (Math.random() - 0.5) * 3,
			y: pixel.y + (Math.random() - 0.5) * 3
		});
	}

	return anchors;
}

export function createParticles(
	startAnchors: { x: number; y: number }[],
	endAnchors: { x: number; y: number }[],
	count: number
): Particle[] {
	const particles: Particle[] = [];

	for (let index = 0; index < count; index++) {
		const start = startAnchors[index % startAnchors.length];
		const end = endAnchors[index % endAnchors.length];

		particles.push({
			x: start.x,
			y: start.y,
			vx: (Math.random() - 0.5) * 0.4,
			vy: (Math.random() - 0.5) * 0.4,
			startX: start.x,
			startY: start.y,
			endX: end.x,
			endY: end.y,
			noiseAngle: Math.random() * Math.PI * 2,
			noiseSpeed: 0.0015 + Math.random() * 0.002,
			noiseRadius: 3 + Math.random() * 8
		});
	}

	return particles;
}

export function createFieldStamp(radiusPx: number, scaleX: number, scaleY: number) {
	const fieldRadiusX = radiusPx * scaleX;
	const fieldRadiusY = radiusPx * scaleY;
	const radiusX = Math.ceil(fieldRadiusX);
	const radiusY = Math.ceil(fieldRadiusY);
	const sizeX = radiusX * 2 + 1;
	const sizeY = radiusY * 2 + 1;
	const values = new Float32Array(sizeX * sizeY);

	for (let y = -radiusY; y <= radiusY; y++) {
		for (let x = -radiusX; x <= radiusX; x++) {
			const distance = Math.sqrt((x / fieldRadiusX) ** 2 + (y / fieldRadiusY) ** 2);
			if (distance <= 1) {
				const alpha = distance <= 0.3 ? 0.7 : 0.7 * (1 - (distance - 0.3) / 0.7);
				values[(y + radiusY) * sizeX + x + radiusX] = alpha;
			}
		}
	}

	return { radiusX, radiusY, sizeX, sizeY, values };
}
