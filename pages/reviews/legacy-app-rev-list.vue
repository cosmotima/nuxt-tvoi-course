<template>
<section class="app-rev-page-section">
  <a @click="scrollMeTo('send_rev_form')">Оставить отзыв</a>
  <div class="app-rev-list-left-other-schools"> 
    <app-left-other-schools
      v-if="this.currentSchool != undefined"
      :schools="this.schools"
      :currentSchool="this.currentSchool"
    />
  </div>
<div class="app-rev-list-wrapper">
    <div v-if="this.reviews < 1">
      Пока нет ни одного отзыва, будете первыми?
    </div>
    <div class="app-rev-list" v-else>
      <!-- <div class="app-rev-list-header">
        <p>Average rating: {{ averageRating }}</p>
        <p>Всего отзывов: {{ rates.length }}</p>
      </div> -->
      <div class="app-rev-list-content">
        <app-rev-item v-for="rev in this.reviews" :key="rev.id" :review="rev" />
      </div>
    </div>
  </div>
  <div class="send-review-form-wrapper" ref="send_rev_form">
    <app-send-review-form />
  </div>
</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppLeftOtherSchools from '@/components/reviews/app-left-other-schools.vue';
import appRevItem from "@/components/reviews/app-rev-item.vue";
import AppSendReviewForm from '@/components/reviews/app-send-review-form.vue';

export default {
  components: { appRevItem, AppLeftOtherSchools, AppSendReviewForm },
  data() {
    return {
      reviews: [],
      schools: [],
      schoolInRoute: ""
    };
  },
  methods: {
    ...mapActions(["GET_REVIEWS_FROM_API", "GET_SCHOOLS_FROM_API"]),
    scrollMeTo(refName) {
    var element = this.$refs[refName];
      console.log(element.offsetTop);
      element.scrollIntoView({ behavior: 'smooth' });
  }
  },
  computed: {
    ...mapGetters(["REVIEWS", "SCHOOLS"]),
    currentSchool() {
      let schoolInR= this.schoolInRoute

      return this.schools.find(function(school) {
        return school.name.toLowerCase() == schoolInR
      })
    }
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    this.schoolInRoute = this.$route.params.pathMatch;
    await this.GET_REVIEWS_FROM_API(this.schoolInRoute);
    this.reviews = this.REVIEWS;
    await this.GET_SCHOOLS_FROM_API();
    this.schools = this.SCHOOLS;

  },
  async mounted() {
    this.schoolInRoute = this.$route.params.pathMatch;
    await this.$store.dispatch('GET_REVIEWS_FROM_API', this.schoolInRoute);
    this.reviews = this.REVIEWS;
    await this.GET_SCHOOLS_FROM_API();
    this.schools = this.SCHOOLS;
  },
};
</script>

<style lang="scss">

.app-rev-page-section {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>