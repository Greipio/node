# Changelog

## 2.0.0 — 2026-03-19

### Breaking

- Target **Greip API v2** (`https://v2.greipapi.com`).
- Authentication is **Bearer token only** (no `key` query/body parameter).
- Responses use the v2 envelope (`success`, `data`, `execution_ms`); the client returns unwrapped `data`.
- Endpoint paths updated (e.g. `lookup/ip/{ip}`, `score/ip/{ip}`, `lookup/countries/{code}`, `score/email/{email}`, `POST /score/text`, `POST /score/payments`).
- Field names in `data` follow v2 (e.g. `ip.address`, `geo.country_code`, `is_valid`, `risk_level`).

### Changed

- Live integration tests updated for v2 response shapes.
