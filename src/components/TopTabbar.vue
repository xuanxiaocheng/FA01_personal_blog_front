<template>
  <div class="topContainer">
    <router-link class="link" to="/">
      <p class="websiteName">StarPavilion</p>
    </router-link>
    <div class="mobileNav" @click="changeTab">
      <span id="goodText" ref="goodTextTab" class="mobileNavTitle active"
        >精彩好文</span
      >
      <span id="goodQuestion" ref="goodQuestionTab" class="mobileNavTitle"
        >精彩问答</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { ref, nextTick } from "vue";
export default {
  props: ["goodTextShow", "goodQuestionShow"],
  setup(props: any) {
    const goodQuestionTab: any = ref(null);
    const goodTextTab: any = ref(null);
    const goodTextShow = props.goodTextShow;
    const goodQuestionShow = props.goodQuestionShow;
    function changeTab(e: any) {
      nextTick(() => {
        if (e.target.id == "goodText") {
          goodQuestionShow.value.className = "rightCard moblieUnDisplay";
          goodTextShow.value.className = "leftCard";
          goodTextTab.value.className = "mobileNavTitle active";
          goodQuestionTab.value.className = "mobileNavTitle";
        }
        if (e.target.id == "goodQuestion") {
          goodQuestionShow.value.className = "rightCard";
          goodTextShow.value.className = "leftCard moblieUnDisplay";
          goodTextTab.value.className = "mobileNavTitle";
          goodQuestionTab.value.className = "mobileNavTitle active";
        }
      });
    }
    return {
      changeTab,
      goodQuestionTab,
      goodTextTab,
    };
  },
};
</script>
<style lang="less" scoped>
.topContainer {
  background: #fff;
  width: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .websiteName {
    color: #000;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 1px;
    padding: 4px 8px;
    border-radius: 2px;
    opacity: 0.5;
    transition: all 0.4s ease;
    cursor: pointer;
    display: inline;

    &:hover {
      opacity: 1;
    }
  }

  .mobileNav {
    display: flex;
    align-items: center;
    padding: 2vh 3vw;
    background: #fff;
    z-index: 10;
    width: 100%;

    .mobileNavTitle {
      margin: 0 4vw 0 0;
      font-weight: 550;
      font-size: 4vw;
    }

    .active {
      color: #1a87cf;
    }
  }
}

@media (min-width: 992px) {
  .topContainer {
    .mobileNav {
      display: none;
    }
  }
}
</style>
