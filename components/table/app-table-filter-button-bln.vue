<template>
  <div>
    <button class="btn_filter"
            :class="{'btn_filter__clicked': highlited}"
            @click="click">
      {{ this.filter.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "app-table-filter-button",
  props: {
    highlited: {
      type: Boolean,
      default() {
        return false
      }
    },
    filter: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {}
  },
  methods: {
    click() {
      return this.$emit('filterChange', this.filter)
    }
  }
}
</script>

<style>
.btn_filter {
  border: solid 1px #2c3e50;
  border-radius: 5px;
  color: black;
  padding: 10px;
}

.btn_filter__clicked {
  border: solid 1px #2c3e50;
  border-radius: 5px;
  background: #2c3e50;
  color: #e0e0e0;
}
</style>