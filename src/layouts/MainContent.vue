<template>
  <div class="content">
    <router-view v-slot="{ Component }">
      <transition name="slide-in">
        <!-- <keep-alive :include="cachedViews"> -->
          <component :is="Component" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.content {
  margin: 16px;
  padding: 16px;
  background-color: #fff;
}
/* 页面切换动画 */
.slide-in-enter-active {
  transition: all .5s;
}
.slide-in-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
