<script lang="ts">
	import cliBoxes from 'cli-boxes';

	// Use classic ASCII box-drawing characters (+, -, |)
	const classicBox = cliBoxes.classic;

	interface ProjectLink {
		label: string;
		url: string;
		isCertModal?: boolean;
		certImage?: string;
	}

	interface Project {
		id: string;
		title: string;
		subtitle: string;
		summary: string;
		category: string;
		year: string;
		metrics: string;
		isFeatured?: boolean;
		tags: string[];
		githubUrl: string;
		certImage?: string;
		links?: ProjectLink[];
	}

	interface Award {
		id: string;
		title: string;
		subtitle: string;
		badge: string;
		year: string;
		isHighlighted?: boolean;
		certImage?: string;
	}

	interface Certification {
		name: string;
		issuer: string;
		code: string;
	}

	interface CapabilityItem {
		skill: string;
		level: string;
		evidence: string;
		focus: string;
		isHighlighted?: boolean;
	}

	interface CapabilityCategory {
		id: string;
		title: string;
		items: CapabilityItem[];
	}

	interface Props {
		scrollProgress?: number;
	}

	let { scrollProgress = 0 }: Props = $props();

	// Modal State for viewing high-res certificates and exhibition photos
	let activeCertModal: { title: string; image: string } | null = $state(null);

	function openCert(title: string, image: string) {
		activeCertModal = { title, image };
	}

	function closeCert() {
		activeCertModal = null;
	}

	// Pure in-place fade in once EXP finishes assembling (scrollProgress >= 0.6)
	let isRevealed = $derived(scrollProgress >= 0.6);

	const coreProjects: Project[] = [
		{
			id: '01',
			title: 'HLLC 2026 Platform',
			subtitle: 'Freshmen Orientation & Activity Ecosystem',
			category: 'Campus Production',
			year: '2026',
			isFeatured: true,
			summary:
				'High-concurrency orientation and live activity management platform engineered for Mae Fah Luang University.',
			metrics: 'Scale: 4,400+ Active Users • Stack: SvelteKit, TypeScript, iOS, Android',
			tags: ['SvelteKit', 'TypeScript', 'High Concurrency', 'REST API'],
			githubUrl: 'https://apps.apple.com/th/app/hllc/id6748238190',
			links: [
				{ label: 'App Store', url: 'https://apps.apple.com/th/app/hllc/id6748238190' },
				{
					label: 'Google Play',
					url: 'https://play.google.com/store/apps/details?id=com.hllc.mfuactivity&hl=en'
				},
				{ label: 'Instagram', url: 'https://www.instagram.com/mfu_activities/p/Da1msGcCV8-/' }
			]
		},
		{
			id: '02',
			title: 'TJ-SIF 2022 Innovation',
			subtitle: 'Smart IV Stand Hardware & Telemetry',
			category: 'International ICT Fair',
			year: '2022',
			isFeatured: true,
			summary:
				'Selected student research & embedded "IV Stand" smart infusion hardware presented in English at Thailand-Japan Student ICT Fair.',
			metrics: 'Forum: Thailand 🇹🇭 × Japan 🇯🇵 Student ICT Fair • Embedded IoT & Flow Sensors',
			tags: ['Embedded Systems', 'IoT Hardware', 'Research Paper', 'Sensors'],
			githubUrl: '/certs/tjsif_cert.jpg',
			certImage: '/certs/tjsif_cert.jpg',
			links: [
				{
					label: 'Certificate',
					url: '/certs/tjsif_cert.jpg',
					isCertModal: true,
					certImage: '/certs/tjsif_cert.jpg'
				},
				{
					label: 'Stage Trophy',
					url: '/certs/tjsif_stage.png',
					isCertModal: true,
					certImage: '/certs/tjsif_stage.png'
				},
				{
					label: 'Live Booth',
					url: '/certs/tjsif_booth.jpg',
					isCertModal: true,
					certImage: '/certs/tjsif_booth.jpg'
				},
				{
					label: 'Report (p.125)',
					url: 'https://online.anyflip.com/zpkny/qiwq/mobile/index.html#page=137'
				}
			]
		},
		{
			id: '03',
			title: 'NSC 25 — Auto-Silkworm Reeling Frame',
			subtitle: 'Biological Gravitropism Control System',
			category: 'National Contest Finalist',
			year: '2023',
			isFeatured: true,
			summary:
				'Automated uniform silk reeling system utilizing biological gravitropism response. Funded grantee in the 25th National Software Contest.',
			metrics: 'Contest: 25th National Software Contest (NSC 25 Grantee @ CMU)',
			tags: ['Embedded Automation', 'Biological Control', 'NSC 25', 'Hardware IoT'],
			githubUrl: '/certs/nsc25_cert.jpg',
			certImage: '/certs/nsc25_cert.jpg',
			links: [
				{
					label: 'NSC 25 Certificate',
					url: '/certs/nsc25_cert.jpg',
					isCertModal: true,
					certImage: '/certs/nsc25_cert.jpg'
				},
				{
					label: 'Exhibition Photo',
					url: '/certs/nsc25_booth.png',
					isCertModal: true,
					certImage: '/certs/nsc25_booth.png'
				}
			]
		},
		{
			id: '04',
			title: 'polyTone',
			subtitle: 'Digital Guitar Amp Preset Platform',
			category: 'Audio Web Platform',
			year: '2024',
			isFeatured: true,
			summary:
				'Community audio platform for discovering and sharing digital guitar amplifier presets and Impulse Responses (IRs).',
			metrics: 'Stack: SvelteKit + Supabase Cloud + Web Audio DSP',
			tags: ['SvelteKit', 'TypeScript', 'Supabase', 'Web Audio', 'Community'],
			githubUrl: 'https://polytone.pages.dev/',
			links: [{ label: 'Live App', url: 'https://polytone.pages.dev/' }]
		}
	];

	const ossProjects: Project[] = [
		{
			id: '05',
			title: 'Study-Schedule',
			subtitle: '4K Wallpaper Canvas Renderer',
			category: 'Tooling & Canvas',
			year: '2024',
			summary:
				'Interactive study timetable designer with high-resolution 4K wallpaper rendering engine.',
			metrics: 'Stack: HTML5 Canvas 2D + Svelte State Management',
			tags: ['Svelte', 'TypeScript', 'Web Canvas', 'Responsive UI'],
			githubUrl: 'https://github.com/PLATONG34821/Study-Schedule',
			links: [
				{ label: 'Live App', url: 'https://schedule-wallpapers.pages.dev/' },
				{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/Study-Schedule' }
			]
		},
		{
			id: '06',
			title: 'Portable Hybrid Swarm Cluster',
			subtitle: 'Multi-Arch Docker Swarm Homelab',
			category: 'DevOps & Cluster',
			year: '2024',
			summary:
				'Resilient multi-node hybrid x86/ARM Docker Swarm edge cluster with automated failover & proxy routing.',
			metrics: 'Nodes: Hybrid Multi-Arch (x86_64 + ARM64) • Reverse Proxy Routing',
			tags: ['Docker Swarm', 'Homelab', 'Reverse Proxy', 'Linux'],
			githubUrl: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster',
			links: [
				{
					label: 'GitHub Repo',
					url: 'https://github.com/PLATONG34821/Portable-Hybrid-Arch-Docker-Swarm-Cluster'
				}
			]
		},
		{
			id: '07',
			title: 'Project-DSM',
			subtitle: 'Vehicle Telemetry & Road Safety',
			category: 'IoT & Telemetry',
			year: '2024',
			summary:
				'Vehicle telemetry & driver behavior analytics application engineered for smart passenger safety.',
			metrics: 'Sensors: GPS Real-Time Telemetry + Accelerometer Tracking',
			tags: ['JavaScript', 'IoT Telemetry', 'Sensors', 'Fullstack'],
			githubUrl: 'https://github.com/PLATONG34821/Project-DSM',
			links: [
				{ label: 'Live App', url: 'https://project-dsm.pages.dev/' },
				{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/Project-DSM' }
			]
		},
		{
			id: '08',
			title: 'GroupPlan',
			subtitle: 'Schedule Sync & Team Planner',
			category: 'Web Application',
			year: '2024',
			summary:
				'Modern team schedule coordination and collaborative group planning web application built with Svelte.',
			metrics: 'Stack: Svelte 5 Runes + TypeScript State Engine',
			tags: ['Svelte', 'TypeScript', 'State Management', 'Team Tooling'],
			githubUrl: 'https://github.com/PLATONG34821/GroupPlan',
			links: [{ label: 'GitHub Repo', url: 'https://github.com/PLATONG34821/GroupPlan' }]
		}
	];

	const awards: Award[] = [
		{
			id: '01',
			title: 'Web Applications Development (ม.ปลาย)',
			subtitle: '71st National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 71)',
			badge: 'Gold Medal',
			year: '2023',
			isHighlighted: true,
			certImage: '/certs/gold_cert.png'
		},
		{
			id: '02',
			title: 'Web Applications Development (ม.ปลาย)',
			subtitle: '70th National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 70)',
			badge: 'Silver Medal',
			year: '2022',
			certImage: '/certs/silver_cert.jpg'
		},
		{
			id: '03',
			title: '25th National Software Contest (NSC 25)',
			subtitle: 'Funded Grant Winner & Finalist for Automated Silkworm Silk Spinning Frame (CMU)',
			badge: 'Grant Winner',
			year: '2023',
			isHighlighted: true,
			certImage: '/certs/nsc25_cert.jpg'
		},
		{
			id: '04',
			title: 'Samsung Solve for Tomorrow 2024',
			subtitle: 'Innovation Shortlist & Design Thinking / Entrepreneurship Workshop',
			badge: 'Finalist',
			year: '2024',
			certImage: '/certs/samsung_cert.jpg'
		},
		{
			id: '05',
			title: 'BornToDev DevLab 3 Nationwide Contest',
			subtitle: 'Rank #1,152 out of 31,905 developers nationwide (Top 3.6%)',
			badge: 'Top 3.6%',
			year: '2024',
			certImage: '/certs/borntodev_cert.png'
		},
		{
			id: '06',
			title: 'Thailand-Japan Student ICT Fair (TJ-SIF 2022)',
			subtitle: 'International ICT Innovation Presentation Trophy & Award (เชียงราย)',
			badge: 'Intl Trophy',
			year: '2022',
			isHighlighted: true,
			certImage: '/certs/tjsif_stage.png'
		},
		{
			id: '07',
			title: 'Student of Excellence "Khon Dee Sri Damrong"',
			subtitle: 'Honorary award for public service devotion (โรงเรียนดํารงราษฎร์สงเคราะห์ 2567)',
			badge: 'Honor Roll',
			year: '2024'
		}
	];

	const certifications: Certification[] = [
		{
			name: 'Software Engineering Fundamentals',
			issuer: 'Mae Fah Luang University',
			code: 'MFU-SE'
		},
		{
			name: 'Computer Programming: Core Syntax',
			issuer: 'Mae Fah Luang University',
			code: 'MFU-PROG'
		},
		{
			name: 'Object-Oriented Design & OOP',
			issuer: 'Mae Fah Luang University',
			code: 'MFU-OOP'
		},
		{
			name: 'Internet of Things (IoT) Fundamentals',
			issuer: 'ThaiMOOC • Hat Yai Univ',
			code: 'MOOC-IOT'
		},
		{
			name: 'Python for Data Science',
			issuer: 'ThaiMOOC • RMUTT',
			code: 'MOOC-PY'
		},
		{
			name: 'R Programming for Data Analytics',
			issuer: 'ThaiMOOC • SKRU',
			code: 'MOOC-R'
		}
	];

	// Clean, highly-readable technical capabilities
	const capabilityCategories: CapabilityCategory[] = [
		{
			id: '01',
			title: 'Frontend & UI Architecture',
			items: [
				{
					skill: 'Svelte 5 / SvelteKit',
					level: 'Advanced (Production)',
					evidence: 'HLLC 2026 (4.4k users), polyTone, Study-Schedule, GroupPlan, pt-chord',
					focus: 'Runes state engine, server SSR/CSR hydration, dynamic routing & endpoints',
					isHighlighted: true
				},
				{
					skill: 'TypeScript & JavaScript',
					level: 'Advanced',
					evidence: 'Strict type safety across 9 repositories, Canvas 2D pipelines, Project-DSM',
					focus: 'Strict compile-time verification, browser DOM manipulation, modular architecture',
					isHighlighted: true
				},
				{
					skill: 'HTML5 Canvas 2D & DSP Audio',
					level: 'Proficient',
					evidence: 'Study-Schedule (4K wallpaper renderer), polyTone (Guitar IR DSP engine)',
					focus: 'Offscreen pixel rendering, Web Audio nodes, Impulse Response convolution'
				},
				{
					skill: 'Astro & Jamstack Web',
					level: 'Proficient',
					evidence: 'pt-blog (Content collections, Markdown compile pipeline, asset optimizer)',
					focus: 'Zero-JS static site generation, fast edge delivery, content collections'
				},
				{
					skill: 'Web App Competition Mastery',
					level: 'Gold Medalist',
					evidence: 'Gold Medal (71st) & Silver Medal (70th) National Student Arts & Crafts',
					focus: 'Rapid frontend prototyping, UI design systems, real-time client state',
					isHighlighted: true
				}
			]
		},
		{
			id: '02',
			title: 'Backend, Cloud & Data Infrastructure',
			items: [
				{
					skill: 'High-Concurrency System Design',
					level: 'Production Scale',
					evidence: 'HLLC 2026 API architecture serving 4,400+ simultaneous orientation students',
					focus: 'Traffic spike mitigation, session state synchronization, mobile/web endpoints',
					isHighlighted: true
				},
				{
					skill: 'Supabase Cloud & PostgreSQL',
					level: 'Proficient',
					evidence: 'polyTone (Relational schema, realtime subscriptions, cloud storage buckets)',
					focus: 'Relational table design, row-level security policies, object storage'
				},
				{
					skill: 'Java & Game Server Plugins',
					level: 'Proficient',
					evidence: 'PT-Story, PT-Spawn, PT-Warp (Paper 1.20.4 OOP architecture & event loop)',
					focus: 'Object-oriented event listeners, multi-player state, server packet handlers'
				},
				{
					skill: 'Python & R Data Analytics',
					level: 'Certified',
					evidence: 'ThaiMOOC Python for Data Science (RMUTT) & R Data Analysis (SKRU)',
					focus: 'Data transformation, statistical summary matrices, tabular processing'
				},
				{
					skill: 'Software Engineering Principles',
					level: 'Certified (MFU)',
					evidence: 'MFU-SE, MFU-PROG, MFU-OOP Academic Specializations (Mae Fah Luang Univ)',
					focus: 'Design patterns, software lifecycle, encapsulation, robust code design',
					isHighlighted: true
				}
			]
		},
		{
			id: '03',
			title: 'DevOps, Clustering & Edge Systems',
			items: [
				{
					skill: 'Docker & Docker Swarm',
					level: 'Proficient',
					evidence: 'Portable-Hybrid-Arch-Docker-Swarm-Cluster (Multi-node swarm orchestration)',
					focus: 'Service stack composition, container overlays, automated restart policies',
					isHighlighted: true
				},
				{
					skill: 'Heterogeneous Multi-Arch (x86/ARM)',
					level: 'Proficient',
					evidence: 'Hybrid cluster combining x86_64 servers & ARM64 edge nodes (Pi/Rockchip)',
					focus: 'Cross-platform container images, resource balancing, edge node telemetry'
				},
				{
					skill: 'Reverse Proxy & High Availability',
					level: 'Proficient',
					evidence: 'Automated SSL termination, failover routing, zero-downtime stacks',
					focus: 'TLS certificates, dynamic reverse proxying, traffic routing'
				},
				{
					skill: 'Linux Administration & Scripting',
					level: 'Proficient',
					evidence: 'Debian/Alpine homelab setups, Bash automation, CMDEdge Windows CLI',
					focus: 'Systemd management, shell scripting, environment configuration'
				}
			]
		},
		{
			id: '04',
			title: 'Embedded IoT & Hardware Automation',
			items: [
				{
					skill: 'Biological Gravitropism Control',
					level: 'National Grant Winner',
					evidence: 'NSC 25 Funded Grantee — Automated silkworm reeling with motor drivers',
					focus:
						'Sensory feedback loops, stepper motor driver tuning, automated biological reeling',
					isHighlighted: true
				},
				{
					skill: 'Smart Medical Hardware & Sensors',
					level: 'Intl Trophy Award',
					evidence: 'TJ-SIF 2022 — IV Stand embedded telemetry presented to Thailand-Japan forum',
					focus: 'Infusion drop rate sensors, microcontroller telemetry, English oral presentation',
					isHighlighted: true
				},
				{
					skill: 'Vehicle Telemetry & Road Safety',
					level: 'Proficient',
					evidence:
						'Project-DSM — GPS real-time positioning & accelerometer driver safety tracking',
					focus: 'GPS NMEA stream parsing, G-force threshold analysis, safety metrics'
				},
				{
					skill: 'IoT Sensor Foundations',
					level: 'Certified',
					evidence: 'ThaiMOOC Internet of Things Fundamentals (Prince of Songkla Univ)',
					focus: 'Analog/digital signal acquisition, wireless protocols, IoT architectures'
				}
			]
		},
		{
			id: '05',
			title: 'Competitive Problem Solving & Leadership',
			items: [
				{
					skill: 'Competitive Algorithms & Coding',
					level: 'Top 3.6% Nationwide',
					evidence: 'BornToDev DevLab 3 Nationwide Contest (Rank #1,152 out of 31,905 developers)',
					focus: 'Data structures, algorithm complexity, rapid debugging under constraints',
					isHighlighted: true
				},
				{
					skill: 'Product Design & Design Thinking',
					level: 'Finalist',
					evidence: 'Samsung Solve for Tomorrow 2024 shortlisted innovation & workshop',
					focus: 'User empathy modeling, iterative prototyping, pitch presentation'
				},
				{
					skill: 'Civic Software & Leadership',
					level: 'Honor Roll Award',
					evidence: 'Student of Excellence "Khon Dee Sri Damrong 2567" & damrong_pitakphong portal',
					focus: 'Digital services for student governance, cross-functional team coordination',
					isHighlighted: true
				}
			]
		}
	];
</script>

<!-- Fixed top gradient curtain that progressively masks text as it scrolls up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- ========================================================================= -->
		<!-- SECTION 01: SELECTED PROJECTS & RECOGNITION (CASE FILES & HONORS)         -->
		<!-- ========================================================================= -->
		<div class="section-block" id="projects">
			<div class="section-header-bar">
				<span class="sec-label">Selected Projects & Honors</span>
				<span class="sec-line"></span>
				<span class="sec-hint">Core Production • Competitions • Certifications</span>
			</div>

			<div class="two-column-layout">
				<!-- LEFT COLUMN: Selected Projects & Open Source Systems -->
				<div class="column-stack">
					<!-- Box 1: Core Production Systems -->
					<div class="tui-box">
						<div class="tui-line-top">
							<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
							<span class="tui-title-coral">Selected Projects</span>
							<span class="tui-fill">{classicBox.top}</span>
							<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
						</div>

						<div class="tui-body">
							{#each coreProjects as project (project.id)}
								<div class="project-entry">
									<div class="entry-header">
										<div class="entry-title-wrap">
											<span class="entry-number">{project.id}.</span>
											{#if project.certImage}
												<button
													type="button"
													onclick={() => openCert(project.title, project.certImage!)}
													class="entry-title-btn"
													class:highlighted={project.isFeatured}
												>
													{project.title}
													{#if project.isFeatured}
														<span class="check-mark">✓</span>
													{/if}
												</button>
											{:else}
												<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
												<a
													href={project.githubUrl}
													target="_blank"
													rel="external noreferrer"
													class="entry-title-link"
													class:highlighted={project.isFeatured}
												>
													{project.title}
													{#if project.isFeatured}
														<span class="check-mark">✓</span>
													{/if}
												</a>
											{/if}
										</div>
										<span class="entry-badge">{project.category}</span>
									</div>

									<p class="entry-summary">{project.summary}</p>

									<div class="entry-meta">
										<span class="meta-label">Details:</span>
										<span class="meta-text">{project.metrics}</span>
									</div>

									{#if project.links && project.links.length > 0}
										<div class="entry-links">
											<span class="links-label">Links:</span>
											<div class="links-list">
												{#each project.links as link (link.label)}
													{#if link.isCertModal && link.certImage}
														<button
															type="button"
															onclick={() => openCert(project.title, link.certImage!)}
															class="text-link"
														>
															{link.label} ↗
														</button>
													{:else}
														<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
														<a
															href={link.url}
															target="_blank"
															rel="external noreferrer"
															class="text-link"
														>
															{link.label} ↗
														</a>
													{/if}
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>

						<div class="tui-line-bot">
							<span class="tui-corner"
								>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
							>
							<span class="tui-fill">{classicBox.bottom}</span>
							<span class="tui-corner"
								>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
							>
						</div>
					</div>

					<!-- Box 2: Open Source & Research Systems -->
					<div class="tui-box">
						<div class="tui-line-top">
							<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
							<span class="tui-title-coral">Open Source & Systems</span>
							<span class="tui-fill">{classicBox.top}</span>
							<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
						</div>

						<div class="tui-body">
							{#each ossProjects as project (project.id)}
								<div class="project-entry">
									<div class="entry-header">
										<div class="entry-title-wrap">
											<span class="entry-number">{project.id}.</span>
											<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
											<a
												href={project.githubUrl}
												target="_blank"
												rel="external noreferrer"
												class="entry-title-link"
											>
												{project.title}
											</a>
										</div>
										<span class="entry-badge">{project.category}</span>
									</div>

									<p class="entry-summary">{project.summary}</p>

									<div class="entry-meta">
										<span class="meta-label">Details:</span>
										<span class="meta-text">{project.metrics}</span>
									</div>

									{#if project.links && project.links.length > 0}
										<div class="entry-links">
											<span class="links-label">Links:</span>
											<div class="links-list">
												{#each project.links as link (link.label)}
													<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
													<a
														href={link.url}
														target="_blank"
														rel="external noreferrer"
														class="text-link"
													>
														{link.label} ↗
													</a>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>

						<div class="tui-line-bot">
							<span class="tui-corner"
								>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
							>
							<span class="tui-fill">{classicBox.bottom}</span>
							<span class="tui-corner"
								>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
							>
						</div>
					</div>
				</div>

				<!-- RIGHT COLUMN: Awards & Certifications -->
				<div class="column-stack">
					<!-- Box 3: Awards & Recognition -->
					<div class="tui-box" id="awards">
						<div class="tui-line-top">
							<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
							<span class="tui-title-coral">Awards & Honors</span>
							<span class="tui-fill">{classicBox.top}</span>
							<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
						</div>

						<div class="tui-body">
							{#each awards as award (award.id)}
								<div class="award-entry">
									<span class="award-year">{award.year}</span>
									<div class="award-content">
										<div class="award-head">
											{#if award.certImage}
												<button
													type="button"
													onclick={() => openCert(award.title, award.certImage!)}
													class="award-title-btn"
													class:highlighted={award.isHighlighted}
												>
													<span class="award-badge">[{award.badge}]</span>
													<span class="award-title">{award.title}</span>
													{#if award.isHighlighted}
														<span class="check-mark">✓</span>
													{/if}
													<span class="cert-link-hint">[View ↗]</span>
												</button>
											{:else}
												<div class="award-title-static">
													<span class="award-badge">[{award.badge}]</span>
													<span class="award-title">{award.title}</span>
													{#if award.isHighlighted}
														<span class="check-mark">✓</span>
													{/if}
												</div>
											{/if}
										</div>
										<p class="award-sub">{award.subtitle}</p>
									</div>
								</div>
							{/each}
						</div>

						<div class="tui-line-bot">
							<span class="tui-corner"
								>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
							>
							<span class="tui-fill">{classicBox.bottom}</span>
							<span class="tui-corner"
								>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
							>
						</div>
					</div>

					<!-- Box 4: Academic Certifications -->
					<div class="tui-box" id="certifications">
						<div class="tui-line-top">
							<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
							<span class="tui-title-coral">Academic Certifications</span>
							<span class="tui-fill">{classicBox.top}</span>
							<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
						</div>

						<div class="tui-body">
							{#each certifications as cert (cert.code)}
								<div class="cert-entry">
									<span class="cert-code">{cert.code}</span>
									<div class="cert-info">
										<span class="cert-name">{cert.name}</span>
										<span class="cert-meta">— {cert.issuer}</span>
									</div>
								</div>
							{/each}
						</div>

						<div class="tui-line-bot">
							<span class="tui-corner"
								>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
							>
							<span class="tui-fill">{classicBox.bottom}</span>
							<span class="tui-corner"
								>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ========================================================================= -->
		<!-- SECTION 02: TECHNICAL CAPABILITIES MATRIX (PROVEN SKILLS & DOSSIER)       -->
		<!-- ========================================================================= -->
		<div class="section-block" id="skills">
			<div class="section-header-bar sec2-bar">
				<span class="sec-label sec2-label">Technical Capabilities Matrix</span>
				<span class="sec-line sec2-line"></span>
				<span class="sec-hint sec2-hint"
					>Proven Across 15 Repositories • Competitions & Certifications</span
				>
			</div>

			<div class="capabilities-grid">
				{#each capabilityCategories as category (category.id)}
					<div class="tui-box cap-box">
						<div class="tui-line-top">
							<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
							<span class="tui-title-cyan">{category.title}</span>
							<span class="tui-fill">{classicBox.top}</span>
							<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
						</div>

						<div class="tui-body cap-body">
							{#each category.items as item (item.skill)}
								<div class="skill-entry">
									<div class="skill-header">
										<span class="skill-title" class:highlighted={item.isHighlighted}>
											{item.skill}
											{#if item.isHighlighted}
												<span class="check-mark">✓</span>
											{/if}
										</span>
										<span class="skill-level">{item.level}</span>
									</div>

									<div class="skill-meta-row">
										<span class="skill-meta-lbl">Proven In:</span>
										<span class="skill-meta-val">{item.evidence}</span>
									</div>

									<div class="skill-meta-row">
										<span class="skill-meta-lbl">Focus:</span>
										<span class="skill-meta-val">{item.focus}</span>
									</div>
								</div>
							{/each}
						</div>

						<div class="tui-line-bot">
							<span class="tui-corner"
								>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
							>
							<span class="tui-fill">{classicBox.bottom}</span>
							<span class="tui-corner"
								>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
							>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Operator Status Box -->
		<div class="tui-box footer-box">
			<div class="tui-line-top">
				<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
				<span class="tui-title-coral">Operator Session</span>
				<span class="tui-fill">{classicBox.top}</span>
				<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
			</div>
			<div class="tui-body footer-body">
				<span class="footer-text">Operator: Thanaphum Masayamas</span>
				<span class="footer-text">Status: Active ({new Date().getFullYear()})</span>
				<a
					href="https://github.com/PLATONG34821"
					target="_blank"
					rel="external noreferrer"
					class="text-link"
				>
					GitHub Profile ↗
				</a>
			</div>
			<div class="tui-line-bot">
				<span class="tui-corner">{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
				>
				<span class="tui-fill">{classicBox.bottom}</span>
				<span class="tui-corner"
					>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
				>
			</div>
		</div>
	</div>
</section>

<!-- Sleek Pure TUI Modal / Lightbox -->
{#if activeCertModal}
	<div
		class="tui-modal-backdrop"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={closeCert}
		onkeydown={(e) => e.key === 'Escape' && closeCert()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="tui-modal-dialog" onclick={(e) => e.stopPropagation()} role="document">
			<div class="tui-box modal-box">
				<div class="tui-line-top">
					<span class="tui-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
					<span class="tui-title-coral">{activeCertModal.title}</span>
					<span class="tui-fill">{classicBox.top}</span>
					<span class="tui-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
				</div>
				<div class="tui-body">
					<div class="tui-modal-body">
						<img
							src={activeCertModal.image}
							alt={activeCertModal.title}
							class="tui-cert-img"
							loading="eager"
						/>
					</div>
					<div class="tui-modal-footer">
						<span class="footer-text">&gt; Official Certificate Record</span>
						<div class="tui-modal-actions">
							<a
								href={activeCertModal.image}
								target="_blank"
								rel="external noreferrer"
								class="text-link"
							>
								Open Full-Res ↗
							</a>
							<button type="button" class="cli-close-btn" onclick={closeCert}>
								Close [ESC ×]
							</button>
						</div>
					</div>
				</div>
				<div class="tui-line-bot">
					<span class="tui-corner"
						>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
					>
					<span class="tui-fill">{classicBox.bottom}</span>
					<span class="tui-corner"
						>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Global Monospace & TUI Layout */
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
		color: #e5e7eb;
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
		gap: 4rem;
	}

	.section-block {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Clean Section Header Bars */
	.section-header-bar {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		user-select: none;
		white-space: nowrap;
	}

	.sec-label {
		color: #f87171;
		font-weight: 700;
		font-size: 0.92rem;
		letter-spacing: 0.02em;
	}

	.sec-line {
		flex-grow: 1;
		border-bottom: 1px dashed #27272a;
		height: 1px;
	}

	.sec-hint {
		color: #71717a;
		font-size: 0.78rem;
		font-weight: 500;
	}

	.sec2-label {
		color: #38bdf8;
	}

	.sec2-line {
		border-bottom-color: #1e293b;
	}

	.sec2-hint {
		color: #64748b;
	}

	/* Two-Column Layout */
	.two-column-layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
		gap: 1.75rem;
		align-items: start;
	}

	.column-stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.capabilities-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
		gap: 1.75rem;
		align-items: start;
	}

	/* Classic ASCII Box Borders */
	.tui-box {
		display: flex;
		flex-direction: column;
		background: transparent;
		user-select: none;
	}

	.tui-line-top,
	.tui-line-bot {
		display: flex;
		align-items: center;
		font-size: 0.88rem;
		line-height: 1;
		color: #27272a;
		white-space: nowrap;
	}

	.tui-corner {
		color: #3f3f46;
		font-weight: 400;
	}

	.tui-fill {
		flex-grow: 1;
		overflow: hidden;
		letter-spacing: -0.05em;
		color: #27272a;
	}

	.tui-title-coral {
		color: #f87171;
		font-weight: 600;
		font-size: 0.88rem;
		padding: 0 0.5rem;
		letter-spacing: 0.02em;
	}

	.tui-title-cyan {
		color: #38bdf8;
		font-weight: 600;
		font-size: 0.88rem;
		padding: 0 0.5rem;
		letter-spacing: 0.02em;
	}

	.tui-body {
		border-left: 1px solid #27272a;
		border-right: 1px solid #27272a;
		padding: 1.25rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 0 1px;
		user-select: text;
	}

	.cap-body {
		gap: 1.35rem;
		background: #040810;
		border-color: #1e293b;
	}

	.cap-box .tui-line-top,
	.cap-box .tui-line-bot {
		color: #1e293b;
	}

	.cap-box .tui-corner {
		color: #334155;
	}

	/* ========================================================================= */
	/* PROJECT ENTRY STYLES (Clean & Highly Readable)                            */
	/* ========================================================================= */
	.project-entry {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding-bottom: 1.4rem;
		border-bottom: 1px dashed #1e2430;
	}

	.project-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.entry-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.entry-title-wrap {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
	}

	.entry-number {
		color: #71717a;
		font-size: 0.88rem;
		font-weight: 600;
	}

	.entry-title-btn,
	.entry-title-link {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f4f4f5;
		font-family: inherit;
		font-size: 0.96rem;
		font-weight: 600;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		transition: color 0.15s ease;
	}

	.entry-title-btn:hover,
	.entry-title-link:hover {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.entry-title-btn.highlighted,
	.entry-title-link.highlighted {
		color: #fdba74;
	}

	.check-mark {
		color: #f97316;
		margin-left: 0.35rem;
		font-weight: 700;
	}

	.entry-badge {
		color: #71717a;
		font-size: 0.76rem;
		font-weight: 500;
	}

	.entry-summary {
		margin: 0;
		color: #d4d4d8;
		font-size: 0.85rem;
		line-height: 1.55;
	}

	.entry-meta {
		display: flex;
		gap: 0.5rem;
		font-size: 0.78rem;
		line-height: 1.45;
	}

	.meta-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.meta-text {
		color: #a1a1aa;
	}

	.entry-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		padding-top: 0.15rem;
	}

	.links-label {
		color: #71717a;
		font-weight: 600;
		flex-shrink: 0;
	}

	.links-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	/* ========================================================================= */
	/* AWARDS & CERTS STYLES                                                     */
	/* ========================================================================= */
	.award-entry {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px dashed #1e2430;
	}

	.award-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.award-year {
		color: #71717a;
		font-size: 0.82rem;
		font-weight: 600;
		flex-shrink: 0;
		padding-top: 0.1rem;
	}

	.award-content {
		display: flex;
		flex-direction: column;
		gap: 0.18rem;
		flex-grow: 1;
	}

	.award-head {
		display: flex;
		align-items: baseline;
	}

	.award-title-btn,
	.award-title-static {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f4f4f5;
		font-family: inherit;
		font-size: 0.88rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		flex-wrap: wrap;
		transition: color 0.15s ease;
	}

	.award-title-btn:hover .award-title {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.award-badge {
		color: #fbbf24;
		font-weight: 600;
		font-size: 0.8rem;
	}

	.award-title {
		color: #e4e4e7;
	}

	.award-title-btn.highlighted .award-title {
		color: #fdba74;
	}

	.cert-link-hint {
		color: #38bdf8;
		font-size: 0.76rem;
		font-weight: 500;
		margin-left: 0.2rem;
	}

	.award-sub {
		margin: 0;
		color: #71717a;
		font-size: 0.78rem;
		line-height: 1.4;
	}

	/* Certifications */
	.cert-entry {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding-bottom: 0.55rem;
		border-bottom: 1px dashed #181d26;
	}

	.cert-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.cert-code {
		color: #38bdf8;
		font-size: 0.78rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.cert-info {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		flex-wrap: wrap;
		font-size: 0.84rem;
	}

	.cert-name {
		color: #e4e4e7;
		font-weight: 500;
	}

	.cert-meta {
		color: #71717a;
		font-size: 0.78rem;
	}

	/* ========================================================================= */
	/* CAPABILITIES MATRIX STYLES                                                */
	/* ========================================================================= */
	.skill-entry {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding-bottom: 1rem;
		border-bottom: 1px dashed #1e293b;
	}

	.skill-entry:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.skill-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.skill-title {
		color: #f1f5f9;
		font-size: 0.92rem;
		font-weight: 600;
	}

	.skill-title.highlighted {
		color: #fdba74;
	}

	.skill-level {
		color: #38bdf8;
		font-size: 0.76rem;
		font-weight: 600;
	}

	.skill-meta-row {
		display: flex;
		gap: 0.5rem;
		font-size: 0.78rem;
		line-height: 1.45;
	}

	.skill-meta-lbl {
		color: #64748b;
		font-weight: 600;
		flex-shrink: 0;
	}

	.skill-meta-val {
		color: #cbd5e1;
	}

	/* Pure Text Link Buttons */
	.text-link {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #38bdf8 !important;
		font-family: inherit;
		font-size: 0.8rem;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		transition:
			color 0.15s ease,
			text-decoration 0.15s ease;
	}

	.text-link:hover {
		color: #ffffff !important;
		text-decoration: underline !important;
		text-underline-offset: 3px;
	}

	/* Footer Box */
	.footer-box .tui-body {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 0.75rem 1.4rem;
	}

	.footer-text {
		color: #71717a;
		font-size: 0.78rem;
		font-weight: 500;
	}

	/* Modal / Lightbox */
	.tui-modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.tui-modal-dialog {
		max-width: 860px;
		width: 100%;
	}

	.modal-box {
		background: #09090b;
	}

	.tui-modal-body {
		padding: 0.5rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 70vh;
		overflow-y: auto;
	}

	.tui-cert-img {
		max-width: 100%;
		max-height: 65vh;
		object-fit: contain;
		border-radius: 4px;
		border: 1px solid #27272a;
	}

	.tui-modal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding-top: 0.5rem;
		border-top: 1px solid #1f1f23;
		font-size: 0.78rem;
	}

	.tui-modal-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.cli-close-btn {
		background: transparent;
		border: none;
		color: #f87171;
		font-family: inherit;
		font-size: 0.78rem;
		font-weight: 600;
		cursor: pointer;
		padding: 0;
	}

	.cli-close-btn:hover {
		text-decoration: underline;
	}
</style>
