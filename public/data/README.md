# Data Directory

This directory contains cached JSON datasets pulled from the Path of Exile trade API and ingested by the app at runtime.

## Files
- `items.json`   – Item definitions for trade filters
- `stats.json`   – Stat filter keys, weights & text
- `static.json`  – Static helpers (e.g. mods, tiers, misc keys)
- `leagues.json` – League info / selectables

## Update Workflow
- **In production:** Data is refreshed daily by a GitHub Action, fetching from the latest official endpoints:
  - `/api/trade/data/items`
  - `/api/trade/data/stats`
  - `/api/trade/data/static`
  - `/api/trade/data/leagues`
- **During development:** You may use minimal or stale files—services in `src/services/` handle fallback gracefully. If you want to test with new snapshots, you can manually overwrite these files.

## Notes
- Files are treated as replaceable snapshots; DO NOT hand-edit unless patching fixtures for development/testing.
- Refer to the project [README](../../README.md) for development workflow and more details on data usage.