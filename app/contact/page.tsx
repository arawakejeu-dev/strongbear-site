import { LegacyRedirect, legacyRedirectMetadata } from "../legacy-redirect";

const target = "/#contact";
export const metadata = legacyRedirectMetadata(target);
export default function Page() { return <LegacyRedirect target={target} />; }
