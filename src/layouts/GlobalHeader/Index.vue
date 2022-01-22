<template>
  <a-layout-header class="header">
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {

    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: #fff;
  .trigger {
    height: 64px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      background-color: rgba(0, 0, 0, .05);
    }
  }
}
</style>
