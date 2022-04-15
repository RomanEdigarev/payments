<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import locale from "ant-design-vue/lib/locale-provider/ru_RU";
import { ApiError } from "@/apiError/ApiError";

export default {
  name: "App",
  data: () => {
    locale.DatePicker.lang.monthFormat = "MMMM";

    return {
      locale,
    };
  },
  watch: {
    currentError(): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$notification.error({
        message: ApiError.apiError?.data,
        description: ApiError.apiError?.statusText,
      });
    },
  },
  computed: {
    currentError(): typeof ApiError.apiError {
      return ApiError.apiError;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;1,100;1,400&display=swap");

$active-color: #40a9ff;

body {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}

#app {
  font-family: "Roboto", sans-serif;
}

.pointer {
  cursor: pointer;
}

.action-icon {
  margin-right: 16px;
}

.block-tab {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  transform: translateY(2px);

  li {
    padding: 10px 0;
    margin-right: 32px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }

  .active {
    color: $active-color;
    border-bottom-color: $active-color;
  }
}
</style>
