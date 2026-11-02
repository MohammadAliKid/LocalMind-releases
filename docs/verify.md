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
