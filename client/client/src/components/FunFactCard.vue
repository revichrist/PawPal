<script>
export default {
  props: ['funFact']
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="fun-fact-box">
          <p style="font-weight: 700;">Did you know?</p>
          <p>{{ funFact }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
