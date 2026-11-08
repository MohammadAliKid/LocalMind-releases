<p align="center"><img src="images/logo.svg" width="96" height="96" alt="LocalMind — a brain opening like a book"></p>

# LocalMind

**Your notes. Connected.** A local-first workspace for notes, learning and memory on Windows and Android.

[Website](https://mohammadalikid.github.io/LocalMind-releases/) · [Downloads](https://github.com/MohammadAliKid/LocalMind-releases/releases/latest)
· [Privacy](https://mohammadalikid.github.io/LocalMind-releases/privacy/) · [Terms](https://mohammadalikid.github.io/LocalMind-releases/terms/)



**Branding preview:** Open volume is the owner-selected identity. v0.6.7 has not been published; the download links below
still point to the actual released versions. No new Mac build is included.

![LocalMind Windows workspace with synthetic notes](images/main-light.png)

## Downloads and platform status

| Platform | Published download | Branding candidate |
|---|---|---|
| Windows 10/11 x64 | [0.6.6 installer](https://github.com/MohammadAliKid/LocalMind-releases/releases/download/v0.6.6/LocalMind-Setup.exe) | 0.6.7 prepared; not public |
| Android 7+ | [0.6.1 / code13 APK](https://github.com/MohammadAliKid/LocalMind-releases/releases/download/v0.6.1/LocalMind-Android-0.6.1.apk) | 0.6.7 / code14 prepared; not public |
| macOS | Affected 0.5.0 only; **defer installation** | Icon source only; repair reserved for 0.7.0 |

Windows installers are **not Authenticode-signed**. Update feeds retain the existing Ed25519 identity.
Android retains its permanent signing certificate and package ID; install updates over the existing app to preserve data.
For APK installation, allow installs from the app/browser only when Android asks. AnkiDroid is installed separately.

Existing Mac downloads are unchanged: [Apple Silicon](https://github.com/MohammadAliKid/LocalMind-releases/releases/download/v0.5.1/LocalMind-0.5.0-mac-arm64.dmg)
has an invalid resource seal; [Intel](https://github.com/MohammadAliKid/LocalMind-releases/releases/download/v0.5.1/LocalMind-0.5.0-mac-x64.dmg)
is unsigned. Neither is called production-ready. Do not work around Gatekeeper based on this branding preview.

Current published SHA-256 values (candidate hashes are recorded separately):

| Published file | SHA-256 |
|---|---|
| LocalMind-Setup.exe (0.6.6) | `61365d8ba10dacd8284b9e9608f881f4fee6a6e8e3ed9ad9e84804f5fc3c9c0e` |
| LocalMind-Android-0.6.1.apk | `650728e6742aa43d4cff98bd9aaea3d826b16a6a086298b869eb60ee7e331e46` |
| LocalMind-0.5.0-mac-arm64.dmg | `27e671603cbfbbadaaf6456d491dc6d23c3899ee64cdac5c16bb82de2f7c247a` |
| LocalMind-0.5.0-mac-x64.dmg | `d213ba27e67c957c85753e74e3a6597f9de759beea9af73d87b2973d51fcb097` |
## A local library for what you learn

- **Write and find.** Markdown, images, checklists, autosave, history, favorites, collections, tags and local full-text search.
- **Organize with control.** Optional AI suggests titles, tags and filing. Manual choices win; source text stays yours.
  New collections and generated cards require your approval. Related notes are discovered locally.
- **Study and remember.** Study Mode, editable Basic/Cloze cards, and safe synchronization to the default
  Anki deck **`#LocalMind`**. Permanent card identities prevent retry duplicates. Android integrates with AnkiDroid.
- **Connect your devices.** Encrypted, app-private Google Drive sync and optional shared-folder sync with Syncthing.
  Each device keeps its own database; conflicting edits are kept. Image-inclusive backups support recovery.
- **Choose your AI.** Bring your own provider or work without AI. No LocalMind subscription is required;
  optional providers may charge or require subscriptions.
- **Windows 0.6.6 features preserved.** Awaiting approval across your library, Stop generating, and Report a Bug /
  Request a Feature with an exact preview before sending. Feedback reaches the developer's private tracker.

## Optional AI and its limits

| Provider | Cost / limits | Windows | Android |
|---|---|---|---|
| ChatGPT sign-in | Your subscription and plan limits; preview eligibility applies | Yes | Not available |
| OpenAI API key | Separate usage billing; ChatGPT subscription does not include API credits | Yes | Not available |
| Google Gemini | Model/account-dependent free tier or paid usage; free-tier privacy differs | Yes | Yes |
| OpenRouter | Provider-verified free models or paid usage | Yes | Yes |
| Anthropic API | Separate paid API usage | Yes | Yes |
| LM Studio | Local model on your PC; hardware requirements apply | Yes | Not available |

Free-only mode refuses a model when its current free status cannot be verified. Gemini catalog/account limits vary;
unverified billing is not treated as free. Notes are sent only to the provider you explicitly choose, after consent.

## Sync, backups and privacy

Notes, attachments, search and collections live on your device. No LocalMind account or hosted notes database is required.
AI keys and sign-ins are protected by the operating system and excluded from backups and synchronization.

For Google Drive, sign in from Settings → Sync, create an encrypted library, then pair another device using its
recovery code. Keep that code safe. LocalMind requests only `drive.appdata`; it cannot browse your other Drive files.
Google branding approval is not claimed. Disconnecting keeps local notes.

Syncthing/shared-folder sync remains available under Advanced. It exchanges journal files, never a live SQLite database.
The shared-folder files themselves are readable on each device; Syncthing encrypts their transport. Keep regular backups;
an export contains your note content and images, so store it privately.

<p><img src="images/approvals-desktop.png" width="450" alt="Windows Awaiting approval with synthetic flashcards"> <img src="images/v061-drive-android.png" width="200" alt="Android encrypted Google Drive settings"></p>

## Install and update

Download only from this repository's [official releases](https://github.com/MohammadAliKid/LocalMind-releases/releases).
Windows installs per user and offers signed in-app updates; the installer itself is unsigned. Android verifies the
permanent release certificate when updating. Keep the installed application in place when upgrading; uninstalling
an Android app removes its private local data. Export a backup before switching devices.

## Shortcuts

| Windows | Action |
|---|---|
| Ctrl+K | Command palette |
| Alt+N | New note |
| Ctrl+Shift+N | Global Quick Capture |
| Ctrl+Shift+F | Focus Mode; Escape leaves |
| Ctrl+\ | Split View |
| Ctrl+B / I / U | Bold / italic / underline |
| Ctrl+Shift+C | Next Cloze deletion |
| Ctrl+Shift+Alt+C | Same Cloze number |

Android uses touch controls, selection gestures and native text-sharing actions. Mac shortcut presentation is prepared
in source; native execution still needs genuine Mac validation.
## Support and known limitations

Use **Settings → Feedback** in Windows 0.6.6 to report a bug or request a feature. Review the payload before Submit;
only your text and app/OS metadata are sent, with sensitive-looking text redacted. Notes, cards and images are excluded.
Delivery can be temporarily unavailable; unsent drafts are kept. Private source and operational details stay private.

Windows remains unsigned by Authenticode. Android evidence uses disposable emulators; physical-device coverage is limited.
Some AI providers and ChatGPT-plan eligibility vary by account and region. Free-only mode may disable unverified models.
Mac signing repair and genuine Apple Silicon execution remain future **0.7.0**; draft PR #7 is separate and paused.

## Links and release history

- [Official website](https://mohammadalikid.github.io/LocalMind-releases/)
- [Privacy policy](https://mohammadalikid.github.io/LocalMind-releases/privacy/) · [Terms](https://mohammadalikid.github.io/LocalMind-releases/terms/)
- [Changelog](CHANGELOG.md) · [All releases](https://github.com/MohammadAliKid/LocalMind-releases/releases)
- [Sync setup](docs/sync.md)

This repository hosts official binaries and public documentation. LocalMind source and credentials are not published here.
