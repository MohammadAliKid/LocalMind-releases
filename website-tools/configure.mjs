// Public static-site utility only; no private application source or credentials.
// node website-tools/configure.mjs [https://your-owned-domain.example/]
// Changes canonical URLs, NOT DNS, GitHub settings, OAuth clients or signing identities.
import fs from 'node:fs';
const base = new URL(process.argv[2] ?? 'https://mohammadalikid.github.io/LocalMind-releases/');
if (base.protocol !== 'https:' || base.search || base.hash || base.username || base.password) throw Error('Use an HTTPS site root without credentials, query or fragment.');
if (!base.pathname.endsWith('/')) base.pathname += '/';
for (const [file, suffix] of [['index.html',''], ['privacy/index.html','privacy/'], ['terms/index.html','terms/']]) {
  const p='docs/'+file;let html=fs.readFileSync(p,'utf8');
  html=html.replace(/(<link rel="canonical" href=")[^"]+/, '$1'+new URL(suffix,base).href);
  html=html.replace(/(<meta property="og:url" content=")[^"]+/, '$1'+new URL(suffix,base).href);
  fs.writeFileSync(p,html);
}
fs.writeFileSync('docs/robots.txt','User-agent: *\nAllow: /\nSitemap: '+new URL('sitemap.xml',base).href+'\n');
fs.writeFileSync('docs/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','privacy/','terms/'].map(p=>'<url><loc>'+new URL(p,base).href+'</loc></url>').join('')+'</urlset>\n');
fs.writeFileSync('docs/privacy.md',`# LocalMind Privacy Policy

Read the current [Privacy Policy](${new URL('privacy/',base).href}), also linked from the public website and the upcoming Drive connection panel.

The policy covers local storage, optional encrypted Google Drive sync, OAuth, protected credentials, readable Syncthing folders and exports, OS backups, optional AI providers, other integrations, and retention/deletion limits.

Deleting a note does not securely erase historical journals or backups. Disconnecting Drive keeps remote encrypted data. Separate OS backups and ordinary exports are not protected by Drive encryption. AI provider handling depends on the selected service and account.

Current public Windows/Android downloads are v0.6.0. Drive connection controls are being validated for v0.6.1 and are not yet publicly released. Application source remains private.
`);
console.log('Static canonical URLs configured for '+base.href+'. No DNS configuration changed.');
