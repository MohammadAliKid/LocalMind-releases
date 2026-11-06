# Verifying LocalMind downloads

There are two different kinds of signatures, so it helps to keep them apart:

- **Windows code signing (Authenticode)** is what SmartScreen checks. LocalMind's installer is **not**
  Authenticode-signed yet, so Windows may warn that the app is unrecognized.
- **LocalMind's update signature (Ed25519)** protects automatic updates. Each release includes
  `latest.json`, which lists the version and the SHA-256 of every update file, and `latest.json.sig`, an
  Ed25519 signature over `latest.json`. The app has the public key built in and refuses updates that don't
  verify, aren't newer than the installed version, or don't match their hashes.

## 1. Check the installer's SHA-256 (PowerShell)

```powershell
Get-FileHash .\LocalMind-Setup.exe -Algorithm SHA256
```

Compare the result with the `LocalMind-Setup.exe` line in `SHA256SUMS.txt` on the same release page.

## 2. Check the update manifest's signature (optional, needs OpenSSL 3)

Download `latest.json` and `latest.json.sig` from the release, plus
[`localmind-update-public-key.pem`](../localmind-update-public-key.pem) from this repository. Then:

```powershell
certutil -f -decode latest.json.sig latest.json.sig.bin
openssl pkeyutl -verify -pubin -inkey localmind-update-public-key.pem -rawin -in latest.json -sigfile latest.json.sig.bin
```

`Signature Verified Successfully` means the manifest was signed by LocalMind's release key. The hashes inside
`latest.json` then vouch for `RELEASES` and the `.nupkg` update package (check them with `Get-FileHash`).

The public key is:

```
-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAKc/j/kvBkKz2qInN2bTiAGTi3kWahXZbEKsrRTLJIOw=
-----END PUBLIC KEY-----
```

## What each release contains

| File | Purpose |
|---|---|
| `LocalMind-Setup.exe` | Installer for new installs (or a manual update) |
| `LocalMindApp-x.y.z-full.nupkg` | Update package used by the built-in updater |
| `RELEASES` | Squirrel.Windows index of the update package |
| `latest.json`, `latest.json.sig` | Signed update manifest checked by the app |
| `SHA256SUMS.txt` | SHA-256 of every file above |

## Android release identity

The GitHub APK is signed with LocalMind's permanent Android release certificate.
SHA-256: `91c92f7cd107dfc977661f0497b2954bfcb5d789f52dcb7f12e022bfcb61bd75`.

Use the official Android SDK tool `apksigner verify --print-certs LocalMind-Android-0.5.4.apk` to inspect it. Compare the
APK's SHA-256 with SHA256SUMS.txt on the release page. In-app updates also verify the Ed25519 metadata signature,
APK hash, package ID, both versions and the trusted Android certificate before opening Android's system installer.
Installation needs your approval. Never install a debug APK over a release installation.

Mac downloads are not Developer ID signed or notarized. Verify hashes and follow [Apple's installation guidance](https://support.apple.com/102445). A signed update manifest authenticates the download independently of Apple's code signing.
