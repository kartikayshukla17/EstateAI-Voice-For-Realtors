import { Form, Link, NavLink } from "react-router";
import type { SessionUser } from "~/lib/auth/require-user.server";

export function PortalNav({ user }: { user: SessionUser }) {
  return (
    <header className="nav">
      <Link to="/demo" className="nav__mark">
        EstateAI
      </Link>
      <div className="nav__right">
        {/* NavLink sets aria-current="page" automatically when active — app.css
            styles .nav__link[aria-current="page"] off that, no extra prop needed. */}
        <NavLink className="nav__link" to="/dashboard">
          Call history
        </NavLink>
        <span className="nav__user">{user.email}</span>
        <Form method="post" action="/logout">
          <button type="submit" className="btn btn--sm btn--ghost">
            Sign out
          </button>
        </Form>
      </div>
    </header>
  );
}
