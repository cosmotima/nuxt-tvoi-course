<template>
  <div class="table_row">
    <i class="material-icons"
    @click="showPU"
    >more_vert</i>
    <div class="row name_row">{{ row_data.name }}</div>
    <div class="row school_row">{{ row_data.school }}</div>
    <div class="row price_row">{{ row_data.price }}</div>
    <div class="row diploma_row">{{ row_data.diploma }}</div>
    <div class="row duration_row">{{ row_data.duration_months }}</div>
      <transition name="fade" appear>
      <app-pu-about-course
        v-if="this.showAboutCoursePU"
        :course="this.row_data"
        @closePopUp="closePopUp"      >
      </app-pu-about-course>
    </transition>
  </div>
</template>

<script>

import AppPuAboutCourse from '../pop-ups/app-pu-about-course.vue'

export default {
  name: "app-table-row",
  components: {
    AppPuAboutCourse
  },
  props: {
    row_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showAboutCoursePU: false
    }
  },
  methods: {
    closePopUp() {
      this.showAboutCoursePU = false
    },
    showPU() {
      this.showAboutCoursePU = !this.showAboutCoursePU
    }
  }
}
</script>

<style>
.table_row {
  display: flex;
  justify-content: space-around;
}

.row {
  flex-basis: 20%;
  text-align: left;
  padding: 8px 16px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>