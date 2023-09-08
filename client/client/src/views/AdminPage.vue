<script>
import ReusableAdminCard from '../components/ReusableAdminCard.vue'
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'

export default {
  components: {
    ReusableAdminCard
  },

  computed: {
    ...mapState(usePetStore, ['adminPetData'])
  },

  methods: {
    ...mapActions(usePetStore, ['fetchAdminPet'])
  },

  created() {
    this.fetchAdminPet('Pending')
  }
}
</script>

<template>
  <div class="col-md-6 m-3">
    <RouterLink class="btn btn-primary btn-lg btn-block" to="/adminPage/adoptedPets">View Adopted Pet List</RouterLink>
  </div>

  <div class="container mt-5">
    <h2>Pending Pets</h2>
    <div class="row justify-content-center">
      <ReusableAdminCard v-for="pet in adminPetData" :pet="pet"></ReusableAdminCard>
    </div>
  </div>

  <!-- <pre>{{ adminPetData }}</pre> -->
</template>
