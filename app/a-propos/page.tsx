import { LegacyRedirect, legacyRedirectMetadata } from "../legacy-redirect";

const target = "/#strongbear";
export const metadata = legacyRedirectMetadata(target);
export default function Page() { return <LegacyRedirect target={target} />; }
