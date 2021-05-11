<template>
  <div class="v-table" v-show="!(courses === undefined)">
    <h1>Все курсы по {{ this.title }}</h1>
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
  <!-- <not-found-page v-else /> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import appTableRow from "@/components/table/app-table-row";
import appTableFilters from "@/components/table/app-table-filters";
//import NotFoundPage from "@/components/pages/notFoundPage";

export default {
  name: "app-table",
  layout: "headerLayout",
  components: {
    //NotFoundPage,
    appTableRow,
    appTableFilters,
  },
  //async fetch({ store, route }) {
  async asyncData({ store, route }) {
    if (Object.keys(route.query) == "search") {
      await store.dispatch('GET_ALL_COURSES');
      let value = 
      store.state.searchValue == "" ? route.query.search : store.state.searchValue;
      let allCourses = store.state.allCourses;
      let courses = []
        courses = allCourses.filter(function (item) {
          return item.name.toLowerCase().includes(value.toLowerCase());
        });
      return { courses }
    } else {
      const courses = await store.dispatch(
        "GET_COURSES_BY_SUBCATEGORY",
        route.params.subcategory
      );
      return { courses };
    }
  },
  data() {
    return {
      itemsPerPage: 4,
      currentPage: 1,
      //courses: [],
      sortedCourses: this.COURSES,
      isPageFound: true,
    };
  },
  computed: {
    ...mapGetters(["COURSES", "ALL_COURSES", "SEARCH_VALUE"]),
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
    },
    title() {
      return Object.keys(this.$route.query) == "search"
        ? this.$route.query.search
        : this.$route.params.subcategory;
    },
  },
  methods: {
    ...mapActions([
      "GET_COURSES_BY_QUERY_FROM_API",
      "GET_COURSES_BY_SUBCATEGORY",
      "GET_ALL_COURSES",
      "GET_SEARCH_VALUE_TO_STATE",
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
  // async beforeRouteUpdate(to, from, next) {
  //   next();
  //   if (Object.keys(this.$route.query) == "search") {
  //     await this.GET_ALL_COURSES();

  //     let value = this.SEARCH_VALUE;
  //     let allCourses = this.ALL_COURSES;
  //     if (allCourses.length > 0) {
  //       this.isPageFound = true;
  //       this.sortedCourses = allCourses.filter(function (item) {
  //         return item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //     }
  //     this.courses = this.sortedCourses;
  //     this.$refs.tableFilters.removeAllFilter();
  //   } else {
  //     // await this.GET_COURSES_BY_QUERY_FROM_API(this.$route.query);
  //     if (this.COURSES == undefined) {
  //       this.isPageFound = false;
  //     } else {
  //       this.isPageFound = true;
  //       this.courses = this.COURSES;
  //       this.$refs.tableFilters.removeAllFilter();
  //     }
  //   }
  //   if (this.courses.length < 1) {
  //     this.isPageFound = false;
  //   }
  // },
   async mounted() {
     if (this.courses.length < 1) {
       $nuxt.error({ statusCode: 400, message: '---------------' })
     }
   }
  //   if (Object.keys(this.$route.query) == "search") {
  //     await this.GET_ALL_COURSES();

  //     let value =
  //       this.SEARCH_VALUE == "" ? this.$route.query.search : this.SEARCH_VALUE;

  //     let allCourses = this.ALL_COURSES;
  //     if (allCourses.length > 0) {
  //       this.isPageFound = true;
  //       this.sortedCourses = allCourses.filter(function (item) {
  //         return item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //     }
  //     this.courses = this.sortedCourses;
  //   } else {
  //     //await this.GET_COURSES_BY_QUERY_FROM_API(this.$route.query);
  //     if (this.COURSES == undefined) {
  //       this.isPageFound = false;
  //     } else {
  //       this.isPageFound = true;
  //       this.courses = this.COURSES;
  //       //this.$refs.tableFilters.removeAllFilter();
  //     }
  //   }
  //   if (this.courses.length < 1) {
  //     this.isPageFound = false;
  //   }
  // },
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