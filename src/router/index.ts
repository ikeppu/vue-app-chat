import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: { render: () => null },
  },
  {
    path: "/chat/:id",
    name: "Chat",
    component: () => import("@/views/ChatView.vue"),
    beforeEnter: (to) => {
      const id = Number(to.params.id);
      if (!Number.isFinite(id) || id <= 0) {
        return { name: "Home" };
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
