<template>
  <div>
    <p class="title">首页</p>
    <p>欢迎你！{{ info.username }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()

    return {
      info: computed(() => store.state.user.info)
    }
  }
})
</script>

<style scoped>

</style>
