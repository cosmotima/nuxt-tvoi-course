<template>
  <div class="v-table" v-show="isPageFound">
    <h1>Все курсы по {{ this.$route.params.subcategory }}</h1>
    <app-table-filters ref="tableFilters" @filterProducts="filterProducts" />
    <div class="app-table__header">
      <p>Name</p>
      <p>School</p>
      <p>Price</p>
      <p>Diploma</p>
      <p>Duration</p>
    </div>
    <div class="app-table__body">
      <app-table-row
        v-for="row in paginatedItems"
        :key="row.article"
        :row_data="row"
      />
    </div>
    <div class="app-table__pagination">
      <div
        class="page"
        v-for="page in pages"
        :key="page"
        :class="{ page_selected: page === currentPage }"
        @click="pageClick(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import appTableRow from "@/components/table/app-table-row";
import appTableFilters from "@/components/table/app-table-filters";
import NotFoundPage from "../../layouts/error.vue";

export default {
  name: "app-table",
  layout: "headerLayout",
  components: {
    NotFoundPage,
    appTableRow,
    appTableFilters,
    NotFoundPage
  },
  async asyncData({ store, route }) {
    const courses = await store.dispatch(
      "GET_COURSES_BY_SUBCATEGORY",
      route.params.subcategory
    )
    let isPageFound = (courses.length > 0) ? true : false
    return { courses, isPageFound };
  },
  data() {
    return {
      itemsPerPage: 4,
      currentPage: 1,
      sortedCourses: this.COURSES,
    };
  },
  computed: {
    //TODO: может можно избавиться от импорта геттера COURSES
    ...mapGetters(["COURSES"]),
    pages() {
      try {
        if (this.sortedCourses === undefined) {
          return Math.ceil(this.courses.length / this.itemsPerPage);
        } else {
          return Math.ceil(this.sortedCourses.length / this.itemsPerPage);
        }
      } catch (error) {}
    },
    paginatedItems() {
      try {
        let from = (this.currentPage - 1) * this.itemsPerPage;
        let to = from + this.itemsPerPage;
        if (this.sortedCourses === undefined) {
          return this.courses.slice(from, to);
        } else {
          return this.sortedCourses.slice(from, to);
        }
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions([
      "GET_COURSES_BY_SUBCATEGORY",
    ]),
    pageClick(page) {
      return (this.currentPage = page);
    },
    //TODO: возможно перенести его в computed и пересмотреть надобность массивов в data
    filterProducts(filters, minDuration, maxDuration) {
      let sorted = this.courses.filter(function (course) {
        return (
          course.duration_months >= minDuration &&
          course.duration_months <= maxDuration
        );
      });
      var sortResult = [];
      filters.forEach(function (filter) {
        switch (filter.name) {
          case "diploma":
            sortResult = sorted.filter(function (course) {
              return course.diploma == true;
            });
            sorted = sortResult;
            break;
          case "discount":
            sortResult = sorted.filter(function (course) {
              return course.discount == true;
            });
            sorted = sortResult;
            break;
          default:
            console.log("Default filter");
            break;
        }
      });
      this.currentPage = 1;
      return (this.sortedCourses = sorted);
    },
  },
  watch: {
    sortedCourses() {
      this.currentPage = 1;
    },
  },
  async mounted() {
      if (this.COURSES == undefined) {
        this.isPageFound = false;
      } else {
        this.isPageFound = true;
        this.courses = this.COURSES;
      }
  },
};
</script>

<style>
.app-table {
  max-width: 900px;
  margin: 0 auto;
}

.app-table__header {
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px black;
}

.app-table__header p {
  flex-basis: 20%;
  text-align: left;
}

.app-table__pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.page {
  padding: 8px;
  border: solid 1px black;
  margin: 1px;
}

.page:hover {
  background: #aeaeae;
  color: #e0e0e0;
  cursor: pointer;
}

.page_selected {
  background: #aeaeae;
  color: #e0e0e0;
  cursor: pointer;
}
</style>