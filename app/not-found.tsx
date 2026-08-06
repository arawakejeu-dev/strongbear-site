import type { Metadata } from "next";
import { ButtonLink, Container, Footer, Header } from "./components";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <>
    <Header />
    <main className="not-found" id="contenu"><Container><p className="eyebrow eyebrow-inverse">Erreur 404</p><h1>Cette page<br />n’existe pas.</h1><p>Retrouvez les disciplines, le programme Kids et les guides de la Strongbear Academy.</p><div><ButtonLink href="/" variant="primary">Revenir à l’accueil</ButtonLink><ButtonLink href="/academy">Explorer l’Academy</ButtonLink></div></Container></main>
    <Footer />
  </>;
}
