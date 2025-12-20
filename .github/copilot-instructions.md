# GitHub Copilot Instructions - MINTarium Website

## Project Overview

This is a **Jekyll-based GitHub Pages website** for the Förderverein MINTarium Hamburg e.V., featuring a sophisticated event management system with Decap CMS integration. The site is a German-language (de-DE) static site using the Minimal Mistakes theme.

**Key Architecture**: Single `_events` collection with type-based filtering rather than separate collections per event type.

## Core Development Workflows

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally (auto-rebuilds on changes)
bundle exec jekyll serve
# → http://localhost:4000

# Build for production
bundle exec jekyll build  # → _site/
```

### Content Management
- **Primary CMS**: Decap CMS at `/cms-static/admin/` (deployed to Netlify)
- **Direct editing**: Markdown files in `_events/` follow naming: `YYYY-MM-DD-HH-MM-event-type.md`
- **Deployment**: Automatic via GitHub Pages on push to `main`

## Event System Architecture

### Single Source of Truth: `_data/event_types.yml`
All event type definitions (names, emojis, colors, defaults) live here. **Never hardcode event types** - always reference this file in templates and CMS config.

```yaml
# Structure example
offene-werkstatt:
  name: "Offene Werkstatt"
  emoji: "🔧"
  color: "#F0F8E8"
  defaults:
    location: "MINTarium Eingang B - Mümmelmannsberg 75 - 20255 Hamburg"
    registration_required: false
    organizers: ["Jan Evers", "Christoph Büchler"]
```

### Event Types
- `mach-mit-mathe` - Monthly math exhibitions (📐)
- `offene-werkstatt` - Bi-weekly maker workshops (🔧)
- `ferienpass` - School holiday activities (🎪)
- `sonstige` - Miscellaneous events (📅)

### Critical Design Decisions

**Why Single Collection?**
- Unified chronological sorting across all event types
- Simpler UI for non-technical editors
- Centralized filtering logic
- Consistent permalinks: `/veranstaltungen/:categories/:title/`

**Event Time Filtering**
- No Jekyll plugins used - all filtering via Liquid templates
- Compare `event.start_date | date: '%s'` against `site.time | date: '%s'`
- See [_pages/veranstaltungen.md](../_pages/veranstaltungen.md) for canonical filtering pattern

**CMS Type-Based Defaults**
- Decap CMS doesn't natively support conditional defaults
- Solution: JavaScript polling in [cms-static/admin/index.html](../cms-static/admin/index.html)
- Listens to `event_type` select changes, auto-fills location/registration/email
- **Limitation**: Only works on new event creation, not edits

## File Structure & Key Conventions

### Event Files (`_events/`)
```yaml
---
event_type: offene-werkstatt      # Must match key in event_types.yml
title: "Your Event Title"
start_date: 2025-12-02 16:00      # ALWAYS include time (no all-day events)
end_date: 2025-12-02 19:00        # Optional, defaults to +2hrs in feeds
excerpt: "Short description"       # 10-200 chars for overview pages
published: true                    # false = draft
location: "MINTarium..."          # Pre-filled by type
registration_required: false       # Controls display of registration section
registration_email: ""            # Required if registration_required: true
cancelled: false                   # Shows warning banner
organizers: []                    # Optional array
teaser_image: /assets/images/...  # Optional preview image
---
# Markdown content with full event description
```

### Layout Pattern
- [_layouts/event.html](../_layouts/event.html) - Individual event pages with schema.org markup
- [_includes/event-card.html](../_includes/event-card.html) - Reusable card component for listings
- BEM CSS architecture in [assets/css/events.css](../assets/css/events.css) (`.event-card__element`)

### Overview Pages
- `/veranstaltungen/` - Main page: 4 upcoming + 2 recent past events
- `/veranstaltungen-zukunft/` - All future events
- `/veranstaltungen-archiv/` - All past events
- Client-side filtering via [assets/js/event-filters.js](../assets/js/event-filters.js)

### Feed Generation
- [feeds/mintfv-events.ical](../feeds/mintfv-events.ical) - RFC 5545 compliant iCal (only future events)
- [feeds/mintfv-events.xml](../feeds/mintfv-events.xml) - RSS 2.0 feed
- Both auto-generated from `_events` collection via Liquid templates

## Theme & Styling

**Remote Theme**: `mmistakes/minimal-mistakes` with custom skin `mintfv`
- Overrides in `_sass/minimal-mistakes/` and `_includes/`
- Custom event system CSS loaded via [_includes/head/custom.html](../_includes/head/custom.html)
- Responsive grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`

