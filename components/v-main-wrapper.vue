<template>
  <div class="v-main-wrapper">
    <!-- <app-header-section/> -->
    <router-view></router-view>
  </div>
</template>

<script>

//import appHeaderSection from './app-header-section'

export default {
  name: 'v-main-wrapper',
  props: {},
  components: {
    // appHeaderSection
  },
  methods: {
  },
  data() {
    return {}
  },
  async mounted() {
  }
}
</script>

<style lang="scss">
.v-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>