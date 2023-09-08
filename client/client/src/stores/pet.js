import { defineStore } from 'pinia'
import { toast } from '../utils/toast'
import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://iproject.cinema-gc1-p2.cloud'
export const usePetStore = defineStore('pet', {
  state() {
    return {
      petData: [],
      petDetail: {},
      adminPetData: [],
      funFact: '',
      totalPage: 1
    }
  },

  actions: {
    async fetchReadyPet(page=1) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/pet?currentPage=${page}`
        })
        
        this.totalPage = data.totalPage
        this.petData = data.data
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async fetchAdminPet(status) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/pet/admin?status=${status}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        
        this.adminPetData = data
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async fetchFunFact() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/pet/randomFacts`
        })

        this.funFact = data
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async fetchPetDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/pet/detail/${id}`
        })

        this.petDetail = data
        router.push(`/petDetails/${id}`)
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async postPet(payload) {
      try {
        console.log(payload, 16)
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/pet`,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token'),
            'Content-Type': 'multipart/form-data'
          }
        })

        router.push('/')
        toast(data.message, 'success')
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

    async adoptPet(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/pet/adopt/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        toast(data.message, 'success')
        router.push('/')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async approvePet(id) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: `${BASE_URL}/pet/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        toast(data.message, 'success')
        this.fetchAdminPet('Pending')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async deletePet(id) {
      try {
        const { data } = await axios({
          method: 'DELETE',
          url: `${BASE_URL}/pet/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        toast(data.message, 'success')
        this.fetchAdminPet('Pending')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    }
  },

  getters: {
    totalPageInArray() {
      const pageInArray = []

      for (let i = 1; i <= this.totalPage; i++) {
        pageInArray.push(i)
      }

      return pageInArray
    }
  }
})
