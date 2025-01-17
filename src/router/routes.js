const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/main/HomePage.vue") },
      { path: "/home", component: () => import("pages/main/HomePage.vue") },
      { path: "/cards", component: () => import("pages/main/CardsPage.vue") },
      {
        path: "/add-card",
        component: () => import("pages/main/AddCardPage.vue"),
      },
      {
        path: "/settings",
        component: () => import("pages/main/SettingsPage.vue"),
      },
      { path: "/user", component: () => import("pages/main/UserPage.vue") },
      {
        path: "/search-result",
        name: "search-result",
        component: () => import("pages/SearchResultPage.vue"),
      },
      {
        path: "/card/:id",
        name: "card",
        component: () => import("pages/CardPage.vue"),
      },
      {
        path: "/card-temp",
        component: () => import("pages/main/CardTemp.vue"),
      },
      {
        path: "/result",
        component: () => import("pages/ResultPage.vue"),
      },
      {
        path: "/register",
        component: () => import("pages/main/RegisterPage.vue"),
      },
      {
        path: "/login",
        component: () => import("pages/main/LoginPage.vue"),
      },
      {
        path: "/article/:id",
        name: "article",
        component: () => import("pages/ArticlePage.vue"),
      },
      {
        path: "/atemp",
        component: () => import("pages/APTemp.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
