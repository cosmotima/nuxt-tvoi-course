<template>
<div>
  <component :is='notFoundPage'></component>
</div>
</template>


<script>
import appServerNotFound from '@/components/app-server-not-found'
import appNotFoundSuggestCategories from '@/components/app-not-found-suggest-categories'
import {mapGetters} from 'vuex'


//TODO: 
/* 
сделать обработку запроса к серверу. Если там ошибка, то Страница не найден, идет работа на сервере
если 
*/


export default {
name: "notFoundPage",
layout: "headerLayout",
components: {
appServerNotFound,
appNotFoundSuggestCategories
  },
  computed: {
    ...mapGetters([
        'CATEGORIES'
        ]),
        notFoundPage() {
          return (this.CATEGORIES.length > 0) ? "app-not-found-suggest-categories" : "app-server-not-found"
        }
  },
  async created() {
   // await this.$store.dispatch('GET_CATEGORIES_FROM_API')
  }
}
</script>

<style scoped>

</style>