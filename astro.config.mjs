// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://lore.varalys.com',
	integrations: [
		starlight({
			title: 'Lore',
			logo: {
				src: './src/assets/logo.svg',
				alt: 'Lore',
			},
			description: 'Reasoning history for code. Capture AI coding sessions and link them to git commits.',
			components: {
				Footer: './src/components/Footer.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/varalys/lore' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Linking Sessions to Commits', slug: 'guides/linking' },
						{ label: 'Searching Sessions', slug: 'guides/search' },
						{ label: 'Using Blame', slug: 'guides/blame' },
						{ label: 'Exporting Sessions', slug: 'guides/export' },
						{ label: 'MCP Server Integration', slug: 'guides/mcp' },
						{ label: 'Background Daemon', slug: 'guides/daemon' },
					],
				},
				{
					label: 'Commands',
					autogenerate: { directory: 'commands' },
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Supported Tools', slug: 'reference/supported-tools' },
						{ label: 'Configuration', slug: 'reference/configuration' },
						{ label: 'Data Storage', slug: 'reference/data-storage' },
						{ label: 'API Reference', slug: 'reference/api' },
					],
				},
				{
					label: 'About',
					items: [
						{ label: 'Architecture', slug: 'about/architecture' },
						{ label: 'Contributing', slug: 'about/contributing' },
						{ label: 'FAQ & Troubleshooting', slug: 'about/faq' },
						{ label: 'Security', slug: 'about/security' },
						{ label: 'Changelog', slug: 'about/changelog' },
					],
				},
			],
			editLink: {
				baseUrl: 'https://github.com/varalys/lore-www/edit/main/',
			},
			lastUpdated: true,
		}),
	],
});
