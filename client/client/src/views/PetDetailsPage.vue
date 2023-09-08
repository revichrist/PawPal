<script>
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'

export default {
  methods: {
    ...mapActions(usePetStore, ['fetchPetDetail', 'adoptPet'])
  },

  computed: {
    ...mapState(usePetStore, ['petDetail'])
  },

  created() {
    this.fetchPetDetail(this.$route.params.id)
  }
}
</script>

<template>
  <!-- <pre>{{ petDetail }}</pre> -->
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <img :src="petDetail.imageUrl" class="card-img-top" alt="Pet Image" />
          <div class="card-body">
            <h3 class="card-title">Pet Name: {{ petDetail.name }}</h3>
            <p class="card-text">Type: {{ petDetail.type }}</p>
            <p class="card-text">Gender: {{ petDetail.gender }}</p>
            <p class="card-text">Weight: {{ petDetail.weight }} kg</p>
            <p class="card-text">Description: </p>
            <p class="card-text">{{ petDetail.description }}</p>
            <p class="card-text">Neuter Status: {{ petDetail.isNeutered }}</p>
            <p class="card-text">Age: {{ petDetail.age }} years old</p>
            <p class="card-text">Submitter: {{ petDetail.User.username }}</p>
          </div>
          <button type="button" class="btn btn-primary btn-lg btn-block" @click.prevent="adoptPet(petDetail.id)">
            Adopt Me
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>
