<template>
  <div class="school-list-item">
    <div class="school-list-item__header">
      <div class="school-list-item__header_right">
        <img
          class="school-list-item__image"
          :src="require('@/assets/images/' + school.logo)"
          alt="img"
        />
        <p class="school-list-item__name">{{ school.rating }}</p>
      </div>
      <div>
        <a class="school-list-item__href" v-bind:href="school.href">{{
          school.name
        }}</a>
      </div>
      <div class="school-list-item__header_left">
        <router-link :to="{ name: 'reviews-school', params: { school: school.name.toLowerCase() }}">
          Читать отзывы</router-link
        >
      </div>
    </div>
    <div class="school-list-item__description">
      <p>{{ school.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss">
.school-list-item {
  &__image {
    width: 100px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  flex-basis: 25%;
  border: solid 1px #2c3e50;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 16px;
  margin-bottom: 16px;
}
</style>