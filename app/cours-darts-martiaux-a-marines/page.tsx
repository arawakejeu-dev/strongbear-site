import { LegacyRedirect, legacyRedirectMetadata } from "../legacy-redirect";

const target = "/";
export const metadata = legacyRedirectMetadata(target);
export default function Page() { return <LegacyRedirect target={target} />; }
