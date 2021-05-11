<template id="rev_form">
  <div class="app-send-review-form__wrapper">
    <form @submit.prevent="checkSubmit" >
    <div class="app-send-review-form__head">
      <p>Оставьте свой отзыв. Мы его првоерим и опубликуем</p>
      <star-rating
        :class="{invalid: ($v.rating.$dirty && !$v.rating.required)}"
        :increment="0.5"
        :border-width="4"
        border-color="#d8d8d8"
        :rounded-corners="true"
        v-model="rating"
        @rating-selected="setRating"
      />
    </div>
    <small class="helper_field_invalid" v-if="$v.rating.$dirty && !$v.rating.required">
         Оценка должна быть больше 0
      </small>

    <div class="app-send-review-form__body">
      <input type="text" class="review-input__name" placeholder="Ваше имя:" v-model="name"
      :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
      />
      <small class="helper_field_invalid" v-if="$v.name.$dirty && !$v.name.required">
         Введите имя
      </small>
      <!-- <textarea class="review-input__title" placeholder="Заголовок:" v-model="title"
      :class="{invalid: ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minLength)}"
      /> 
      <small class="helper field invalid" v-if="$v.title.$dirty && !$v.title.required">
         Заполните заголовок
      </small>
      <small class="helper field invalid" v-else-if="$v.title.$dirty && !$v.title.minLength">
         Он должен быть больше 4 символов
      </small> -->
      <textarea class="review-input__prons" placeholder="Достоинства:" v-model="prons"
      :class="{invalid: ($v.prons.$dirty && !$v.prons.required)|| ($v.prons.$dirty && !$v.prons.minLength)}" />
     <small class="helper_field_invalid" v-if="$v.prons.$dirty && !$v.prons.required">
         Заполните Достатки
      </small>
      <small class="helper_field_invalid" v-else-if="$v.prons.$dirty && !$v.prons.minLength">
        Введите более 10 символов
      </small>
      <textarea class="review-input__cons" placeholder="Недостатки:" v-model="cons" 
      :class="{invalid: ($v.cons.$dirty && !$v.cons.required) || ($v.cons.$dirty && !$v.cons.minLength)}"/>
      <small class="helper_field_invalid" v-if="$v.cons.$dirty && !$v.cons.required">
         Заполните Недостатки
      </small>
      <small class="helper_field_invalid" v-else-if="$v.cons.$dirty && !$v.cons.minLength">
        Введите более 10 символов
      </small>
    </div>
    <div class="app-send-review-form__footer">
      <div class="app-send-review-form__footer_selection">
        <p class="app-send-review-form__footer__category_label">Выберите категорию:</p>
        <select v-model="selectedCategory"
        :class="{invalid: ($v.selectedCategory.$dirty && !$v.selectedCategory.required)}">
          <option disabled value="">Выберите один из вариантов</option>
          <option v-for="category in this.categories" :key="category.name">
            {{ category.name }}
          </option>
        </select>
        <small class="helper_field_invalid" v-if="$v.selectedCategory.$dirty && !$v.selectedCategory.required">
         Выберите категорию
      </small>
      </div>

      <input class="app-send-review-form__footer__button_send" type="submit" value="Отправить отзыв"/>
    </div>
    </form>
  </div>
</template>

<script>
//import StarRating from "vue-star-rating";
import { mapGetters } from "vuex";
import {required, minLength} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      rating: null,
      name: null,
      //title: null,
      prons: null,
      cons: null
    };
  },
  validations: {
    selectedCategory: {required},
      rating: {required},
      name: {required},
      //title: {required, minLength: minLength(4)},
      prons: {required, minLength: minLength(10)},
      cons: {required, minLength: minLength(10)}
  },
  components: {
    //StarRating,
  },
  computed: {
    ...mapGetters(["CATEGORIES"]),
  },
  methods: {
    setRating(rate) {
      this.rating = rate;
    },
    checkSubmit: function(e) {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      console.log("start checking")
        console.log("e")
        e.preventDefault()
        console.log("prevent ")
        return;
    }
  },
  mounted() {
    this.categories = this.CATEGORIES;
  },
};
</script>

<style lang="scss">
.app-send-review-form__wrapper {
  flex-basis: 50%;
  border: solid 1px #2c3e50;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 16px;
  background-color: #ffdea9;
  margin-bottom: 16px;
}
.review-input__name,
.review-input__title,
.review-input__prons,
.review-input__cons {
  width: 100%;
  padding: 14px 31px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 20px;
  border: 2px solid #2c3e50;
  border-radius: 5px;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  &.invalid {
    border: 3px solid #c24207;
  border-radius: 5px;
  }
}
.helper_field_invalid{
  color: #c24207;
}
.app-send-review-form__footer {
display: flex;
&__category_label{
    margin: 1px;
}
&__button_send {
    margin-left: auto;
    margin-right: 10px;
}
}
</style>