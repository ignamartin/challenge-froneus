import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@front/campaign-dashboard",
  app: () =>
    import(
      /* webpackIgnore: true */ // @ts-ignore-next
      "@front/campaign-dashboard"
    ),
  activeWhen: ["/"],
});

registerApplication({
  name: "@front/campaign-manager",
  app: () =>
    import(
      /* webpackIgnore: true */ // @ts-ignore-next
      "@front/campaign-manager"
    ),
  activeWhen: ["/campaign"],
});

start({
  urlRerouteOnly: true,
});
