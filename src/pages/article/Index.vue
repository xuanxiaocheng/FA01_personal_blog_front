<template>
  <article-nav @showContext="showContext"></article-nav>
</template>
<script lang="ts">
import articleNav from "./ArticalNav.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const showContext = (id: number, type: string) => {
      console.log(id, type)
      router.push({ name: "TextContent", query: { articleId: id, type: type } });
    };
    return {
      showContext,
    };
  },
  components: {
    articleNav,
  },
});
</script>
<style lang="less" scoped>
</style>
