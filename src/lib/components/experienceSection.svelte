<script lang="ts">
	interface ProjectLink {
		label: string;
		url: string;
		iconClass?: string;
	}

	interface ProjectMetric {
		label: string;
		value: string;
		pixelIcon?: string;
	}

	interface Project {
		id: string;
		title: string;
		summary: string;
		pixelIcon: string;
		category: string;
		year: string;
		metrics: ProjectMetric[];
		status: 'PROD' | 'FEAT' | 'RESEARCH' | 'OSS';
		tags: string[];
		githubUrl: string;
		links?: ProjectLink[];
	}

	interface Props {
		scrollProgress?: number;
	}

	let { scrollProgress = 0 }: Props = $props();

	// Pure in-place fade in once EXP finishes assembling (scrollProgress >= 0.6)
	let isRevealed = $derived(scrollProgress >= 0.6);

	// Official SVG Definitions for Crisp Brand Logos & Flags
	const flags = {
		thailand:
			'<svg class="svg-flag" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect fill="#A51931" width="900" height="600"/><rect fill="#F4F5F8" y="100" width="900" height="400"/><rect fill="#2D2A4A" y="200" width="900" height="200"/></svg>',
		japan:
			'<svg class="svg-flag" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect fill="#FFFFFF" width="900" height="600" rx="4"/><circle fill="#BC002D" cx="450" cy="300" r="180"/></svg>'
	};

	const brandLogos = {
		apple:
			'<svg class="brand-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
		android:
			'<svg class="brand-svg" viewBox="0 0 24 24" fill="#3DDC84" xmlns="http://www.w3.org/2000/svg"><path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z"/></svg>',
		web: '<svg class="brand-svg" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
		svelte:
			'<svg class="brand-svg" viewBox="0 0 24 24" fill="#FF3E00" xmlns="http://www.w3.org/2000/svg"><path d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z"/></svg>',
		supabase:
			'<svg class="brand-svg" viewBox="0 0 24 24" fill="#3ECF8E" xmlns="http://www.w3.org/2000/svg"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"/></svg>',
		docker:
			'<svg class="brand-svg" viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>',
		html5:
			'<svg class="brand-svg" viewBox="0 0 24 24" fill="#E34F26" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>'
	};

	const projects: Project[] = [
		{
			id: '01',
			title: 'HLLC 2026 Platform',
			pixelIcon: 'pixelart-icons-font-apple',
			category: 'CAMPUS // PRODUCTION',
			year: '2026',
			status: 'PROD',
			summary:
				'High-concurrency freshmen orientation & live activity management ecosystem engineered for Mae Fah Luang University.',
			metrics: [
				{
					label: 'SCALE',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-users val-icon"></i> 4.4k+</span>',
					pixelIcon: 'pixelart-icons-font-zap'
				},
				{
					label: 'STACK',
					value: `<span class="val-flex logo-group"><span class="logo-item" title="Apple iOS">${brandLogos.apple}</span><span class="logo-item" title="Google Android">${brandLogos.android}</span><span class="logo-item" title="Web App">${brandLogos.web}</span></span>`,
					pixelIcon: 'pixelart-icons-font-code'
				}
			],
			tags: ['SvelteKit', 'TypeScript', 'High Concurrency', 'REST API'],
			githubUrl: 'https://apps.apple.com/th/app/hllc/id6748238190',
			links: [
				{
					label: 'App Store',
					url: 'https://apps.apple.com/th/app/hllc/id6748238190',
					iconClass: 'pixelart-icons-font-apple'
				},
				{
					label: 'Google Play',
					url: 'https://play.google.com/store/apps/details?id=com.hllc.mfuactivity&hl=en',
					iconClass: 'pixelart-icons-font-android'
				},
				{
					label: 'Instagram',
					url: 'https://www.instagram.com/mfu_activities/p/Da1msGcCV8-/',
					iconClass: 'pixelart-icons-font-camera'
				}
			]
		},
		{
			id: '02',
			title: 'TJ-SIF 2022 Innovation',
			pixelIcon: 'pixelart-icons-font-file-text',
			category: 'RESEARCH // INTL_FAIR',
			year: '2022',
			status: 'RESEARCH',
			summary:
				'Selected student research & embedded ICT hardware exhibition presented at Thailand-Japan Student ICT Fair.',
			metrics: [
				{
					label: 'FORUM',
					value: `<span class="val-flex flag-group"><span class="flag-wrapper" title="Thailand">${flags.thailand}</span><span class="val-dot">×</span><span class="flag-wrapper" title="Japan">${flags.japan}</span></span>`,
					pixelIcon: 'pixelart-icons-font-users'
				},
				{
					label: 'DOMAIN',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-sliders val-icon"></i> IoT & Sensors</span>',
					pixelIcon: 'pixelart-icons-font-sliders'
				}
			],
			tags: ['Embedded Systems', 'IoT Hardware', 'Research Paper', 'Sensors'],
			githubUrl: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#p=125',
			links: [
				{
					label: 'Report (Page 125)',
					url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137',
					iconClass: 'pixelart-icons-font-file-text'
				}
			]
		},
		{
			id: '03',
			title: 'polyTone',
			pixelIcon: 'pixelart-icons-font-music',
			category: 'AUDIO // PRESET_PLATFORM',
			year: '2024',
			status: 'PROD',
			summary:
				'Community audio platform for discovering and sharing digital guitar amplifier presets and Impulse Responses (IRs).',
			metrics: [
				{
					label: 'STACK',
					value: `<span class="val-flex logo-group"><span class="logo-item flex-label" title="SvelteKit">${brandLogos.svelte} <span>SvelteKit</span></span><span class="val-dot">·</span><span class="logo-item flex-label" title="Supabase">${brandLogos.supabase} <span>Supabase</span></span></span>`,
					pixelIcon: 'pixelart-icons-font-code'
				},
				{
					label: 'AUDIO',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-music val-icon"></i> Presets & IRs</span>',
					pixelIcon: 'pixelart-icons-font-music'
				}
			],
			tags: ['SvelteKit', 'TypeScript', 'Supabase', 'Web Audio', 'Community'],
			githubUrl: 'https://polytone.pages.dev/',
			links: [
				{
					label: 'Live App',
					url: 'https://polytone.pages.dev/',
					iconClass: 'pixelart-icons-font-external-link'
				}
			]
		},
		{
			id: '04',
			title: 'Portable Hybrid Swarm Cluster',
			pixelIcon: 'pixelart-icons-font-server',
			category: 'DEVOPS // CLUSTER',
			year: '2024',
			status: 'FEAT',
			summary:
				'Resilient multi-node hybrid x86/ARM Docker Swarm edge cluster with automated failover & proxy routing.',
			metrics: [
				{
					label: 'NODES',
					value: `<span class="val-flex logo-group"><span class="logo-item flex-label" title="Docker Swarm">${brandLogos.docker} <span>x86_64</span></span><span class="val-dot">+</span><span class="logo-item flex-label" title="ARM64"><i class="pixelart-icons-font-cpu val-icon"></i> <span>ARM64</span></span></span>`,
					pixelIcon: 'pixelart-icons-font-cloud'
				},
				{
					label: 'TARGET',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-shield val-icon"></i> Edge Homelab</span>',
					pixelIcon: 'pixelart-icons-font-server'
				}
			],
			tags: ['Docker Swarm', 'Homelab', 'Reverse Proxy', 'Linux'],
			githubUrl: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster',
					iconClass: 'pixelart-icons-font-github'
				}
			]
		},
		{
			id: '05',
			title: 'Study-Schedule',
			pixelIcon: 'pixelart-icons-font-sliders',
			category: 'TOOLING // WEB',
			year: '2024',
			status: 'OSS',
			summary:
				'Interactive study timetable designer with high-resolution 4K wallpaper rendering engine.',
			metrics: [
				{
					label: 'EXPORT',
					value:
						'<span class="val-flex icon-group"><i class="pixelart-icons-font-phone val-icon lg" title="Mobile"></i><i class="pixelart-icons-font-laptop val-icon lg" title="Desktop"></i><span class="val-badge">4K</span></span>',
					pixelIcon: 'pixelart-icons-font-zap'
				},
				{
					label: 'ENGINE',
					value: `<span class="val-flex logo-group"><span class="logo-item flex-label" title="HTML5 Canvas">${brandLogos.html5} <span>Canvas</span></span></span>`,
					pixelIcon: 'pixelart-icons-font-code'
				}
			],
			tags: ['Svelte', 'TypeScript', 'Web Canvas', 'Responsive UI'],
			githubUrl: 'https://github.com/PLATONG34821/Study-Schedule',
			links: [
				{
					label: 'Live App',
					url: 'https://schedule-wallpapers.pages.dev/',
					iconClass: 'pixelart-icons-font-external-link'
				},
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/Study-Schedule',
					iconClass: 'pixelart-icons-font-github'
				}
			]
		},
		{
			id: '06',
			title: 'GroupPlan',
			pixelIcon: 'pixelart-icons-font-users',
			category: 'COLLABORATION // WEB',
			year: '2024',
			status: 'OSS',
			summary:
				'Modern team schedule coordination and collaborative group planning web application built with Svelte.',
			metrics: [
				{
					label: 'TYPE',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-users val-icon"></i> Team Planner</span>',
					pixelIcon: 'pixelart-icons-font-users'
				},
				{
					label: 'FRAMEWORK',
					value: `<span class="val-flex logo-group"><span class="logo-item flex-label" title="Svelte 5">${brandLogos.svelte} <span>Svelte 5</span></span></span>`,
					pixelIcon: 'pixelart-icons-font-code'
				}
			],
			tags: ['Svelte', 'TypeScript', 'State Management', 'Team Tooling'],
			githubUrl: 'https://github.com/PLATONG34821/GroupPlan',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/GroupPlan',
					iconClass: 'pixelart-icons-font-github'
				}
			]
		},
		{
			id: '07',
			title: 'Project-DSM',
			pixelIcon: 'pixelart-icons-font-chart-bar-big',
			category: 'IOT // TELEMETRY',
			year: '2024',
			status: 'FEAT',
			summary:
				'Vehicle telemetry & driver behavior analytics application engineered for smart passenger safety.',
			metrics: [
				{
					label: 'SENSORS',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-chart-bar-big val-icon"></i> GPS Telemetry</span>',
					pixelIcon: 'pixelart-icons-font-chart-bar-big'
				},
				{
					label: 'PURPOSE',
					value:
						'<span class="val-flex"><i class="pixelart-icons-font-shield val-icon"></i> Road Safety</span>',
					pixelIcon: 'pixelart-icons-font-shield'
				}
			],
			tags: ['JavaScript', 'IoT Telemetry', 'Sensors', 'Fullstack'],
			githubUrl: 'https://github.com/PLATONG34821/Project-DSM',
			links: [
				{
					label: 'Live App',
					url: 'https://project-dsm.pages.dev/',
					iconClass: 'pixelart-icons-font-external-link'
				},
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/Project-DSM',
					iconClass: 'pixelart-icons-font-github'
				}
			]
		}
	];

	const skills = [
		{
			name: 'Svelte 5 / SvelteKit',
			category: 'Frontend & UI Frameworks',
			status: 'SYS_OK',
			pixelIcon: 'pixelart-icons-font-code'
		},
		{
			name: 'TypeScript / JavaScript',
			category: 'Fullstack Web Architecture',
			status: 'SYS_OK',
			pixelIcon: 'pixelart-icons-font-code'
		},
		{
			name: 'Docker / Docker Swarm',
			category: 'DevOps & Homelab Clusters',
			status: 'SYS_OK',
			pixelIcon: 'pixelart-icons-font-server'
		},
		{
			name: 'Astro / Static Sites',
			category: 'Modern Web Architecture',
			status: 'SYS_OK',
			pixelIcon: 'pixelart-icons-font-sliders'
		},
		{
			name: 'Java / PaperMC API',
			category: 'Game Server Engineering',
			status: 'SYS_OK',
			pixelIcon: 'pixelart-icons-font-gamepad'
		},
		{
			name: 'Python / Scripting',
			category: 'Automation & Hardware Tools',
			status: 'SYS_OK',
			pixelIcon: 'pixelart-icons-font-chart-bar-big'
		}
	];
