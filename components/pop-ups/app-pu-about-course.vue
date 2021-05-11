<template>
<div class="app-popup__wrapper" ref="popup-wrapper">
    <div class="app-popup">
      <div class="app-popup__header">
      <span>
          <i class="material-icons"
         @click="closePopUp"
      >close</i>
      </span>
      <p>
        {{this.course.name}}
      </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "appPUAboutCourse",
props: {
    course: {
type: Object,
required: true
    }
},
methods: {
    closePopUp() {
        this.$emit('closePopUp')
    }
},
mounted() {
    let vm = this;
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['popup-wrapper']) {
        vm.closePopUp();
      }
    })
}
}
</script>

<style>
.app-popup{
  padding: 16px;
  position: fixed;
  top: 50px;
  width: 400px;
  background: #FFFFFF;
  box-shadow: 0 0 17px 0 #2c3e50;
  z-index: 10;
  border-radius: 10px;

  &__wrapper {
    background: rgba(64, 64, 64, .4);
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }
}
</style>