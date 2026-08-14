import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// The static export uses physical folders for each public route. This keeps
// clean URLs working on Hostinger's standard Apache hosting.
const rules = `Options -MultiViews
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^ %{REQUEST_URI}.html [L]
</IfModule>
`;

await writeFile(resolve("out", ".htaccess"), rules);
