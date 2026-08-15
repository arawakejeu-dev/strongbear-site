// This project can also be exported as static HTML for conventional hosting.
// The D1 helper is not bundled in that mode, but TypeScript still validates
// every source file. Keep the Cloudflare runtime binding typed without making
// Hostinger's static build depend on a Cloudflare-only package.
declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
    [binding: string]: unknown;
  };
}
