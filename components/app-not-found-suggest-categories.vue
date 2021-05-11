<template>
<div>
  <h1>По вашему запросу ничего не найдено. Попробуйте повторить запрос</h1>
  <h2>А еще, мы сравнили лучшие курсы по:</h2>
  <span>
    <nuxt-link v-for="categoryPair in categoryPairs"
        :key="categoryPair.subcategory"
        :to="{ name: 'table-subcategory', params: { subcategory: categoryPair.subcategory }}"
    >{{categoryPair.subcategory}}</nuxt-link>
    <a></a>
  </span>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
name: "app-not-found-suggest-categories",
data () {
return {
  categoryPairs: [
    {category : "Programming",
    subcategory : "web-development"},
    {category : "Programming",
    subcategory : "data-science"},
    {category : "Design",
    subcategory : "Graphic-design"}
  ]  
}
},
methods: {
    ...mapActions([
      'GET_COURSES_BY_QUERY_FROM_API'
    ]),
    // openCategoryURL(subcategory) {
    //   this.$router
    //     .push({
    //       path: "/table",
    //       query: {
    //         category: this.category.name,
    //         subcategory: subcategory.name,
    //       },
    //     })
    //     .catch((err) => {
    //       // Ignore the vuex err regarding  navigating to the page they are already on.
    //       if (
    //         err.name !== "NavigationDuplicated" &&
    //         !err.message.includes(
    //           "Avoided redundant navigation to current location"
    //         )
    //       ) {
    //         // But print any other errors to the console
    //         console.log(err);
    //       }
    //     });
    // }
  },
  computed: {
    ...mapGetters([
        'CATEGORIES'
        ]),
    // subCategories() {
    //   console.log("component computed")
    //   //console.warn(1 + "catch")
    //     let arr = this.CATEGORIES.flatMap(function(category) {
    //                 return category.subcategories.map(function(subcategory) {
    //                     return subcategory.name
    //                 })
    //             })
    //     let n = 3
    //     var result = new Array(n),
    //         len = arr.length,
    //         taken = new Array(len);
    //     if (n > len)
    //       throw new RangeError("getRandom: more elements taken than available");
    //     while (n--) {
    //       var x = Math.floor(Math.random() * len);
    //       result[n] = arr[x in taken ? taken[x] : x];
    //       taken[x] = --len in taken ? taken[len] : len;
    //     }
    //     return result;
    // }
  },
}
</script>

<style>

</style>