<template>
  <div id="leftBar">
    <div
      class="barText"
      @click="clickMenu($event, item.query)"
      v-for="item in leftBarList"
      :key="item.name"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  onMounted,
  nextTick,
  ref,
} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const leftBarList = ref([
      { name: "为你推荐", query: "recommend" },
      { name: "最新内容", query: "new" },
      { name: "前端", query: "front-end" },
      { name: "后端", query: "back-end" },
    ]);
    onMounted(() => {
      const fatherDom = document.getElementById("leftBar");
      fatherDom ? (fatherDom.children[0].className = "barText curPage") : null;
    });
    const clickMenu = function (e: any, query: string) {
      const curPageItem = document.querySelector(".barText.curPage");
      curPageItem ? (curPageItem.className = "barText") : null;
      e.target.className = "barText curPage";
      console.log(router);
      router.push({ path: "/article", query: { type: query } });
    };
    return {
      leftBarList,
      clickMenu,
    };
  },
});
</script>
<style lang="less" scoped>
.barText {
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
}
.curPage {
  background: #333333;
  color: aliceblue;
  width: 150px;
}
</style>
