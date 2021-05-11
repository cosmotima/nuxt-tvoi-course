<template>
  <div>
    <button @click="back">Назад</button>
    <app-question-slide :slide="slides[this.currentQuestion]" />
    <button @click="forward">Вперед</button>
  </div>
</template>

<script>
import AppQuestionSlide from "@/components/app-question-slide.vue";
export default {
  name: "app-questions-qarousel",
  layout: "headerLayout",
  data() {
    return {
      slides: [
        {
          id: "0",
          question: "Вопрос 1?",
          answers: ["1", "2", "3"],
          oneAnswer: false,
        },
        {
          id: "1",
          question: "Вопрос 2?",
          answers: ["1", "2", "3"],
          oneAnswer: true,
        },
      ],
      answers: [
          {

          }
      ],
      currentQuestion: 0,
    };
  },
  components: {
    AppQuestionSlide,
  },
  computed: {
    slide() {
      // this.$route.id
      return this.currentQuestion;
    },
  },
  methods: {
      saveCurrentAnswer() {
          this.answers.push({"id" : this.currentQuestion, "answers" : []})
      },
    forward() {
        this.saveCurrentAnswer()

      if (this.currentQuestion < this.slides.length-1) {
        this.currentQuestion++;
      }
    },
    back() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
  }
};
</script>

<style>
</style>