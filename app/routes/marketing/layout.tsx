import { Outlet } from "react-router";
import { MarketingNav } from "~/components/chrome/marketing-nav";
import { SiteFooter } from "~/components/chrome/site-footer";
import { AmbientBackdrop } from "~/components/chrome/ambient-backdrop";

export default function MarketingLayout() {
  return (
    <>
      <AmbientBackdrop />
      <MarketingNav />
      <Outlet />
      <SiteFooter />
    </>
  );
}
