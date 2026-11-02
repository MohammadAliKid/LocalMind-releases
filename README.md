<p align="center">
  <img src="images/logo.svg" width="88" height="88" alt="LocalMind logo">
</p>

<h1 align="center">LocalMind for Windows</h1>

<p align="center">
  Local-first notes that organize themselves, surface related ideas and turn into Anki flashcards.
</p>

<p align="center">
  <a href="https://github.com/MohammadAliKid/LocalMind-releases/releases/latest/download/LocalMind-Setup.exe"><img src="https://img.shields.io/badge/Download-LocalMind--Setup.exe-245a73?style=for-the-badge" alt="Download LocalMind-Setup.exe"></a>
</p>
<p align="center">
  <a href="https://github.com/MohammadAliKid/LocalMind-releases/releases/latest">Latest release, notes and checksums</a> ·
  Windows 10 / 11, 64-bit · Free download
</p>

<p align="center">
  <img src="images/main-light.png" alt="LocalMind main window: folders and collections, a note, AI organization, related notes and flashcards" width="900">
</p>

> This repository contains **only** LocalMind's installers, update files, release notes and documentation.
> The source code is private.

## Download and install

1. **Download** [`LocalMind-Setup.exe`](https://github.com/MohammadAliKid/LocalMind-releases/releases/latest/download/LocalMind-Setup.exe)
   from the latest release.
2. **Optional: check the file.** In PowerShell, run `Get-FileHash .\LocalMind-Setup.exe` and compare the result
   with `SHA256SUMS.txt` on the release page. See [verifying downloads](docs/verify.md).
3. **Run it.** LocalMind installs for your Windows account only (no administrator rights) and opens. It adds
   *LocalMind* to the Start menu and the desktop. Nothing else is needed: no Node.js, no terminal.

**"Windows protected your PC"?** The installer is not yet signed with a Windows (Authenticode) code-signing
certificate, so Microsoft Defender SmartScreen may warn about an unrecognized app. If you downloaded it from
this page and the checksum matches, click **More info → Run anyway**. Automatic updates are protected
separately by LocalMind's own signature; see [Updates](#automatic-updates).

**Requirements:**
- Windows 10 or 11, 64-bit, with about 500 MB free.
- Optional: [Anki Desktop](https://apps.ankiweb.net) with the AnkiConnect add-on (for flashcards).
- Optional: [Syncthing](https://syncthing.net) (to sync between your PCs).

**Uninstall:** Settings → Apps → LocalMind. Your notes stay in `%LOCALAPPDATA%\LocalMind` until you delete
that folder yourself.

## Features

| | |
|---|---|
| **Notes that stay yours** | Markdown notes, saved as you type, stored in a database on your PC. Nothing is uploaded. |
| **AI organization** | Files a note into your existing collections, adds tags, a summary and key concepts. It never rewrites your text, and your own choices always win. |
| **Related notes** | Finds connected notes on your PC and shows why (a shared tag, collection or concept). |
| **Anki flashcards** | Basic and Cloze cards from your notes. You approve them, then they go to a `#LocalMind` deck without duplicates, keeping your review history. |
| **Sync between your PCs** | Desktop and laptop stay in step through Syncthing; conflicting edits are kept, never overwritten. |
| **Everyday tools** | Folders, tags, favorites, Inbox, Ctrl+K command palette, Ctrl+Shift+N Quick Capture, bulk actions, dark mode, automatic backups. |

<table>
  <tr>
    <td width="50%"><img src="images/organize.png" alt="AI organization"><br><sub><b>AI organization.</b> Existing collections applied; new ones only proposed.</sub></td>
    <td width="50%"><img src="images/flashcards.png" alt="Flashcards"><br><sub><b>Flashcards.</b> Each card quotes the sentence it came from.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="images/main-dark.png" alt="Dark mode"><br><sub><b>Dark mode.</b> Or follow Windows.</sub></td>
    <td width="50%"><img src="images/sync-conflict-dark.png" alt="Sync conflict"><br><sub><b>Sync conflicts.</b> Keep either version, both, or merge.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="images/command-palette.png" alt="Command palette"><br><sub><b>Ctrl+K.</b> Search notes and run actions.</sub></td>
    <td width="50%"><img src="images/quick-capture.png" alt="Quick Capture"><br><sub><b>Quick Capture.</b> Jot something down from anywhere.</sub></td>
  </tr>
</table>

<sub>Screenshots show synthetic demo notes.</sub>

## AI: your ChatGPT plan or an API key

LocalMind's AI features are optional. In *Settings → AI*, choose one of the following. LocalMind never
switches between them by itself.

- **Your ChatGPT plan (Sign in with ChatGPT):** *Continue with ChatGPT* opens OpenAI's own sign-in page in
  your browser. Requests then count against your ChatGPT Plus or Pro plan's usage limits, with no separate API
  bill. This uses an OpenAI preview program, so **eligibility, limits and availability are decided by OpenAI**
  and may change. If plan usage isn't available for your account, LocalMind shows OpenAI's exact message.
- **Your OpenAI API key:** billed by OpenAI to your API account, separately from any ChatGPT subscription.

Only the note you organize and the names of your collections and tags are sent. Sign-ins and keys are
encrypted with Windows on that PC and never synced, backed up or logged.

## Anki

1. Install Anki Desktop and the **AnkiConnect** add-on (code `2055492159`). Keep Anki open while syncing.
2. In LocalMind, open a note → **Generate flashcards** (or add your own) → review → **Sync to Anki**.
3. Cards go to the deck **`#LocalMind`** using two note types, *LocalMind Basic* and *LocalMind Cloze*, which
   LocalMind creates if needed.
4. Every card has a permanent ID, so syncing again, restoring a backup or using a second PC updates the same
   Anki note instead of adding a duplicate. Review history is never reset, and LocalMind never deletes Anki
   notes or touches your other decks.

## Sync between your PCs

LocalMind keeps a full copy on each PC and exchanges changes through a folder that Syncthing shares between
them. See the step-by-step guide: **[docs/sync.md](docs/sync.md)**.

## Privacy

- **On your PC:** notes, organization, flashcards and settings stay in `%LOCALAPPDATA%\LocalMind`. LocalMind's
  server listens on your own PC only (`127.0.0.1`).
- **What's sent out:**
  - to OpenAI, only the note you ask AI to work on;
  - to Anki, only the cards you approve;
  - through Syncthing, only to your own PCs.
- **No tracking:** no analytics, no telemetry, no accounts with LocalMind.

More detail: [docs/privacy.md](docs/privacy.md).

## Automatic updates

*Settings → Updates* checks this repository for new versions every few hours (you can turn that off) and shows
what's new. **Download update** and **Restart to update** each need a click. Before installing, LocalMind
checks:

- that the update information carries a valid **Ed25519 signature** from LocalMind's release key, which is
  built into the app ([public key](localmind-update-public-key.pem));
- that the version is **newer**, so it never downgrades;
- that every file matches its signed **SHA-256** hash.

A backup is taken before restarting, and your notes and settings are never touched by an update. How to check
releases yourself: [docs/verify.md](docs/verify.md).

## Releases

| Version | Date | Highlights |
|---|---|---|
| **0.3.0** | 2026-11 | Sync between PCs, conflict resolution |
| 0.2.0 | 2026-11 | Dark mode, folders, Quick Capture, command palette, automatic backups and updates |

Full notes: [CHANGELOG.md](CHANGELOG.md) and the [releases page](https://github.com/MohammadAliKid/LocalMind-releases/releases).

## Known issues

- **SmartScreen warning:** the installer isn't Authenticode-signed (see above).
- **Sync testing:** sync was tested with two independent installations on one PC; real two-PC use is new in
  0.3.0. Please report problems.
- **AI depends on OpenAI:** AI quality depends on the model you choose, and ChatGPT plan usage is an OpenAI
  preview.
- **Windows only:** 64-bit only, with no macOS or Linux builds.

## Help

[Open an issue](https://github.com/MohammadAliKid/LocalMind-releases/issues) for problems with downloads,
installing or updating. Please never include your notes, API keys or sign-in details.

## Copyright

Copyright © the LocalMind author. All rights reserved. This repository publishes installers and
documentation only; no license to LocalMind's source code is granted.
