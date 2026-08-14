import { LegacyRedirect, legacyRedirectMetadata } from "../legacy-redirect";

const target = "/jiu-jitsu-bresilien-marines";
export const metadata = legacyRedirectMetadata(target);
export default function Page() { return <LegacyRedirect target={target} />; }
