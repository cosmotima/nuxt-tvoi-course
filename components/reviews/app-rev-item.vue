<template>
  <div class="rev-item">
    <span class="rev-item__header">
        <div class="rev-item__header_left">
            <p>{{this.review.authorName}}</p>
            <p>{{this.review.rate}} of 5</p>
        </div>
        <div class="rev-item__header_right">
            <a :href='this.review.href'>Купить</a>
        </div>
    </span>
    <div class="rev-item__content">
        <p>{{this.review.title}}</p>
        <p>{{this.review.goods}}</p>
        <p>{{this.review.bads}}</p>
    </div>
    <div class="rev-item__footer">
        <p>{{this.review.date}}</p>
        <p>{{this.review.category}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: 
    {
      review:{
        type: Object,
        required: true,
      } 
    }
};
</script>

<style lang="scss">
.rev-item {
&__header_left{
    display: block;
    align-content: left;
}

  flex-basis: 50%;
  border: solid 1px #2c3e50;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 16px;
  margin-bottom: 16px;
}
</style>