## Common Tasks & Patterns

### Adding a New Event Type
1. Add definition to [_data/event_types.yml](../_data/event_types.yml)
2. Update select options in [cms-static/admin/config.yml](../cms-static/admin/config.yml)
3. Add defaults object to [cms-static/admin/event-types.json](../cms-static/admin/event-types.json)
4. Add filter button template if needed

### Modifying Event Layouts
- Always test both list view ([_includes/event-card.html](../_includes/event-card.html)) and detail view ([_layouts/event.html](../_layouts/event.html))
- Ensure `is_past` styling works (opacity, greyscale for past events)
- Maintain accessibility: proper semantic HTML, `alt` tags, ARIA labels

### Date/Time Handling
- **Input**: Jekyll auto-parses `YYYY-MM-DD HH:MM` in frontmatter
- **Filtering**: Convert to Unix timestamp via `| date: '%s'`
- **Display**: German format via `| date: '%d.%m.%Y, %H:%M'`
- **Timezone**: Europe/Berlin in [_config.yml](../_config.yml)

### CMS Configuration
- Main config: [cms-static/admin/config.yml](../cms-static/admin/config.yml)
- Custom UI logic: [cms-static/admin/index.html](../cms-static/admin/index.html)
- Media uploads → `assets/images/events/`
- GitHub OAuth via Netlify: `backend.auth_endpoint: auth`

## Dependencies & Build

**Ruby Gems** ([Gemfile](../Gemfile)):
- `github-pages` - Ensures compatibility with GitHub Pages versions
- `minimal-mistakes-jekyll` - Theme
- `jekyll-feed`, `jekyll-sitemap` - Standard Jekyll plugins
- **No custom plugins** - keeps GitHub Pages compatibility

**No Node/npm** - Pure Jekyll build, no JS compilation step

## Anti-Patterns to Avoid

❌ **DON'T** hardcode event type names/colors in templates
✅ **DO** reference `site.data.event_types[event.event_type]`

❌ **DON'T** create all-day events (`start_date: 2025-12-02` without time)
✅ **DO** always specify time: `start_date: 2025-12-02 14:00`

❌ **DON'T** use Jekyll pagination plugins
✅ **DO** use Liquid slice filters: `| slice: 0, 4`

❌ **DON'T** assume CMS changes are reflected live
✅ **DO** understand Decap commits to Git → GitHub Pages rebuilds (~2min)

## Documentation Files

- [VERANSTALTUNGEN_ANLEITUNG.md](../VERANSTALTUNGEN_ANLEITUNG.md) - Editor guide (German, non-technical)
- [VERANSTALTUNGEN_TECHNIK.md](../VERANSTALTUNGEN_TECHNIK.md) - Technical deep-dive (architecture decisions)
- [README.md](../README.md) - Installation and basic usage

## Testing Checklist

When modifying event system:
- [ ] Test in CMS: create event with each type, verify defaults
- [ ] Check responsive layout (mobile, tablet, desktop)
- [ ] Verify past/future filtering on all 3 overview pages
- [ ] Validate iCal feed syntax: import into Google Calendar
- [ ] Test cancelled event banner display
- [ ] Confirm German date formatting (dd.mm.yyyy)
- [ ] Check accessibility: keyboard navigation, screen reader

## Language Note

All user-facing content is in **German (de-DE)**. When generating content, use:
- Date labels: "Wann:", "Wo:"
- Buttons: "Mehr erfahren", "Anmeldung"
- Months: "Januar", "Februar", etc. (Liquid handles via locale)
