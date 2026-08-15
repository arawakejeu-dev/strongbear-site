import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// The static export uses physical folders for each public route. This keeps
// clean URLs working on Hostinger's standard Apache hosting.
const rules = `Options -MultiViews
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Permanent redirects for URLs indexed by the previous Strongbear website.
  # These rules run before physical-folder checks, so they also work when the
  # static export contains a fallback page for GitHub Pages.
  RewriteRule ^jiu-jitsu-bresilien/?$ /jiu-jitsu-bresilien-marines [R=301,L,NE]
  RewriteRule ^jiu-jitsu/?$ /jiu-jitsu-bresilien-marines [R=301,L,NE]
  RewriteRule ^cours-de-jiu-jitsu-bresilien/?$ /jiu-jitsu-bresilien-marines [R=301,L,NE]
  RewriteRule ^cours-darts-martiaux-a-marines/?$ / [R=301,L,NE]
  RewriteRule ^cours-de-mma/?$ /mma-marines [R=301,L,NE]
  RewriteRule ^grappling/?$ /grappling-marines [R=301,L,NE]
  RewriteRule ^mma/?$ /mma-marines [R=301,L,NE]
  RewriteRule ^a-propos/?$ /#strongbear [R=301,L,NE]
  RewriteRule ^contact/?$ /#contact [R=301,L,NE]

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^ %{REQUEST_URI}.html [L]
</IfModule>
`;

await writeFile(resolve("out", ".htaccess"), rules);
