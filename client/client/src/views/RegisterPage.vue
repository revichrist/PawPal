<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  data() {
    return {
      payload: {
        username: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(useUserStore, ['register'])
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Register</h3>
            <form @submit.prevent="register(payload)">
              <div class="form-group my-2">
                <label for="name">Username</label>
                <input v-model="payload.username" type="text" class="form-control" placeholder="Enter your Username" />
              </div>

              <div class="form-group my-2">
                <label for="name">Email</label>
                <input v-model="payload.email" type="text" class="form-control" placeholder="Enter your Email" />
              </div>

              <div class="form-group my-2">
                <label for="password">Password</label>
                <input v-model="payload.password" type="password" class="form-control" placeholder="Enter your password" />
              </div>

              <button type="submit" class="btn btn-primary btn-block my-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
