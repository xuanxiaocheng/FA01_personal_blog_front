import { createRouter, createWebHashHistory } from "vue-router";
import axios from "axios";
const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "StarPavilion" },
    component: () => import("../Index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("../Login.vue"),
  },
  {
    path: "/recommend",
    name: "Recommend",
    meta: { title: "推荐" },
    component: () => import("../Recommend.vue"),
  },
  {
    path: "/textContent",
    name: "TextContent",
    component: () => import("../text/TextContent.vue"),
  },
  {
    path: "/manage",
    name: "Manage",
    meta: { title: "管理主页", requiresAuth: true },
    component: () => import("../manage/ManageIndex.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "关于" },
    component: () => import("../About.vue"),
  },
  {
    path: "/articlewrite",
    name: "ArticleWrite",
    meta: { title: "编辑", requiresAuth: true },
    component: () => import("../manage/ArticleWrite.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory("/"), //替代之前的mode，是必须的
  routes,
});

router.beforeEach((to, from, next) => {
  /*     nprogress.start() */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  //判断是否需要登录权限
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    axios
      .post("/api/user/checktoken")
      .then((res) => {
        if (res.data.status !== null) {
          router.push({ path: "/login" });
        } else {
          next();
        }
      })
      .catch((err) => console.log(err));
  } else {
    next();
  }
});

export default router;
