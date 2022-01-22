<template>
  <a-layout class="basic-layout">
    <sidebar></sidebar>
    <a-layout class="layout" :style="layoutStyle">
      <global-header></global-header>
      <a-layout-content class="content-wrapper">
        <main-content></main-content>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Sidebar from './Sidebar.vue'
import GlobalHeader from './GlobalHeader/Index.vue'
import MainContent from './MainContent.vue'

export default defineComponent({
  components: {
    Sidebar,
    GlobalHeader,
    MainContent
  },
  setup () {
    const store = useStore()
    const layoutStyle = computed(() => {
      return store.state.app.collapsed
        ? { marginLeft: '80px', width: 'calc(100% - 80px)' }
        : { marginLeft: '256px', width: 'calc(100% - 256px)' }
    })

    return {
      layoutStyle
    }
  }
})
</script>

<style scoped lang="less">
.layout {
  min-height: 100vh;
  transition: all 0.2s;
}

.content-wrapper {
  background-color: #f5f5f5;
}
</style>
