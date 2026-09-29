import { Link } from "react-router";

export function MarketingNav({ ctaHref = "/login" }: { ctaHref?: string }) {
  return (
    <header className="nav">
      <Link to="/" className="nav__mark">
        EstateAI
      </Link>
      <div className="nav__right">
        <a className="nav__link" href="#how-it-works">
          How it works
        </a>
        <Link className="btn btn--sm" to={ctaHref}>
          Talk to the agent
        </Link>
      </div>
    </header>
  );
}
