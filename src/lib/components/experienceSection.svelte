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
		status: 'PROD' | 'FEAT' | 'RESEARCH' | 'OSS';
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

	interface Skill {
		name: string;
		category: string;
		status: string;
		isPrimary?: boolean;
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
			subtitle: 'Orientation Mobile & Web Ecosystem',
			category: 'CAMPUS // PROD',
			year: '2026',
			status: 'PROD',
			isFeatured: true,
			summary:
				'High-concurrency freshmen orientation & live activity management ecosystem for Mae Fah Luang University.',
			metrics: 'Scale: 4.4k+ Active Sessions • SvelteKit, TypeScript, iOS, Android',
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
			subtitle: 'Smart IV Stand Hardware & Sensors',
			category: 'INTL // RESEARCH',
			year: '2022',
			status: 'RESEARCH',
			isFeatured: true,
			summary:
				'Selected student research & embedded "IV Stand" smart infusion hardware presented in English at Thailand-Japan Student ICT Fair.',
			metrics: 'Forum: Thailand 🇹🇭 × Japan 🇯🇵 Student ICT Fair • Embedded IoT & Sensors',
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
			category: 'NATIONAL // CONTEST',
			year: '2023',
			status: 'RESEARCH',
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
			category: 'AUDIO // PROD',
			year: '2024',
			status: 'PROD',
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
			category: 'TOOLING // OSS',
			year: '2024',
			status: 'OSS',
			summary:
				'Interactive study timetable designer with high-resolution 4K wallpaper rendering engine.',
			metrics: 'Engine: HTML5 Canvas 2D + Svelte State Management',
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
			category: 'DEVOPS // CLUSTER',
			year: '2024',
			status: 'FEAT',
			summary:
				'Resilient multi-node hybrid x86/ARM Docker Swarm edge cluster with automated failover & proxy routing.',
			metrics: 'Nodes: Hybrid Multi-Arch (x86_64 + ARM64) • Automated Proxy Failover',
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
			category: 'IOT // TELEMETRY',
			year: '2024',
			status: 'FEAT',
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
			category: 'WEB // OSS',
			year: '2024',
			status: 'OSS',
			summary:
				'Modern team schedule coordination and collaborative group planning web application built with Svelte.',
			metrics: 'Framework: Svelte 5 Runes + TypeScript State Engine',
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
			badge: 'Gold Medal (71st)',
			year: '2023',
			isHighlighted: true,
			certImage: '/certs/gold_cert.png'
		},
		{
			id: '02',
			title: 'Web Applications Development (ม.ปลาย)',
			subtitle: '70th National Student Arts & Crafts Fair (งานศิลปหัตถกรรมนักเรียน ครั้งที่ 70)',
			badge: 'Silver Medal (70th)',
			year: '2022',
			certImage: '/certs/silver_cert.jpg'
		},
		{
			id: '03',
			title: '25th National Software Contest (NSC 25)',
			subtitle: 'Funded Grant Winner & Finalist for Automated Silkworm Silk Spinning Frame (CMU)',
			badge: 'Grantee Finalist',
			year: '2023',
			isHighlighted: true,
			certImage: '/certs/nsc25_cert.jpg'
		},
		{
			id: '04',
			title: 'Samsung Solve for Tomorrow 2024',
			subtitle: 'Innovation Shortlist & Design Thinking / Entrepreneurship Workshop',
			badge: 'Finalist (Top 20)',
			year: '2024',
			certImage: '/certs/samsung_cert.jpg'
		},
		{
			id: '05',
			title: 'BornToDev DevLab 3 Nationwide Contest',
			subtitle: 'Rank #1,152 out of 31,905 developers nationwide (Top 3.6%)',
			badge: 'Top 3.6% (Rank 1152)',
			year: '2024',
			certImage: '/certs/borntodev_cert.png'
		},
		{
			id: '06',
			title: 'Thailand-Japan Student ICT Fair (TJ-SIF 2022)',
			subtitle: 'International ICT Innovation Presentation Trophy & Award (เชียงราย)',
			badge: 'Intl Trophy Award',
			year: '2022',
			isHighlighted: true,
			certImage: '/certs/tjsif_stage.png'
		},
		{
			id: '07',
			title: 'Student of Excellence "Khon Dee Sri Damrong"',
			subtitle: 'Honorary award for public service devotion (โรงเรียนดํารงราษฎร์สงเคราะห์ 2567)',
			badge: 'Honor Roll (2567)',
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
			name: 'Internet of Things (IoT) Intro',
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

	const skills: Skill[] = [
		{
			name: 'Svelte 5 / SvelteKit',
			category: 'Frontend & UI Frameworks',
			status: 'SYS_OK',
			isPrimary: true
		},
		{
			name: 'TypeScript / JavaScript',
			category: 'Fullstack Web Architecture',
			status: 'SYS_OK',
			isPrimary: true
		},
		{
			name: 'Docker / Docker Swarm',
			category: 'DevOps & Homelab Clusters',
			status: 'SYS_OK',
			isPrimary: true
		},
		{
			name: 'IoT & Hardware Prototyping',
			category: 'Sensors, Arduino & Embedded',
			status: 'SYS_OK'
		},
		{
			name: 'Astro / Modern Static Sites',
			category: 'High-Performance Web',
			status: 'SYS_OK'
		},
		{
			name: 'Python & Data Analysis',
			category: 'Scientific & Automation Tools',
			status: 'SYS_OK'
		}
	];
</script>

<!-- Fixed top gradient curtain that progressively masks text as it scrolls up under EXP -->
<div class="top-fade-curtain" aria-hidden="true"></div>

<section class="experience-section" class:is-revealed={isRevealed} id="experience">
	<div class="content-container">
		<!-- 2-Column Balanced Dashboard -->
		<div class="cli-dashboard-grid">
			<!-- LEFT COLUMN: Selected Projects & Open Source Systems -->
			<div class="cli-column">
				<!-- Box 1: Core Production Systems -->
				<div class="cli-box">
					<div class="box-line-top">
						<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
						<span class="box-title">Selected Projects</span>
						<span class="box-fill">{classicBox.top}</span>
						<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
					</div>

					<div class="box-body">
						{#each coreProjects as project (project.id)}
							<div class="cli-card-item">
								<!-- Header Line: ID + Title + Status -->
								<div class="cli-card-head">
									<div class="cli-head-left">
										<span class="cli-id">[{project.id}]</span>
										{#if project.certImage}
											<button
												type="button"
												onclick={() => openCert(project.title, project.certImage!)}
												class="cli-title-btn"
												class:highlighted={project.isFeatured}
											>
												{project.title}
												{#if project.isFeatured}
													<span class="cli-check">✓</span>
												{/if}
											</button>
										{:else}
											<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
											<a
												href={project.githubUrl}
												target="_blank"
												rel="external noreferrer"
												class="cli-title-link"
												class:highlighted={project.isFeatured}
											>
												{project.title}
												{#if project.isFeatured}
													<span class="cli-check">✓</span>
												{/if}
											</a>
										{/if}
									</div>
									<span class="cli-cat-tag">[{project.category}]</span>
								</div>

								<!-- Subtitle & Metrics -->
								<div class="cli-card-desc">{project.summary}</div>
								<div class="cli-card-telemetry">
									<span class="telemetry-label">TELEMETRY:</span>
									<span class="telemetry-val">{project.metrics}</span>
								</div>

								<!-- Action Links -->
								{#if project.links && project.links.length > 0}
									<div class="cli-card-actions">
										<span class="action-prefix">&gt;</span>
										<div class="action-links-list">
											{#each project.links as link (link.label)}
												{#if link.isCertModal && link.certImage}
													<button
														type="button"
														onclick={() => openCert(project.title, link.certImage!)}
														class="cli-link-btn"
													>
														[{link.label} ↗]
													</button>
												{:else}
													<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
													<a
														href={link.url}
														target="_blank"
														rel="external noreferrer"
														class="cli-link"
													>
														[{link.label} ↗]
													</a>
												{/if}
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>

					<div class="box-line-bot">
						<span class="box-corner"
							>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
						>
						<span class="box-fill">{classicBox.bottom}</span>
						<span class="box-corner"
							>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
						>
					</div>
				</div>

				<!-- Box 2: Open Source & Research Systems -->
				<div class="cli-box">
					<div class="box-line-top">
						<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
						<span class="box-title">Open Source & Systems</span>
						<span class="box-fill">{classicBox.top}</span>
						<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
					</div>

					<div class="box-body">
						{#each ossProjects as project (project.id)}
							<div class="cli-card-item">
								<div class="cli-card-head">
									<div class="cli-head-left">
										<span class="cli-id">[{project.id}]</span>
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
										<a
											href={project.githubUrl}
											target="_blank"
											rel="external noreferrer"
											class="cli-title-link"
										>
											{project.title}
										</a>
									</div>
									<span class="cli-cat-tag">[{project.category}]</span>
								</div>

								<div class="cli-card-desc">{project.summary}</div>
								<div class="cli-card-telemetry">
									<span class="telemetry-label">TELEMETRY:</span>
									<span class="telemetry-val">{project.metrics}</span>
								</div>

								{#if project.links && project.links.length > 0}
									<div class="cli-card-actions">
										<span class="action-prefix">&gt;</span>
										<div class="action-links-list">
											{#each project.links as link (link.label)}
												<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
												<a
													href={link.url}
													target="_blank"
													rel="external noreferrer"
													class="cli-link"
												>
													[{link.label} ↗]
												</a>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>

					<div class="box-line-bot">
						<span class="box-corner"
							>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
						>
						<span class="box-fill">{classicBox.bottom}</span>
						<span class="box-corner"
							>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
						>
					</div>
				</div>
			</div>

			<!-- RIGHT COLUMN: Awards, Certifications & Skills -->
			<div class="cli-column">
				<!-- Box 3: Awards & Recognition -->
				<div class="cli-box" id="awards">
					<div class="box-line-top">
						<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
						<span class="box-title">Awards & Honors</span>
						<span class="box-fill">{classicBox.top}</span>
						<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
					</div>

					<div class="box-body">
						{#each awards as award (award.id)}
							<div class="cli-table-row">
								<span class="row-year">[{award.year}]</span>
								<div class="row-main">
									<div class="row-title-line">
										{#if award.certImage}
											<button
												type="button"
												onclick={() => openCert(award.title, award.certImage!)}
												class="row-title-btn"
												class:highlighted={award.isHighlighted}
											>
												<span class="row-badge">[{award.badge}]</span>
												<span class="row-name">{award.title}</span>
												{#if award.isHighlighted}
													<span class="cli-check">✓</span>
												{/if}
												<span class="row-cert-link">[VIEW ↗]</span>
											</button>
										{:else}
											<div class="row-title-static">
												<span class="row-badge">[{award.badge}]</span>
												<span class="row-name">{award.title}</span>
												{#if award.isHighlighted}
													<span class="cli-check">✓</span>
												{/if}
											</div>
										{/if}
									</div>
									<div class="row-sub">{award.subtitle}</div>
								</div>
							</div>
						{/each}
					</div>

					<div class="box-line-bot">
						<span class="box-corner"
							>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
						>
						<span class="box-fill">{classicBox.bottom}</span>
						<span class="box-corner"
							>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
						>
					</div>
				</div>

				<!-- Box 4: Academic Certifications -->
				<div class="cli-box" id="certifications">
					<div class="box-line-top">
						<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
						<span class="box-title">Academic Certifications</span>
						<span class="box-fill">{classicBox.top}</span>
						<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
					</div>

					<div class="box-body">
						{#each certifications as cert (cert.code)}
							<div class="cli-table-row compact">
								<span class="row-code">[{cert.code}]</span>
								<div class="row-cert-content">
									<span class="cert-name">{cert.name}</span>
									<span class="cert-issuer">:: {cert.issuer}</span>
								</div>
							</div>
						{/each}
					</div>

					<div class="box-line-bot">
						<span class="box-corner"
							>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
						>
						<span class="box-fill">{classicBox.bottom}</span>
						<span class="box-corner"
							>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
						>
					</div>
				</div>

				<!-- Box 5: Capabilities Matrix -->
				<div class="cli-box" id="skills">
					<div class="box-line-top">
						<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
						<span class="box-title">Capabilities Matrix</span>
						<span class="box-fill">{classicBox.top}</span>
						<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
					</div>

					<div class="box-body">
						{#each skills as skill (skill.name)}
							<div class="cli-table-row compact">
								<span class="row-status">[{skill.status}]</span>
								<div class="row-skill-content">
									<span class="skill-name" class:highlighted={skill.isPrimary}>
										{skill.name}
										{#if skill.isPrimary}
											<span class="cli-check">✓</span>
										{/if}
									</span>
									<span class="skill-cat">:: {skill.category}</span>
								</div>
							</div>
						{/each}
					</div>

					<div class="box-line-bot">
						<span class="box-corner"
							>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
						>
						<span class="box-fill">{classicBox.bottom}</span>
						<span class="box-corner"
							>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Operator Status Box -->
		<div class="cli-box footer-box">
			<div class="box-line-top">
				<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
				<span class="box-title">Operator Session</span>
				<span class="box-fill">{classicBox.top}</span>
				<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
			</div>
			<div class="box-body footer-body">
				<span class="footer-meta">OPERATOR: THANAPHUM MASAYAMAS</span>
				<span class="footer-meta">STATUS: ACTIVE // {new Date().getFullYear()}</span>
				<a
					href="https://github.com/PLATONG34821"
					target="_blank"
					rel="external noreferrer"
					class="cli-link"
				>
					[GITHUB.COM/PLATONG34821 ↗]
				</a>
			</div>
			<div class="box-line-bot">
				<span class="box-corner">{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
				>
				<span class="box-fill">{classicBox.bottom}</span>
				<span class="box-corner"
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
			<div class="cli-box modal-box">
				<div class="box-line-top">
					<span class="box-corner">{classicBox.topLeft}{classicBox.top}{classicBox.top}</span>
					<span class="box-title">{activeCertModal.title}</span>
					<span class="box-fill">{classicBox.top}</span>
					<span class="box-corner">{classicBox.top}{classicBox.top}{classicBox.topRight}</span>
				</div>
				<div class="box-body">
					<div class="tui-modal-body">
						<img
							src={activeCertModal.image}
							alt={activeCertModal.title}
							class="tui-cert-img"
							loading="eager"
						/>
					</div>
					<div class="tui-modal-footer">
						<span class="footer-meta">&gt; Official Certificate Record</span>
						<div class="tui-modal-actions">
							<a
								href={activeCertModal.image}
								target="_blank"
								rel="external noreferrer"
								class="cli-link"
							>
								[OPEN HIGH-RES ↗]
							</a>
							<button type="button" class="cli-close-btn" onclick={closeCert}>
								[CLOSE ESC ×]
							</button>
						</div>
					</div>
				</div>
				<div class="box-line-bot">
					<span class="box-corner"
						>{classicBox.bottomLeft}{classicBox.bottom}{classicBox.bottom}</span
					>
					<span class="box-fill">{classicBox.bottom}</span>
					<span class="box-corner"
						>{classicBox.bottom}{classicBox.bottom}{classicBox.bottomRight}</span
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Global Monospace & TUI Environment */
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
		gap: 1.75rem;
	}

	/* 2-Column Balanced Dashboard */
	.cli-dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
		gap: 1.75rem;
		align-items: start;
	}

	.cli-column {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	/* CLI Box Drawing Container */
	.cli-box {
		display: flex;
		flex-direction: column;
		background: transparent;
		user-select: none;
	}

	.box-line-top,
	.box-line-bot {
		display: flex;
		align-items: center;
		font-size: 0.88rem;
		line-height: 1;
		color: #27272a;
		white-space: nowrap;
	}

	.box-corner {
		color: #3f3f46;
		font-weight: 400;
	}

	.box-title {
		color: #f87171; /* Coral Red matching screenshot */
		font-weight: 600;
		font-size: 0.88rem;
		padding: 0 0.5rem;
		letter-spacing: 0.02em;
	}

	.box-fill {
		flex-grow: 1;
		overflow: hidden;
		letter-spacing: -0.05em;
		color: #27272a;
	}

	.box-body {
		border-left: 1px solid #27272a;
		border-right: 1px solid #27272a;
		padding: 1rem 1.25rem 1.15rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin: 0 1px;
		user-select: text;
	}

	/* Project Card Item inside Box */
	.cli-card-item {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding-bottom: 1.15rem;
		border-bottom: 1px dashed #181f2a;
	}

	.cli-card-item:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.cli-card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.cli-head-left {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
	}

	.cli-id {
		color: #38bdf8;
		font-weight: 700;
		font-size: 0.84rem;
	}

	.cli-title-btn,
	.cli-title-link {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f3f4f6;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		transition: color 0.15s ease;
	}

	.cli-title-btn:hover,
	.cli-title-link:hover {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.cli-title-btn.highlighted,
	.cli-title-link.highlighted {
		color: #fdba74; /* Warm orange highlight */
	}

	.cli-check {
		color: #f97316;
		margin-left: 0.3rem;
		font-weight: 700;
		font-size: 0.85rem;
	}

	.cli-cat-tag {
		color: #64748b;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	.cli-card-desc {
		color: #9ca3af;
		font-size: 0.82rem;
		line-height: 1.45;
	}

	.cli-card-telemetry {
		display: flex;
		gap: 0.4rem;
		font-size: 0.76rem;
		line-height: 1.4;
	}

	.telemetry-label {
		color: #64748b;
		font-weight: 600;
		flex-shrink: 0;
	}

	.telemetry-val {
		color: #cbd5e1;
	}

	/* Action Links */
	.cli-card-actions {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding-top: 0.2rem;
		font-size: 0.78rem;
	}

	.action-prefix {
		color: #22c55e;
		font-weight: 700;
	}

	.action-links-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.cli-link,
	.cli-link-btn {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		color: #38bdf8 !important;
		font-family: inherit;
		font-size: 0.78rem;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		transition:
			color 0.15s ease,
			text-decoration 0.15s ease;
	}

	.cli-link:hover,
	.cli-link-btn:hover {
		color: #ffffff !important;
		text-decoration: underline !important;
		text-underline-offset: 3px;
	}

	/* Awards & Certifications Rows */
	.cli-table-row {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		padding-bottom: 0.65rem;
		border-bottom: 1px dashed #141b24;
	}

	.cli-table-row:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.cli-table-row.compact {
		align-items: baseline;
		padding-bottom: 0.45rem;
	}

	.row-year {
		color: #38bdf8;
		font-weight: 600;
		font-size: 0.76rem;
		flex-shrink: 0;
	}

	.row-main {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		flex-grow: 1;
	}

	.row-title-line {
		display: flex;
		align-items: baseline;
	}

	.row-title-btn,
	.row-title-static {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: #f3f4f6;
		font-family: inherit;
		font-size: 0.85rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		flex-wrap: wrap;
		transition: color 0.15s ease;
	}

	.row-title-btn:hover .row-name {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.row-badge {
		color: #fbbf24;
		font-weight: 600;
		font-size: 0.8rem;
	}

	.row-name {
		color: #e2e8f0;
	}

	.row-title-btn.highlighted .row-name {
		color: #fdba74;
	}

	.row-cert-link {
		color: #38bdf8;
		font-size: 0.72rem;
		font-weight: 600;
		margin-left: 0.2rem;
	}

	.row-sub {
		color: #64748b;
		font-size: 0.74rem;
		line-height: 1.35;
	}

	/* Certifications & Skills */
	.row-code {
		color: #38bdf8;
		font-weight: 700;
		font-size: 0.76rem;
		flex-shrink: 0;
	}

	.row-status {
		color: #22c55e;
		font-weight: 600;
		font-size: 0.72rem;
		flex-shrink: 0;
	}

	.row-cert-content,
	.row-skill-content {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		flex-wrap: wrap;
		font-size: 0.82rem;
	}

	.cert-name,
	.skill-name {
		color: #f1f5f9;
		font-weight: 500;
	}

	.skill-name.highlighted {
		color: #fdba74;
	}

	.cert-issuer,
	.skill-cat {
		color: #64748b;
		font-size: 0.74rem;
	}

	/* Footer Box */
	.footer-box .box-body {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 0.65rem 1.25rem;
	}

	.footer-meta {
		color: #64748b;
		font-size: 0.76rem;
		font-weight: 600;
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
