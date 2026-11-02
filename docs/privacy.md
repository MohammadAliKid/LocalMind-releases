# Privacy in LocalMind

LocalMind is local-first: your library lives on your PC, and LocalMind has no servers, accounts, analytics or
telemetry.

## What stays on your PC

| Data | Where | Notes |
|---|---|---|
| Notes, folders, collections, tags, flashcards | `%LOCALAPPDATA%\LocalMind\data` (SQLite database) | Readable by your Windows account, like any document. Consider BitLocker. |
| Automatic backups | `%LOCALAPPDATA%\LocalMind\data\backups\auto` | Same content as the database. Never uploaded. |
| Settings, device ID | `%LOCALAPPDATA%\LocalMind\config` | Machine-specific, never synced or backed up. |
| OpenAI API key, ChatGPT sign-in | `%LOCALAPPDATA%\LocalMind\config\secrets` | Encrypted with Windows DPAPI for your account. |
| Logs | `%LOCALAPPDATA%\LocalMind\logs` | Anything that looks like a key, token or sign-in code is removed before writing. |

## What leaves your PC, and only when you ask

- **OpenAI**, when you use AI features:
  - which data: the single note being organized or turned into flashcards, plus the names of your
    collections and tags;
  - how it's sent: your plan or key is used, and requests ask OpenAI not to store responses (`store: false`).
- **Anki (AnkiConnect, on your PC)**: approved flashcards and their LocalMind tags.
- **Syncthing**, if you turn sync on: change files go to your own PCs only, encrypted in transit.
- **GitHub (this repository)**: the update check downloads public release information. No personal data and
  no token is sent.

## Sync folder

Syncthing encrypts what travels between your PCs and doesn't store your files on a company server; relays
only see encrypted data. The **sync folder itself is not encrypted**: on each PC it holds your notes as
readable files, just like the database. Don't put it inside a cloud drive or on a device you don't control. If
you must, use Syncthing's *untrusted (encrypted) device* option for that device. Credentials, settings, logs,
backups and databases are never written to the sync folder.

## Sign in with ChatGPT

Sign-in happens on OpenAI's own page in your browser, using OpenAI's documented OAuth flow (PKCE). LocalMind
never sees your password. The sign-in stays on the PC where you made it: sign in separately on each PC.
*Disconnect* revokes LocalMind's access and deletes the sign-in from that PC.
