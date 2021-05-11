<template>
  <div class="app-left-block">
    <div class="app-left-block__header">
      <img
      class="app-left-block__header__image"
          :src="require('../../assets/images/' + currentSchool.logo)"
          alt="img"
      >
      <p>{{this.currentSchool.name}}</p>
    </div>
    <div class="app-left-block__content">
      <p>Рейтинг других школ:</p>
      <div v-for="school in this.schools"
      :key="school.name"
      >
      <router-link :to="'/reviews/' + school.name.toLowerCase()">
      {{school.name}}: {{school.rating}}
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: 
    {
      schools:{
        type: Array,
        required: true,
      }, 
      currentSchool: {
        type: Object,
        required: true
      }
    },
    computed: {
    //       currentSchool() {
    //   let schoolInR= this.schoolInRoute

    //   return this.schools.find(function(school) {
    //     return school.name.toLowerCase() == schoolInR
    //   })
    // }
    }, 
    mounted() {
      
    }
};
</script>

<style lang="scss">
.app-left-block {
  &__header__image {
    width: 100px;
  }
  width: 330px;
  top: 100px;
  position: sticky;
    border: solid 1px #2c3e50;
    border-radius: 5px;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
}

</style>