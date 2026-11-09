# Sync LocalMind between two Windows PCs (Syncthing)

LocalMind keeps a complete copy of your library on each PC. When you change something on one PC, LocalMind
writes the change as a small file into a **sync folder**. [Syncthing](https://syncthing.net) copies that folder
between your PCs directly, encrypted while it travels. The other PC's LocalMind reads the new files and applies
the changes to its own database.

You need: LocalMind 0.3.0 or later on both PCs, and Syncthing on both PCs. Syncthing is free and open source.
LocalMind does not install or configure Syncthing for you.

Using Google Drive instead, or syncing with Android? See the [sync help and pairing-code guide](https://mohammadalikid.github.io/LocalMind-releases/help/drive-sync.html).
On Android 0.6.8 and later, **Stop syncing** and **Turn off sync** always respond, even if the shared folder stops
responding; they control LocalMind only, not the Syncthing app.

## PC 1 (the PC that already has your notes)

1. **Install Syncthing.** Download it from <https://syncthing.net/downloads/> (the Windows setup), or install
   *SyncTrayzor*, a Windows tray app that bundles Syncthing. Start it. Its control page opens in your browser at
   `http://127.0.0.1:8384`.
2. **Make a sync folder,** for example `C:\Users\<you>\LocalMind Sync`. Keep it outside OneDrive or Dropbox,
   and don't use LocalMind's own data folder.
3. **Turn on sync in LocalMind:** open *Settings → Sync between your PCs*. Choose the folder (*Browse…*), give
   this PC a name such as "Desk", and click **Turn on sync**. LocalMind writes your library into the folder.
4. **Share the folder in Syncthing:** click **Add Folder**, set *Folder Path* to the same folder and a label
   such as "LocalMind Sync". Leave it open; you'll share it with PC 2 in a moment.

## PC 2 (for example your laptop)

5. **Install Syncthing and LocalMind** ([`LocalMind-Setup.exe`](https://github.com/MohammadAliKid/LocalMind-releases/releases/latest/download/LocalMind-Setup.exe)).
6. **Connect the two Syncthing installations:**
   - On PC 2, open Syncthing → *Actions → Show ID* and copy the device ID.
   - On PC 1, click **Add Remote Device** in Syncthing and paste that ID.
   - On PC 2, accept the connection request.
7. **Share the folder:**
   - On PC 1, edit the "LocalMind Sync" folder → *Sharing* → tick PC 2 → Save.
   - On PC 2, accept the folder when Syncthing offers it, and choose where to keep it (e.g.
     `C:\Users\<you>\LocalMind Sync`).
   - Wait until Syncthing shows it as *Up to Date*.
8. **Turn on sync in LocalMind on PC 2:** *Settings → Sync between your PCs*. Choose that folder, name this PC
   (e.g. "Laptop") and click **Turn on sync**. Your library appears within a few seconds. If PC 2 already had
   notes, they are merged in; nothing is deleted.
9. **Sign in on PC 2:** sign in to ChatGPT (or enter your API key) separately. Sign-ins, API keys and Anki
   connection details never sync.

That's it. From now on, changes appear on the other PC whenever both are on and connected. The sidebar shows
the sync status ("Synced 2 min ago", "Sync paused", "1 sync conflict").

## When both PCs changed the same note

If you edit the same note on both PCs before they could sync (for example, offline on the laptop), LocalMind
keeps **both versions** and shows a conflict. Click the sidebar notice (or *Settings → Sync → Resolve
conflicts*) and choose one of these:

- **Keep this PC's version** or **Keep the other PC's version**.
- **Keep both as separate notes:** the other version becomes a new note called "… (from Laptop)".
- **Merge manually:** both texts are shown in one editor; combine them and save.

If one PC deleted a note while the other edited it, the note is kept, never silently lost. You decide whether
to keep it or delete it. Whatever you choose is synced, and the other PC then shows the same result.

## Anki on two PCs

Each flashcard has a permanent ID (NoteUID) that travels with it. If you sync Anki itself through AnkiWeb,
LocalMind on the second PC finds the existing Anki note by that ID instead of adding a duplicate. If the Anki
note differs from what LocalMind expects, LocalMind asks before changing it (*Choose a version*), as it does
after restoring a backup. Review history is never reset. You can also choose to send cards to Anki from one PC
only.

Tip: let Anki finish syncing with AnkiWeb before you send new cards from your second PC. If both PCs add the
same new card to two separate Anki collections before AnkiWeb merges them, AnkiWeb ends up with two copies.
LocalMind then reports a conflict and changes neither copy, so you can delete the extra one in Anki.

## Privacy

- Syncthing encrypts the connection between your PCs (TLS) and doesn't route your files through a company's
  servers. Relays only pass along encrypted data.
- **The sync folder itself is not encrypted:** your notes are readable files in it on each PC, just as they're
  readable in LocalMind's database. Protect your Windows account and consider BitLocker.
- Don't point the sync folder at a cloud drive or a computer you don't control. If you must use an untrusted
  device in between, add Syncthing's *untrusted (encrypted) device* feature for that device, which stores only
  encrypted data there. LocalMind doesn't encrypt the files itself.
- Never in the sync folder: databases, API keys, ChatGPT sign-ins, Anki connection data, logs, backups or
  settings.

## Troubleshooting

| What you see | What to do |
|---|---|
| "None seen yet" under *Other PCs* | Syncthing hasn't shared the folder yet, or the other PC hasn't turned on sync. Check that Syncthing says *Up to Date* on both PCs. |
| "Sync problem: … damaged or incomplete" | A file didn't arrive completely. Syncthing usually repairs this by itself; LocalMind retries every few seconds and never applies a damaged file. |
| "waiting for earlier changes from another PC" | Some files from a third PC haven't arrived yet. They apply automatically once they do. |
| "Another PC in this sync folder uses the same device ID" | You copied LocalMind's config folder from one PC to another. Delete `%LOCALAPPDATA%\LocalMind\config\device.json` on one PC (LocalMind makes a new one), then turn sync on again. |
| Changes seem missing | *Settings → Sync → Advanced → Re-read all changes*. Nothing is duplicated. |

Pause sync (*Settings → Sync → Pause*) when you don't want changes sent or received for a while. Changes made
meanwhile are sent when you resume.

## Mac and Android

Each device keeps its own SQLite library. Share only the chosen LocalMind sync folder through Syncthing or a
maintained compatible client; never synchronize an active SQLite database. On Android, create a shared folder such
as Documents/LocalMind-sync, choose it in LocalMind Settings → Sync, and grant the system folder permission. Share
the same folder with the PC/Mac sync folder. Credentials are entered separately on each device and never synced.

Android 0.5.2 transfers referenced images separately from the small journal files, verifies their content hashes
and reuses existing files. Foreground sync runs on opening/resuming the app and periodically while it remains open.
The status sheet distinguishes local save, pending, paused, error and conflict states. “Folder updated” confirms
the chosen folder was written; it does not confirm another device received the changes. After a storage failure,
restore folder access and retry: original operation IDs are reused. Pause stops at file boundaries.

Same-certificate Android updates preserve persisted folder permission and sync identity. After migrating from a
debug installation by uninstalling, choose the folder again. Before uninstalling, export a backup: uninstall deletes
app data. Android 0.5.2 backups include referenced images; older phone backups may require preserving those files
separately. On Mac, replacing the application in Applications preserves the library under
Library/Application Support/LocalMind. Concurrent edits are kept for your choice, not silently overwritten.
