<template>
  <div>
    <H1> Отзывы о школах </H1>
    <div class="schools_list__content">
        <app-rev-school-list-item 
        v-for="school in schools"
        :key="school.name"
        :school="school"
        />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import appRevSchoolListItem from '@/components/reviews/app-rev-school-list-item.vue';
export default {
  components: { appRevSchoolListItem },
  layout: "headerLayout",
  //async asyncData({store}) {
    async fetch({store}) {
    await store.dispatch('GET_SCHOOLS_FROM_API');
    //return { schools }
},
  methods: {
    ...mapActions(["GET_SCHOOLS_FROM_API"]),
  },
  computed: {
    ...mapGetters(["SCHOOLS"]),
    schools() {
      return this.SCHOOLS
    }
  },
  async mounted() {
    //this.schools = this.SCHOOLS
  },
};
</script>

<style lang = "scss">
.schools_list {
  &__content {
    width: 100%;
  }
}
</style>