# WazeToolsAU Website

This project runs a Jekyll website and uses Tailwind CSS.
Site is hosted using GitHub Pages.

## Dev Requirements

- Docker
- Docker Compose

### Run locally

```bash
docker compose up --build
```

Site: http://localhost:4000

### Services

- `jekyll`: serves the site with livereload on port `4000`
- `tailwind`: watches `src/assets/css/app.css` and builds `src/assets/css/site.css`

### Useful commands

Build CSS once:

```bash
docker compose run --rm tailwind npm run build:css
```

Stop:

```bash
docker compose down
```

### Troubleshooting: new Gemfile gems not loading

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

## Contributor Guide: Add a new page to showcase your WME script (using folder-per-page pattern)

### 0. Fork and clone

If you do not have direct write access, fork this repository on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-username>/wazetoolsau.com.git
cd wazetoolsau.com
```

Create a branch for your change:

```bash
git checkout -b add-<script-slug>-page
```

Use the existing `wme-scripts` structure:

```text
src/
  wme-scripts/
    _template/
      index.md
    send-to-discord/
      index.md
      images/
```

### 1. Create a new script folder from the template

Pick a slug (lowercase, hyphenated), then copy the template page:

```bash
mkdir -p src/wme-scripts/<script-slug>/images
cp src/wme-scripts/_template/index.md src/wme-scripts/<script-slug>/index.md
```

Example slug: `my-awesome-script`

### 2. Update front matter in `src/wme-scripts/<script-slug>/index.md`

Required/used fields in the current layout:

- `layout: script-listing`
- `title`
- `description`
- `author`
- `install_link` (shown as the **Install** button)
- `icon` (typically inside the same folder, e.g. `/wme-scripts/<script-slug>/images/icon.svg`)

### 3. Add your content sections

Follow the same structure used by existing pages:

- Overview
- Features
- Screenshots

For screenshots, keep assets self-contained in:

```text
src/wme-scripts/<script-slug>/images/
```

Use `relative_url` paths:

```liquid
<img class="screenshot" src="{{ '/wme-scripts/<script-slug>/images/feat-1.jpg' | relative_url }}" alt="Feature 1">
```

### 4. Add a card on the home page

Edit `src/index.md` and add a new `script-card` entry inside the **WME Scripts** grid that links to your new page:

```liquid
<a href="{{ '/wme-scripts/<script-slug>/' | relative_url }}" class="group script-card">
  <img src="{{ '/wme-scripts/<script-slug>/images/icon.svg' | relative_url }}" alt="<Script name> icon" class="script-card-icon">
  <h3 class="text-xl font-medium mb-1"><Script name></h3>
  <p class="text-w-grey-600 text-sm leading-relaxed"><Short description></p>
  <p class="mt-auto pt-6 text-slate-400 text-sm leading-relaxed">Author: <Author></p>
</a>
```

### 5. Run locally and verify

```bash
docker compose up --build
```

Then confirm:

- the new card appears on `/`
- the new page opens at `/wme-scripts/<script-slug>/`
- icon and screenshots load from that page's local `images/` folder

### 6. Commit, push, and open a Pull Request

Commit your changes:

```bash
git add src/wme-scripts/<script-slug> src/index.md README.md
git commit -m "Add <script name> script page"
```

Push the branch to your fork:

```bash
git push -u origin add-<script-slug>-page
```

Open a Pull Request from your fork branch to this repository's default branch. In the PR description, include:

- what script page was added
- links added or updated
- screenshots of the new card and page (if relevant)
