import { createRouter, createWebHistory } from 'vue-router'
import SubmitPetPage from '../views/SubmitPetPage.vue'
import LoginPage from '../views/LoginPage.vue'
import PetDetailsPage from '../views/PetDetailsPage.vue'
import HomePage from '../views/HomePage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AdoptedPetsPage from '../views/AdoptedPetsPage.vue'
import AdminPage from '../views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/submitPet',
      name: 'SubmitPetPage',
      component: SubmitPetPage
    },
    {
      path: '/adminPage',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/adminPage/adoptedPets',
      name: 'AdoptedPetsPage',
      component: AdoptedPetsPage
    },
    {
      path: '/petDetails/:id',
      name: 'PetDetailsPage',
      component: PetDetailsPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem('access_token')
  let isAdmin = localStorage.getItem('isAdmin')
  if(isAdmin === 'false') isAdmin = false
  
  if (to.name === 'AdminPage' && !isAdmin) {
    next({ name: 'HomePage' })
  }else{
    next()
  }
  
})

export default router
