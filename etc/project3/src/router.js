import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Faq from './components/Faq.vue';
import Login from './components/Login.vue';
import TicketsLayout from './components/TicketsLayout.vue';
import state from './state';
import Tickets from './components/Tickets';
import NewTicket from './components/NewTicket.vue';

Vue.use(VueRouter);

let routes = [
    {path:'/', name:'home', component: Home},
    {path:'/faq', name:'faq',component: Faq},
    {path:'/login', name:'login',component: Login, meta: { guest: true }},
    {path: '/tickets', name:'tickets', component: TicketsLayout, meta: { private: true },
        children: [
            {path:'', name:'tickets', component: Tickets},
            {path:'new', name:'new-ticket', component: NewTicket}
        ]
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    console.log('to: ', to.name);
    if(to.matched.some(r => r.meta.private && !state.user)) {
        next({
            name:'login',
            params:{
                wantedRoute: to.fullPath
            },
        });
        return;
    }
    if(to.matched.some( r => r.meta.guest && state.user)) {
        next({name: 'home'});
        return
    }
    next();
});

export default router;

