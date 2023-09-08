<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  data() {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(useUserStore, ['login', 'googleLogin'])
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>

            <form @submit.prevent="login(payload)">
              <div class="form-group my-2">
                <label for="username">Email</label>
                <input
                  v-model="payload.email"
                  type="text"
                  class="form-control"
                  placeholder="Enter your Email"
                />
              </div>

              <div class="form-group my-2">
                <label for="password">Password</label>
                <input
                  v-model="payload.password"
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block my-4">Login</button>
            </form>

            <div style="text-align: center">
              <GoogleLogin :callback="googleLogin"></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
