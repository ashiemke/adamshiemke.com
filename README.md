# adamshiemke.com

Personal blog built with Astro 7, deployed to GitHub Pages at https://adamshiemke.com.

The `site` setting in `astro.config.mjs` is `https://adamshiemke.com`. Canonical URLs, the RSS feed and the sitemap all use it.

## Local development

Requires the Node version in `engines` in `package.json` (22.23.4 or later). The project uses npm.

```sh
npm install      # install dependencies (run again after changes to package-lock.json)
npm run dev      # dev server at http://localhost:4321
npm run build    # production build to ./dist/
npm run preview  # serve the production build locally
```

## Writing a post

Posts live in `src/content/blog/` as `.md` or `.mdx` files. The file name is the URL slug, so `src/content/blog/my-post.mdx` is published at `/blog/my-post/`.

Frontmatter:

```yaml
---
title: 'Post title'                    # required
description: 'One-sentence summary'    # required; used for meta tags and RSS
pubDate: 2026-11-16                    # required; YYYY-MM-DD
updatedDate: 2026-12-01                # optional
status: 'Working draft v4'             # optional; label shown near the date
---
```

For a worked example with every feature below, see `src/content/blog/durable-principles-for-agentic-engineering.mdx`.

### Footnotes

Markdown footnotes work in both `.md` and `.mdx` posts. Put a marker in the text as `text[^1]`, and define the note anywhere in the post as `[^1]: The note.` The marker links to the note, and the note links back to the marker.

### Components (MDX only)

In an `.mdx` post, import the components at the top of the file from `../../components/`, as the worked example does. The available components are:

- `<Cite n={1} />`: a citation marker that links to numbered note `n`.
- `<RefList>`: a list of numbered notes. Each entry is `<Ref n={1}>…</Ref>` and links back to its citation.
- `<Sidebar title="…">…</Sidebar>`: a boxed sidebar.
- `<Example label="…">…</Example>`: a boxed example or prompt.
- `<PrincipleIndex headings={props.headings} />`: an overview of the post's numbered `## 1. …` sections, linking to each.
- `<Settings>` with `<Setting name="…" level="High" value={4}>…</Setting>` rows: a panel of named levels with a 5-step meter. A `value` above 5 overflows the meter.
- `<Signoff>…</Signoff>`: a closing note set apart from the body.
- `<Drollery art="knight-snail" />`: a marginal drawing that jokes about the section's point. Place it right after the section's opening paragraph. On wide screens it sits in the right margin; on narrower ones it's a small centred picture. Optional `width` and `top` (how far to pull it up beside the heading). Drawings live in `src/assets/drolleries/`, whose README is the brief for drawing new ones.

The look is a Gothic illuminated manuscript: Alegreya type, vellum paper, red rubric numerals, a gilded initial on the first paragraph, leafy section breaks and an ivy border on wide screens. Ornaments are in `public/ornaments/`.

Styling conventions that need no component: a `## TL;DR` heading followed by a numbered list is set as a summary card, an `## N. Title` heading gets a red numeral (hung in the margin on wide screens), the first paragraph after any `##` heading is set a step larger (lead with the section's point), a bullet list whose items start with **bold text** is shown as a set of key ideas with ivy-leaf markers, and the first paragraph of the post gets the illuminated initial.

Markdown inside a component needs a blank line before and after it, or it will not render as Markdown:

```mdx
<Sidebar title="A note">

Text with *emphasis* and a [link](https://example.com).

</Sidebar>
```

### The README page

The personal README at `/readme/` is `src/content/readme.mdx`, rendered by `src/pages/readme.astro` with the `Page` layout. Edit the MDX file and change `updatedDate` in its frontmatter. `/about` redirects there.

### Code blocks

Code blocks are highlighted by Expressive Code. A title goes after the language, and line markers highlight lines:

````md
```js title="file.js" {2-3}
const a = 1;
const b = 2;
const c = a + b;
```
````

## Deploying

Pushes to `main` build and deploy the site through `.github/workflows/deploy.yml`. The workflow can also be run by hand from the Actions tab.

The steps below are a one-time setup.

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, go to Settings → Pages → Build and deployment → Source, and select **GitHub Actions**.
3. On the same page, under Custom domain, enter `adamshiemke.com` and click Save.
4. At Porkbun, go to Domain Management → DNS for adamshiemke.com. Delete the default parking records: the ALIAS or A records for the bare domain, and the `*` and `www` CNAME records that point at `uixie.porkbun.com`. Then add:
   - Four `A` records for the bare domain (host blank or `@`), pointing at `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
   - Optionally, four `AAAA` records for the bare domain, pointing at `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`.
   - A `CNAME` record for `www` pointing at `<github-username>.github.io`.

   These addresses are GitHub's Pages addresses, as listed at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site.
5. Verify the domain for your GitHub account at github.com/settings/pages: choose Add a domain, then add the TXT record that GitHub shows to the DNS settings at Porkbun. This stops other GitHub accounts from claiming the domain.
6. Once DNS resolves and GitHub has issued the certificate, which can take some time after the DNS change, go back to Settings → Pages and tick **Enforce HTTPS**.

After this setup, every push to `main` deploys the site.

### Mirror at ashiemke.github.io

The same site is also served at https://ashiemke.github.io/, for readers whose network filters block or sandbox new domains. The mirror is a second repository, `ashiemke/ashiemke.github.io`, with Pages set to **GitHub Actions** and no custom domain. It holds the same commits and runs the same workflow. Its pages still name `https://adamshiemke.com` as the canonical address, so search engines treat it as a copy.

The local `origin` remote has two push URLs, so `git push` updates both repositories:

```bash
git remote set-url --add --push origin git@github.com:ashiemke/adamshiemke.com.git
git remote set-url --add --push origin git@github.com:ashiemke/ashiemke.github.io.git
```

On a fresh clone, run both commands once. A push that reaches only one repository leaves the two sites out of step.
