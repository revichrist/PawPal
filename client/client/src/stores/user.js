import { defineStore } from 'pinia'
import { toast } from '../utils/toast'
import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://iproject.cinema-gc1-p2.cloud'
export const useUserStore = defineStore('user', {
  state() {
    return {
      access_token: '',
      isAdmin: false
    }
  },

  actions: {
    async login(payload) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/login`,
          data: payload
        })

        localStorage.setItem('isAdmin', data.isAdmin)
        localStorage.setItem('access_token', data.access_token)
        this.loginChecker()
        toast('Hello!', 'success')
        router.push('/')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async googleLogin(credentials) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/googleLogin`,
          headers: {
            google_token: credentials.credential
          }
        })

        localStorage.setItem('isAdmin', data.isAdmin)
        localStorage.setItem('access_token', data.access_token)
        this.loginChecker()
        toast('Hello!', 'success')
        router.push('/')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async register(payload) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/register`,
          data: payload
        })
    
        toast('Register success', 'success')
        router.push('/login')
      } catch (error) {
        const errorMessage = error.response.data.message
        let handleMessage
        if (typeof errorMessage === 'object') {
          handleMessage = errorMessage.join('\n\n')
        } else {
          handleMessage = errorMessage
        }

        toast(handleMessage, 'error')
      }
    },

    loginChecker() {
      if (localStorage.getItem('access_token')) {
        this.access_token = localStorage.getItem('access_token') 
        if(localStorage.getItem('isAdmin') === 'true') this.isAdmin = true
      } else {
        this.access_token = ''
        this.isAdmin = false
      }
    },

    logout() {
      localStorage.clear()
      this.loginChecker()
      toast('See ya!')
      router.push('/')
    }
  },

  getters: {
    checkLogin() {
      if (this.access_token) return true
      return false
    }
  }
})
