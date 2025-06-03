## Decision

We will use SQLite as the storage engine for the application.

## Rationale

We are building an offline-first, cross-platform application. The storage engine needs to be widely supported on all target platforms.

Node.js: Supports SQLite
Android: Supports SQLite
iOS: Supports SQLite
Web: Supports SQLite over OPFS

## Alternative considered

Custom file-based storage engine. Not adopted because of the implementation complexity and the lack of browser support.
