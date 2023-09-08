<script>
import ReusableCard from '../components/ReusableCard.vue'
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'
export default {
  components: {
    ReusableCard
  },

  methods: {
    ...mapActions(usePetStore, ['fetchAdminPet'])
  },

  computed: {
    ...mapState(usePetStore, ['adminPetData'])
  },

  created() {
    this.fetchAdminPet('Adopted')
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row"><ReusableCard v-for="pet in adminPetData" :pet="pet"></ReusableCard></div>
  </div>
  
</template>
