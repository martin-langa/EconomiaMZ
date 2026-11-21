import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndicadoresView from '../views/IndicadoresView.vue'
import DetalheView from '../views/DetalheView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: HomeView },
    { path: '/indicadores', name: 'indicadores', component: IndicadoresView },
    { path: '/indicadores/:codigo', name: 'detalhe-indicador', component: DetalheView },
    { path: '/:pathMatch(.*)*', name: 'nao-encontrado', component: NotFoundView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
