<template>
  <div>
    <button class="btnFilter"
            :class="{'btnFilterClicked': highlited}"
            @click="removeAllFilter"
    >{{ this.title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "app-table-nofilter-button",
  props: {
    highlited: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      title: 'No filter',
      isClicked: false
    }
  },
  methods: {
    removeAllFilter() {
      return this.$emit('removeAllFilter')
    }
  }
}
</script>

<style>
.btnFilter {
  border: solid 1px #2c3e50;
  border-radius: 5px;
  color: black;
  padding: 10px;
}

.btnFilterClicked {
  border: solid 1px #2c3e50;
  border-radius: 5px;
  background: #2c3e50;
  color: #e0e0e0;
}
</style>