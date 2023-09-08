<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from '../stores/user'

export default{
  methods: {
    changePage(page){
      
      this.$router.push(page)
    },
    ...mapActions(useUserStore, ['logout', 'loginChecker'])
  },

  computed: {
    ...mapState(useUserStore, ['checkLogin', 'isAdmin'])
  }
}
</script>

<template>
  <!-- <pre>{{this.$route.name}}</pre> -->

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div style="display: flex; padding: 0px 30px">
      <a class="navbar-brand" @click.prevent="changePage('/')">PawPal</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: this.$route.name === 'HomePage' }" @click.prevent="changePage('/')">Home</a>
          </li>

          <li class="nav-item">
            <a v-if="checkLogin" class="nav-link" :class="{ active: this.$route.name === 'SubmitPetPage' }" @click.prevent="changePage('/submitPet')">Post Pet</a>
          </li>

          <li class="nav-item">
            <a v-if="isAdmin" class="nav-link" :class="{ active: this.$route.name === 'AdminPage' }" @click.prevent="changePage('/adminPage')">Admin Dashboard</a>
          </li>

        </ul>
      </div>
    </div>

    <div class="me-auto"></div>
    <div style="margin-right: 30px">
      <button v-if="!checkLogin" type="button" class="btn btn-outline-light" @click.prevent="changePage('/login')">Login</button>
      <button v-if="!checkLogin" type="button" class="btn btn-outline-light mx-3" @click.prevent="changePage('/register')">Register</button>
      <button v-if="checkLogin" type="button" class="btn btn-outline-light mx-3" @click.prevent="logout">Logout</button>
    </div>
  </nav>
</template>
