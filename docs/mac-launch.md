# Mac launch issue — affected downloads

The macOS 0.5.0 downloads retained in the 0.5.1 and 0.5.2 releases are under investigation. Please defer installing
these Mac packages until corrected downloads are published. Windows 0.5.1 and Android 0.5.2 are unaffected.
Existing immutable release assets and tags are preserved; there are no corrected Mac download links yet.

The Apple Silicon DMG contains an invalid resource seal: two required sealed files are absent and the sealed icon
hash differs from the actual icon. Intel's bundle lacks the outer resource seal and is unsigned; the same specific
Apple Silicon defect has not been established for Intel. Both require genuine macOS final-DMG verification.

Both public DMG hashes match the original CI artifacts. A checksum match proves provenance, not that a signature
is valid. The original CI launched intermediate packages; that did not prove the downloaded, installed DMG passed
macOS signature validation or Gatekeeper. Corrected builds must pass those separate checks.

Do not disable Gatekeeper globally, remove quarantine attributes, or recursively re-sign the app yourself. These
steps do not repair the release process. A valid ad-hoc signature checks bundle integrity but does not establish a
trusted Developer ID or notarization. LocalMind currently has no Developer ID credentials, so a corrected ad-hoc
build may still be rejected by Gatekeeper. A seamless standard download/open experience requires Developer ID
signing and Apple notarization; this repair cannot promise to bypass that requirement.

If reporting an affected installation, provide the Mac architecture, macOS version, LocalMind download filename,
and the output of these read-only diagnostics (adjust the application path if needed):

```sh
codesign --verify --deep --strict --verbose=2 /Applications/LocalMind.app
codesign -d --verbose=4 /Applications/LocalMind.app
spctl --assess --type execute --verbose=4 /Applications/LocalMind.app
```

Do not share notes, credentials, keychains or personal files. Physical-Mac reproduction and corrected-build tests
have not yet been performed by the maintainer for this incident. This page will be updated with actual results.
