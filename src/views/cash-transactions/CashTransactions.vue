<template>
  <Layout :title="title" :menu-items="menuItems">
    <router-view></router-view>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from "@/layouts/Layout.vue";

@Component({components: {Layout}})
export default class CashTransactions extends Vue {
  title = "Кассовые операции"
  menuItems = [
    {
      name: 'Операции',
      link: '/cash-transactions/cash-operations',
      icon: 'interaction'
    },
    {
      name: 'Смены',
      link: '/cash-transactions/cash-shifts',
      icon: 'interaction'
    },
    {
      name: 'Справочники',
      link: '/cash-transactions/cash-directory',
      icon: 'book'
    },
    {
      name: 'Константы',
      link: '/cash-transactions/cash-constants',
      icon: 'interaction'
    }
  ]
}
</script>

<style scoped>

</style>
