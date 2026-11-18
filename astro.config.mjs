// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import expressiveCode from 'astro-expressive-code';
import { defineConfig, fontProviders } from 'astro/config';
import { rehypeHeadingNumbers } from './plugins/rehype-heading-numbers.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://adamshiemke.com',
	redirects: {
		'/blog': '/',
		'/about': '/readme/',
	},
	markdown: {
		processor: unified({ rehypePlugins: [rehypeHeadingNumbers] }),
	},
	integrations: [
		// Must come before mdx() so code blocks in .mdx posts are handled too.
		expressiveCode({
			themes: ['github-dark', 'github-light'],
			useDarkModeMediaQuery: true,
			styleOverrides: {
				codeFontFamily: 'var(--font-mono)',
				uiFontFamily: 'var(--font-label)',
				borderRadius: '6px',
				codeFontSize: '0.875rem',
			},
		}),
		mdx(),
		sitemap(),
	],
	fonts: [
		{
			// Body and headings: a book face with calligraphic roots, very readable at text sizes.
			provider: fontProviders.fontsource(),
			name: 'Alegreya',
			cssVariable: '--font-serif',
			weights: ['400 900'],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			// Labels, navigation and metadata, set in true small capitals.
			provider: fontProviders.fontsource(),
			name: 'Alegreya SC',
			cssVariable: '--font-label',
			weights: [400, 500, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
