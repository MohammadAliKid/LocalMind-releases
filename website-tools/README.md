# LocalMind public website

Static HTML/CSS, images and public documentation only. Application source and credentials remain in the separate private repository. No site dependencies, analytics, remote fonts or runtime backend are required.

Publish this **public** repository with GitHub Pages: branch `main`, folder `/docs`, branch-based deployment. `.nojekyll` keeps the site static. No paid runner or storage upgrade is required.

Current URLs:

- Homepage: https://mohammadalikid.github.io/LocalMind-releases/
- Privacy: https://mohammadalikid.github.io/LocalMind-releases/privacy/
- Terms: https://mohammadalikid.github.io/LocalMind-releases/terms/

The download links name the actual public versions. Update them only after new binaries are published and verified. Keep the affected macOS notice until repaired packages pass genuine macOS validation.

## Google branding and ownership

Use app name **LocalMind**, a support email you control, and the exact live homepage/privacy/terms URLs above. A PNG logo suitable for the branding form is `docs/assets/logo-120.png`.

GitHub Pages hosting is free, but it does not give you DNS control over `github.io` or your default Pages hostname. Google's current domain-verification guidance calls for a **Domain property verified through DNS**, not only URL-prefix verification. Do not claim this site is Google-approved or that a Pages URL automatically satisfies that requirement.

The hostname corresponding to this site is `mohammadalikid.github.io`, not `github.io`. Google may accept that value in an input field without ownership being verified. If the branding review requires DNS verification, use a domain you actually control, or obtain explicit guidance from Google's review team. Never enter an unowned domain.

You may use Search Console's URL-prefix HTML-file/meta-tag method to verify this particular hosted site for supported purposes. That does not supply DNS ownership of the hostname, and must not be represented as completion of Google's stricter branding-domain step.

Official references:

- [Google domain verification](https://support.google.com/cloud/answer/13804266)
- [Google brand verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification)
- [Search Console ownership methods](https://support.google.com/webmasters/answer/9008080)

## Optional future custom domain

No custom domain is assumed to be owned. No CNAME or DNS change is included in this configuration. Enter only a domain the owner actually controls.

Only after the owner obtains or confirms control of a domain:

1. Verify it in GitHub account Settings → Pages using GitHub's supplied TXT record, then select it in this repository's Pages settings.
2. For an apex domain, configure the registrar/DNS provider's four GitHub Pages A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. For `www`, a CNAME can point to `mohammadalikid.github.io` (no repository path). Preserve unrelated email and verification records; do not add a wildcard.
3. Wait for DNS and GitHub HTTPS certificate provisioning. Enable Enforce HTTPS when available.
4. Run `node website-tools/configure.mjs https://YOUR-OWNED-DOMAIN/` to update canonical URLs, the sitemap and policy pointer. This command does not buy a domain, write a CNAME, change DNS or modify OAuth clients.
5. In Search Console, add the owned Domain property with the Google account that owns/edits the OAuth project. Publish Google's provided TXT record and verify it.
6. Update Google Branding with the new HTTPS homepage, `/privacy/`, `/terms/`, and the owned top private domain, without protocol or path. Keep the existing Desktop/Android OAuth client IDs and Android signing identity.

[GitHub custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
