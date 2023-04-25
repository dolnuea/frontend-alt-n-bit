import { createRouter, createWebHistory } from "vue-router";
import AltNBitText from "../views/AltNBitViewText.vue";
import AltNBitImage from "../views/AltNBitViewImage.vue";
import SSS from "../views/SSSView.vue";

const routes = [

  {
    path: "/", 
    name: "AltNBitText",
    component: AltNBitText
  },
  {
    path: "/alt-n-bit-image", 
    name: "AltNBitImage",
    component: AltNBitImage
  },
  {
    path:'/sss',
    name: 'SSS',
    component: SSS,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
