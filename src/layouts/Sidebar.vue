<template>
  <a-layout-sider
    class="sidebar"
    width="256"
    :collapsed="collapsed"
    collapsible
    :trigger="null">
    <div class="logo">
      <router-link to="/">
        <img class="img-logo" src="@/assets/images/logo.png" alt="logo" />
        <span class="title" v-if="!collapsed">后台管理系统</span>
      </router-link>
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      v-model:open-keys="menu.openKeys"
      v-model:selected-keys="menu.selectedKeys"
      @openChange="onOpenChange">
      <template v-for="item in menu.list">
        <a-menu-item v-if="!item.children && !ifMenuHidden(item)" :key="item.path">
          <router-link :to="item.path">
            <icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
            <span>{{ getTitle(item) }}</span>
          </router-link>
        </a-menu-item>
        <template v-else-if="ifMenuHidden(item)">
          <a-menu-item v-for="subItem in item.children" :key="subItem.path">
            <router-link :to="subItem.path">
              <icon v-if="subItem.meta && subItem.meta.icon" :type="subItem.meta.icon" />
              <span>{{ getTitle(subItem) }}</span>
            </router-link>
          </a-menu-item>
        </template>
        <a-sub-menu v-else :key="item.path">
          <template #title>
            <span>
              <span>{{ getTitle(item) }}</span>
            </span>
          </template>
          <a-menu-item v-for="subItem in item.children" :key="subItem.path">
            <router-link :to="subItem.path">
              <icon v-if="subItem.meta && subItem.meta.icon" :type="subItem.meta.icon" />
              <span>{{ getTitle(subItem) }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, RouteRecordRaw } from 'vue-router'
// import Icon from '@ant-design/icons-vue'

export default defineComponent({
  // components: {
  //   Icon
  // },
  setup () {
    const store = useStore()
    const $route = useRoute()
    const menu = reactive({
      list: store.state.permission.routers,
      openKeys: [] as Array<string>, // 展开的菜单
      selectedKeys: [] as Array<string> // 高亮的菜单项
    })
    const collapsed = computed(() => store.state.app.collapsed)

    watch($route, () => {
      setActiveKeys()
    })

    onMounted(() => {
      setActiveKeys()
    })

    const ifMenuHidden = (item: RouteRecordRaw) => {
      return item.meta?.hidden || false
    }
    const getTitle = (item: RouteRecordRaw) => {
      return item.meta?.title || item.path
    }
    // 展开菜单
    const onOpenChange = (keys: any) => {
      console.log('onOpenChange', keys)
      menu.openKeys = keys
    }
    // 根据路由高亮菜单
    const setActiveKeys = () => {
      const path = $route.path
      for (const item of menu.list) {
        if (item.path === path) {
          menu.selectedKeys = [item.path]
          return
        }
        if (item.children) {
          for (const subItem of item.children) {
            if (subItem.path === path) {
              menu.selectedKeys = [subItem.path]
              menu.openKeys = [item.path]
              return
            }
          }
        }
      }
    }

    return {
      menu,
      collapsed,
      ifMenuHidden,
      getTitle,
      onOpenChange,
      setActiveKeys
    }
  }
})
</script>

<style scoped lang="less">
.sidebar {
  // 固定导航栏
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: auto;
  color: #fff;
}

.logo {
  padding: 0 16px;
  height: 64px;
  a {
    display: flex;
    align-items: center;
    height: 100%;
    .img-logo {
      width: 48px;
      height: auto;
      /* width: auto;
      height: 48px; */
    }
    .title {
      margin-left: 8px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
