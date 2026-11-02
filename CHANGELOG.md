# LocalMind release notes

## 0.3.0

- **Sync between your PCs.** Keep LocalMind the same on a desktop and a laptop through a folder that
  Syncthing shares between them. Each PC keeps its own library and applies the other's changes.
  - Notes edited on both PCs at once are kept side by side with clear choices: keep either version, keep
    both, or merge.
  - A note deleted on one PC while being edited on the other is never lost.
  - Sign-ins, API keys and Anki connection data never sync.
  - Setup guide: [docs/sync.md](docs/sync.md).
- Sync status in the sidebar and in *Settings → Sync between your PCs*.
- Flashcards keep their permanent IDs across PCs, so a second PC finds cards already in Anki instead of adding
  duplicates.

## 0.2.0

- Light, Dark and *Follow Windows* themes.
- Folders for collections; collapsible, searchable tags; tag filters in search; Favorites and Recently opened.
- Quick Capture: Ctrl+Shift+N anywhere in Windows (configurable).
- Command palette: Ctrl+K.
- Inbox count, bulk actions and keyboard navigation.
- Automatic local backups with retention and one-click restore.
- Automatic updates verified with LocalMind's Ed25519 release signature.

## 0.1.0

- First release: local Markdown notes, AI organization (ChatGPT plan or API key), related notes, Basic and
  Cloze flashcards synced to the `#LocalMind` Anki deck, backup and restore, Windows installer.
