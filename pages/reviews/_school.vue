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
      <div v-show="this.reviews.length < 1">
        Пока нет ни одного отзыва, будете первыми?
      </div>
      <div class="app-rev-list">
        <!-- <div class="app-rev-list-header">
        <p>Average rating: {{ averageRating }}</p>
        <p>Всего отзывов: {{ rates.length }}</p>
      </div> -->
        <div class="app-rev-list-content">
          <app-rev-item
            v-for="rev in this.reviews"
            :key="rev.id"
            :review="rev"
          />
        </div>
      </div>
    </div>
    <div class="send-review-form-wrapper" ref="send_rev_form">
      <app-send-review-form />
    </div>
  </section>
</template>

<script>
import AppLeftOtherSchools from "@/components/reviews/app-left-other-schools.vue";
import appRevItem from "@/components/reviews/app-rev-item.vue";
import AppSendReviewForm from "@/components/reviews/app-send-review-form.vue";

export default {
  layout: "headerLayout",
  components: { appRevItem, AppLeftOtherSchools, AppSendReviewForm },
  async asyncData({ store, route }) {
    let schoolInRoute = route.params.school;
    await store.dispatch("GET_REVIEWS_FROM_API", schoolInRoute);
    const reviews = store.state.reviews;
    const schools = await store.dispatch("GET_SCHOOLS_FROM_API");
    return { reviews, schools };
  },
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      console.log(element.offsetTop);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
  computed: {
    currentSchool() {
      let schoolInR = this.$route.params.school;

      return this.schools.find(function (school) {
        return school.name.toLowerCase() == schoolInR;
      });
    },
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