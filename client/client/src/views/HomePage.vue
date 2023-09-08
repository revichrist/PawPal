<script>
import ReusableCard from '../components/ReusableCard.vue'
import FunFactCard from '../components/FunFactCard.vue'
import { mapActions, mapState } from 'pinia'
import { usePetStore } from '../stores/pet'
import { onMounted } from 'vue'

export default {
  data() {
    return {
      currentPage: 1
    }
  },

  components: {
    ReusableCard,
    FunFactCard
  },

  computed: {
    ...mapState(usePetStore, ['petData', 'funFact', 'totalPageInArray'])
  },

  methods: {
    ...mapActions(usePetStore, ['fetchReadyPet', 'fetchFunFact']),

    changePagination(page) {
      this.currentPage = page

      this.fetchReadyPet(page)
    }
  },

  created() {
    this.fetchReadyPet()
    this.fetchFunFact()
  },

  mounted(){
    setInterval(()=> {
      this.fetchFunFact()
    }, 7000)
  }
}
</script>

<template>
  <!-- <pre>{{ petData }}</pre> -->
  <!-- <pre>{{ funFact }}</pre> -->
  <!-- <pre>{{ totalPageInArray }}</pre> -->

  <div class="container mt-5">
    <div class="row">
      <ReusableCard v-for="pet in petData" :pet="pet"></ReusableCard>
    </div>
  </div>

  <!-- Pagination -->
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center mt-4">
      <!-- <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
      </li> -->

      <li
        v-for="page in totalPageInArray"
        class="page-item"
        :class="{ active: currentPage === page }"
        aria-current="page"
      >
        <a class="page-link" @click.prevent="changePagination(page)">{{ page }}</a>
      </li>

      <!-- <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li> -->
    </ul>
  </nav>

  <FunFactCard :funFact="funFact"></FunFactCard>

  <!-- <pre>{{ petData }}</pre> -->
</template>
