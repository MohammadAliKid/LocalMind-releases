# Changelog

## 0.6.11 — 2026-11-10

- Fixed: notes created or edited on a device could stop reaching other devices after that device had been in another
  library and then rejoined this one (for example after the library was set up again in Google Drive). The rejoining
  device starts its change log again from 1, and devices that had already received its earlier changes skipped the
  new ones without any error. Most often seen as Android → Windows sync stopping while Windows → Android kept working.
  Devices now recognise a restarted change log and read it again from the start; changes they already have are
  skipped, so nothing is duplicated. Windows also replaces its local copy of another device's change file when Google
  Drive holds a different one at the same name.
- Changes already waiting in Google Drive arrive by themselves once the receiving device runs 0.6.11: no reset, no new
  pairing code and no re-joining. Notes, cards, images, conflicts, keys and device identities are kept.
- Unchanged: the sync and encryption format, pairing codes and identities. 0.6.10 devices keep syncing with 0.6.11
  devices; to receive changes from a device that rejoined a library, a device needs 0.6.11.

## 0.6.10 — 2026-11-10

- Faster Google Drive sync on Windows and Android: files are now downloaded a few at a time instead of one by one
  (up to 4 at once on Windows, 3 on Android, with memory limits on the phone). Joining a library on a new device and
  catching up after being away are about 2–4 times faster on real Google Drive. Uploads stay one at a time: Google
  Drive processes them one by one anyway (measured), so sending several at once would only make each one wait
  longer. A sync with no changes is still a single small request.
- Every transfer keeps its own time limit, and Disconnect or quitting now stops a round's transfers at once (anything
  not yet uploaded stays queued and is sent next time, with the same file ids, so nothing is duplicated).
- When Google Drive asks LocalMind to slow down, every transfer on that device backs off together, using Google's
  suggested wait (bounded); an expired Google sign-in token is renewed once, not once per transfer.
- Unchanged: the shared sync and encryption format, pairing codes, library and device identities, conflict handling,
  notes, images, flashcards, Syncthing folder sync, the Windows updater identity and the Android package and
  certificate. 0.6.9 and 0.6.10 devices sync with each other. Mac keeps its affected 0.5.0 downloads; macOS repair
  remains 0.7.0.

## 0.6.9 — 2026-11-10

- Fixed: joining a Google Drive library with its pairing code could sit on "Checking the code and downloading your
  library…" for a long time with no progress (on Windows and Android), and closing Settings asked for the code again.
  The code is now checked in seconds by downloading one small file; the library then downloads in the background with
  "Downloading your library… N of M files", Cancel, and Resume after a failure or an app restart (nothing already
  downloaded is fetched again). A wrong code or account is refused right away. Several devices can join with the
  same code at the same time.
- Faster, leaner Google Drive sync, especially on Android: nothing is downloaded again after the app restarts (it was
  re-downloading its sync history and every image), a sync with no changes is a single small request, uploads are
  confirmed by Google Drive's checksum instead of being downloaded again, a new device downloads the library about
  once (was up to three times), and reconnecting a device that still has its pairing code fetches only what changed.
- Android: Drive requests have connection and read time limits; Settings stays responsive during a long download;
  Set up, Join and Disconnect no longer wait for the whole first upload.
- Unchanged: the shared sync and encryption format, pairing codes, library and device identities, notes, images,
  flashcards, Syncthing folder sync, the Windows updater identity and the Android package and certificate. Mac keeps
  its affected 0.5.0 downloads; macOS repair remains 0.7.0.

## 0.6.8 — 2026-11-09

- Fixed (Android): folder sync (Syncthing) could hang indefinitely and then refuse to stop, pause or turn off, and
  turning it on again could hang too. Every sync-folder operation now runs on LocalMind's own thread instead of the
  shared plugin thread (so a stuck folder can no longer hold up saving notes or settings), has a time limit, and is
  cancelled where Android allows it. A new **Stop syncing** button and **Turn off sync** always respond, even while
  the folder hangs; a stopped round never writes, reports or turns sync back on later, and restarting never runs
  two rounds at once. Progress, time-outs and lost folder access are explained clearly. Nothing is reset to recover:
  notes, waiting changes, sync journals and the phone's sync identity are kept.
