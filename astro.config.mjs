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
				uiFontFamily: 'var(--font-sans)',
				borderRadius: '6px',
				codeFontSize: '0.875rem',
			},
		}),
		mdx(),
		sitemap(),
	],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Literata',
			cssVariable: '--font-serif',
			weights: ['200 900'],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Figtree',
			cssVariable: '--font-sans',
			weights: ['300 900'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
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
