<!-- Шаблон обёртка -->
<template>
  <a-layout class="base-layout">
    <a-layout-sider
      class="sider"
      theme="light"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">
        <p
          class="name-header"
          v-if="!collapsed"
        >
          <span>{{title}}</span>
        </p>
      </div>
      <a-menu
        theme="light"
        mode="inline"
        :default-selected-keys="[defaultIndex]"
      >
        <a-menu-item
          v-for="(item, index) in menuItems"
          @click="$router.push(item.link)"
          :key="index + 1 + ''"
        >
          <a-icon :type="item.icon" />
          <span class="name-menu-item">{{item.name}}</span>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content class="layout-content layout-main">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(Array) readonly menuItems!: {
    name: string;
    link: string;
    icon: string;
  }[];
  collapsed = true;
  defaultIndex = "1";

  created(): void {
    this.defaultIndex = this.$route.meta?.index || "1";
  }
}
</script>

<style lang="scss">
.base-layout {
  height: 100vh;
}

.sider {
  border: 1px solid rgb(240, 240, 240);
}

.logo {
  display: flex;
  padding: 0 16px 0 24px;
  margin: 18px 0 12px 0;
}

.name-header {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  margin: 0;
  padding: 0;
  line-height: 1;
  margin-left: 10px;
}

.name-menu-item {
  margin-left: 13px;
  font-weight: bold;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.layout-content {
  background: #e5e5e5;
}

.ant-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}
</style>
