<template>
  <div class="app-table-filters">
  <span>
    <app-table-filter-button-bln
        v-for="filter in filters.filters"
        :key="filter.name"
        :filter="filter"
        :highlited="isFilterActive(filter)"
        @filterChange="filterChange"
    />
    <div class="range-filter">
      <p>Months from: {{ this.minMonths }} - {{ this.maxMonths }}</p>
      <div class="range-slider">
      <input
          type="range"
          min="1"
          max="24"
          step="2"
          v-model.number="minMonths"
          @change="setRangeSlide"
      >
      <input
          type="range"
          min="1"
          max="24"
          step="1"
          v-model.number="maxMonths"
          @change="setRangeSlide"
      >
      </div>
    </div>
    <app-table-nofilter-button
        :highlited="(this.usedFilters.length == 0)"
        @removeAllFilter="removeAllFilter"
    />
    <transition>
    <i class="material-icons"
        v-if="isPopUpAllFilters"
         @click="showPopUpAllFilters"
      >close</i>
      <i class="material-icons"
          v-else
         @click="showPopUpAllFilters"
      >expand_more</i>
    </transition>
      <transition name="fade" appear>
        <app-p-u-all-filters
        popupName='All filters'
        v-if="isPopUpAllFilters"
        @showPopUpAllFilters="showPopUpAllFilters"
        >
          <div>
            <app-table-filter-button-bln
        v-for="filter in filters.filters"
        :key="filter.name"
        :filter="filter"
        :highlited="isFilterActive(filter)"
        @filterChange="filterChange"
    />
          </div>
          <div class="range-filter">
      <p>Months from: {{ this.minMonths }} - {{ this.maxMonths }}</p>
      <div class="range-slider">
      <input
          type="range"
          min="1"
          max="24"
          step="2"
          v-model.number="minMonths"
          @change="setRangeSlide"
      >
      <input
          type="range"
          min="1"
          max="24"
          step="1"
          v-model.number="maxMonths"
          @change="setRangeSlide"
      >
      </div>
    </div>
        </app-p-u-all-filters>
      </transition>
     
  </span>
  </div>
</template>

<script>
import appTableFilterButtonBln from './app-table-filter-button-bln'
import appTableNofilterButton from './app-table-nofilter-button'
import filters from '../../filterTypes.json'
import AppPUAllFilters from '../pop-ups/app-pu-all-filters.vue'

export default {
  name: "app-table-filters",
  components: {
    appTableFilterButtonBln,
    appTableNofilterButton,
    AppPUAllFilters,
  },
  data() {
    return {
      isPopUpAllFilters: false,
      filters: filters,
      usedFilters: [],
      minMonths: 1,
      maxMonths: 24,
      value: [1, 24]
    }
  },
  methods: {
    setRangeSlide() {
      if (this.minMonths > this.maxMonths) {
        let temp = this.maxMonths
        this.maxMonths = this.minMonths
        this.minMonths = temp
      }
      this.usedFilters.push({name: "duration"})
    },
    filterChange(filter) {
      if (this.usedFilters.includes(filter)) {
        this.usedFilters.splice(this.usedFilters.indexOf(filter), 1)
      } else {
        this.usedFilters.push(filter)
      }
    },
    removeAllFilter() {
      console.log('remove all filters')
      this.minMonths = 1
      this.maxMonths = 24
      this.usedFilters = []
    },
    //TODO: move to computed()
    isFilterActive(name) {
      return this.usedFilters.includes(name)
    },
    showPopUpAllFilters() {
      console.log('showPopUpAllFilters')
      this.isPopUpAllFilters = !this.isPopUpAllFilters
    }
  },
  watch: {
    usedFilters() {
      this.$emit('filterProducts', this.usedFilters, this.minMonths, this.maxMonths)
    }
  }
}
</script>

<style>
span {
  display: flex;
  justify-content: space-around;
}

.range-slider {
  width: 200px;
  margin: auto auto;
  text-align: center;
  position: relative;
  justify-content: center;
}

.range-slider svg, .range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}


</style>