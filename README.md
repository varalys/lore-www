# Lore Documentation

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/deployed%20on-Cloudflare%20Pages-orange)](https://lore.varalys.com)

Documentation website for [Lore](https://github.com/varalys/lore), the reasoning history tool for code.

**Live site:** [lore.varalys.com](https://lore.varalys.com)

## Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Structure

```
src/content/docs/
├── getting-started/    # Installation, quick start
├── guides/             # Feature guides (linking, search, MCP, etc.)
├── commands/           # CLI command reference
├── reference/          # Configuration, supported tools, API
└── about/              # Architecture, FAQ, security, changelog
```

## Contributing

Content is written in Markdown (`.md`) files. Each file in `src/content/docs/` becomes a page on the site.

To add or edit documentation:

1. Fork this repository
2. Make your changes
3. Run `npm run build` to verify the build passes
4. Submit a pull request

## Related

- [varalys/lore](https://github.com/varalys/lore) - Main Lore repository
- [docs.rs/lore-cli](https://docs.rs/lore-cli) - API documentation

## License

MIT
