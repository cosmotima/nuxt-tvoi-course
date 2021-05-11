<template>
   <div class="app-popup__wrapper" ref="popup-wrapper">
    <div class="app-popup">
      <div class="app-popup__header">
        <span>{{this.popupName}}</span>
        <span>
    </span>
      </div>
      <div class="app-popup__content">
        <slot></slot>
      </div>
      <div class="app-popup__footer">

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "puAllFilters",
  props: 
    {
      popupName: {
        type: String,
        default: 'Pop up name'
      }
    },
  methods: {
    closePopUp() {
      this.$emit('showPopUpAllFilters')
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

<style lang="scss">
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