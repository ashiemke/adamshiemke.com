/**
 * Splits a leading "N. " off h2 headings into <span class="heading-num">N</span>
 * so numbered sections ("1. Delegate outcomes") can hang the number in the margin.
 * The heading id is set here so it stays "1-delegate-outcomes" whichever order
 * the heading-id plugin runs in.
 */
const NUMBERED = /^(\d+)\.\s+/;

function slugify(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-');
}

function textOf(node) {
	if (node.type === 'text') return node.value;
	return (node.children ?? []).map(textOf).join('');
}

function visit(node, fn) {
	fn(node);
	for (const child of node.children ?? []) visit(child, fn);
}

export function rehypeHeadingNumbers() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== 'element' || node.tagName !== 'h2') return;
			const first = node.children?.[0];
			if (!first || first.type !== 'text') return;
			const match = first.value.match(NUMBERED);
			if (!match) return;

			node.properties ??= {};
			node.properties.id ??= slugify(textOf(node));
			node.properties.className = [...(node.properties.className ?? []), 'numbered'];

			first.value = first.value.slice(match[0].length);
			node.children.unshift(
				{
					type: 'element',
					tagName: 'span',
					properties: { className: ['heading-num'] },
					children: [{ type: 'text', value: match[1] }],
				},
				{ type: 'text', value: ' ' },
			);
		});
	};
}
