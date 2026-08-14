import type { Metadata } from "next";

export function legacyRedirectMetadata(target: string): Metadata {
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: target },
  };
}

/**
 * Static fallback for URLs indexed by the previous website. GitHub Pages does
 * not offer server-side HTTP redirects, so these pages redirect before any
 * visible content is shown while retaining a usable link without JavaScript.
 */
export function LegacyRedirect({ target }: { target: string }) {
  return (
    <main>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)});` }} />
      <p>
        Cette page a changé d’adresse. <a href={target}>Continuer vers Strongbear</a>.
      </p>
    </main>
  );
}
