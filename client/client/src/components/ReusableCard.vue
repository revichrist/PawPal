<script>
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'

export default{
  props: ['pet'],
  
  methods: {
    ...mapActions(usePetStore, ['fetchPetDetail'])
  }


}
</script>

<template>
  <div class="card w-25 mx-4 my-4" style="width: 25rem">
    <img
      :src="pet.imageUrl"
      class="card-img-top fitImg"
      alt="Card Image"
    />
    <div class="card-body">
      <h5 class="card-title">{{ pet.name }}</h5>
      <p class="card-text text-truncate">
        {{ pet.description }}
      </p>
      <a class="btn btn-primary" @click.prevent="fetchPetDetail(pet.id)">Details</a>
    </div>
  </div>
</template>