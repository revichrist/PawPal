<script>
import { RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from './stores/user'
import ReusableCard from './components/ReusableCard.vue'
import NavigationBar from './components/NavigationBar.vue'

export default {
  components: {
    ReusableCard,
    NavigationBar
  },

  computed: {
    ...mapState(useUserStore, ['isAdmin'])
  },

  methods: {
    ...mapActions(useUserStore, ['loginChecker'])
  },

  created() {
    this.loginChecker()
  }
}
</script>

<template>
  <NavigationBar></NavigationBar>

  <RouterView />

  
</template>

<style>
.fitImg{
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

.fun-fact-box {
  background-color: #be840f68;
  color: #333;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: 'Baloo Tammudu 2', cursive;
  font-size: 24px;
}

.fun-fact-box p {
  margin-bottom: 0;
}

a {
  cursor: pointer;
}

li {
  cursor: pointer;
}
</style>