- New **Can't find your pairing code?** assistant under the Google Drive pairing-code field (Windows and Android):
  get it from another connected device, from a saved copy, or, if it's lost everywhere, start a new library after
  deleting LocalMind's hidden data through Google Drive's own Manage apps page. It explains plainly that Google
  sign-in can't recover the code and never deletes Drive data itself.
- Google Drive accounts: the signed-in account is shown; **Use another Google account** (Google's account chooser)
  and **Sign out** work before pairing; Disconnect, Sign out, Revoke and deleting the library are separate actions.
  A device now remembers the pairing codes of libraries it used (in Windows DPAPI / Android Keystore only), so it can
  **Reconnect** to the original account later without typing the code. Joining a different library than the one
  a device synced before asks first, and LocalMind refuses to sync a library into another account's Drive.
- Setup asks you to confirm that you saved the new pairing code; connected devices from earlier versions get a
  gentle reminder. The code is hidden from screenshots and screen sharing while shown, and removed from bug reports.
- New sync help and troubleshooting page on the website, linked from Settings → Sync.
- Unchanged: Drive encryption format, workspace IDs and pairing codes (0.6.7 codes keep working), notes,
  attachments, flashcard/Anki identities, Windows updater identity and the Android package and certificate.
  Mac keeps its affected 0.5.0 downloads; macOS repair remains 0.7.0 / draft PR #7.

## 0.6.7 — 2026-11-09

- New official **Open volume** brain-and-book identity, selected by the owner: consistent app icons, headers,
  Settings branding, favicons and social artwork in LocalMind's slate/teal palette.
- Windows executable, installer and shortcut icons retain the existing Squirrel application identity and update key.
- Android launcher, adaptive, round, themed monochrome and splash icons; permanent certificate and package identity
  retained, versionCode advances from 13 to 14. Current shared generation-stop/timeout fixes are included.
- Refreshed repository overviews and website branding, preserving feedback delivery, Google verification,
  privacy/terms and release history. AI remains optional and paid providers retain their own billing/limits.
- Notes, attachments, flashcard/Anki identities, encrypted credentials, sync and backup formats remain unchanged.
- Mac icon source assets are prepared only. Existing affected 0.5.0 downloads stay unchanged; signing repair and
  native Mac validation remain future 0.7.0 / draft PR #7. Windows is not Authenticode-signed.


## 0.6.6 — 2026-11-08

- New **Awaiting approval** view (sidebar and command palette): every suggested flashcard from all notes in one
  place, with its note and collection. Search, filter and sort; approve or reject one card or many at once; undo;
  jump to the source note. Approved cards go to Anki with the usual sync. Rejecting never deletes a note or a card
  that is already in Anki.
- Fixed: cards that are already in Anki could show as "awaiting approval" (for example after another device's
  older copy synced, or after a restore). LocalMind now checks Anki by each card's permanent ID, without
  changing anything in Anki, and marks those cards approved again. If Anki isn't running, the list says it
  couldn't check. A note with cards in Anki *and* new suggestions now shows both counts.
- Fixed: flashcard generation (notably with Gemini) could keep "Generating…" forever after the first card. A
  timeout now covers the whole response, Android uses native connection and read timeouts, and a new **Stop
  generating** button ends a request immediately. Nothing from a stopped or timed-out request is saved, cards you
  already had are kept, and generating again never creates duplicates.
- New **Report a Bug** and **Request a Feature** forms in Settings → Feedback. You see exactly what will be sent
  before pressing Submit. Only your text and the app version, operating system, architecture and time are sent.
  Keys, sign-ins, file paths and email addresses you type are removed automatically. Notes, flashcards and
  attachments are never sent. A report counts as sent only after it's confirmed, and an unsent draft is kept.
- An occasional tip mentions the feedback forms: at most once every 14 days, never while you're writing, studying or
  generating cards, and "Don't show this again" turns it off for good.
- Windows-only release. Android stays 0.6.1/code13 and the affected Mac 0.5.0 downloads are unchanged (Mac repair
  is planned for 0.7.0). Windows installer is not Authenticode-signed; updates keep the existing Ed25519 identity.

## 0.6.5 — 2026-11-08

- Windows desktop redesign: cohesive light/dark themes, clearer navigation and note library, a borderless writing
  page, consistent line icons, compact formatting with overflow, grouped tools, refreshed Settings and Study Mode.
- Improve keyboard focus in dialogs, platform shortcut labels, reduced motion, narrow-window and split-pane layouts.
  Markdown remains unchanged on disk; notes, Anki NoteUIDs, attachments, sync and backups retain their identities.
- Windows-only release. Android remains 0.6.1/code13 with its existing APK and signed updater. Mac retains the
  affected 0.5.0 downloads: defer installing them. Mac signing repair and genuine Apple Silicon validation stay on
  draft PR #7 for the future coordinated 0.7.0 release.
- Windows installer is not Authenticode-signed. Updates retain the existing Ed25519 signing identity.

## 0.6.1 (2026-11-08)

- Google Drive sync (optional): sign in with Google on Windows (browser) or Android (Google Play services) and sync
  notes, images and deletions between your devices through an encrypted, app-private Drive folder. LocalMind only
  requests the `drive.appdata` permission and cannot see your other Drive files. Pair a second device with the
  recovery code shown on the first; keep that code safe, it is needed to restore your library.
- Works offline; concurrent edits keep both versions. Disconnecting or revoking access keeps every local note.
- Google's sign-in screen shows the website address instead of the LocalMind name and logo (branding not verified).
- Protect cancelled sign-ins and Drive setup/disconnect transitions. Syncthing folder sync remains under Advanced.

## 0.6.0 (2026-11-07)

Windows 0.6.0 and Android 0.6.0. macOS downloads remain 0.5.0 (see the Mac launch notice).

- Study Mode on Windows and Android: study all notes, selected notes, Inbox, Favorites, a collection, tags or a
  search, read-only, with progress, Next/Previous, arrow keys (Windows) and swipes (Android). Never changes Anki.
- Merge Notes: combine selected notes into a new master note (AI-organized with disagreements flagged, or a simple
  merge without AI). Preview, edit and approve; originals, their flashcards and Anki links are unchanged.
- Sources: manual references, Find Sources (real OpenAlex and Wikipedia records for terms you review) and Update
  Sources (recheck links and DOIs; you approve every change).
- Generate flashcards for several selected notes at once, only for notes without cards.
- Android: long-press selection; swipe right to delete (with Undo), swipe left to favorite.
- Windows: compact Settings window with section navigation; optional first-run guide on new installs.
- Google Drive sync is not available yet; folder sync with Syncthing is unchanged.

## 0.5.4 (2026-11-06)

- Send selected text to LocalMind from the Android share sheet or compatible text-selection menus. Preview it, enter a title, or append it to an existing local note.

## 0.5.3 (2026-11-05)

- Android now fits system bars and keyboard across navigation modes and orientations.
- Settings lets users choose or change the shared Syncthing folder and keeps its Android access permission after restart.

## 0.5.2 (2026-11-04)

> **2026-11-05 macOS notice:** Retained Mac 0.5.0 downloads are affected: Apple Silicon has an invalid resource seal; Intel is unsigned and awaiting final-DMG validation. Defer Mac installation pending corrected builds. Windows/Android are unaffected. See [Mac launch status](docs/mac-launch.md).

- Android redesign: system typography, light/dark accents, Library/Search/Settings navigation, Recent/Favorites/
  Inbox, editable templates, text sharing, a minimal editor, Focus Mode and a top-right provider-aware tools drawer.
- Fix duplicate IME insets so Gboard leaves the editor and caret visible. Preserve the editor through layout,
  theme and system text-size changes; keep native selection, composition, undo and redo. Add touch link/cloze forms.
- Offline Study Mode with cloze reveal, linked card previews and related notes; it does not schedule reviews or
  write to AnkiDroid merely by displaying cards. Approved Basic/Cloze sync retains permanent NoteUID mappings.
- Gallery/camera/native image paste, explicit Paste image, photo compression and full-screen preview. Schema-5
  Android backups include deduplicated, hash-verified attachments; restore repairs corrupt files and handles old
  or incomplete backups explicitly. Native backup picker state no longer duplicates large payloads in Binder.
- Native shared-folder image transfer and durable journal retries: persist original operation IDs before writing
  the chosen folder; recover unchanged segments after storage failure/restart. Distinguish local save, pending,
  paused, error/conflict and completed folder writes; never imply remote receipt from a local folder write.
- Curated Gemini text-model selection with account catalog filtering, limits and unverified billing clearly shown.
  Official Android ChatGPT-plan distribution eligibility remains unestablished; no unofficial sign-in workaround.
- Reject stale search responses and bound list rendering. Native tests cover long notes, phones/tablet, portrait/
  landscape, actual split screen, 130%/200% accessibility text, clipboard, storage recovery and AnkiDroid.
- This release updates Android. Previously verified Windows 0.5.1 and macOS 0.5.0 downloads are retained unchanged;
  no new desktop package is implied. Signed final upgrade, CI and publication evidence lives in release status.

## 0.5.1 (2026-11-03)

- Android: native GitHub update checks and Settings → Updates, release notes, streamed download progress,
  cancellation, retry and Android system-installer handoff. Ed25519 metadata, SHA-256, APK cryptographic signatures,
  package ID, versionCode/versionName and the established release certificate are checked before installation.
  Android WorkManager schedules metadata checks when connected and battery is not low; installation remains explicit.
- Permanent RSA-4096 Android release identity; DPAPI-encrypted local credentials; encrypted offline backup with a
  restored-keystore certificate check. Release builds fail when signing credentials or the certificate pin are missing.
- macOS downloads reuse the previously verified **0.5.0** Apple Silicon and Intel packages with normal DMG filenames
  and signed manifests for manual verified-DMG updates. They are not Developer ID signed or notarized; Gatekeeper
  approval may be needed. New ad-hoc signing, DMG/Keychain CI checks and a longer DMG timeout are prepared in source,
  but no new Mac package is published while hosted macOS CI is billing-blocked.
- Official one-job GitHub self-hosted runners inside Windows Sandbox; private trusted-ref dispatch, isolated
  Windows/Android checks, local CI fallback and reports. Signing keys and personal data remain outside routine CI.
- Release and Claude continuation instructions, reproducible version updates and permanent Android certificate rule.

Publication and per-platform verification status are recorded in `docs/release-status.json` and the handoff.

## 0.5.0 (2026-11-03)

### Platforms
- Windows: the supported, signed-update release (as before).
- macOS (Apple Silicon and Intel): a **test build** (unsigned, not notarized). It runs your notes, search, cards,
  AnkiConnect sync, AI providers and PC sync like Windows, keeps keys in the macOS Keychain, and checks for signed
  updates (it downloads and verifies the installer; you install it). Not a production release until it is signed
  with an Apple Developer ID.
- Android (phones and tablets): a **test build** (debug-signed, not on Google Play). Works offline on the phone with
  its own library; see Android below.

### Android
- Notes, search, collections, tags, version history and Basic/Cloze cards on the phone, offline, with autosave.
  Phone layout with bottom navigation; tablets show the list and the note side by side.
- Sync with your PCs: choose a shared folder with Android's folder picker (for example Documents/LocalMind-sync) and
  share it with your PCs using a maintained Syncthing-compatible app such as Syncthing-Fork (the original Syncthing
  app for Android is discontinued). Only small change files are synced, never the database.
- AnkiDroid: send approved Basic and Cloze cards to the "#LocalMind" deck in AnkiDroid; cards are updated in place
  later, never duplicated, and review history is kept. Image Occlusion cards are not sent to AnkiDroid yet (sync
  them to Anki from a PC).
- AI (optional): Google Gemini, OpenRouter or Anthropic with your own key, kept in the Android Keystore (never
  synced, never in backups). Free-only mode and consent work as on desktop. Sign in with ChatGPT, the OpenAI API key
  and LM Studio are desktop-only for now.
- Images (from the Photo Picker), a touch-friendly editor toolbar with Cloze, and the keyboard never covers the text.
- Backups: save a backup file wherever you choose and restore one (a copy of the current notes is kept first). Same
  format as desktop. Images are not in Android backups yet.

### Fixed
- Quitting with unsaved text and choosing "Keep editing" now really keeps LocalMind running: the window stays open
  and saving, sync and search keep working. (0.4.0 closed the local server first and then quit anyway.) Logging off
  or shutting down never waits on that question; the typed text is kept as a draft. Installing an update closes the
  windows first, and keeping your edits postpones the restart.
- Moving the sync folder on a PC to a new, empty folder: other devices joining from the new folder now receive the
  whole library (before, they could wait forever for earlier changes).

## 0.4.0 (2026-11-03)

### Added
- Resizable workspace: drag the dividers between the sidebar, note list, editor and note tools (keyboard:
  focus a divider and use the arrow keys; double-click resets it). Each panel can be hidden and shown
  (Ctrl+Shift+1/2/3), and the layout is remembered on each PC. On small windows the side panels fold away first.
- Focus Mode (Ctrl+Shift+F, Esc to leave): just the note, wider. Leaving it restores your previous layout.
- Split View (Ctrl+\): two notes side by side, or a note beside its flashcards, each with its own autosave
  and scrolling.

- Version history (History button in the editor): LocalMind keeps the text each editing session started from,
  plus the text right before a restore, a change from another PC or a conflict choice. You can preview a
  version, compare it with the current text, and restore it; restoring is a new edit, so newer history is kept.
  Versions record the PC they came from, sync between your PCs and are included in backups (backup format v5).
- A new note editor. Notes are still plain Markdown, now formatted as you type: headings, bold, italic,
  underline, highlight (`==text==`), bulleted, numbered and check lists with clickable checkboxes, tables,
  collapsible sections, and images (paste, drop or pick a file; stored on your PC, synced and backed up).
  A toolbar and shortcuts (Ctrl+B/I/U, Ctrl+Shift+H, Ctrl+Alt+1/2/3), an Outline of the note's headings, and
  collapsible heading sections. Undo/redo is per note.
- Cloze deletions while you write: select text and press Ctrl+Shift+C to make it `{{c1::…}}` (c2, c3… count up
  within the paragraph; Ctrl+Shift+Alt+C reuses the last number). The Cloze preview shows every review card the
  paragraph makes and lets you add hints. This only changes your note; creating the card is a separate step.
- Cards from selected text: a small toolbar above a selection and the right-click menu offer Basic card, Cloze
  card, cards with AI (about just that text) or a card written manually (Alt+Shift+B/C/G/M). Each card opens
  for editing first and is saved as a draft for your approval; nothing is sent to Anki until you sync.
- Your own Cloze note type, such as AnKing Overhaul (Settings → Anki → Preferred Cloze note type). LocalMind
  detects installed note types, maps your text and Extra to the right fields and leaves the rest for you. Cards
  then look and behave like your other AnKing cards. LocalMind never changes that note type (no new fields,
  templates, styling or scripts) and never edits notes it didn't create; its notes carry a `LocalMind::id::…`
  tag so they're found again. A preview renders cards with the note type's own template from your Anki.
  You can choose another deck too.
- Already-synced LocalMind Cloze cards stay as they are. Optionally you can move them: LocalMind shows which
  cards qualify, saves a backup, adds the id tags after you confirm, and you finish with Anki's own Change Note
  Type, which keeps review history.
- Card quality suggestions: each card shows advice when its question is vague, the answer is long, context is
  missing, it tests several facts, it duplicates another card, its cloze markup is broken, or its answer uses
  words that aren't in the note. These checks run locally. "Review with AI" asks your AI provider for a
  second opinion, only when you click it.
- Card status per note in the note list: card drafts, awaiting approval, ready to sync, in Anki, changed since
  sync, or a sync conflict. Sync results in Settings link back to each card's note.
- Flashcard generation preferences (Settings → Flashcard generation): card types (Basic/Cloze/both and the
  Cloze share), how many, difficulty, answer length, question style, context and explanations in Extra, and
  avoiding facts that already have cards. Each note can override them in its Flashcards window; the overrides
  sync with the note.
- Image Occlusion cards (Flashcards → Add Image Occlusion): pick, upload or paste an image, draw rectangle and
  ellipse masks, choose Hide All, Guess One or Hide One, Guess One, and preview each review card. They sync as
  notes of Anki's built-in Image Occlusion note type (Anki 23.10 or newer), with the image copied into Anki's
  media. See docs/IMAGE-OCCLUSION.md for what is and isn't supported.
- More AI providers (Settings → AI), next to your ChatGPT plan and OpenAI API key: Google Gemini API, OpenRouter,
  Anthropic Claude API, and LM Studio running on your PC. Each shows how it's paid for, its privacy terms, model
  list with price status, a connection test, and usage where the provider offers it. Keys are stored encrypted
  on this PC only (never synced, backed up or shown again). Before notes go to Gemini, OpenRouter or Claude for
  the first time you review the provider's privacy notice and agree. Notes are never organized automatically
  with an unpaid provider. Changing provider never sends or reprocesses notes.
- Strict Free-only mode: only requests verified as free are sent (OpenRouter models whose current price is 0,
  with a guard that stops OpenRouter from routing to a paid endpoint; LM Studio; ChatGPT plan usage). Anything
  that can't be verified, such as Gemini (Google's API doesn't show whether billing is on), is refused.
  LocalMind never falls back to a paid model.
- Better search: matched words are highlighted in titles and excerpts; notes filed under a matching collection
  or tag appear too (with "Matches collection: …"); results are ranked by relevance with a boost when all words
  are in the title; accents are ignored. Enter in the search box opens the top result, ↓ moves into the list.

### Fixed
- Long note titles were cut off in the editor. Titles now wrap fully, including very long words, at any window
  size and zoom level. Lists, search results, favorites, related notes and dialogs show up to two lines and the
  full title on hover.

## 0.3.0 (2026-11-02)

### Added
- Sync between your PCs (Settings → Sync between your PCs). Each PC keeps its own library; changes travel as
  small files through a folder that Syncthing shares between your PCs.
  - Conflicting edits are kept and shown with clear choices: keep this PC's version, keep the other's, keep
    both, or merge manually. A note deleted on one PC while edited on the other is never lost.
  - Sign-ins, API keys and Anki connection data never sync.
  - A sync status indicator sits in the sidebar. Setup guide: docs/SYNC-SETUP.md.
- Public binary releases in MohammadAliKid/LocalMind-releases (installer, signed update feed, checksums);
  automatic updates now find new versions there.
- New README, user guide, issue templates, contributing and security policy.
- An encrypted offline backup tool for the update signing key, and a one-command release script that audits
  and verifies a release before publishing it (maintainers).

### Changed
- Database schema v7 (sync bookkeeping; reversible). Existing data is unchanged.

## 0.2.0 (2026-11-02)

### Added
- Light, Dark and Follow Windows themes (Settings → Appearance).
- Folders for collections: create, rename, remove (collections and notes stay) and collapse. Move a collection
  with its ⋯ menu; collections can also be renamed in place.
- The Tags section is collapsible (collapsed by default) and searchable. Long collection lists get a filter.
- Search shows tag filters for the matching notes.
- Favorites (star a note) and Recently opened views.
- Redesigned sidebar: Settings is always visible at the bottom, and the middle scrolls on its own.
- Quick Capture: a global shortcut (default Ctrl+Shift+N, configurable in Settings) opens a small window that
  saves to the Inbox, even when LocalMind is minimized. If another program already uses the shortcut, Settings
  says so; LocalMind doesn't take it over. Alt+Shift+N inside the app.
- Command palette (Ctrl+K): search notes, jump to views, collections and tags, run actions.
- Inbox count in the sidebar.
- Bulk actions: select notes (Ctrl/Shift+click, Space, Ctrl+A) to tag, file, move, star, organize with AI or
  delete them together.
- Keyboard navigation in the note list (↑/↓, j/k, Enter to edit, Esc to clear the selection).
- Automatic local backups (Settings → Backup and restore): every hour, day (default) or week, skipped when
  nothing changed. The newest 7 are kept, plus one a day for 2 weeks and one a week for 2 months. Settings
  shows the location and the last result, and has Back up now and Restore. Backups never include your API key
  or ChatGPT sign-in, and are never uploaded.
- Automatic updates (installed app): Settings → Updates checks for new versions and shows the release notes.
  Download update and Restart to update need a click. Updates are verified against LocalMind's signature and
  file hashes before installing, older versions are never installed, and a backup is taken before restarting.
  (Publishing releases is set up separately; see docs/RELEASING.md.)
- GitHub Actions CI: typecheck, tests and a Windows installer build.
- Browser regression suite in the repository (`npm run e2e`).

### Changed
- Database schema v6 (reversible). An existing database is snapshotted before it is upgraded.
- Backup format v4 (adds folders and favorites). Older backups still restore.

## 0.1.0 (2026-11-02)
- First release: local notes, AI organization (API key or ChatGPT plan), related notes, Basic and Cloze
  flashcards with #LocalMind Anki sync, backup and restore, Windows installer.
