<script>
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'

export default {
  props: ['pet'],

  methods: {
    ...mapActions(usePetStore, ['approvePet', 'deletePet'])
  }
}
</script>

<template>
  <div class="col-md-4 my-3">
    <div class="card">
      <img
        :src="pet.imageUrl"
        class="card-img-top fitImg"
        alt="Card Image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ pet.name }}</h5>
        <p class="card-text text-truncate">{{ pet.description }}</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <button type="button" class="btn btn-danger btn-sm" @click.prevent="deletePet(pet.id)">Reject</button>
        <button type="button" class="btn btn-success btn-sm" @click.prevent="approvePet(pet.id)">Approve</button>
      </div>
    </div>
  </div>
</template>
