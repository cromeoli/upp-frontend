import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Feed from "../components/Feed/Feed.vue";
import ComingSoon from "../components/ComingSoon.vue";

const routes = [

    {
        path:'/',
        component:Feed,
    },
    {
        path: '/comingSoon',
        component: ComingSoon,
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router