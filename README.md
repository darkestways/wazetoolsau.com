# WazeToolsAU Website

This project runs a Jekyll website and uses Tailwind CSS.
Site is hosted using GitHub Pages.

## Requirements

- Docker
- Docker Compose

## Run locally

```bash
docker compose up --build
```

Site: http://localhost:4000

## Services

- `jekyll`: serves the site with livereload on port `4000`
- `tailwind`: watches `src/assets/css/app.css` and builds `src/assets/css/site.css`

## Useful commands

Build CSS once:

```bash
docker compose run --rm tailwind npm run build:css
```

Stop:

```bash
docker compose down
```

## Troubleshooting: new Gemfile gems not loading

If you add a gem to `Gemfile` and it still is not available after rebuilding, this is because of Docker volume used for `bundle_cache`.

Refresh gems in the mounted volume:

```bash
docker compose run --rm jekyll bundle install
```

Or fully recreate the bundle volume:

```bash
docker compose down -v
docker compose up --build
```

Also make sure `Gemfile.lock` is updated and committed after adding gems so dependency resolution remains consistent.

For most of these manual interventions, you can just run the associated bundle commands via `docker compose run --rm jekyll bundle <cmd>`
