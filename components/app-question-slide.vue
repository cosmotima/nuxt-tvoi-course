<template>
  <div class="slide_content">
    <div>{{ this.slide.question }}</div>

    <div v-if="slide.oneAnswer">
      <div v-for="answer in this.slide.answers" :key="answer">
        <input type="radio" :value='answer' name="profileImg" v-model="answers"/>

        <!-- <input v-else-if="!this.slide.oneAnswer" type="checkbox" value=answer> -->
        <label>{{ answer }}</label>
      </div>
    </div>
    <div v-else-if="!slide.oneAnswer">
      <div v-for="(answer) in this.slide.answers" :key="answer">
        <input type="checkbox" :value='answer' :id="answer" />

        <!-- <input v-else-if="!this.slide.oneAnswer" type="checkbox" value=answer> -->
        <label :for="answer">{{ answer }}</label>
      </div>
    </div>
    <!-- <div v-else-if="!slide.oneAnswer">
        <input v-for="(answer, index) in this.slide.answers" :key="answer" type="radio" :value='answer' :id='index' v-model="picked"/>
         <input type="radio" :value='slide.answers[1]' :id='1' v-model="picked"/>
          <input type="radio" :value='slide.answers[2]' :id='2' v-model="picked"/>

        <input v-else-if="!this.slide.oneAnswer" type="checkbox" value=answer>
        <label>{{}}</label>
      
    </div> -->
  </div>
</template>

<script>
export default {
  name: "app-question-slide",
  data() {
      return {
          answers: {
              type: Array,
              default: []
          }
      }
  },
  props: {
    slide: Object,
  },
};
</script>

<style>
</style>