import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  route("api/auth/*", "routes/api/auth.ts"),
  route("api/webhooks/post-call", "routes/api/webhooks/post-call.ts"),

  layout("routes/marketing/layout.tsx", [
    index("routes/marketing/home.tsx"),
    route("login", "routes/marketing/login.tsx"),
    route("login/verify", "routes/marketing/login-verify.tsx"),
  ]),

  layout("routes/portal/layout.tsx", [
    route("demo", "routes/portal/demo.tsx"),
    route("dashboard", "routes/portal/dashboard.tsx"),
    route("calls/:callId", "routes/portal/call-detail.tsx"),
  ]),

  route("logout", "routes/portal/logout.tsx"),
] satisfies RouteConfig;
