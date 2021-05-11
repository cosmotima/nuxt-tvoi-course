<template>
  <div>
    <div class="app-header-section">
      <transition>
        <app-p-u-all-categories
          v-show="isPopUpVisible"
          v-bind:showBackButton="this.category ? true : false"
          v-bind:popupName="
            this.category ? this.category.name : 'All categories'
          "
          @closePopUp="closePopUp"
          @backPopUp="backPopUp"
        >
          <div v-for="cat in categories" :key="cat.name">
            <button
              class="top__button"
              v-show="category == undefined"
              @click="categoryClick(cat)"
            >
              {{ cat.name }}
            </button>
            <button
              v-show="category != undefined && cat.name == category.name"
              v-for="sub in cat.subcategories"
              :key="sub"
              class="top__button"
              @click="closePopUp"
            >
              <nuxt-link
                class="nuxt-link-sub"
                :to="{
                  name: 'table-subcategory',
                  params: { subcategory: sub },
                }"
                >{{ sub }}</nuxt-link
              >
              
            </button>
          </div>
        </app-p-u-all-categories>
      </transition>
      <span>
        <router-link to="/"><H1>Твой курс</H1></router-link>
        <div class="top__buttons">
          <button class="top__button" @click="showPopUpAllCategories">
            Все направления
          </button>
          <button class="top__button">Сатьи об образовании</button>
          <button class="top__button">
            <nuxt-link to="/car" class="nuxt-link-sub">Подобрать тебе</nuxt-link>
            
          </button>
          <button class="top__button">
            <nuxt-link to="/reviews/schools" class="nuxt-link-sub">Отзывы о школах</nuxt-link>
              
          </button>
        </div>
      </span>
      <form class="search_field" @submit.prevent="searchCourse(searchValue)">
        <input class="search_input" type="text" v-model="searchValue" />
        <button class="search_button" type="submit">
          <i class="material-icons">search</i>
        </button>
      </form>
      <hr />
    </div>
    <Nuxt />
  </div>
</template>

<script>
import appPUAllCategories from "@/components/pop-ups/app-pu-all-categories";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app-header-section",
  data() {
    return {
      isPopUpVisible: false,
      category: null,
      searchValue: "",
    };
  },
  components: {
    appPUAllCategories,
  },
  methods: {
    ...mapActions(["GET_CATEGORIES_FROM_API", "GET_SEARCH_VALUE_TO_STATE"]),
    showPopUpAllCategories() {
      this.isPopUpVisible = true;
    },
    subcategoryClick(subcategory) {
      this.openCategoryURL(subcategory);
      this.closePopUp();
    },
    categoryClick(category) {
      this.category = category;
    },
    closePopUp() {
      //this.category = null;
      this.isPopUpVisible = false;
      console.warn("close popup");
    },
    searchCourse(value) {
      this.searchValue = "";
      this.GET_SEARCH_VALUE_TO_STATE(value);
      this.$router
        .push({ path: "/table", query: { search: value } })
        .catch((err) => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (
            err.name !== "NavigationDuplicated" &&
            !err.message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            // But print any other errors to the console
            console.log(err);
          }
        });
    },
    backPopUp() {
      this.category = null;
    },
  },
  computed: {
    ...mapGetters(["CATEGORIES", "SEARCH_VALUE"]),
    categories() {
      return this.CATEGORIES;
    },
  },
  watch: {
    isPopUpVisible() {
      if (!this.isPopUpVisible) {
        this.category = null;
      }
    },
  },
  created() {},
  mounted() {
    // this.categories = this.CATEGORIES;
  },
};
</script>

<style lang = "scss">
span {
  display: flex;
  justify-content: space-around;
  padding-bottom: 15px;
  margin: 20px;
}
.search_field {
  display: flex;
  width: 100%;
  justify-content: center;
}
.search_input {
  display: flex;
  width: 75%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.top__buttons {
  display: flex;
  justify-content: space-around;
  margin: 15px;
  padding: 15px;
}

hr {
  margin: 20px;
}

.top__button {
  border: solid 1px #2c3e50;
  border-radius: 5px;
  color: black;
  padding: 10px;
  background: #ffffff;
  transition: 0.35s;
}

.top__button:hover {
  color: #ffffff;
  background: #e27511;
  border-color: #e27511;
}

.top__button:active {
  background: #e27511;
}
.nuxt-link-sub {
  display: inline-block;
  position: relative;
  z-index: 1;
  padding: 2em;
  margin: -2em;
}
</style>