</script>

<!-- Fixed top gradient curtain that progressively masks cards top-first as they scroll up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- Projects TUI Grid -->
		<div class="projects-grid">
			{#each projects as project (project.id)}
				<div class="tui-card">
					<!-- Card Header: ID + Category -->
					<div class="tui-card-topbar">
						<div class="tui-card-id">
							<i class="{project.pixelIcon} tui-pixel-icon" aria-hidden="true"></i>
							<span class="tui-id-num">#{project.id}</span>
							<span class="tui-category">{project.category}</span>
						</div>
					</div>

					<!-- Title -->
					<div class="tui-title-row">
						<h3 class="tui-project-title">
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a
								href={project.githubUrl}
								target="_blank"
								rel="external noreferrer"
								class="tui-title-link"
							>
								{project.title}
								<span class="tui-arrow">↗</span>
							</a>
						</h3>
					</div>

					<!-- Visual Telemetry / Metric Readout Boxes -->
					<div class="tui-metric-grid">
						{#each project.metrics as metric (metric.label)}
							<div class="tui-metric-box">
								<span class="tui-m-label">
									{#if metric.pixelIcon}
										<i class="{metric.pixelIcon} tui-metric-pixel-icon" aria-hidden="true"></i>
									{/if}
									{metric.label}
								</span>
								<div class="tui-m-val">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html metric.value}
								</div>
							</div>
						{/each}
					</div>

					<!-- Concise Summary Pitch -->
					<p class="tui-desc">{project.summary}</p>

					<!-- Footer: Tech Stack Chips & Action Command Buttons -->
					<div class="tui-card-footer">
						<div class="tui-tags-list">
							{#each project.tags as tag (tag)}
								<span class="tui-tag">
									<span class="tui-tag-dot">·</span>{tag}
								</span>
							{/each}
						</div>

						{#if project.links && project.links.length > 0}
							<div class="tui-links-list">
								{#each project.links as link (link.url)}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a href={link.url} target="_blank" rel="external noreferrer" class="tui-btn">
										{#if link.iconClass}
											<i class="{link.iconClass} tui-btn-pixel-icon" aria-hidden="true"></i>
										{:else}
											<span class="tui-btn-prefix">&gt;</span>
										{/if}
										<span class="tui-btn-text">{link.label}</span>
										<span class="tui-btn-arrow">↗</span>
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Capabilities / Skills TUI Matrix -->
		<div class="skills-wrapper" id="skills">
			<div class="skills-grid">
				{#each skills as skill (skill.name)}
					<div class="tui-skill-box">
						<div class="tui-skill-top">
							<i class="{skill.pixelIcon} tui-skill-pixel-icon" aria-hidden="true"></i>
							<span class="tui-skill-name">{skill.name}</span>
							<span class="tui-skill-status">[{skill.status}]</span>
						</div>
						<div class="tui-skill-meta">
							<span class="tui-skill-cat">{skill.category}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- TUI Session Status Footer -->
		<div class="portfolio-footer">
			<div class="tui-footer-box">
				<div class="tui-footer-line">
					<span class="tui-f-item">[ SESSION: THANAPHUM@PORTFOLIO ]</span>
					<span class="tui-f-item">[ YEAR: {new Date().getFullYear()} ]</span>
					<span class="tui-f-item">[ ARCH: SVELTE 5 ]</span>
				</div>
				<div class="tui-footer-links">
					<a
						href="https://github.com/PLATONG34821"
						target="_blank"
						rel="external noreferrer"
						class="tui-footer-btn"
					>
						<i class="pixelart-icons-font-github tui-foot-icon" aria-hidden="true"></i>
						<span>GITHUB.COM/PLATONG34821 ↗</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Global Monospace & TUI Base */
	.top-fade-curtain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 220px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 180px,
			rgba(0, 0, 0, 0.85) 200px,
			rgba(0, 0, 0, 0.35) 220px,
			transparent 220px
		);
		pointer-events: none;
		z-index: 40;
	}

	.experience-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #000000;
		color: #e2e8f0;
		padding: 7rem 1.5rem 24rem;
		z-index: 10;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		font-family:
			ui-monospace, 'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, Monaco, Consolas, monospace;
	}

	.experience-section.is-revealed {
		opacity: 1;
		pointer-events: auto;
	}

	.content-container {
		max-width: 1160px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	/* TUI Project Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1.5rem;
	}

	/* TUI Card Box */
	.tui-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #090b10;
		border: 1px solid #1a2333;
		border-radius: 6px;
		padding: 1.35rem 1.45rem;
		gap: 0.85rem;
		position: relative;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}

	.tui-card:hover {
		border-color: #38bdf8;
		background: #0d121c;
		transform: translateY(-2px);
		box-shadow:
			0 8px 24px -8px rgba(56, 189, 248, 0.2),
			inset 0 0 0 1px rgba(56, 189, 248, 0.15);
	}

	/* Top Bar in Card */
	.tui-card-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 1px dashed #1a2333;
		padding-bottom: 0.65rem;
	}

	.tui-card-id {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.74rem;
	}

	.tui-pixel-icon {
		font-size: 1.15rem !important;
		line-height: 1;
		color: #38bdf8;
		display: inline-block;
		vertical-align: middle;
	}

	.tui-id-num {
		color: #38bdf8;
		font-weight: 700;
	}

	.tui-category {
		color: #94a3b8;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	/* Title */
	.tui-title-row {
		margin-top: 0.1rem;
	}

	.tui-project-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
		letter-spacing: -0.01em;
	}

	.tui-title-link {
		color: #ffffff;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		transition: color 0.2s ease;
	}

	.tui-title-link:hover {
		color: #38bdf8;
	}

	.tui-arrow {
		font-size: 1.05rem;
		color: #64748b;
		transition:
			color 0.2s ease,
			transform 0.2s ease;
	}

	.tui-title-link:hover .tui-arrow {
		color: #38bdf8;
		transform: translate(2px, -2px);
	}

	/* Visual Telemetry Metric Grid */
	.tui-metric-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.tui-metric-box {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		background: #05070a;
		border: 1px solid #141c2b;
		border-radius: 4px;
		padding: 0.45rem 0.65rem;
	}

	.tui-m-label {
		font-size: 0.68rem;
		color: #64748b;
		letter-spacing: 0.06em;
		font-weight: 600;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.tui-metric-pixel-icon {
		font-size: 0.85rem !important;
		line-height: 1;
		color: #38bdf8;
		display: inline-block;
		vertical-align: middle;
	}

	.tui-m-val {
		font-size: 0.8rem;
		color: #e2e8f0;
		font-weight: 500;
		line-height: 1.4;
	}

	:global(.val-flex) {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	:global(.logo-group) {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	:global(.logo-item) {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	:global(.flex-label) {
		color: #e2e8f0;
		font-size: 0.78rem;
		font-weight: 600;
	}

	:global(.brand-svg) {
		width: 17px;
		height: 17px;
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
	}

	:global(.svg-flag) {
		width: 22px;
		height: 14.6px;
		display: inline-block;
		vertical-align: middle;
		border-radius: 2px;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
	}

	:global(.flag-group) {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	:global(.flag-wrapper) {
		display: inline-flex;
		align-items: center;
		line-height: 1;
	}

	:global(.val-icon) {
		font-size: 0.9rem !important;
		line-height: 1;
		color: #38bdf8;
		display: inline-block;
		vertical-align: middle;
	}

	:global(.val-icon.lg) {
		font-size: 1.15rem !important;
		color: #38bdf8;
		transition: transform 0.2s ease;
	}

	:global(.val-icon.lg:hover) {
		transform: scale(1.15);
		color: #ffffff;
	}

	:global(.val-dot) {
		color: #475569;
		font-weight: 700;
	}

	:global(.val-badge) {
		font-size: 0.72rem;
		color: #94a3b8;
		background: #101626;
		border: 1px solid #1e293b;
		padding: 0.08rem 0.35rem;
		border-radius: 3px;
		font-weight: 700;
	}

	/* Description */
	.tui-desc {
		font-size: 0.87rem;
		line-height: 1.55;
		color: #94a3b8;
		margin: 0;
		flex-grow: 1;
	}

	/* Footer: Tech & Exec */
	.tui-card-footer {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.85rem;
		border-top: 1px solid #141c2b;
	}

	.tui-tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tui-tag {
		color: #94a3b8;
		background: #0d121c;
		border: 1px solid #1a2333;
		padding: 0.15rem 0.45rem;
		border-radius: 3px;
		font-size: 0.72rem;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	.tui-tag-dot {
		color: #38bdf8;
		font-weight: 700;
	}

	.tui-links-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.tui-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: #091424;
		border: 1px solid #1e3a5f;
		color: #38bdf8;
		padding: 0.22rem 0.65rem;
		border-radius: 3px;
		text-decoration: none;
		font-size: 0.74rem;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.tui-btn:hover {
		background: #1e3a5f;
		color: #ffffff;
		border-color: #38bdf8;
	}

	.tui-btn-pixel-icon {
		font-size: 0.95rem !important;
		line-height: 1;
		display: inline-block;
		vertical-align: middle;
	}

	.tui-btn-prefix {
		color: #22c55e;
	}

	.tui-btn-arrow {
		font-size: 0.85rem;
	}

	/* Capabilities / Skills Section */
	.skills-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 1rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.tui-skill-box {
		background: #080a0f;
		border: 1px solid #1e293b;
		border-radius: 4px;
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		transition: border-color 0.2s ease;
	}

	.tui-skill-box:hover {
		border-color: #38bdf8;
		background: #0c1018;
	}

	.tui-skill-top {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}

	.tui-skill-pixel-icon {
		color: #22c55e;
		font-size: 1.05rem !important;
		line-height: 1;
		display: inline-block;
		vertical-align: middle;
	}

	.tui-skill-name {
		font-weight: 700;
		font-size: 0.98rem;
		color: #ffffff;
		flex-grow: 1;
	}

	.tui-skill-status {
		font-size: 0.72rem;
		color: #34d399;
		font-weight: 600;
	}

	.tui-skill-meta {
		padding-left: 1.6rem;
		font-size: 0.75rem;
		color: #64748b;
	}

	/* Footer */
	.portfolio-footer {
		padding-top: 2rem;
	}

	.tui-footer-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		background: #07090e;
		border: 1px solid #1e293b;
		border-radius: 6px;
		padding: 1.1rem 1.5rem;
		font-size: 0.8rem;
	}

	.tui-footer-line {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		color: #64748b;
	}

	.tui-footer-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: #38bdf8;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.tui-foot-icon {
		font-size: 1.1rem !important;
		line-height: 1;
		display: inline-block;
		vertical-align: middle;
	}

	.tui-footer-btn:hover {
		color: #ffffff;
	}
</style>
