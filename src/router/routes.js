
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), props: { screenName: 'Сканировать' } },
      { path: 'cart', component: () => import('pages/cart.vue'), props: { screenName: 'Корзина' } },
      { path: 'pay', component: () => import('pages/pay.vue'), props: { screenName: 'Оплата покупок' } },
      { path: 'help', component: () => import('pages/help.vue'), props: { screenName: 'Помощь' } },
      { path: 'add-to-cart', component: () => import('pages/add-to-cart.vue'), props: { screenName: 'Добавить в корзину' } }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
