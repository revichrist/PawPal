<script>
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'
import { event } from 'vue-gtag'

export default {
  data() {
    return {
      payload: {
        name: '',
        type: '',
        gender: '',
        image: {},
        weight: 0,
        isNeutered: null,
        description: '',
        age: 0
      },

      file: ''
    }
  },

  methods: {
    ...mapActions(usePetStore, ['postPet']),
    selectImage() {
      this.payload.image = this.$refs.file.files[0]
      console.log(typeof this.payload.image, 28)
      console.log(this.payload.image)
    },
    onSubmit() {
      if (this.payload.isNeutered === 'true') this.payload.isNeutered = true
      else this.payload.isNeutered = false
      
      event('user-submit-pet', {
        'event-label': 'user-submit-pet',
        value: this.payload.name
      })

      this.postPet(this.payload)
    }
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Pet Registration Form</h3>
            <form enctype="multipart/form-data" @submit.prevent="onSubmit">
              <div class="form-group my-2">
                <label>Name <span style="color: red">*</span></label>
                <input
                  v-model="payload.name"
                  type="text"
                  class="form-control"
                  placeholder="Enter pet's name"
                />
              </div>

              <div class="form-group my-2">
                <label>Type <span style="color: red">*</span></label>
                <input
                  v-model="payload.type"
                  type="text"
                  class="form-control"
                  placeholder="Enter pet's type"
                />
              </div>

              <div class="form-group my-2">
                <label>Gender <span style="color: red">*</span></label>
                <input
                  v-model="payload.gender"
                  type="text"
                  class="form-control"
                  placeholder="Enter pet's gender"
                />
              </div>

              <div class="form-group my-2">
                <label class="form-label">Input Pet Image <span style="color: red">*</span></label>
                <input ref="file" @change="selectImage" type="file" class="form-control" />
              </div>

              <div class="form-group my-2">
                <label>Weight (in kg)</label>
                <input
                  v-model="payload.weight"
                  type="number"
                  class="form-control"
                  placeholder="Enter pet's weight"
                />
              </div>

              <div class="form-group my-2">
                <label>Neuter Status <span style="color: red">*</span></label>
                <select v-model="payload.isNeutered" class="form-control">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  v-model="payload.description"
                  class="form-control"
                  id="description"
                  rows="4"
                  placeholder="Enter pet's description"
                ></textarea>
              </div>

              <div class="form-group my-2">
                <label>Age</label>
                <input
                  v-model="payload.age"
                  type="number"
                  class="form-control"
                  placeholder="Enter pet's age"
                />
              </div>

              <button type="submit" class="btn btn-primary btn-block my-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


