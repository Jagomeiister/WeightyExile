This directory contains cached JSON data pulled from the Path of Exile trade API.

During development, these files may be empty or contain minimal placeholders.  In
production, a scheduled GitHub Action should fetch fresh data from the
`/api/trade/data/items`, `/api/trade/data/stats`, `/api/trade/data/static` and
`/api/trade/data/leagues` endpoints and commit them here.  The application
loads these files at runtime to avoid hitting the PoE API on every page load.